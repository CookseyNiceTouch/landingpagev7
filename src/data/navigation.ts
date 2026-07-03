export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface NavGroup {
  label: string
  children: NavLink[]
}

export type NavItem = NavLink | NavGroup

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Product',
    children: [
      { label: 'Features', href: '/features' },
      { label: 'Multicam', href: '/multicam' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'Podcast editing', href: '/podcast-editing' },
      { label: 'Interview editing', href: '/interview-editing' },
      { label: 'Sermon editing', href: '/sermon-editing' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'For Teams', href: '/for-teams' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About', href: '/about' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    children: [
      { label: 'Tools', href: '/tools' },
      { label: 'Free Transcription', href: '/transcribe' },
      { label: 'Tutorials & Media', href: '/tutorials' },
    ],
  },
]

/** Flat list of all navigable links (used by footer and anywhere a simple list is needed) */
export const NAV_LINKS: NavLink[] = NAV_ITEMS.flatMap((item) =>
  isNavGroup(item) ? item.children : [item],
)
