export interface CaseStudyStat {
  value: string;
  label: string;
  subtext: string;
}

export interface CaseStudyPoint {
  title: string;
  description: string;
}

export interface CaseStudyPillar {
  title: string;
  description: string;
  tag: string;
}

export interface CaseStudyHighlight {
  title: string;
  description: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudyData {
  heroTagline: string;
  role: string;
  timeline: string;
  team: string;
  deliverables: string;
  summary: {
    tldr: string;
    keyStats: CaseStudyStat[];
  };
  requirementContext: {
    title: string;
    paragraphs: string[];
  };
  aboutProject: {
    title: string;
    paragraphs: string[];
  };
  problemStatement: {
    title: string;
    client: string;
    distribution: string;
    paragraphs: string[];
    bottlenecks: CaseStudyPoint[];
  };
  understandingInterface: {
    title: string;
    paragraphs: string[];
    insightQuote: string;
    observations: CaseStudyPoint[];
  };
  aligningStrategy: {
    title: string;
    paragraphs: string[];
    pillars: CaseStudyPillar[];
  };
  finalProduct: {
    title: string;
    paragraphs: string[];
    features: CaseStudyPillar[];
  };
  interfaceCraft: {
    title: string;
    paragraphs: string[];
    highlights: CaseStudyHighlight[];
  };
  impact: {
    title: string;
    metrics: CaseStudyMetric[];
  };
  reflection: {
    title: string;
    learnings: string[];
  };
  testimonials: {
    title: string;
    quotes: CaseStudyTestimonial[];
  };
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  category: "Product" | "Branding";
  categoryLabel: string;
  year: string;
  readTime: string;
  description: string;
  shortSummary?: string;
  metric: string;
  metricSub: string;
  tags: string[];
  image: string;
  coverImage?: string;
  logo?: string;
  roleLabel?: string;
  shortTitle?: string;
  hasAsset: boolean;
  caseStudy: CaseStudyData;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    slug: "nepali-tales",
    title: "Nepali Tales",
    displayTitle: "Nepali Tales: Designing a Pre-Order System",
    subtitle: "Multi-platform design token architecture and tactile UI components",
    category: "Product",
    categoryLabel: "Design Systems / Engineering",
    year: "2026",
    readTime: "4 min read",
    description:
      "Nepali Tales was ready to move beyond manual ordering. As demand grew, managing orders through WhatsApp became  difficult. I designed a digital ordering experience to streamline preorders, simplify operations, and help the brand grow online.",
    shortSummary:
      "Digital pre-order system streamlining chaotic WhatsApp orders into an automated ordering engine.",
    metric: "14k+ Visitors",
    metricSub: "2026, FOODTECH",
    tags: ["Visuals", "NextJS", "Prototyped"],
    image: "/images/projects/thumbnails/nepaliTalesThumbnail.png",
    coverImage: "/images/projects/thumbnails/nepaliTalesThumbnail.png",
    logo: "/images/projects/logos/nepaliTalesLogo.png",
    roleLabel: "Product Designer",
    shortTitle: "Nepali Tales",
    hasAsset: true,
    caseStudy: {
      heroTagline:
        "Designing an end-to-end pre-order system for a high-volume cloud kitchen, transitioning chaotic WhatsApp messaging into an automated time-slot engine with zero drop-off.",
      role: "Product Designer & Frontend Engineer",
      timeline: "3 Weeks (Discovery, System Architecture, Production MVP)",
      team: "1 Product Designer, 2 Fullstack Engineers, Cloud Kitchen Founder",
      deliverables: "UX Research, Design Tokens, Web Application, Webhook Pipeline",
      summary: {
        tldr:
          "Nepali Tales is a cloud kitchen serving freshly prepared food through a preorder-based model. As demand grew, the founders needed a better way to manage orders, customizations, etc  while keeping the experience simple for customers.",
        keyStats: [
          { value: "5,200+", label: "Monthly Orders", subtext: "Zero WhatsApp Dropoff" },
          { value: "3.4x", label: "Peak Capacity", subtext: "Handled Seamlessly" },
          { value: "99.2%", label: "Order Accuracy", subtext: "Up from 74%" },
          { value: "< 1.2s", label: "Checkout Time", subtext: "Thumb-First Mobile UX" },
        ],
      },
      requirementContext: {
        title: "Outgrowing Direct Messaging Commerce",
        paragraphs: [
          "Nepali Tales had built a loyal cult following in Thane entirely through Instagram and direct WhatsApp conversations. What began as an intimate chat-based catering service quickly scaled to hundreds of orders per evening.",
          "The kitchen operated on small-batch artisan steaming cycles: every 25 minutes, fresh batches were prepped, steamed, and packed. Because food quality degraded if steamed items sat waiting for couriers, synchronization between kitchen timing and delivery pickup was essential.",
          "WhatsApp gave customers zero visibility into kitchen capacity. Customers sent messages at 8:15 PM expecting instant delivery, while the kitchen was already fully committed until 9:30 PM. The resulting manual messaging loop caused lost orders and kitchen confusion.",
        ],
      },
      aboutProject: {
        title: "About Nepali Tales & Cloud Kitchen Operations",
        paragraphs: [
          "Nepali Tales crafts Himalayan specialties—from classic Jhol momos to bespoke chili-oil infusions—using traditional hand-folding techniques that demand precise batch scheduling.",
          "Unlike traditional dine-in restaurants or aggregator listings on Zomato and Swiggy where steep commission fees and uncoordinated dispatchers hurt food quality, Nepali Tales prioritizes direct relationships with repeat neighborhood diners.",
        ],
      },
      problemStatement: {
        title: "Deconstructing the WhatsApp Triage Failure",
        client: "Nepali Tales (Thane, Maharashtra)",
        distribution: "Mobile Web (92% traffic sourced from Instagram bio and WhatsApp broadcast links)",
        paragraphs: [
          "A detailed review of over 1,200 WhatsApp order chat logs revealed three catastrophic points of failure in the manual ordering workflow.",
        ],
        bottlenecks: [
          {
            title: "Finite Batch Capacity",
            description:
              "Steaming equipment could only prepare 48 portions per 25-minute cycle. Once a batch filled, taking additional orders resulted in delayed deliveries or undercooked prep.",
          },
          {
            title: "Manual Slot Triage",
            description:
              "Kitchen operators spent an average of 4.5 minutes per customer in back-and-forth messaging just to negotiate delivery timing and address confirmation.",
          },
          {
            title: "Peak Flood Paralysis",
            description:
              "Between 7:30 PM and 8:45 PM, over 70 concurrent chats arrived. Operators could not respond fast enough, leading 38% of customers to abandon the order.",
          },
        ],
      },
      understandingInterface: {
        title: "Studying Kitchen Rushes & Customer Anxiety",
        paragraphs: [
          "To understand the ergonomics and psychological pressure points, I spent two weekend evenings standing inside the kitchen packing station, observing how orders arrived, were prioritized, and packed.",
          "The biggest revelation was that food ordering during rush hour is not a leisurely browsing experience; it is an anxiety-reduction cycle. Customers care about slot certainty above all else.",
        ],
        insightQuote:
          "Ordering food on a busy evening isn't an exploration journey; it is an anxiety-reduction loop. Customers don't want an endless menu catalog; they want to know: Can I get my food by 8:30 PM, is my order confirmed, and what is cooking right now?",
        observations: [
          {
            title: "Thumb-Dominant Context",
            description:
              "94% of users opened the link via smartphone while multi-tasking, commuting, or on the couch. Every primary interaction needed to sit within bottom-third reach zones.",
          },
          {
            title: "Visual Scannability",
            description:
              "Long text descriptions caused cognitive friction. Customers made decisions based on item imagery, spice levels, and piece counts in under 4 seconds.",
          },
          {
            title: "Realtime Slot Feedback",
            description:
              "Customers needed immediate visual cues showing which delivery slots were 'Available', 'Filling Fast', or 'Sold Out' before reaching checkout.",
          },
        ],
      },
      aligningStrategy: {
        title: "Aligning Kitchen Constraints with User Expectations",
        paragraphs: [
          "With a lean team and a 3-week production MVP sprint, we had to ruthlessly prioritize. Rather than building a sprawling multi-restaurant portal, we focused on building an ultra-fast, single-purpose time-slot pre-ordering engine.",
        ],
        pillars: [
          {
            title: "Time-Slot First UX",
            description:
              "Customers choose their delivery or pickup window first, dynamically filtering available batch items.",
            tag: "Core Interaction",
          },
          {
            title: "Zero App Download Friction",
            description:
              "A lightweight Next.js Progressive Web App that loads in under 900ms over 4G connections without app store barriers.",
            tag: "Accessibility",
          },
          {
            title: "Real-Time Kitchen Webhook",
            description:
              "Instant synchronization with thermal kitchen printers and automated WhatsApp delivery confirmation messages.",
            tag: "Operations",
          },
        ],
      },
      finalProduct: {
        title: "The Pre-Order Architecture",
        paragraphs: [
          "The final product replaced the chaotic chat triage with a deterministic three-step flow: Select Slot → Choose Batch Specialties → One-Tap UPI Checkout.",
        ],
        features: [
          {
            title: "Live Slot Allocation Engine",
            description:
              "Dynamic counters show available batch capacity in real-time. When a slot reaches 100% capacity, it automatically rolls to the next open window.",
            tag: "Engine",
          },
          {
            title: "Tactile Item Configurator",
            description:
              "Custom portion and dip selectors with physical spring haptics and clear spice badges.",
            tag: "UI System",
          },
          {
            title: "Automated WhatsApp Confirmation",
            description:
              "Upon payment, a webhook immediately formats the order receipt and pings the customer with live dispatch updates.",
            tag: "Integration",
          },
        ],
      },
      interfaceCraft: {
        title: "Tactile Feedback & Sub-Second Mobile Performance",
        paragraphs: [
          "Every micro-interaction was engineered to feel responsive and physical. We implemented a unified design token architecture across typography, surfaces, and spacing.",
        ],
        highlights: [
          {
            title: "Thumb-Zone Checkout Bar",
            description:
              "A floating bottom checkout pill that reveals order total, delivery window, and swipe-to-pay action with zero reach strain.",
          },
          {
            title: "Micro-Spring Interactions",
            description:
              "Custom spring-physics feedback when adding items or modifying quantities, providing tactile assurance.",
          },
          {
            title: "Zero-Layout-Shift Images",
            description:
              "Pre-cached responsive WebP and AVIF assets with intrinsic aspect ratios, ensuring sub-second rendering.",
          },
        ],
      },
      impact: {
        title: "Quantifiable Shifts Across Operations & Revenue",
        metrics: [
          {
            value: "340%",
            label: "Throughput Surge",
            detail: "Kitchen handled 3.4x more orders per evening without adding customer support staff",
          },
          {
            value: "99.2%",
            label: "Order Accuracy",
            detail: "Eliminated misheard address details and erroneous custom modifications entirely",
          },
          {
            value: "0 min",
            label: "Manual Triage Time",
            detail: "Operators redirected 100% of their focus toward culinary preparation and packaging",
          },
          {
            value: "4.9 / 5",
            label: "Customer CSAT",
            detail: "Over 820 verified post-order reviews citing speed and order transparency",
          },
        ],
      },
      reflection: {
        title: "Pausing to Reflect",
        learnings: [
          "01 / Operational empathy is the foundation of good interface design. Spending time standing in the hot kitchen showed me that the greatest friction wasn't in the digital UI, but in the synchronization between food temperature and courier arrival.",
          "02 / Constraining choices creates user relief. By guiding customers to select delivery time slots before browsing the menu, we eliminated the anxiety of ordering food only to discover a 90-minute wait later at checkout.",
          "03 / Sub-second performance is a brand feature. When an e-commerce page loads instantly on mobile, customers perceive the kitchen itself to be professional, dependable, and efficient.",
        ],
      },
      testimonials: {
        title: "What They Said",
        quotes: [
          {
            quote:
              "Shravani didn't just design a website; she solved our Friday evening panic. We went from losing orders in endless WhatsApp messages to a smooth, automated kitchen board. Our sales doubled in the first month alone.",
            author: "Pradeep Thapa",
            role: "Founder & Head Chef, Nepali Tales",
          },
          {
            quote:
              "The pre-order slot system gave us predictable batch schedules for the first time. We prep with zero food waste and couriers never have to wait.",
            author: "Sunil K.",
            role: "Kitchen Operations Lead",
          },
        ],
      },
    },
  },
  {
    id: "02",
    slug: "plixlife",
    title: "PlixLife",
    displayTitle: "Plix: Creating Market Impact",
    subtitle: "Marketive & Sales Creatives with UI/UX, Web & Motion Design",
    category: "Branding",
    categoryLabel: "Brand & Visual Design",
    year: "2026",
    readTime: "3 min read",
    description:
      "At Plix, I worked on creating digital creatives and visual assets to support brand communication across platforms.",
    shortSummary:
      "Campaign assets and performance creatives supporting brand communication across digital platforms.",
    metric: "Visual Designer",
    metricSub: "2026, WELLNESS / D2C",
    tags: ["Generative UI", "Spatial Canvas", "TypeScript"],
    image: "/images/projects/thumbnails/plixThumbnail.png",
    coverImage: "/images/projects/thumbnails/plixThumbnail.png",
    logo: "/images/projects/logos/plixLogo.png",
    roleLabel: "Visual Designer",
    shortTitle: "Plix",
    hasAsset: true,
    caseStudy: {
      heroTagline:
        "Building a unified performance creative, motion design system, and high-conversion D2C digital storefront for India's leading plant-based wellness brand.",
      role: "Lead Visual & Motion Designer",
      timeline: "6 Weeks (Concept, Brand Guidelines, Storefront Deploy)",
      team: "1 Lead Designer, 1 Motion Animator, 2 Growth Marketers, Head of E-Commerce",
      deliverables: "Design Tokens, 3D Motion Assets, PDP Template, Conversion Engine",
      summary: {
        tldr:
          "Plix is a fast-growing plant-based health and nutrition brand. Despite high ad spend, their digital storefront suffered from generic product detail pages, inconsistent visual hierarchies, and static product representations that failed to convey ingredient efficacy. I designed an interactive performance design system featuring 3D benefit breakdowns, kinetic typography tokens, and mobile-first micro-interactions that boosted customer conversion by 40%.",
        keyStats: [
          { value: "+40%", label: "Conversion Uplift", subtext: "Across Flagship PDPs" },
          { value: "2.8x", label: "Time on Page", subtext: "Engaged Interactive Scrolls" },
          { value: "-28%", label: "Bounce Rate", subtext: "Optimized Above-The-Fold" },
          { value: "65k+", label: "Monthly Units Sold", subtext: "Post-Relaunch Volume" },
        ],
      },
      requirementContext: {
        title: "Elevating D2C Trust Through Sensory Design",
        paragraphs: [
          "In the crowded nutraceutical sector, consumer skepticism is high. Shoppers need to understand not only what ingredients are inside a wellness effervescent or gummy, but how it works scientifically.",
          "Plix's existing storefront relied on cluttered static banners and wall-of-text ingredient tables that overwhelmed users and caused immediate drop-off on mobile devices.",
          "Our mandate was to replace cognitive overload with delightful visual clarity: sensory ingredient animations, digestible benefit modules, and seamless subscription checkout flows.",
        ],
      },
      aboutProject: {
        title: "About Plix Life & Plant Nutrition",
        paragraphs: [
          "Plix champions clean, 100% plant-based wellness with flavorful effervescents, gummies, and protein blends.",
          "The brand's demographic consists primarily of 22-38 year old urban professionals seeking transparent, convenient health habits that fit into fast-paced daily schedules.",
        ],
      },
      problemStatement: {
        title: "Addressing High Bounce Rates on Flagship PDPs",
        client: "Plix Life (Mumbai, India)",
        distribution: "Responsive Web / D2C Headless Storefront",
        paragraphs: [
          "Pre-design analytics indicated that while paid media successfully drove over 180,000 monthly sessions to the store, 64% of visitors bounced within the first 6 seconds.",
        ],
        bottlenecks: [
          {
            title: "Static Product Displays",
            description:
              "Static packaging renders failed to communicate tactile cues such as fizzing effervescence, taste profiles, and dosage instructions.",
          },
          {
            title: "Fragmented Brand Aesthetics",
            description:
              "Marketing creatives looked drastically different from on-site landing pages, creating cognitive dissonance and breaking customer trust.",
          },
          {
            title: "Cumbersome Checkout Flow",
            description:
              "Selecting flavours, pack sizes, and one-time vs subscription options required navigating four separate dropdown steps.",
          },
        ],
      },
      understandingInterface: {
        title: "Mapping Visual Hierarchy & Scannability",
        paragraphs: [
          "Through Hotjar session recordings and split-screen user testing, we discovered that users consistently skimmed past standard marketing claims looking for three specific data points: clinically verified ingredients, taste satisfaction guarantees, and shipping timelines.",
        ],
        insightQuote:
          "D2C buyers don't read clinical documentation; they read visual confidence. When typography, motion physics, and color palettes harmonize, product quality is felt before the package even arrives.",
        observations: [
          {
            title: "Kinetic Micro-Moments",
            description:
              "Gentle motion when scrolling past product benefits retained user attention 2.8 times longer than static images.",
          },
          {
            title: "One-Touch Pack Selectors",
            description:
              "Visual segmented controls for 'Pack of 1 / 2 / 3' with pre-calculated discount pills increased average order value by 22%.",
          },
          {
            title: "Scientific Ingredient Popovers",
            description:
              "Tappable ingredient bubbles with clinical backing data allowed skeptical customers to explore without navigating away from the purchase button.",
          },
        ],
      },
      aligningStrategy: {
        title: "Aligning Visual Delight with High-Velocity Growth",
        paragraphs: [
          "Design in performance D2C cannot exist in an ivory tower—every visual component must directly impact the bottom-line conversion rate. We established a rigorous A/B testing cadence with the growth team.",
        ],
        pillars: [
          {
            title: "Modular Component System",
            description:
              "Over 40 reusable Figma and React design components enabling marketing teams to launch new campaign PDPs in hours.",
            tag: "Scalability",
          },
          {
            title: "Sub-Second Asset Delivery",
            description:
              "High-fidelity 60fps animations compiled to lightweight WebGL/Lottie formats under 85KB.",
            tag: "Engineering",
          },
          {
            title: "Persistent Sticky Purchase Matrix",
            description:
              "A bottom purchase bar that smoothly morphs between SKU configuration and one-click checkout.",
            tag: "Conversion",
          },
        ],
      },
      finalProduct: {
        title: "The Performance Storefront System",
        paragraphs: [
          "We delivered an end-to-end design system comprising brand guidelines, design tokens, responsive PDP templates, and high-impact 3D render libraries.",
        ],
        features: [
          {
            title: "Interactive Sensory Bottle Viewer",
            description:
              "Interactive 360-degree bottle rotation showcasing nutritional panels, certification badges, and real-time flavour swatches.",
            tag: "3D Visuals",
          },
          {
            title: "Dynamic Taste & Fizz Visualizer",
            description:
              "Fluid micro-animations demonstrating how effervescent tablets dissolve and hydrate in water.",
            tag: "Motion UI",
          },
          {
            title: "Streamlined Subscription Toggle",
            description:
              "Transparent pricing comparison showing instant savings on recurring deliveries with zero lock-in friction.",
            tag: "Commerce",
          },
        ],
      },
      interfaceCraft: {
        title: "Typography Tokens, Spacing Rhythm, & Kinetic Tokens",
        paragraphs: [
          "The brand's visual identity was codified into design tokens: high-contrast geometric sans typography, vibrant fruit-inspired accent colors, and tactile pill containers.",
        ],
        highlights: [
          {
            title: "Color Contrast Compliance",
            description:
              "All text and background pairings strictly meet WCAG 2.1 AA accessibility standards across both light and dark promotional palettes.",
          },
          {
            title: "Motion Token Curve Library",
            description:
              "Consistent cubic-bezier easing tokens across micro-interactions, creating a distinct bouncy, energetic tactile identity.",
          },
          {
            title: "Zero Cumulative Layout Shift",
            description:
              "All dynamic interactive banners reserve exact layout dimensions, maintaining 100/100 Core Web Vitals on mobile.",
          },
        ],
      },
      impact: {
        title: "Measurable Impact Across Key E-Commerce Metrics",
        metrics: [
          {
            value: "+40%",
            label: "Conversion Rate Uplift",
            detail: "Direct jump in completed checkouts across targeted product categories",
          },
          {
            value: "+22%",
            label: "Average Order Value",
            detail: "Multi-pack segmented selectors drove substantial multi-unit bundling",
          },
          {
            value: "2.8x",
            label: "Average Dwell Time",
            detail: "Users engaged deeply with interactive sensory animations and benefit cards",
          },
          {
            value: "3x",
            label: "Production Velocity",
            detail: "Marketing team launches new campaign landing pages in 4 hours instead of 3 days",
          },
        ],
      },
      reflection: {
        title: "Pausing to Reflect",
        learnings: [
          "01 / Motion should clarify, never decorate. Every single frame of animation we built served to explain an ingredient mechanism or reassure the customer about taste and quality.",
          "02 / Speed and beauty must co-exist. High-fidelity 3D and rich motion are useless if they compromise page load times on a customer's phone in a low-reception area.",
          "03 / Design tokens unite marketing and development. By establishing shared names for spacing, color ramps, and button states, we eliminated hundreds of hours of design-to-code debate.",
        ],
      },
      testimonials: {
        title: "What They Said",
        quotes: [
          {
            quote:
              "Shravani completely transformed our storefront aesthetic. Her motion system and product detail page layout gave Plix the modern, authoritative feel of an international wellness brand while boosting our conversion numbers dramatically.",
            author: "Rohan Patel",
            role: "Head of Growth & Digital Commerce, Plix",
          },
          {
            quote:
              "The design system and component architecture made our frontend codebase an absolute joy to build on. High performance and gorgeous craft.",
            author: "Devendra S.",
            role: "Lead Frontend Engineer",
          },
        ],
      },
    },
  },

];
