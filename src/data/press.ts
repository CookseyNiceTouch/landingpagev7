/* ==========================================================================
   Press kit data
   --------------------------------------------------------------------------
   Single source of truth for the /press page. Binary assets live in
   public/press/assets/ and are bundled into nice-touch-press-kit.zip via
   `npm run press:zip`.

   Items still TODO before launch are tagged inline. Anything wrapped in
   <TodoPlaceholder> on the page will surface in dev and be hidden in prod.
   ========================================================================== */

export const LAUNCH_DATE_LABEL = '[TODO: exact launch date] June 2026'
export const PRESS_KIT_ZIP_PATH = '/press/nice-touch-press-kit.zip'

// --------------------------------------------------------------------------
// Hero
// --------------------------------------------------------------------------

export const HERO = {
  eyebrow: 'Press Kit',
  headline: 'Nice Touch V2 — Available June 2026',
  subhead:
    'The AI edit assistant rebuilt from the ground up for professional post-production teams.',
  primaryCta: { label: 'Download full press kit (.zip)', href: PRESS_KIT_ZIP_PATH },
  secondaryCta: { label: 'Watch demo', href: '#demo' },
}

// --------------------------------------------------------------------------
// Videos
// --------------------------------------------------------------------------

export interface VideoEntry {
  youtubeId: string
  title: string
  description: string
  /** Optional offline MP4 download path. */
  mp4Path?: string
  /** ISO 8601 date (YouTube publish date) — required for VideoObject rich results. */
  uploadDate?: string
  /** ISO 8601 duration (e.g. 'PT56S') — required for VideoObject rich results. */
  duration?: string
  /** Plain-text transcript — helps both accessibility and AI answer engines. */
  transcript?: string
}

/** Short promo / trailer — leads the video section. */
export const PROMO_VIDEO: VideoEntry = {
  youtubeId: 'u1QT63Oeit8',
  title: 'Nice Touch — AI Video Editing',
  description:
    "A one-minute look at Nice Touch: the AI edit assistant that connects to your existing Premiere Pro or DaVinci Resolve project, analyses your footage, asks targeted questions, and generates a first cut on your timeline — ready for you to refine.",
  uploadDate: '2026-05-20T11:41:47-07:00',
  duration: 'PT56S',
  transcript:
    "Every edit starts the same way. Hours of footage, a blank timeline, and the clock already running. Nice Touch is the AI edit assistant built directly inside your NLE. It connects to your existing project — your clips are already there. Import your footage, any format, any workflow, including native multicam clips. Nice Touch will analyze your assets and use that context to ask you targeted questions, building its own internal brief so it understands exactly what your cut needs to be. When you're ready, hit generate. A first cut lands directly in your timeline, ready to review and ready to work with. From there, the edit is yours. Refine it yourself or ask Nice Touch to go another round, tightening, adjusting, building on the first pass. From footage to first cut. Nice Touch.",
}

/** Hands-on walkthrough — shows the product in action. */
export const DEMO_VIDEO: VideoEntry = {
  youtubeId: 'qWaJniV9zDo',
  title: 'Nice Touch V2 — Walkthrough',
  description: 'A hands-on demo of Nice Touch V2 working inside Adobe Premiere Pro.',
  mp4Path: '/press/assets/video/nice-touch-v2-demo.mp4',
}

/** @deprecated Use PROMO_VIDEO / DEMO_VIDEO. Kept for type-compat only. */
export type DemoVideo = VideoEntry

/**
 * Build schema.org VideoObject JSON-LD from a VideoEntry. `uploadDate` and
 * `duration` are omitted from the schema when not known, rather than guessed
 * — an inaccurate VideoObject is worse for rich results than a partial one.
 */
export function videoObjectSchema(video: VideoEntry): Record<string, unknown> {
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    ...(video.duration ? { duration: video.duration } : {}),
    ...(video.transcript ? { transcript: video.transcript } : {}),
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    publisher: { '@id': 'https://nicetouch.app/#organization' },
  }
}

