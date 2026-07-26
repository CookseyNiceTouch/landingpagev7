/** Single infocard: heading + body (either a string block or a bullet list) */
export interface InfocardContent {
  heading: string
  body: string | string[]
}

export const HERO = {
  headingLines: ['Not every part of the edit', 'needs an editor.'],
  subtitle:
    'Nice Touch knows which parts do. It handles the rest, right inside Premiere Pro and DaVinci Resolve.',
} as const

export const DEMO_STEPS: InfocardContent[] = [
  {
    heading: 'Analyse your footage',
    body: 'Bring in your footage, briefs, notes, and reference links. Nice Touch transcribes your audio with word-level accuracy and builds a usable project memory that the AI assistant draws on throughout the edit.',
  },
  {
    heading: 'Answer a few questions about the cut',
    body: "Based on what it finds in your footage, Nice Touch asks you a handful of targeted questions about the project — filling in whatever your brief doesn't already cover.",
  },
  {
    heading: 'Generate your edit',
    body: 'Ask the assistant to find moments, build a rough cut, restructure a sequence, or handle a specific edit task. Actions execute directly inside Resolve or Premiere.',
  },
  {
    heading: 'Review and refine',
    body: 'The AI builds on your brief and your footage, not a blank template. Every edit can be reviewed, adjusted, and refined. The editor stays in control throughout.',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

/** Build schema.org FAQPage JSON-LD from a list of FAQ items. */
export function faqPageSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export const SECTION_TITLES = {
  problem: 'The first pass eats the job.',
  howItWorks: 'From footage to first cut.',
  payoff: 'More takes at the thing you actually care about.',
  capabilities: 'What it does once it knows your project.',
  audiences: 'Built for how you already work.',
  testimonials: 'What editors tell us.',
  multicam: "Multicam shouldn\u2019t take half your day.",
  workflows: 'Built for real post-production workflows.',
  pricing: 'Pay for what you use, pay less the more you create.',
  faq: 'Frequently asked questions.',
  security: 'Your footage stays yours.',
} as const

// --------------------------------------------------------------------------
// Proof strip
// --------------------------------------------------------------------------

/**
 * Sits directly under the hero to establish credibility before any pitch.
 *
 * Every value here is a verifiable fact drawn from the press boilerplate in
 * `src/data/press.ts` or from shipped product capability. Deliberately no
 * performance metrics ("saves N hours", "10x faster") — we don't have
 * measured numbers yet, and inventing them would be the fastest way to lose
 * an audience of professional editors.
 */
export interface ProofPoint {
  label: string
  value: string
}

export const PROOF_POINTS: ProofPoint[] = [
  { label: 'Runs inside', value: 'Premiere Pro & DaVinci Resolve' },
  { label: 'Available on', value: 'macOS & Windows' },
  { label: 'In use across', value: 'Broadcast, podcast, education & creator post' },
  { label: 'Your footage', value: 'Never used for model training' },
]

// --------------------------------------------------------------------------
// Problem — the cost of the first pass
// --------------------------------------------------------------------------

/** Two-column "your day now / your day with Nice Touch" contrast. */
export const PROBLEM = {
  eyebrow: 'The first pass',
  lead: 'A weekly podcast comes back as six hours across four cameras. An interview shoot fills three drives with talking heads. A documentary wraps with 200 hours of cards and a brief three pages long.',
  beforeHeading: 'How the work starts today',
  before: [
    'Sync the angles and line up the recorder audio.',
    'Watch the whole thing end to end, marking anything usable.',
    'Log it, name it, and build a string-out by hand.',
    'Finally start editing — often a day or two in.',
  ],
  afterHeading: 'How it starts with Nice Touch',
  after: [
    'Point it at the project you already have open.',
    'It transcribes every word and reads your brief and notes.',
    'It answers back with questions, then assembles a first cut.',
    'You open a structured timeline and start making decisions.',
  ],
  closing:
    'None of that first pass is the reason you got into this. It is just the toll you pay before the work begins.',
} as const

// --------------------------------------------------------------------------
// Payoff — what you get back
// --------------------------------------------------------------------------

/**
 * The emotional centre of the page: the one section framed around what the
 * editor gains rather than what the tool removes.
 */
export interface PayoffItem {
  heading: string
  body: string
}

export const PAYOFF = {
  eyebrow: 'What you get back',
  lead: 'Nobody starts editing because they love logging footage. Clearing the first pass gives you back the part of the job that made you want to do it.',
  items: [
    {
      heading: 'Try the version you talked yourself out of',
      body: 'When a restructure costs an hour instead of an afternoon, you can actually test the braver cut — the cold open, the different through-line, the version you would normally shelve because the deadline said no.',
    },
    {
      heading: 'Spend the time on craft, not admin',
      body: 'The hours the first pass used to take go back into pacing, sound, colour, and the small decisions that separate a competent cut from a good one.',
    },
    {
      heading: 'Say yes to more of the work you want',
      body: 'Getting to a first cut sooner means more projects through the door, or the evening back. Either way it is your call, not the footage\u2019s.',
    },
  ] satisfies PayoffItem[],
} as const

// --------------------------------------------------------------------------
// Capabilities — bento grid
// --------------------------------------------------------------------------

/**
 * Rendered as a mosaic rather than a uniform card grid. `feature` marks the
 * tile that spans two columns — multicam, because it's the differentiator
 * competitors reliably fail at.
 */
export interface CapabilityTile {
  heading: string
  body: string
  /**
   * Grid columns to span on wide viewports (default 1). Spans are chosen so
   * the grid resolves to whole rows at both the 2- and 3-column breakpoints.
   */
  span?: 2 | 3
  /** Pink-tinted emphasis treatment. */
  feature?: boolean
}

export const CAPABILITIES: CapabilityTile[] = [
  {
    heading: 'Multicam, without the chaos',
    body: 'Multiple cameras. Multiple speakers. One conversation. Nice Touch scores every available audio source, tracks who is speaking, and builds structure across all your angles — so you stop watching eight timelines to find one usable beat. Available on Pro plans and above.',
    span: 2,
    feature: true,
  },
  {
    heading: 'Chat that knows your project',
    body: 'Ask for a moment, an explanation, or a plan in plain language. The assistant has your brief, your transcripts, and your timeline in context.',
  },
  {
    heading: 'Rough cut generation',
    body: 'It selects and orders moments from your own footage and brief, then builds the timeline in place — not from a blank template.',
  },
  {
    heading: 'Word-level transcription',
    body: 'Every spoken moment timestamped and searchable, so the assistant can reference exact ranges when it cuts.',
  },
  {
    heading: 'Timeline actions in your NLE',
    body: 'Edits execute directly inside Resolve or Premiere. Nothing to export, no round-tripping between tools.',
  },
  {
    heading: 'Project memory',
    body: 'Briefs, notes, transcripts, and reference documents become usable context the assistant draws on for the life of the project — so the answers stay consistent from the first import to the final cut.',
    span: 3,
  },
]

// --------------------------------------------------------------------------
// Audiences — self-identification into the vertical pages
// --------------------------------------------------------------------------

/** Lets a visitor recognise their own work and route to the matching page. */
export interface AudienceCard {
  label: string
  description: string
  href: string
}

export const AUDIENCES: AudienceCard[] = [
  {
    label: 'Podcast editing',
    description: 'Hours-long multi-cam conversations, every week, with cut-downs to follow.',
    href: '/podcast-editing/',
  },
  {
    label: 'Interviews & talking heads',
    description: 'Drives full of sit-down footage where the story lives in what people said.',
    href: '/interview-editing/',
  },
  {
    label: 'Sermons & church media',
    description: 'A weekly service to turn around, usually with a small team and a fixed deadline.',
    href: '/sermon-editing/',
  },
  {
    label: 'Documentary & factual',
    description: 'Hundreds of hours of cards and one usable line at a time.',
    href: '/use-cases/',
  },
  {
    label: 'Agencies & in-house teams',
    description: 'Delivery pressure, thin margins, and a first pass that should look the same from every editor.',
    href: '/use-cases/',
  },
  {
    label: 'Post houses & teams',
    description: 'Pooled usage, admin controls, and one standard workflow across a room of editors.',
    href: '/for-teams/',
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Which NLEs does Nice Touch support?',
    answer:
      'Nice Touch currently integrates with Adobe Premiere Pro and DaVinci Resolve. We generate edit-ready timelines that open natively inside your project — no plugins, no round-tripping.',
  },
  {
    question: 'How much footage can I process?',
    answer:
      'Each plan includes a monthly audio-analysis allowance: 2 hours on Hobbyist, 5 hours on Pro, and 25 hours on Ultra, with custom limits on Enterprise. Allowances refer to the length of source material, not wall-clock processing time, and you can top up any plan with add-on packs.',
  },
  {
    question: 'Does Nice Touch replace my editor?',
    answer:
      'No. Nice Touch handles the repetitive, time-consuming parts of post — transcription, speaker identification, structure, and rough-cut assembly. The creative decisions remain yours.',
  },
  {
    question: 'What happens to my footage after processing?',
    answer:
      'Your media files are processed in isolated environments and never used for training. Transcripts and metadata are encrypted at rest and deleted automatically after your configured retention period.',
  },
  {
    question: 'Can I use Nice Touch for multicam shoots?',
    answer:
      'Yes. Multicam support is included on Pro plans and above. Nice Touch analyses synced multicam footage as a single narrative, scores the available audio sources, and tracks coverage across all camera angles.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Plans are billed monthly or annually through Stripe. Annual plans save roughly two months compared to monthly billing. You can upgrade, downgrade, or cancel at any time.',
  },
]

// --------------------------------------------------------------------------
// Security trust bar
// --------------------------------------------------------------------------

/**
 * Home only needs to answer the security question quickly enough that it
 * stops being an objection. The full explanation lives on /security.
 */
export interface SecurityPoint {
  heading: string
  body: string
}

export const SECURITY_POINTS: SecurityPoint[] = [
  {
    heading: 'Never used for training',
    body: 'Your media is never fed into model training. Not ours, not anyone else\u2019s.',
  },
  {
    heading: 'Isolated, ephemeral processing',
    body: 'Every job runs in its own environment that is destroyed once the work completes.',
  },
  {
    heading: 'Encrypted end to end',
    body: 'TLS 1.3 in transit, AES-256 at rest, with retention you configure and we honour.',
  },
]

/*
 * MULTICAM_CARD / WORKFLOWS_CARD / SECURITY_CARD were removed when Home was
 * re-architected. Their copy now lives in CAPABILITIES (the multicam feature
 * tile), PROBLEM, and SECURITY_POINTS respectively; the long-form versions
 * remain on /multicam and /security.
 */
