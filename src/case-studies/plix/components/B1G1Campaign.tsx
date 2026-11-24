import { PLIX_CASE_STUDY } from "../data";
import { PlixFigure } from "./PlixFigure";

export function B1G1Campaign() {
  const { b1g1 } = PLIX_CASE_STUDY;

  return (
    <section
      id="b1g1-creatives"
      aria-labelledby="heading-b1g1"
      className="flex flex-col gap-6 sm:gap-8 pt-10 border-t border-border-subtle/70"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {b1g1.eyebrow}
          </span>
          <h2
            id="heading-b1g1"
            className="text-lg sm:text-xl font-regular text-foreground leading-snug"
          >
            {b1g1.title}
          </h2>
        </div>

        {/* Vertical Orange Accent Line Callout */}
        <p className="pl-4 border-l-2 border-[#e8590c] dark:border-[#f97316] font-sans text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-3xl">
          {b1g1.callout}
        </p>
      </div>

      {/* Full-Width Wide Banner + 2-Up Pair */}
      <div className="flex flex-col gap-4 sm:gap-5 w-full">
        <PlixFigure
          asset={b1g1.wide}
          sizes="(max-width: 1024px) 100vw, 960px"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
          {b1g1.pair.map((img) => (
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

export default B1G1Campaign;