// --------------------------------------------------------------------------
// Press release
// --------------------------------------------------------------------------

export interface Quote {
  quote: string
  attribution: string
  role: string
}

export interface PressRelease {
  embargoLine: string
  dateline: string
  headline: string
  body: string[]
  founderQuote: Quote
  customerQuote: Quote | null
  closingParagraph: string
  boilerplateHeading: string
  boilerplate: string
  contactBlock: string[]
  downloads: { pdf: string; docx: string }
}

export const PRESS_RELEASE: PressRelease = {
  embargoLine: 'FOR IMMEDIATE RELEASE',
  dateline: `London, ${LAUNCH_DATE_LABEL}`,
  headline:
    'Nice Touch launches V2 of its AI edit assistant after 300 conversations with editors, producers and post supervisors',
  body: [
    `Nice Touch, the AI edit assistant built for professional video post-production teams, today launched V2 of its software. The release follows a six-month research and rebuild process informed by direct conversations with over 300 editors, producers, production supervisors and studio owners across the industry.`,
    `The feedback was consistent: existing AI tools feel like a workflow detour rather than part of the edit. Editors are forced to leave their NLE, run a process, and import the result back, breaking the creative flow they rely on. V2 has been rebuilt from the ground up to fix that, with a more agentic approach to rough cut planning and a UX designed to sit inside Adobe Premiere Pro and DaVinci Resolve rather than alongside them.`,
    `The release also introduces multicam support, video coverage constraints that prevent the AI from generating cuts where there is no picture, and a more conversational interface that lets editors collaborate with the AI in plain language while keeping every creative decision in human hands.`,
  ],
  founderQuote: {
    quote:
      "We didn't want to build another AI tool that editors had to fight with. What kept coming up in those 300 conversations was that the AI needed to feel like it was working alongside the editor, not around them. V2 is the result of that. It's an assistant that thinks the way an editor thinks, inside the tools they already know.",
    attribution: 'Matthew Cooksey',
    role: 'CEO and co-founder, Nice Touch',
  },
  // TODO: pick a customer quote (see candidates below in PULL_QUOTE_CANDIDATES)
  // and confirm written sign-off from the speaker before going live.
  customerQuote: null,
  closingParagraph: 'Nice Touch V2 is available now at nicetouch.app.',
  boilerplateHeading: 'About Nice Touch',
  boilerplate:
    'Nice Touch is an AI-powered workflow and edit assistant built for professional video post-production teams. It works inside Adobe Premiere Pro and DaVinci Resolve to help teams move from raw footage to a rough cut faster, without leaving the tools they already use. Founded in 2025 and based in the UK, Nice Touch is pre-seed funded and currently working with customers across broadcast, education, podcast and creator post-production.',
  contactBlock: [
    'Press contact',
    'Matthew Cooksey, CEO',
    'cooksey@nicetouch.app',
    'nicetouch.app/press',
  ],
  downloads: {
    pdf: '/press/assets/press-release/nice-touch-v2-press-release.pdf',
    docx: '/press/assets/press-release/nice-touch-v2-press-release.docx',
  },
}

// --------------------------------------------------------------------------
// Pull quotes
// --------------------------------------------------------------------------

/**
 * Candidate customer quotes pulled from the investor deck.
 * Pick one for `PRESS_RELEASE.customerQuote` and the customer slot in
 * `PULL_QUOTES` once the speaker has signed off.
 */
export const PULL_QUOTE_CANDIDATES: Quote[] = [
  {
    quote:
      "If Nice Touch can do that initial cut I can see us using it on every brief where we've got interview footage.",
    attribution: 'Martyn Cook',
    role: 'Head of Production, Kingdom Creative',
  },
  {
    quote:
      "I see this as a force multiplier that makes tedious workflows less so. I'm doing extensive testing to build a proof of concept on time savings before presenting it to my editors.",
    attribution: 'Tal Levitas',
    role: 'Post-Production Supervisor, Critical Role',
  },
  {
    quote:
      "Multicam — for me that would be a gamechanger for creating my clips. That's when the AI tools don't usually work. I tried AutoPod and it just couldn't do it.",
    attribution: 'Adam Whalley',
    role: 'Freelance Editor, BengoMedia',
  },
]

