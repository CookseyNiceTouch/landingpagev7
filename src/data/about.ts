export const ABOUT_HERO = {
  heading: 'About Nice Touch',
  subtitle:
    'Nice Touch is an early-stage SaaS company. The product is live with pilots and early commercial activity in progress. The team is small and founder-led, with a deliberate focus on proving measurable value before expanding scope.',
} as const

export const MISSION = {
  heading: 'Mission',
  body: [
    'Post-production is full of work that isn\'t really editing. Watching through takes to find one usable line. Re-syncing multicam timelines. Manually transcribing an interview because the brief changed. Building the same rough-cut structure you\'ve built fifty times before.',
    'Nice Touch exists to remove that layer. Not to replace editors — to give them back the time and headspace that gets eaten by repetitive, low-creative-value work.',
    'Our mission is to make professional editors and their teams materially more effective, by building the workflow layer that sits between raw footage and the cut that actually matters.',
  ].join('\n\n'),
} as const

export const VISION = {
  heading: 'Vision',
  body: [
    'Every post-production team — from a solo editor cutting corporate content to a studio delivering ten broadcast series a year — carries a version of the same problem: too much footage, too little time, and a process that hasn\'t fundamentally changed in decades.',
    'We\'re building toward a future where that process has an intelligent layer running through it. One that understands your footage, your brief, your team\'s working style, and the history of the project — and can act on all of it in real time, inside the tools you already use.',
    'Not a new platform to learn. Not a workaround. A layer that makes the work you already do faster, smarter, and less draining.',
  ].join('\n\n'),
} as const

export const NOT_LIST: string[] = [
  'Not a replacement for editors or creative judgement.',
  'Not a consumer editing app or lightweight social video tool.',
  'Not a separate platform that requires teams to abandon Premiere or Resolve.',
  'Not a generic AI video tool with no specific focus on professional post-production realities.',
  'Not a rigid template engine that only works for narrow, pre-defined formats.',
]
