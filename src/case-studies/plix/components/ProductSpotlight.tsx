import { PLIX_CASE_STUDY } from "../data";
import { PlixFigure } from "./PlixFigure";

export function ProductSpotlight() {
  const { productSpotlight } = PLIX_CASE_STUDY;

  return (
    <section
      id="product-spotlight"
      aria-labelledby="heading-spotlight"
      className="flex flex-col gap-6 sm:gap-8 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {productSpotlight.eyebrow}
        </span>
        <h2
          id="heading-spotlight"
          className="text-lg sm:text-xl font-regular text-foreground leading-snug"
        >
          {productSpotlight.title}
        </h2>
      </div>

      {/* 2-Up Pair + Full-Width Banner */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
          {productSpotlight.pair.map((img) => (
            <PlixFigure
              key={img.src}
              asset={img}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            />
          ))}
        </div>
        <PlixFigure
          asset={productSpotlight.wide}
          hasLightEdgeShadow
          sizes="(max-width: 1024px) 100vw, 960px"
        />
      </div>
    </section>
  );
}

export default ProductSpotlight;
