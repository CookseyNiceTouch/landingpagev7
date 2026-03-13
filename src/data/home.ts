/** Single infocard: heading + body (either a string block or a bullet list) */
export interface InfocardContent {
  heading: string
  body: string | string[]
}

export const HERO = {
  headingLines: ['Your AI Edit Assistant'],
  subtitle:
    'From footage to first cut, faster.',
} as const

export const DEMO_STEPS: InfocardContent[] = [
  {
    heading: 'Bring in your context',
    body: 'Upload briefs, transcripts, notes, and reference links. Nice Touch builds a usable project memory that the AI assistant draws on throughout the edit.',
  },
  {
    heading: 'Analyse your footage',
    body: 'Audio is transcribed with word-level accuracy, giving the assistant a detailed map of every spoken moment in your footage.',
  },
  {
    heading: 'Work with the AI assistant',
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

export const SECTION_TITLES = {
  multicam: "Multicam shouldn\u2019t take half your day.",
  workflows: 'Built for real post-production workflows.',
  pricing: 'Pay for what you use, pay less the more you create.',
  faq: 'Frequently asked questions.',
  security: 'Your footage stays yours.',
} as const

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Which NLEs does Nice Touch support?',
    answer:
      'Nice Touch currently integrates with Adobe Premiere Pro and DaVinci Resolve. We generate edit-ready timelines that open natively inside your project — no plugins, no round-tripping.',
  },
  {
    question: 'How much footage can I process?',
    answer:
      'The Basic plan includes 1 hour of footage analysis per month. Pro includes 25 hours, and Enterprise plans offer custom limits. Processing time refers to the length of source material, not wall-clock time.',
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
      'Yes. Multicam support is included on Pro and Enterprise plans. Nice Touch analyses synced multicam footage as a single narrative, tracking speakers across all camera angles.',
  },
  {
    question: 'How does billing work?',
    answer:
      'Plans are billed monthly or annually through Stripe. Annual plans save roughly two months compared to monthly billing. You can upgrade, downgrade, or cancel at any time.',
  },
]

export const SECURITY_CARD: InfocardContent = {
  heading: 'Security by default.',
  body: [
    'Your footage is processed in isolated, ephemeral environments that spin up per job and are destroyed after completion. Media files are never stored longer than needed and are never used for model training.',
    'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Transcripts and project metadata are kept only for the duration you configure, then permanently deleted.',
    'Nice Touch is built for professional post-production teams who work with sensitive, embargoed, and pre-release material. We treat your content the way you would.',
  ].join('\n\n'),
}

export const MULTICAM_CARD: InfocardContent = {
  heading: 'Multicam, without the chaos.',
  body: [
    'Multiple cameras. Multiple speakers. One conversation.',
    "Nice Touch analyses synced multicam footage as a single narrative. It tracks who\u2019s speaking, identifies key moments, and builds structure across every angle.",
    'Instead of watching eight timelines to find one usable beat, you start with clarity.',
    "It doesn\u2019t replace your edit.\nIt removes the repetitive part that gets in the way of it.",
  ].join('\n\n'),
}

export const WORKFLOWS_CARD: InfocardContent = {
  heading: 'Every project lands differently.',
  body: [
    'A documentary shoot comes back with 200 hours of cards. A corporate event fills twelve drives across six cameras. A narrative pilot wraps with six weeks of dailies and a producer\'s note three pages long.',
    'No two projects look the same, and no two editors work the same way. Nice Touch adapts to your footage, your brief, and your process — not the other way around.',
    'Sift through hours of material in minutes. Find the moments that matter, build structure from raw chaos, and get to a first cut without grinding through every second of every card.',
  ].join('\n\n'),
}
