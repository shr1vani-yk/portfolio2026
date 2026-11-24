import { PLIX_CASE_STUDY } from "../data";

export function Hero() {
  const { overview } = PLIX_CASE_STUDY;

  return (
    <header className="flex flex-col">
      {/* Eyebrow: CASE STUDY · 3 MIN READ · BRAND & VISUAL DESIGN */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-pixel uppercase tracking-wider mb-3">
        <span>CASE STUDY</span>
        <span>&bull;</span>
        <span>{overview.readTime}</span>
        <span>&bull;</span>
        <span className="text-foreground font-pixel font-medium">
          {overview.discipline}
        </span>
      </div>

      {/* Main Display Title */}
      <h1 className="font-sans font-regular text-2xl sm:text-4xl md:text-[2.65rem] text-foreground  leading-[1.14] mb-4">
        {overview.title}
      </h1>

      {/* Description */}
      <p className="font-sans font-light text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8 sm:mb-10">
        {overview.description}
      </p>

      {/* 4-Column Metadata Row matching Nepali Tales layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-border-subtle/70">
        {/* Column 1: Deliverables */}
        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
          <span className="font-pixel font-light text-xs uppercase text-muted-foreground font-normal">
            Deliverables
          </span>
          <div className="flex flex-wrap md:flex-col items-start gap-1.5 pt-0.5">
            {overview.deliverables.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-sans bg-surface-hover text-foreground/90 border border-border-subtle"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Role */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Role
          </span>
          <span className="font-sans font-light text-sm text-foreground leading-relaxed">
            {overview.role}
          </span>
        </div>

        {/* Column 3: Timeline */}
        <div className="flex flex-col gap-1.5">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Timeline
          </span>
          <span className="font-sans font-light text-sm text-foreground leading-relaxed">
            {overview.timeline}
          </span>
        </div>

        {/* Column 4: Year & Team */}
        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
          <span className="font-pixel font-light uppercase text-xs text-muted-foreground font-normal">
            Year &amp; Team
          </span>
          <div className="font-sans font-light text-sm text-foreground leading-relaxed flex flex-col">
            <span className="font-medium text-foreground">
              {overview.year}
            </span>
            <span className="text-muted-foreground text-xs whitespace-pre-line leading-relaxed">
              {overview.teamCollaboration}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
