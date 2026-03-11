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
