import { PLIX_CASE_STUDY } from "../data";
import { PlixFigure } from "./PlixFigure";

export function ProductNarrative() {
  const { productNarrative } = PLIX_CASE_STUDY;

  return (
    <section
      id="product-narrative"
      aria-labelledby="heading-narrative"
      className="flex flex-col gap-6 sm:gap-8 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {productNarrative.eyebrow}
        </span>
        <h2
          id="heading-narrative"
          className="text-lg sm:text-xl font-regular text-foreground leading-snug"
        >
          {productNarrative.title}
        </h2>
      </div>

      {/* Full-Width Wide Banner + 2-Up Pair */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        <PlixFigure
          asset={productNarrative.wide}
          sizes="(max-width: 1024px) 100vw, 960px"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
          {productNarrative.pair.map((img) => (
            <PlixFigure
              key={img.src}
              asset={img}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductNarrative;
