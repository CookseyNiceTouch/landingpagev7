import type { FaqItem } from '@/data/home'

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

export const MULTICAM_FAQ: FaqItem[] = [
  {
    question: 'Which plans include multicam?',
    answer:
      'Multicam is available on Pro plans and above, including Ultra and Enterprise. It is not included on the Hobbyist plan.',
  },
  {
    question: 'How does Nice Touch choose which audio to use?',
    answer:
      'Nice Touch scores every available audio candidate across your camera and recorder sources and suggests the strongest option. You stay in control — the AI-suggested default can be confirmed or overridden before transcription runs.',
  },
  {
    question: 'Do I need to sync my angles first?',
    answer:
      'You import multicam clips directly from DaVinci Resolve or Adobe Premiere Pro. Nice Touch works with your synced multicam footage as a single narrative, so there is no separate file-moving or manual sync step inside Nice Touch.',
  },
  {
    question: 'How does it avoid cutting to an angle with no picture?',
    answer:
      'Video coverage mapping tracks which ranges actually have picture on each angle, so the edit agent never selects a moment with no coverage. That prevents gaps and black frames in the generated rough cut.',
  },
  {
    question: 'Where does the finished multicam timeline end up?',
    answer:
      'The rough cut is built directly inside your open project in Resolve or Premiere. There are no exports or round-trips — the timeline is ready to review the moment the agent finishes.',
  },
]
