import premiereProIcon from '@/assets/images/premiere-pro-icon.webp'
import davinciResolveIcon from '@/assets/images/davinci-resolve-icon.webp'

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
  links: {
    pro: { gbp: string; usd: string }
    ultra: { gbp: string; usd: string }
  }
}

const integrationIcons = [
  { src: premiereProIcon, alt: 'Adobe Premiere Pro' },
  { src: davinciResolveIcon, alt: 'DaVinci Resolve' },
]

const CHECKOUT_LINKS = {
  hobbyist: {
    gbp: {
      monthly: 'https://buy.stripe.com/fZu9AT0IP76rcu35j27Zu07',
      annual:  'https://buy.stripe.com/aFacN53V19ez65F12M7Zu09',
    },
    usd: {
      monthly: 'https://buy.stripe.com/00w7sL9fl3UfalV26Q7Zu08',
      annual:  'https://buy.stripe.com/6oU7sL2QX1M779JeTC7Zu0a',
    },
  },
  pro: {
    gbp: {
      monthly: 'https://buy.stripe.com/fZu6oH6398avfGffXG7Zu0b',
      annual:  'https://buy.stripe.com/3cIdR9gHNduP9hR3aU7Zu0d',
    },
    usd: {
      monthly: 'https://buy.stripe.com/dRmfZhfDJcqL1PpaDm7Zu0c',
      annual:  'https://buy.stripe.com/00w14n4Z5eyT79JdPy7Zu0e',
    },
  },
  ultra: {
    gbp: {
      monthly: 'https://buy.stripe.com/5kQaEX0IP9ezfGfh1K7Zu0f',
      annual:  'https://buy.stripe.com/eVq28r9fl62nfGf4eY7Zu0h',
    },
    usd: {
      monthly: 'https://buy.stripe.com/28E4gz2QXgH10LldPy7Zu0g',
      annual:  'https://buy.stripe.com/aFa8wP1MT76rdy7bHq7Zu0i',
    },
  },
} as const

export const PLANS: Plan[] = [
  {
    name: 'Hobbyist',
    tagline: 'Get started with Nice Touch',
    highlighted: false,
    pricing: {
      gbp: { monthly: 15, annual: 144 },
      usd: { monthly: 19, annual: 180 },
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
      usd: { monthly: 320, annual: 3100 },
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
    links: {
      pro:   { gbp: 'https://buy.stripe.com/bJecN59fl9ez3Xx3aU7Zu0j', usd: 'https://buy.stripe.com/4gM4gzgHN2QbalV26Q7Zu0k' },
      ultra: { gbp: 'https://buy.stripe.com/6oU6oH1MT3Ufcu3dPy7Zu0p', usd: 'https://buy.stripe.com/4gM8wPdvB8av2Tt9zi7Zu0q' },
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
    links: {
      pro:   { gbp: 'https://buy.stripe.com/7sY9ATbntcqL9hR26Q7Zu0l', usd: 'https://buy.stripe.com/3cIcN5dvB76rcu3cLu7Zu0m' },
      ultra: { gbp: 'https://buy.stripe.com/00w5kDbnt1M78dN4eY7Zu0r', usd: 'https://buy.stripe.com/28EdR91MT3Ufcu36n67Zu0s' },
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
    links: {
      pro:   { gbp: 'https://buy.stripe.com/aFafZh4Z5duP79J4eY7Zu0n', usd: 'https://buy.stripe.com/6oU4gz0IP4Yj8dN9zi7Zu0o' },
      ultra: { gbp: 'https://buy.stripe.com/aFaeVdcrxduPeCb12M7Zu0t', usd: 'https://buy.stripe.com/8x29ATfDJ2Qbdy76n67Zu0u' },
    },
  },
]

export function featureValueClass(value: string | undefined): string {
  if (!value) return 'text-white'
  if (value === 'Not included') return 'text-white/35'
  if (
    value === 'Included' ||
    value === 'Unlimited' ||
    value === 'Priority' ||
    value === 'Priority + onboarding'
  ) return 'text-pink'
  return 'text-white'
}

export function parseGenerations(planName: string): number {
  const plan = PLANS.find(p => p.name === planName)
  const feature = plan?.features.find(f => f.label === 'Edit Generations')
  const match = feature?.value?.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

export function ultraVsProSavingPerGen(currency: Currency): number {
  const proPlan = PLANS.find(p => p.name === 'Pro')
  const ultraPlan = PLANS.find(p => p.name === 'Ultra')
  const proGens = parseGenerations('Pro')
  const ultraGens = parseGenerations('Ultra')
  const proPrice = proPlan?.pricing?.[currency].monthly ?? 0
  const ultraPrice = ultraPlan?.pricing?.[currency].monthly ?? 0
  if (!proGens || !ultraGens || !proPrice || !ultraPrice) return 0
  const proCostPerGen = proPrice / proGens
  const ultraCostPerGen = ultraPrice / ultraGens
  return Math.round(((proCostPerGen - ultraCostPerGen) / proCostPerGen) * 100)
}

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
