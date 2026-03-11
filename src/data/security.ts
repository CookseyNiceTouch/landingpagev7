export const SECURITY_HERO = {
  heading: 'Your footage stays yours',
  subtitle:
    'Nice Touch is built for professional post-production teams who work with sensitive, embargoed, and pre-release material. We treat your content the way you would.',
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

export const TECH_OVERVIEW = {
  heading: 'Technical architecture',
  items: [
    { label: 'Desktop app', value: 'Electron with local NLE bridge execution' },
    { label: 'AI', value: 'Anthropic Claude for chat and tool system, AssemblyAI for transcription' },
    { label: 'NLE connectivity', value: 'DaVinci Resolve via Lua, Adobe Premiere via CEP panel' },
    { label: 'Infrastructure', value: 'NestJS API hosted on Sevalla, MySQL via Prisma' },
    { label: 'Distribution', value: 'GitHub Releases with auto-update' },
  ],
} as const
