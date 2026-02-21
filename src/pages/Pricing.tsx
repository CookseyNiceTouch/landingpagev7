import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import Header from '../components/Header'
import premiereProIcon from '../assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '../assets/images/davinci-resolve-icon.png'

type Currency = 'gbp' | 'usd'
type Interval = 'monthly' | 'yearly'

interface PlanFeature {
  label: string
  value?: string
  icons?: { src: string; alt: string }[]
}

interface PlanPricing {
  monthly: number
  annual: number
}

interface PlanLinks {
  monthly: string
  annual: string
}

interface Plan {
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
}

const PLANS: Plan[] = [
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

function detectCurrency(): Currency {
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

function formatPrice(amount: number, currency: Currency): string {
  const symbol = currency === 'gbp' ? '£' : '$'
  return Number.isInteger(amount)
    ? `${symbol}${amount.toLocaleString()}`
    : `${symbol}${amount.toFixed(2)}`
}

function Pricing(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')

  return (
    <div className="pricing-page">
      <Header />
      <main className="pricing-main">
        <div className="pricing-controls">
          <div className="pricing-toggle">
          <button
            className={`pricing-toggle-btn${interval === 'monthly' ? ' pricing-toggle-btn--active' : ''}`}
            onClick={() => setInterval('monthly')}
          >
            Monthly
          </button>
          <button
            className={`pricing-toggle-btn${interval === 'yearly' ? ' pricing-toggle-btn--active' : ''}`}
            onClick={() => setInterval('yearly')}
          >
            Yearly
          </button>
          </div>
        </div>

        <div className="plan-cards">
          {PLANS.map((plan) => {
            const prices = plan.pricing?.[currency]
            const planLinks = plan.links?.[currency]
            const activeLink = planLinks
              ? (interval === 'yearly' ? planLinks.annual : planLinks.monthly)
              : ''
            const displayPrice = prices
              ? interval === 'yearly' ? prices.annual / 12 : prices.monthly
              : null

            return (
              <div
                key={plan.name}
                className={`plan-card${plan.highlighted ? ' plan-card--highlighted' : ''}`}
              >
                <div className="plan-card-top">
                  <h3 className="plan-card-name">{plan.name}</h3>
                  <p className="plan-card-tagline">{plan.tagline}</p>

                  <div className="plan-card-price">
                    {plan.contactUs ? (
                      <span className="plan-card-contact-label">Custom pricing</span>
                    ) : displayPrice !== null ? (
                      <>
                        <span className="plan-price-amount">
                          {formatPrice(displayPrice, currency)}
                        </span>
                        <span className="plan-price-interval">/mo</span>
                        {interval === 'yearly' && prices && (
                          <span className="plan-price-annual">
                            {formatPrice(prices.annual, currency)} billed annually
                          </span>
                        )}
                      </>
                    ) : null}
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="plan-feature">
                        <span className="plan-feature-label">{feature.label}</span>
                        {feature.icons ? (
                          <span className="plan-feature-icons">
                            {feature.icons.map((icon) => (
                              <img key={icon.alt} src={icon.src} alt={icon.alt} className="plan-feature-icon" />
                            ))}
                            {feature.value && <span className="plan-feature-value">{feature.value}</span>}
                          </span>
                        ) : (
                          <span className="plan-feature-value">{feature.value}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.contactUs ? (
                  <a href="mailto:cooksey@nicetouch.app" className="plan-card-cta">
                    Contact Us
                  </a>
                ) : activeLink ? (
                  <a
                    href={activeLink}
                    className="plan-card-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe
                  </a>
                ) : (
                  <span className="plan-card-cta plan-card-cta--disabled">Coming soon</span>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Pricing
