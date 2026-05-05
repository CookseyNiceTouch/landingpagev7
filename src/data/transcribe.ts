/** Single source of truth for the /transcribe page. */

const RAW_API_URL = (import.meta.env['VITE_TRANSCRIBE_API_URL'] as string | undefined) ?? ''

/** Trims trailing slash so we can do `${API_URL}/api/...` safely. */
export const API_URL = RAW_API_URL.replace(/\/$/, '')

/** Hard upload limit (matches the API's MAX_BYTES default). */
export const MAX_BYTES = 100 * 1024 * 1024

/**
 * Maximum audio duration we'll transcribe, in minutes.
 * We can't enforce this client-side without decoding; it's used in copy and
 * the API config carries the matching `MAX_DURATION_MIN` var for any
 * server-side gating.
 */
export const MAX_DURATION_MIN: number =
  Number(import.meta.env['VITE_MAX_DURATION_MIN'] || '') || 180

/**
 * Human-readable duration string derived from `MAX_DURATION_MIN`.
 * - 90  → "90 minutes"
 * - 60  → "1 hour"
 * - 180 → "3 hours"
 * - 150 → "2h 30min"
 */
export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins} minutes`
  const hours = Math.floor(mins / 60)
  const remainder = mins % 60
  if (remainder === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`
  return `${hours}h ${remainder}min`
}

/** Pre-computed label used in component copy. */
export const MAX_DURATION_LABEL = formatDuration(MAX_DURATION_MIN)

export const ACCEPTED_AUDIO_MIME = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/wave',
  'audio/mp4',
  'audio/x-m4a',
  'audio/m4a',
  'audio/flac',
  'audio/x-flac',
  'audio/ogg',
] as const

export const ACCEPTED_VIDEO_MIME = ['video/mp4', 'video/quicktime'] as const

export const ACCEPTED_MIME = [...ACCEPTED_AUDIO_MIME, ...ACCEPTED_VIDEO_MIME] as const

/** Comma-joined for `<input accept>` (extensions catch the gaps). */
export const ACCEPT_ATTRIBUTE = [
  ...ACCEPTED_MIME,
  '.mp3',
  '.wav',
  '.m4a',
  '.flac',
  '.ogg',
  '.mp4',
  '.mov',
].join(',')

export const TRANSCODER_PATH = '/tools'

/** HubSpot form embed config (download gate). */
export const HUBSPOT_FORM = {
  region: 'eu1',
  portalId: '146425863',
  formId: '3ce570ff-5704-41cb-aabb-924fa2185942',
} as const

export const COOKIE_NAME = 'nt_transcribe_unlocked'

/**
 * SEO copy. Each value is sized for its display surface:
 *   title       — stored value; the SEO component appends " | Nice Touch".
 *                 Aim for ~40 chars stored so the rendered SERP title stays
 *                 under Google's ~60-char display limit.
 *   description — meta description. Aim for ~155 chars to fit Google's mobile
 *                 SERP snippet without truncation.
 *   h1 / intro  — on-page only; no length pressure.
 */
export const SEO = {
  title: 'Free Transcription Tool - Word, SRT, VTT',
  description:
    'Free online audio and video transcription. Drop a file, get a Word doc plus SRT and VTT subtitles in minutes. No sign-up. 99+ languages, speaker labels.',
  h1: 'Free transcription tool. Export to Word, SRT, or VTT.',
  intro:
    'Drop a file. We transcribe it in the cloud and give you back a formatted document plus subtitle files for Resolve, Premiere, and Final Cut.',
} as const

/**
 * Three short benefit blurbs rendered between the tool and "How it works".
 * Targets long-tail keyword variants ("accurate", "private", "free", "no
 * sign-up") and reinforces the primary keyword inside semantic body copy.
 */
export const BENEFITS: Array<{ title: string; body: string }> = [
  {
    title: 'Accurate out of the box',
    body: 'A current state-of-the-art speech model handles 99+ languages, accents, and noisy recordings without any tuning. Speaker labels are on by default for interviews and panel recordings.',
  },
  {
    title: 'Private by default',
    body: 'No accounts, no saved transcripts, no audio retained on our servers. Your file is processed and the source audio is removed once the transcript is delivered.',
  },
  {
    title: 'The right format for your workflow',
    body: 'Download a formatted Word document for notes and sharing, an SRT for your DaVinci Resolve or Premiere timeline, or a WebVTT for the browser. One free email unlocks all three.',
  },
]

