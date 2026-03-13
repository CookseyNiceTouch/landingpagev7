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
  heading: 'Everything Nice Touch can do',
  subtitle:
    'A context-aware AI assistant that sits inside DaVinci Resolve and Adobe Premiere Pro. It reads your briefs, transcribes your footage, and takes real actions inside the edit.',
} as const

export const HOW_IT_WORKS: FeatureStep[] = [
  {
    number: '01',
    heading: 'Bring in your project context',
    body: 'Upload briefs, transcripts, notes, and reference links. Nice Touch ingests this material and builds a usable project memory that the AI assistant draws on throughout the edit.',
  },
  {
    number: '02',
    heading: 'Analyse your footage',
    body: 'Audio is transcribed with word-level accuracy, giving the assistant a detailed map of every spoken moment in your footage.',
  },
  {
    number: '03',
    heading: 'Work with the AI assistant',
    body: 'Ask the assistant to find moments, build a rough cut, restructure a sequence, or handle a specific edit task. Responses stream in real time. Actions execute directly inside Resolve or Premiere.',
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
    heading: 'Context-aware AI chat',
    body: 'A project-aware chatbot that understands your brief, transcripts, and timeline. Ask it to find moments, explain decisions, or plan an edit.',
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
