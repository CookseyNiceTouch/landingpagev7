import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import { PLANS, detectCurrency, formatPrice } from '@/data/pricing'
import type { Interval } from '@/data/pricing'
import pricingDevice from '@/assets/images/devices/pricing.png'

export default function HomePricingSection(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')

  return (
    <section className="home-pricing-section">
      <img
        src={pricingDevice}
        alt="Nice Touch Pro plan — pricing overview"
        className="home-pricing-device"
        data-cable-anchor="pricing-device"
      />

      <div className="home-pricing-toggle">
        <div className="home-pricing-toggle-pill">
          <button
            className={`home-pricing-toggle-btn ${interval === 'monthly' ? 'is-active' : ''}`}
            onClick={() => setInterval('monthly')}
          >
            Monthly
          </button>
          <button
            className={`home-pricing-toggle-btn ${interval === 'yearly' ? 'is-active' : ''}`}
            onClick={() => setInterval('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="home-pricing-cards">
        {PLANS.map((plan) => {
          const prices = plan.pricing?.[currency]
          const planLinks = plan.links?.[currency]
          const activeLink = planLinks
            ? interval === 'yearly'
              ? planLinks.annual
              : planLinks.monthly
            : ''
          const displayPrice = prices
            ? interval === 'yearly'
              ? prices.annual / 12
              : prices.monthly
            : null

          return (
            <div
              key={plan.name}
              className={`plan-card ${plan.highlighted ? 'plan-card--highlighted' : ''}`}
            >
              <div className="plan-card-body">
                <h3 className={`plan-card-name ${plan.highlighted ? 'plan-card-name--highlighted' : ''}`}>
                  {plan.name}
                </h3>
                <p className="plan-card-tagline">{plan.tagline}</p>

                <div className="plan-card-price-row">
                  {plan.contactUs ? (
                    <span className="plan-card-price-custom">Custom pricing</span>
                  ) : displayPrice !== null ? (
                    <>
                      <span className="plan-card-price">
                        {formatPrice(displayPrice, currency)}
                      </span>
                      <span className="plan-card-price-interval">/mo</span>
                      {interval === 'yearly' && prices && (
                        <span className="plan-card-price-annual">
                          {formatPrice(prices.annual, currency)} billed annually
                        </span>
                      )}
                    </>
                  ) : null}
                </div>

                <ul className="plan-card-features">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="plan-card-feature">
                      <span className="plan-card-feature-label">{feature.label}</span>
                      {feature.icons ? (
                        <span className="plan-card-feature-icons">
                          {feature.icons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              className="plan-card-feature-icon"
                            />
                          ))}
                          {feature.value && (
                            <span className="plan-card-feature-value">{feature.value}</span>
                          )}
                        </span>
                      ) : (
                        <span className="plan-card-feature-value">{feature.value}</span>
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
    </section>
  )
}
