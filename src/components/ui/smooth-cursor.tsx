"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type FC } from "react"
import { motion, useSpring, AnimatePresence } from "motion/react"

interface Position {
  x: number
  y: number
}

interface ViewportQuadrant {
  placeBelow: boolean
  placeLeft: boolean
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={28}
      viewBox="0 0 50 54"
      fill="none"
      className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="#000000"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="#ffffff"
        strokeWidth={2.5}
      />
    </svg>
  )
}

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const mql = window.matchMedia("(pointer: coarse)")
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  )
}

function getServerTouchSnapshot() {
  return false
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const hasInitialized = useRef(false)
  const currentLabelRef = useRef<string | null>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [cursorLabel, setCursorLabel] = useState<string | null>(null)
  const [quadrant, setQuadrant] = useState<ViewportQuadrant>({
    placeBelow: false,
    placeLeft: false,
  })
  const quadrantRef = useRef<ViewportQuadrant>({
    placeBelow: false,
    placeLeft: false,
  })

  const isTouchDevice = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerTouchSnapshot)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  const updateQuadrant = (x: number, y: number) => {
    if (typeof window === "undefined") return

    // Measure actual pill width/height or safe defaults based on text length
    const pillW =
      pillRef.current?.offsetWidth ||
      (currentLabelRef.current && currentLabelRef.current.length > 6 ? 140 : 75)
    const pillH = pillRef.current?.offsetHeight || 32

    // If placing to the right would exceed viewport right edge (with 16px margin), flip left
    const wouldClipRight = x + pillW + 16 > window.innerWidth
    const nextPlaceLeft = wouldClipRight ? x > window.innerWidth / 2 : false

    // If placing above would exceed viewport top edge (with 16px margin), flip below
    const wouldClipTop = y - pillH - 16 < 0
    const nextPlaceBelow = wouldClipTop ? y < window.innerHeight / 2 : false

    if (
      quadrantRef.current.placeBelow !== nextPlaceBelow ||
      quadrantRef.current.placeLeft !== nextPlaceLeft
    ) {
      quadrantRef.current = { placeBelow: nextPlaceBelow, placeLeft: nextPlaceLeft }
      setQuadrant({ placeBelow: nextPlaceBelow, placeLeft: nextPlaceLeft })
    }
  }

  // When cursorLabel changes, re-evaluate boundaries immediately with the mounted pill
  useEffect(() => {
    if (cursorLabel && lastMousePos.current) {
      updateQuadrant(lastMousePos.current.x, lastMousePos.current.y)
    }
  }, [cursorLabel])

  useEffect(() => {
    if (isTouchDevice) {
      return
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let isReducedMotion = reducedMotionQuery.matches
    const onMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches
    }
    reducedMotionQuery.addEventListener("change", onMotionChange)

    let timeout: ReturnType<typeof setTimeout> | null = null
    let isScrollingTimeout: ReturnType<typeof setTimeout> | null = null
    let isScrolling = false

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        setIsVisible(false)
        return
      }

      setIsVisible(true)

      const currentPos = {
        x: Math.max(0, Math.min(window.innerWidth, e.clientX)),
        y: Math.max(0, Math.min(window.innerHeight, e.clientY)),
      }

      // Check context awareness: element under pointer with data-cursor
      if (isScrolling) {
        // While scrolling, keep cursor in default arrow state
        if (currentLabelRef.current !== null) {
          currentLabelRef.current = null
          setCursorLabel(null)
        }
      } else {
        const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null
        const label = target ? target.getAttribute("data-cursor") : null

        if (label !== currentLabelRef.current) {
          currentLabelRef.current = label
          setCursorLabel(label)
        }
      }

      updateQuadrant(currentPos.x, currentPos.y)

      // Snap immediately to mouse position on first move so it does not spring from (0,0)
      if (!hasInitialized.current) {
        hasInitialized.current = true
        cursorX.jump(currentPos.x)
        cursorY.jump(currentPos.y)
        lastMousePos.current = currentPos
        lastUpdateTime.current = Date.now()
        return
      }

      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0 && lastUpdateTime.current > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }

        const speed = Math.hypot(velocity.current.x, velocity.current.y)

        if (!currentLabelRef.current && speed > 0.1 && !isReducedMotion) {
          const currentAngle =
            Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
            90

          let angleDiff = currentAngle - previousAngle.current
          if (angleDiff > 180) angleDiff -= 360
          if (angleDiff < -180) angleDiff += 360
          accumulatedRotation.current += angleDiff
          rotation.set(accumulatedRotation.current)
          previousAngle.current = currentAngle

          scale.set(0.95)

          if (timeout !== null) {
            clearTimeout(timeout)
          }

          timeout = setTimeout(() => {
            scale.set(1)
          }, 150)
        } else if (currentLabelRef.current || isReducedMotion) {
          rotation.set(0)
          accumulatedRotation.current = 0
          previousAngle.current = 0
          scale.set(1)
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)
    }

    // Scroll behaviour: immediately reset cursor to default arrow state during scroll
    const handleScroll = () => {
      isScrolling = true

      if (currentLabelRef.current !== null) {
        currentLabelRef.current = null
        setCursorLabel(null)
      }

      if (isScrollingTimeout !== null) {
        clearTimeout(isScrollingTimeout)
      }
      isScrollingTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    const handleResize = () => {
      if (lastMousePos.current) {
        updateQuadrant(lastMousePos.current.x, lastMousePos.current.y)
      }
    }

    const handlePointerLeave = () => {
      setIsVisible(false)
      currentLabelRef.current = null
      setCursorLabel(null)
    }

    const handlePointerEnter = () => {
      setIsVisible(true)
    }

    // Keyboard focus interaction: when tabbing onto a data-cursor target
    const handleFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null
      if (target) {
        const rect = target.getBoundingClientRect()
        const label = target.getAttribute("data-cursor")
        currentLabelRef.current = label
        setCursorLabel(label)
        setIsVisible(true)

        const targetX = rect.left + rect.width / 2
        const targetY = rect.top + rect.height / 2

        updateQuadrant(targetX, targetY)

        cursorX.set(targetX)
        cursorY.set(targetY)
        rotation.set(0)
      }
    }

    const handleFocusOut = (e: FocusEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest?.("[data-cursor]")) {
        currentLabelRef.current = null
        setCursorLabel(null)
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    window.addEventListener("resize", handleResize, { passive: true })
    document.addEventListener("mouseleave", handlePointerLeave)
    document.addEventListener("mouseenter", handlePointerEnter)
    document.addEventListener("focusin", handleFocusIn)
    document.addEventListener("focusout", handleFocusOut)

    return () => {
      reducedMotionQuery.removeEventListener("change", onMotionChange)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerMove)
      window.removeEventListener("scroll", handleScroll, { capture: true })
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mouseleave", handlePointerLeave)
      document.removeEventListener("mouseenter", handlePointerEnter)
      document.removeEventListener("focusin", handleFocusIn)
      document.removeEventListener("focusout", handleFocusOut)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
      if (isScrollingTimeout !== null) {
        clearTimeout(isScrollingTimeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isTouchDevice])

  if (isTouchDevice) {
    return null
  }

  // Truus.co speech-bubble shape with sharp corner pointing at the cursor
  const cornerClass = quadrant.placeBelow
    ? quadrant.placeLeft
      ? "rounded-2xl rounded-tr-[2px]"
      : "rounded-2xl rounded-tl-[2px]"
    : quadrant.placeLeft
    ? "rounded-2xl rounded-br-[2px]"
    : "rounded-2xl rounded-bl-[2px]"

  const pillTransformOrigin = quadrant.placeBelow
    ? quadrant.placeLeft
      ? "top right"
      : "top left"
    : quadrant.placeLeft
    ? "bottom right"
    : "bottom left"

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        x: cursorX,
        y: cursorY,
        zIndex: 99999,
        pointerEvents: "none",
        willChange: "transform",
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.12,
      }}
    >
      <AnimatePresence>
        {cursorLabel ? (
          <motion.div
            key="pill-bubble"
            ref={pillRef}
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.25, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
            style={{
              position: "absolute",
              ...(quadrant.placeLeft
                ? { right: "8px", left: "auto" }
                : { left: "10px", right: "auto" }),
              ...(quadrant.placeBelow
                ? { top: "12px", bottom: "auto" }
                : { bottom: "8px", top: "auto" }),
              transformOrigin: pillTransformOrigin,
            }}
            className={`inline-flex items-center justify-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 ${cornerClass} bg-[#F0BEFA] text-black font-sans text-[12px] sm:text-[13px] font-medium leading-none tracking-tight shadow-md shadow-black/15 select-none whitespace-nowrap drop-shadow-sm max-w-[calc(100vw-20px)]`}
          >
            {cursorLabel}
          </motion.div>
        ) : (
          <motion.div
            key="arrow-cursor"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              translateX: "-50%",
              translateY: "-50%",
              rotate: rotation,
              scale: scale,
            }}
          >
            {cursor}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const CustomCursor = SmoothCursor
export default SmoothCursor
