import Image from "next/image";
import { PLIX_CASE_STUDY } from "../data";

export function Learnings() {
  const { reflection, testimonials } = PLIX_CASE_STUDY;

  return (
    <>
      {/* Section: LEARNINGS & REFLECTION */}
      <section
        id="reflection"
        aria-labelledby="heading-reflection"
        className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {reflection.eyebrow}
          </span>
          <h2
            id="heading-reflection"
            className="text-lg sm:text-xl font-regular text-foreground leading-snug"
          >
            {reflection.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:text-base text-foreground/85 leading-relaxed font-light font-sans max-w-3xl">
          {reflection.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Section: KIND WORDS / TESTIMONIALS */}
      <section
        id="testimonials"
        aria-labelledby="heading-testimonials"
        className="flex flex-col gap-6 pt-10 border-t border-border-subtle/70"
      >
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {testimonials.eyebrow}
          </span>
          <h2
            id="heading-testimonials"
            className="text-lg sm:text-xl font-regular text-foreground leading-snug"
          >
            {testimonials.title}
          </h2>
        </div>

        {/* Testimonial Card Container */}
        <div className="rounded-2xl bg-surface border border-border-subtle p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          {/* Team Photo + Badge */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
            <div className="w-56 sm:w-64 lg:w-[270px] shrink-0 overflow-hidden rounded-xl border border-border-subtle">
              <Image
                src={testimonials.teamImage.src}
                alt={testimonials.teamImage.alt}
                width={testimonials.teamImage.width}
                height={testimonials.teamImage.height}
                loading="lazy"
                sizes="(max-width: 640px) 224px, 270px"
                className="w-full h-auto block object-cover"
              />
            </div>

            <span className="inline-block w-fit mb-2 sm:mb-4 px-3.5 py-1.5 rounded-xs bg-[#e8590c] dark:bg-[#ea580c] text-white font-sans text-xs font-medium tracking-tight shadow-sm -rotate-6 select-none">
              {testimonials.teamBadge}
            </span>
          </div>

          {/* 2-Column Peer Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 border-t border-border-subtle/60">
            {testimonials.quotes.map((item) => (
              <div
                key={item.author}
                className="flex flex-col justify-between gap-4"
              >
                <p className="font-sans text-xs sm:text-[13.5px] text-muted-foreground leading-[1.7] font-light">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex flex-col">
                  <span className="font-sans text-xs sm:text-sm font-medium text-foreground">
                    {item.author}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Learnings;
