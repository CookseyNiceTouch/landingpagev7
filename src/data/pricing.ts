import premiereProIcon from '@/assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '@/assets/images/davinci-resolve-icon.png'

export type Currency = 'gbp' | 'usd'
export type Interval = 'monthly' | 'yearly'

export interface PlanFeature {
  label: string
  value?: string
  icons?: { src: string; alt: string }[]
}

export interface PlanPricing {
  monthly: number
  annual: number
}

export interface PlanLinks {
  monthly: string
  annual: string
}

export interface Plan {
  name: string
  tagline: string
  highlighted: boolean
  pricing?: { gbp: PlanPricing; usd: PlanPricing }
  links?: { gbp: PlanLinks; usd: PlanLinks }
  contactUs?: boolean
  features: PlanFeature[]
}

export interface AddOnPack {
  name: string
  generations: number
  audioHours: number
  pricing: {
    pro: { gbp: number; usd: number }
    ultra: { gbp: number; usd: number }
  }
}

const integrationIcons = [
  { src: premiereProIcon, alt: 'Adobe Premiere Pro' },
  { src: davinciResolveIcon, alt: 'DaVinci Resolve' },
]

const CHECKOUT_LINKS = {
  hobbyist: {
    gbp: { monthly: '#', annual: '#' },
    usd: { monthly: '#', annual: '#' },
  },
  pro: {
    gbp: { monthly: '#', annual: '#' },
    usd: { monthly: '#', annual: '#' },
  },
  ultra: {
    gbp: { monthly: '#', annual: '#' },
    usd: { monthly: '#', annual: '#' },
  },
} as const

export const PLANS: Plan[] = [
  {
    name: 'Hobbyist',
    tagline: 'Get started with Nice Touch',
    highlighted: false,
    pricing: {
      gbp: { monthly: 15, annual: 144 },
      usd: { monthly: 19, annual: 182.40 },
    },
    links: {
      gbp: CHECKOUT_LINKS.hobbyist.gbp,
      usd: CHECKOUT_LINKS.hobbyist.usd,
    },
    features: [
      { label: 'Projects', value: '10' },
      { label: 'Multicam', value: 'Not included' },
      { label: 'Priority Analysis & Edit Gen', value: 'Not included' },
      { label: 'Audio Analysis Cap', value: '2 hours' },
      { label: 'Edit Generations', value: '20 / month' },
      { label: 'Integrations', icons: integrationIcons },
      { label: 'Support', value: 'Standard' },
    ],
  },
  {
    name: 'Pro',
    tagline: 'For professional editors and teams',
    highlighted: true,
    pricing: {
      gbp: { monthly: 50, annual: 480 },
      usd: { monthly: 65, annual: 624 },
    },
    links: {
      gbp: CHECKOUT_LINKS.pro.gbp,
      usd: CHECKOUT_LINKS.pro.usd,
    },
    features: [
      { label: 'Projects', value: 'Unlimited' },
      { label: 'Multicam', value: 'Included' },
      { label: 'Priority Analysis & Edit Gen', value: 'Not included' },
      { label: 'Audio Analysis Cap', value: '5 hours' },
      { label: 'Edit Generations', value: '60 / month' },
      { label: 'Integrations', icons: integrationIcons },
      { label: 'Support', value: 'Standard' },
    ],
  },
  {
    name: 'Ultra',
    tagline: 'Maximum power and priority access',
    highlighted: false,
    pricing: {
      gbp: { monthly: 250, annual: 2400 },
      usd: { monthly: 320, annual: 3072 },
    },
    links: {
      gbp: CHECKOUT_LINKS.ultra.gbp,
      usd: CHECKOUT_LINKS.ultra.usd,
    },
    features: [
      { label: 'Projects', value: 'Unlimited' },
      { label: 'Multicam', value: 'Included' },
      { label: 'Priority Analysis & Edit Gen', value: 'Included' },
      { label: 'Audio Analysis Cap', value: '25 hours' },
      { label: 'Edit Generations', value: '400 / month' },
      { label: 'Integrations', icons: integrationIcons },
      { label: 'Support', value: 'Priority' },
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'Larger teams and higher volume',
    highlighted: false,
    contactUs: true,
    features: [
      { label: 'Projects', value: 'Unlimited' },
      { label: 'Multicam', value: 'Included' },
      { label: 'Priority Analysis & Edit Gen', value: 'Included' },
      { label: 'Audio Analysis Cap', value: 'Custom' },
      { label: 'Edit Generations', value: 'Custom' },
      { label: 'Integrations', icons: integrationIcons, value: '+ Custom' },
      { label: 'Support', value: 'Priority + onboarding' },
    ],
  },
]

export const ADD_ON_PACKS: AddOnPack[] = [
  {
    name: 'S',
    generations: 25,
    audioHours: 2,
    pricing: {
      pro: { gbp: 30, usd: 39 },
      ultra: { gbp: 22, usd: 28 },
    },
  },
  {
    name: 'M',
    generations: 100,
    audioHours: 10,
    pricing: {
      pro: { gbp: 110, usd: 139 },
      ultra: { gbp: 82, usd: 105 },
    },
  },
  {
    name: 'L',
    generations: 250,
    audioHours: 25,
    pricing: {
      pro: { gbp: 260, usd: 329 },
      ultra: { gbp: 195, usd: 249 },
    },
  },
]

export function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz.startsWith('Europe/London') || tz.startsWith('GB')) return 'gbp'
    const locale = navigator.language || ''
    if (locale.startsWith('en-GB')) return 'gbp'
  } catch {
    // fall through
  }
  return 'usd'
}

export function formatPrice(amount: number, currency: Currency): string {
  const symbol = currency === 'gbp' ? '£' : '$'
  return Number.isInteger(amount)
    ? `${symbol}${amount.toLocaleString()}`
    : `${symbol}${amount.toFixed(2)}`
}