export const PULL_QUOTES: { founder: Quote; customer: Quote | null } = {
  founder: PRESS_RELEASE.founderQuote,
  customer: PRESS_RELEASE.customerQuote,
}

// --------------------------------------------------------------------------
// Factsheet
// --------------------------------------------------------------------------

export interface FactsheetRow {
  label: string
  value: string
}

export const FACTSHEET: FactsheetRow[] = [
  {
    label: 'What it is',
    value:
      'An AI edit assistant for professional video post-production teams. It works inside DaVinci Resolve and Adobe Premiere Pro to help editors generate rough cuts, find moments in transcripts, manage project context, and accelerate repetitive workflow tasks.',
  },
  {
    label: "What's new in V2",
    value: [
      'Rebuilt from the ground up after 300 conversations with editors, producers, post supervisors and studio owners.',
      'More agentic approach to rough cut planning.',
      'UX designed to work inside the NLE rather than alongside it.',
      'Multicam support in both DaVinci Resolve and Adobe Premiere Pro.',
      'Video coverage constraints that prevent audio-only cuts.',
      'Improved conversational interface.',
    ].join(' '),
  },
  { label: 'Supported NLEs', value: 'DaVinci Resolve, Adobe Premiere Pro' },
  {
    label: "Who it's for",
    value:
      'Professional video post-production teams including in-house brand and broadcast teams, freelance editors, SME video agencies, podcast and multicam workflows, and education and corporate post operations.',
  },
  { label: 'Availability', value: 'Available now at nicetouch.app' },
  {
    label: 'Pricing',
    value:
      'Free trial. Paid plans from $25/mo. Full pricing breakdown at nicetouch.app/pricing.',
  },
  { label: 'Founded', value: '2025' },
  { label: 'Headquarters', value: 'United Kingdom' },
  {
    label: 'Founders',
    value: 'Matthew Cooksey (CEO), Paul Simon (CPO), Simon Utting (CTO)',
  },
  {
    label: 'Funding',
    value:
      'Pre-seed: £200k committed by Rich and Jonny Townsend (Circus Street co-founders, £76m exit to QA). Seed round of £1m at £3m pre-money currently raising.',
  },
  {
    label: 'Notable trial accounts',
    value: 'Bustle, 7Equis, Critical Role, Veritasium, Kingdom Creative',
  },
  {
    label: 'First paid customer',
    value: 'University of Georgia (collegiate sports media production, 5 licences)',
  },
]

export const FACTSHEET_PDF = '/press/assets/factsheet/nice-touch-v2-factsheet.pdf'

// --------------------------------------------------------------------------
// Product screenshots (featured, above the gallery)
// --------------------------------------------------------------------------

export interface ProductShot {
  id: string
  caption: string
  /** High-res PNG path (retina / @2x). Null = not yet uploaded. */
  src: string | null
  /** Short label shown under the image. */
  label: string
}

/**
 * Single featured hero shot rendered between the demo video and press release.
 * Additional product screenshots live in `GALLERY` further down the page.
 */
export const PRODUCT_SHOTS: ProductShot[] = [
  {
    id: 'hero',
    label: 'Nice Touch V2 — Footage to first cut.',
    caption:
      'Hero image for Nice Touch V2. Free to use in editorial coverage.',
    src: '/press/assets/images/hero-web.webp',
  },
]

// --------------------------------------------------------------------------
// Product screenshots gallery
// --------------------------------------------------------------------------
//
// Founder headshots, the Townsend investor photo, workstation/B-roll and
// other people-shots are intentionally NOT listed here — they remain bundled
// in the press kit ZIP via the files under public/press/assets/images/ but
// only the founder bio section renders headshots on the page.