export const STEPS: Array<{ title: string; body: string }> = [
  {
    title: '1. Drop a file',
    body: `Drag in audio or video up to 100 MB and ${MAX_DURATION_LABEL}. We accept MP3, WAV, M4A, FLAC, OGG, MP4, and MOV.`,
  },
  {
    title: '2. We transcribe it',
    body: 'Speech is detected automatically. Speaker labels are on by default; toggle them off if you only need the words.',
  },
  {
    title: '3. Download what you need',
    body: 'A formatted Word document for notes and sharing, plus SRT or VTT for your editing timeline. One email unlocks all three formats — forever.',
  },
]

export const USE_CASES: Array<{ title: string; body: string }> = [
  {
    title: 'Video editors',
    body: 'Generate SRT or VTT and drop them straight into a DaVinci Resolve or Premiere timeline. Burned-in captions, searchable transcripts, and faster rough cuts.',
  },
  {
    title: 'Podcasters',
    body: 'Clean transcripts with speaker labels for show notes, blog posts, and accessibility. Paste into your CMS in seconds.',
  },
  {
    title: 'Interviewers and researchers',
    body: 'Turn a recorded conversation into searchable text. Quote-pull faster and quote-check more carefully.',
  },
  {
    title: 'Meeting notes',
    body: 'Drop in a Zoom or Teams recording. Skim the transcript instead of rewatching the whole call.',
  },
  {
    title: 'Journalists',
    body: 'Turn interview recordings into searchable text in minutes, not hours. Quote-pull faster, fact-check more carefully, and stop paying per-minute transcription fees on every assignment.',
  },
  {
    title: 'Students and researchers',
    body: 'Transcribe lectures, focus groups, and field recordings for free. Export to Word for thematic coding or paste straight into your reference manager.',
  },
]

export const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Is it really free?',
    a: 'Yes. There is no paywall, no trial, and no per-minute fee. We cover the transcription cost out of pocket because the tool exists to introduce video editors to Nice Touch — our AI edit assistant for DaVinci Resolve and Adobe Premiere Pro. We ask for an email address before you download the files; that is the only thing we ever ask.',
  },
  {
    q: 'What file types do you support?',
    a: `Audio: MP3, WAV, M4A, FLAC, OGG. Video: MP4, MOV. Max 100 MB and ${MAX_DURATION_LABEL}.`,
  },
  {
    q: 'How accurate is it, and what languages does it support?',
    a: 'We use a current state-of-the-art model with automatic language detection across 99+ languages, including English, Spanish, French, German, Italian, Portuguese, and many more. Quality scales with audio quality — clean speech with a single speaker comes back near-perfect.',
  },
  {
    q: 'How long does transcription take?',
    a: 'Roughly one minute of processing for every five minutes of audio, plus the upload time for your file. A 30-minute interview is typically transcribed in under 7 minutes end-to-end on a normal home connection.',
  },
  {
    q: 'What happens to my file? Do you train AI on my audio?',
    a: 'Your file is uploaded to our transcription provider, processed, and the source audio is removed once the transcript is delivered. We do not retain the file ourselves and your audio is not used to train any model.',
  },
  {
    q: `My file is bigger than 100 MB or longer than ${MAX_DURATION_LABEL}.`,
    a: 'Run it through our free Nice Touch File Converter first to compress or trim it, then come back here.',
  },
  {
    q: 'Can I use the transcript for commercial work?',
    a: 'Yes. Whatever you transcribe is yours \u2014 use the output in client edits, published articles, podcasts, books, courses, and any other commercial project without restriction. There is no attribution requirement.',
  },
  {
    q: 'What format is the Word document?',
    a: 'You get an RTF file — Rich Text Format. It opens natively in Microsoft Word, Apple Pages, Google Docs, TextEdit, and LibreOffice with full formatting (speaker labels, headings, branding) intact. Edit it, share it, or paste it into your CMS.',
  },
  {
    q: 'What are SRT and VTT, and why do I want them?',
    a: 'SRT and VTT are subtitle file formats. SRT is the universal standard for video editors — DaVinci Resolve, Premiere Pro, Final Cut, and most YouTube workflows accept it directly. VTT is the web standard, used by HTML5 <track> elements and some streaming platforms.',
  },
]
