import type { FaqItem } from '@/data/home'

export interface FeatureStep {
  number: string
  heading: string
  body: string
}

export interface FeatureItem {
  heading: string
  body: string
}

export const FEATURES_HERO = {
  heading: 'Everything Nice Touch does for you',
  subtitle:
    'It sits inside DaVinci Resolve and Adobe Premiere Pro, reads your briefs and footage, and takes the repetitive first-pass work off your plate — transcription, string-outs, rough cuts, multicam. The creative calls stay yours.',
} as const

export const HOW_IT_WORKS: FeatureStep[] = [
  {
    number: '01',
    heading: 'Analyse your footage',
    body: 'Bring in your footage, briefs, notes, and reference links. Nice Touch ingests this material and transcribes your audio with word-level accuracy, building a usable project memory the AI assistant draws on throughout the edit.',
  },
  {
    number: '02',
    heading: 'Answer a few questions about the cut',
    body: "Based on what it finds in your footage, Nice Touch asks you a handful of targeted questions about the project — filling in whatever your brief doesn't already cover before it starts cutting.",
  },
  {
    number: '03',
    heading: 'Generate your edit',
    body: 'Ask the assistant to build a rough cut, restructure a sequence, or handle a specific edit task. Responses stream in real time. Actions execute directly inside Resolve or Premiere.',
  },
  {
    number: '04',
    heading: 'Review and refine',
    body: 'The AI builds on your brief and your footage, not a blank template. Every edit can be reviewed, adjusted, and refined. The editor stays in control throughout.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We have hours of footage we used to watch through manually. Nice Touch means we don't have to do that anymore — we're straight to the moments that matter.",
    name: 'Placeholder',
    role: 'Producer',
    company: 'Ad Agency',
  },
  {
    quote: "Nice Touch is my first port of call when I open up a project. It has knowledge about all my assets that I couldn't hold in my head — and it acts on it instantly.",
    name: 'Placeholder',
    role: 'Editor',
    company: 'YouTube Channel',
  },
  {
    quote: "The rough cut used to take a full day before we even started making real decisions. Now it takes an hour. That time goes back into the edit where it belongs.",
    name: 'Placeholder',
    role: 'Senior Editor',
    company: 'Documentary Production Co.',
  },
  {
    quote: "Multicam sync was the part of the job I dreaded most. Nice Touch handles the whole thing — by the time I'm in the timeline it's already been done.",
    name: 'Placeholder',
    role: 'Freelance Editor',
    company: 'Live Events',
  },
  {
    quote: "Having the brief and the transcripts all in one place, searchable, with an assistant that actually understands them — that's changed how we start every project.",
    name: 'Placeholder',
    role: 'Post Production Supervisor',
    company: 'Broadcast',
  },
  {
    quote: "It works inside Resolve. There's nothing to export, nothing to import. It just sits there and does the work.",
    name: 'Placeholder',
    role: 'Colorist / Editor',
    company: 'Boutique Studio',
  },
]

export const CORE_FEATURES: FeatureItem[] = [
  {
    heading: 'Chat that knows your project',
    body: 'A project-aware assistant that understands your brief, transcripts, and timeline. Ask it to find moments, explain decisions, or plan an edit — in plain language.',
  },
  {
    heading: 'Rough cut generation',
    body: 'Ask Nice Touch to build a rough cut from your footage. It uses your brief and transcript to select and order moments, then builds a timeline directly inside Resolve or Premiere.',
  },
  {
    heading: 'Transcript analysis',
    body: 'Accurate word-level audio transcription. Every spoken moment is timestamped and searchable.',
  },
  {
    heading: 'Timeline actions',
    body: 'Execute editing operations directly inside Resolve or Premiere without leaving the Nice Touch interface. No file moving, no round-tripping.',
  },
  {
    heading: 'Project memory',
    body: 'Briefs, notes, transcripts, and reference documents are stored as usable project context. The assistant draws on this across the entire project lifecycle.',
  },
  {
    heading: 'Multicam support',
    body: 'Nice Touch handles the full lifecycle of multicam editing — import, audio source selection, transcription, and rough cut generation — inside Resolve and Premiere.',
  },
  {
    heading: 'Asset management',
    body: 'Manage video, audio, and multicam assets with a structured library. Assets are linked to projects and analysed on demand.',
  },
]

export const FEATURES_FAQ: FaqItem[] = [
  {
    question: 'Where does Nice Touch run?',
    answer:
      'Nice Touch runs alongside DaVinci Resolve and Adobe Premiere Pro on macOS and Windows. It reads your open project and writes edit-ready timelines back into the same NLE — there is nothing to export, and no round-tripping between tools.',
  },
  {
    question: 'How does Nice Touch build a rough cut?',
    answer:
      'The assistant works from your project context, not a blank template. It draws on the briefs, notes, and reference links you upload, plus a word-level transcript of your footage, to select and order the moments that matter. It then assembles a timeline directly inside Resolve or Premiere for you to review and refine.',
  },
  {
    question: 'How accurate is the transcription?',
    answer:
      'Audio is transcribed with word-level timestamps, so every spoken moment is searchable and the assistant can reference exact ranges when it builds or restructures a sequence.',
  },
  {
    question: 'Does Nice Touch make edits without my approval?',
    answer:
      'No. Nice Touch handles the repetitive, time-consuming parts of post — transcription, structure, and rough-cut assembly — while every edit stays reviewable and adjustable. The editor keeps creative control from start to finish.',
  },
  {
    question: 'Does it work on multicam projects?',
    answer:
      'Yes. Multicam is a first-class capability, available on Pro plans and above. Nice Touch imports synced multicam footage, scores the available audio sources, maps video coverage, and builds the rough cut in place.',
  },
]
