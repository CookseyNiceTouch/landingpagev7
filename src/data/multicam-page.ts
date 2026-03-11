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

export const MULTICAM_RESULT =
  'The most time-consuming part of multicam work — the first-pass listen and rough assembly — can be accelerated significantly without forcing editors out of their established NLE setup.'
