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

const integrationIcons = [
  { src: premiereProIcon, alt: 'Adobe Premiere Pro' },
  { src: davinciResolveIcon, alt: 'DaVinci Resolve' },
]

const CHECKOUT_LINKS = {
  basic: {
    gbp: {
      monthly: 'https://buy.stripe.com/14A7sL639eyT79J5j27Zu04',
      annual: 'https://buy.stripe.com/bJe7sLfDJ76rbpZ6n67Zu03',
    },
    usd: {
      monthly: 'https://buy.stripe.com/14A7sL639eyT79J5j27Zu04',
      annual: 'https://buy.stripe.com/bJe7sLfDJ76rbpZ6n67Zu03',
    },
  },
  pro: {
    gbp: {
      monthly: 'https://buy.stripe.com/6oU6oH3V11M7alV26Q7Zu01',
      annual: 'https://buy.stripe.com/9B6fZh0IPfCX79J6n67Zu02',
    },
    usd: {
      monthly: 'https://buy.stripe.com/6oU6oH3V11M7alV26Q7Zu01',
      annual: 'https://buy.stripe.com/9B6fZh0IPfCX79J6n67Zu02',
    },
  },
} as const

export const PLANS: Plan[] = [
  {
    name: 'Basic',
    tagline: 'Trying Nice Touch on a real job',
    highlighted: false,
    pricing: {
      gbp: { monthly: 25, annual: 250 },
      usd: { monthly: 30, annual: 300 },
    },
    links: {
      gbp: CHECKOUT_LINKS.basic.gbp,
      usd: CHECKOUT_LINKS.basic.usd,
    },
    features: [
      { label: 'Users', value: '1 user' },
      { label: 'Projects', value: '2' },
      { label: 'Footage analysis / processing', value: '1 hour' },
      { label: 'Edit generations', value: '25 per month' },
      { label: 'Multicam', value: 'Not included' },
      { label: 'Integrations', icons: integrationIcons },
      { label: 'Support', value: 'Standard' },
    ],
  },
  {
    name: 'Pro',
    tagline: 'Professional editors and teams',
    highlighted: true,
    pricing: {
      gbp: { monthly: 250, annual: 2500 },
      usd: { monthly: 300, annual: 3000 },
    },
    links: {
      gbp: CHECKOUT_LINKS.pro.gbp,
      usd: CHECKOUT_LINKS.pro.usd,
    },
    features: [
      { label: 'Users', value: 'Per user (seats)' },
      { label: 'Projects', value: 'Unlimited' },
      { label: 'Footage analysis / processing', value: '25 hours' },
      { label: 'Edit generations', value: '250 per month' },
      { label: 'Multicam', value: 'Included' },
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
      { label: 'Users', value: 'Custom' },
      { label: 'Projects', value: 'Unlimited' },
      { label: 'Footage analysis / processing', value: 'Custom' },
      { label: 'Edit generations', value: 'Custom' },
      { label: 'Multicam', value: 'Included' },
      { label: 'Integrations', icons: integrationIcons, value: '+ Custom' },
      { label: 'Support', value: 'Priority + onboarding' },
    ],
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
