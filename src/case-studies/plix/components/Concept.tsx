import { PLIX_CASE_STUDY } from "../data";
import { PlixFigure } from "./PlixFigure";

export function Concept() {
  const { concept } = PLIX_CASE_STUDY;

  return (
    <section
      id="concept"
      aria-labelledby="heading-concept"
      className="flex flex-col gap-6 sm:gap-8"
    >
      {/* Section Header */}
      <div className="flex flex-col gap-1.5">
        <span className="font-pixel text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {concept.eyebrow}
        </span>
        <h2
          id="heading-concept"
          className="text-lg sm:text-xl font-lightcd text-foreground leading-snug"
        >
          {concept.title}
        </h2>
        <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed font-sans max-w-3xl pt-1">
          {concept.body}
        </p>
      </div>

      {/* 2-Up Portrait Image Pair */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full pt-2">
        {concept.images.map((img) => (
          <PlixFigure
            key={img.src}
            asset={img}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
          />
        ))}
      </div>
    </section>
  );
}

export default Concept;
