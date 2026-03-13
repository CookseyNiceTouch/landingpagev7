export const SECURITY_HERO = {
  heading: 'Professional grade security, no matter the project',
  subtitle:
    'Nice Touch is built for professional post-production teams who work with sensitive, embargoed, and pre-release material. We treat your content the way you would. No training, ever.',
} as const

export interface SecurityPoint {
  heading: string
  body: string
}

export const SECURITY_POINTS: SecurityPoint[] = [
  {
    heading: 'Data isolation',
    body: 'Your footage is processed in isolated, ephemeral environments that spin up per job and are destroyed after completion. Media files are never stored longer than needed and are never used for model training.',
  },
  {
    heading: 'Encryption everywhere',
    body: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Transcripts and project metadata are kept only for the duration you configure, then permanently deleted.',
  },
  {
    heading: 'Local tool execution',
    body: 'NLE operations execute locally inside the desktop app. Your project files and media never leave your machine for editing purposes. Large files move via pre-signed URLs, not through cloud servers.',
  },
  {
    heading: 'No model training',
    body: 'Customer data remains private and is not used to train external models. Your briefs, transcripts, and project context are yours alone.',
  },
  {
    heading: 'Authentication and access',
    body: 'Firebase (Google sign-in), local email/password, and JWT authentication. Admin access is restricted to verified organisation domains.',
  },
]

export interface ArchLayer {
  index: string
  label: string
  heading: string
  body: string
  points: string[]
  note: string
}

export const TECH_ARCHITECTURE: ArchLayer[] = [
  {
    index: '01',
    label: 'On your machine',
    heading: 'The app and your NLE',
    body: 'The Nice Touch desktop app runs locally. All editing operations — building timelines, reading project files, executing cuts — happen inside your open NLE session. Your media never moves.',
    points: [
      'Electron desktop app with local NLE bridge',
      'DaVinci Resolve via Lua scripting',
      'Adobe Premiere Pro via CEP panel',
      'Project files and media stay on disk',
      'No footage is uploaded to any server',
    ],
    note: 'Your project files and media never leave your machine.',
  },
  {
    index: '02',
    label: 'Our servers',
    heading: 'What we store and why',
    body: 'Our backend stores only what is necessary to run your projects: transcripts, briefs, metadata, and account data. Nothing is retained beyond your configured period, and nothing is used for model training.',
    points: [
      'NestJS API, MySQL via Prisma, hosted on Sevalla',
      'Data encrypted in transit (TLS 1.3) and at rest (AES-256)',
      'Transcripts and metadata deleted after retention period',
      'Isolated processing environments per job',
      'Firebase authentication, JWT access control',
    ],
    note: 'We store only what your project needs. Never for training.',
  },
  {
    index: '03',
    label: 'External APIs',
    heading: 'Inference only — no storage',
    body: 'We use Anthropic Claude for AI reasoning and AssemblyAI for audio transcription. Both are used for inference only. No customer data is stored at rest by these providers, and neither is used to train any model.',
    points: [
      'Anthropic Claude — AI chat, tool use, edit reasoning',
      'AssemblyAI — audio transcription and speaker detection',
      'Data passed for inference only, not retained',
      'No training on customer content by either provider',
      'Contractual data processing agreements in place',
    ],
    note: 'Inference only. Your content is never used to train external models.',
  },
]
