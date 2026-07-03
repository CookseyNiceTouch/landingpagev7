export const INTEGRATIONS_HERO = {
  heading: 'Works inside the tools you already use',
  subtitle:
    'Nice Touch connects directly to DaVinci Resolve and Adobe Premiere Pro. Your team stays in their NLE. There is no new editing environment to learn, no files to move, and no round-tripping.',
} as const

export const INTEGRATIONS_HOW = {
  heading: 'No exporting, no importing, no sync required.',
  body: 'Nice Touch runs as a desktop app alongside your NLE. It reads your project structure, clips, and timeline directly — and writes edit decisions back in real time. When Nice Touch generates a rough cut or executes a timeline action, the result appears inside your open project immediately.',
} as const

export interface IntegrationCapability {
  heading: string
  body: string
}

export const INTEGRATION_CAPABILITIES: IntegrationCapability[] = [
  {
    heading: 'Clip and project access',
    body: 'Nice Touch reads your clips, sequences, and project metadata directly from your open NLE session.',
  },
  {
    heading: 'Rough cut generation',
    body: 'Nice Touch selects and orders moments from your footage, then builds a timeline directly inside your project — ready to review and refine.',
  },
  {
    heading: 'Direct timeline operations',
    body: 'Edit actions execute inside your NLE in real time. No exporting, no importing, no sync required.',
  },
  {
    heading: 'Multicam support',
    body: 'Import multicam clips, select audio sources, and generate rough cuts from multi-angle footage — all within your existing project.',
  },
]

export const INTEGRATION_NLE_NOTE =
  'Nice Touch supports both DaVinci Resolve and Adobe Premiere Pro with the same capabilities across both platforms.'