export interface GalleryItem {
  id: string
  filename: string
  caption: string
  type: 'image' | 'video'
  /** Web-resolution (used as the thumbnail preview). */
  web: string
  /** In-situ PNG with laptop/device mockup at full resolution. */
  print?: string
  /** Clean UI screenshot on transparent background (alpha PNG). */
  alpha?: string
}

export const GALLERY: GalleryItem[] = [
  // --- Hero brand image ---
  {
    id: 'hero',
    filename: 'hero-hires.jpg',
    caption: 'Nice Touch V2 — "Footage to first cut." Brand hero image.',
    type: 'image',
    web: '/press/assets/images/hero-web.webp',
    print: '/press/assets/images/hero-hires.jpg',
  },
  // --- In-situ shots (laptop/device mockup) ---
  {
    id: 'product-pill',
    filename: 'product-pill-hires.jpg',
    caption: 'The Nice Touch pill — the compact AI assistant sidebar docked inside the NLE.',
    type: 'image',
    web: '/press/assets/images/product-pill-web.webp',
    print: '/press/assets/images/product-pill-hires.jpg',
    alpha: '/press/assets/images/product-pill-alpha.png',
  },
  {
    id: 'product-import',
    filename: 'product-import-hires.jpg',
    caption:
      'Analyse & Import Footage — connecting Nice Touch to a Premiere Pro project and ingesting clips.',
    type: 'image',
    web: '/press/assets/images/product-import-web.webp',
    print: '/press/assets/images/product-import-hires.jpg',
    alpha: '/press/assets/images/product-import-alpha.png',
  },
  {
    id: 'product-overview',
    filename: 'product-overview-hires.jpg',
    caption:
      'Project Overview — full footage analysis, speaker detection and project context inside Adobe Premiere Pro.',
    type: 'image',
    web: '/press/assets/images/product-overview-web.webp',
    print: '/press/assets/images/product-overview-hires.jpg',
    alpha: '/press/assets/images/product-overview-alpha.png',
  },
  {
    id: 'product-questions',
    filename: 'product-questions-hires.jpg',
    caption:
      'Conversational interface — Nice Touch asks clarifying questions before generating an edit.',
    type: 'image',
    web: '/press/assets/images/product-questions-web.webp',
    print: '/press/assets/images/product-questions-hires.jpg',
    alpha: '/press/assets/images/product-questions-alpha.png',
  },
  {
    id: 'product-edit',
    filename: 'product-edit-hires.jpg',
    caption:
      'Generating a rough cut — Nice Touch builds the sequence on the Premiere Pro timeline in real time.',
    type: 'image',
    web: '/press/assets/images/product-edit-web.webp',
    print: '/press/assets/images/product-edit-hires.jpg',
    alpha: '/press/assets/images/product-edit-alpha.png',
  },
  // --- Alpha / transparent-background UI screenshots ---
  {
    id: 'product-pill-alpha',
    filename: 'product-pill-alpha.png',
    caption: 'The Nice Touch pill — transparent-background UI screenshot.',
    type: 'image',
    web: '/press/assets/images/product-pill-alpha.png',
    alpha: '/press/assets/images/product-pill-alpha.png',
  },
  {
    id: 'product-import-alpha',
    filename: 'product-import-alpha.png',
    caption:
      'Analyse & Import Footage — transparent-background UI screenshot.',
    type: 'image',
    web: '/press/assets/images/product-import-alpha.png',
    alpha: '/press/assets/images/product-import-alpha.png',
  },
  {
    id: 'product-overview-alpha',
    filename: 'product-overview-alpha.png',
    caption:
      'Project Overview — transparent-background UI screenshot.',
    type: 'image',
    web: '/press/assets/images/product-overview-alpha.png',
    alpha: '/press/assets/images/product-overview-alpha.png',
  },
  {
    id: 'product-questions-alpha',
    filename: 'product-questions-alpha.png',
    caption:
      'Conversational interface — transparent-background UI screenshot.',
    type: 'image',
    web: '/press/assets/images/product-questions-alpha.png',
    alpha: '/press/assets/images/product-questions-alpha.png',
  },
  {
    id: 'product-edit-alpha',
    filename: 'product-edit-alpha.png',
    caption:
      'Generating a rough cut — transparent-background UI screenshot.',
    type: 'image',
    web: '/press/assets/images/product-edit-alpha.png',
    alpha: '/press/assets/images/product-edit-alpha.png',
  },
]

