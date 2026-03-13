export const MULTICAM_HERO = {
  heading: 'Multicam, without the chaos',
  subtitle:
    'Multicam is a first-class capability in Nice Touch, available on Pro plans and above. It handles the full lifecycle of multicam editing: import, audio selection, transcription, and rough cut generation — inside DaVinci Resolve and Adobe Premiere Pro.',
} as const

export interface MulticamCapability {
  heading: string
  body: string
}

export const MULTICAM_CAPABILITIES: MulticamCapability[] = [
  {
    heading: 'Direct NLE import',
    body: 'Import multicam clips directly from DaVinci Resolve and Adobe Premiere Pro — no file moving, no manual sync steps.',
  },
  {
    heading: 'Automatic audio scoring',
    body: 'Automatic audio candidate scoring identifies the best available audio across camera and recorder sources.',
  },
  {
    heading: 'User-confirmed audio setup',
    body: 'Editors maintain control over which audio drives transcription, with AI-suggested defaults you can override.',
  },
  {
    heading: 'Video coverage mapping',
    body: 'Coverage mapping ensures the edit agent never selects ranges with no picture, preventing gaps in your rough cut.',
  },
  {
    heading: 'Timeline built in place',
    body: 'The rough cut is built directly inside your open project. No exports, no round-tripping — the timeline is ready to review the moment the agent finishes.',
  },
]

export interface MulticamPainQuote {
  quote: string
  role: string
  company: string
}

export const MULTICAM_PAIN_QUOTES: MulticamPainQuote[] = [
  {
    quote: "We come back from a shoot with eight camera angles and four recorder tracks. Just deciding which audio to cut against used to take most of the first day.",
    role: 'Editor',
    company: 'Documentary Production',
  },
  {
    quote: "The part no one talks about is the first listen — going through every angle, every take, just to understand what you have. It can be days before you've even touched the timeline.",
    role: 'Senior Editor',
    company: 'Broadcast & Live Events',
  },
  {
    quote: "Syncing multicam in Resolve is fine when it works. But the moment something's off — wrong timecode, dropped frames, a second unit that went rogue — you're in for hours of manual fixing.",
    role: 'Post Production Supervisor',
    company: 'Reality & Factual TV',
  },
]
