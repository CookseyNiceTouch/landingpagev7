import { MAX_DURATION_LABEL } from './transcribe'

export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  repo: string
}

export const TOOLS: Tool[] = [
  {
    id: 'nt-converter',
    name: 'Nice Touch File Converter',
    tagline: 'Free video converter for macOS and Windows.',
    description:
      'Offline file converter. Drop in your footage and convert between formats in a single click. Supports all major codecs including ProRes, H.264, H.265, and DNxHR — no watermarks, no limits, no account required.',
    features: [
      'Batch convert multiple files at once',
      'ProRes, H.264, H.265, DNxHR & more',
      'No watermarks or file-size limits',
      'Completely free — no account needed',
    ],
    repo: 'CookseyNiceTouch/nt_converter',
  },
]

/** Web-based tools that live on this site (not downloadable apps). */
export interface WebTool {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  href: string
  cta: string
}

export const WEB_TOOLS: WebTool[] = [
  {
    id: 'nt-transcribe',
    name: 'Free Transcription Tool',
    tagline: 'Transcribe audio or video in your browser.',
    description:
      `Drop in a file up to 100 MB and ${MAX_DURATION_LABEL}. Get a clean transcript with speaker labels, plus SRT and VTT subtitle files for your DaVinci Resolve, Premiere, or Final Cut timeline.`,
    features: [
      'Automatic language detection (99+ languages)',
      'Speaker diarization on by default',
      'Export to Word (RTF), SRT, and VTT',
      'Free — one email unlocks all formats',
    ],
    href: '/transcribe/',
    cta: 'Open the tool',
  },
]