// --------------------------------------------------------------------------
// Founders & investors
// --------------------------------------------------------------------------

export interface Person {
  name: string
  title: string
  bio: string
  /** Path under public/. If null the avatar falls back to initials. */
  headshot: string | null
}

export const FOUNDERS: Person[] = [
  {
    name: 'Matthew Cooksey',
    title: 'CEO & Co-founder',
    bio: 'Joined Circus Street as its 6th employee and spent 10+ years helping build it to 200 people and a £76m exit to QA. Ran enterprise video for Nike, Coca-Cola, Nestlé and Pfizer.',
    headshot: '/press/assets/images/founder-headshot-matthew-web.png',
  },
  {
    name: 'Paul Simon',
    title: 'CPO & Co-founder',
    bio: 'First hire at Circus Street. Built the visual language and production systems behind enterprise content at scale — the same instinct now owns product quality and first-five-minutes trust at Nice Touch.',
    headshot: '/press/assets/images/founder-headshot-paul-web.png',
  },
  {
    name: 'Simon Utting',
    title: 'CTO & Co-founder',
    bio: 'Two prior exits: RapidSwitch (acquired by iomart) and Amito (acquired by Pulsant). Designs for scale and acquisition, not just feature velocity.',
    headshot: '/press/assets/images/founder-headshot-simon-web.png',
  },
]

/**
 * Shared photo of Rich and Jonny Townsend together (on Circus Street, naturally).
 * Used as a banner above the two investor bio cards.
 */
export const INVESTOR_JOINT_PHOTO = '/press/assets/images/investor-photo-townsend-web.png'

export const INVESTORS: Person[] = [
  {
    name: 'Rich Townsend',
    title: 'Non-Executive Chairman & Pre-seed Investor',
    bio: 'Co-founder of Circus Street (£76m exit to QA). Hired Cooksey and Paul. Provides strategic guidance and investor access.',
    headshot: null,
  },
  {
    name: 'Jonny Townsend',
    title: 'Non-Executive Director & Pre-seed Investor',
    bio: 'Co-founder of Circus Street (£76m exit to QA). Hired Cooksey and Paul. Pre-seed investor in Nice Touch.',
    headshot: null,
  },
]

// --------------------------------------------------------------------------
// Previous coverage
// --------------------------------------------------------------------------

export interface CoverageItem {
  publication: string
  headline: string
  url: string
  /** Optional path under public/ for the publication's logo. */
  logo?: string
}

export const PREVIOUS_COVERAGE: CoverageItem[] = [
  {
    publication: 'CineD',
    headline: "'Nice Touch' Workflow Assistant for Premiere Pro and DaVinci Resolve Introduced",
    url: 'https://www.cined.com/nice-touch-workflow-assistant-for-premiere-pro-and-davinci-resolve-introduced/',
  },
  {
    publication: 'No Film School',
    headline: 'Meet Nice Touch: Another AI Workflow Assistant Aims to Speed Up Projects',
    url: 'https://nofilmschool.com/nice-touch-ai-workflow-assistant',
  },
]

// --------------------------------------------------------------------------
// Press contact
// --------------------------------------------------------------------------

export const PRESS_CONTACT = {
  name: 'Matthew Cooksey',
  title: 'CEO, Nice Touch',
  email: 'cooksey@nicetouch.app',
  /** Optional. Set to a string like '+44 …' if you want a phone number listed. */
  phone: null as string | null,
}
