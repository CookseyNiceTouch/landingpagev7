export const ABOUT_HERO = {
  heading: 'The team behind Nice Touch',
  subtitle:
    'Nice Touch is an early-stage SaaS company. The product is live with pilots and early commercial activity in progress. The team is small and founder-led, with a deliberate focus on proving measurable value before expanding scope.',
} as const

export interface TeamMember {
  name: string
  role: string
  description: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Matthew Cooksey',
    role: 'CEO',
    description:
      'Company strategy, product direction, go-to-market, and translation of real workflow pain into product value.',
  },
  {
    name: 'Paul',
    role: 'Design / Product',
    description:
      'Product design, UX, brand, and overall experience quality. Ensures Nice Touch feels native inside professional workflows.',
  },
  {
    name: 'Simon',
    role: 'CTO',
    description:
      'Architecture, reliability, integrations, and the technical foundations of the platform.',
  },
]

export const MISSION =
  'Nice Touch is not trying to become another editor. It is trying to become the workflow layer that makes professional editors and their teams materially more effective.'

export const STRATEGIC_DIRECTION = {
  near: 'Prove ROI in a tightly defined wedge. Faster rough cuts and adjacent workflow tasks.',
  medium:
    'Deepen product embed across the editing workflow. Richer project memory, broader automation, feedback handling, search, and QC.',
  long: 'Become the trusted layer that connects context and action across the entire post-production process.',
} as const

export const NOT_LIST: string[] = [
  'Not a replacement for editors or creative judgement.',
  'Not a consumer editing app or lightweight social video tool.',
  'Not a separate platform that requires teams to abandon Premiere or Resolve.',
  'Not a generic AI video tool with no specific focus on professional post-production realities.',
  'Not a rigid template engine that only works for narrow, pre-defined formats.',
]
