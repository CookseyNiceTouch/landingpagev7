import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import { PLANS, detectCurrency, formatPrice } from '@/data/pricing'
import type { Interval } from '@/data/pricing'

export default function Pricing(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')

  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(40px,5vw,72px)] p-[clamp(24px,4vw,96px)] px-[clamp(40px,8vw,160px)] pointer-events-none overflow-y-auto">
      {/* Interval Toggle */}
      <div className="flex flex-col items-center gap-4 pointer-events-auto">
        <div className="flex rounded-full border-2 border-border overflow-hidden">
          <button
            className={`px-7 py-2.5 text-[clamp(14px,1vw,16px)] font-semibold border-none cursor-pointer transition-all ${
              interval === 'monthly'
                ? 'bg-pink text-white rounded-full'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
            onClick={() => setInterval('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-7 py-2.5 text-[clamp(14px,1vw,16px)] font-semibold border-none cursor-pointer transition-all ${
              interval === 'yearly'
                ? 'bg-pink text-white rounded-full'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
            onClick={() => setInterval('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="flex gap-[clamp(16px,2vw,24px)] w-full max-w-[1080px] pointer-events-auto max-[768px]:flex-col">
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
              className={`flex-1 flex flex-col justify-between gap-1 p-[clamp(20px,2vw,32px)] border-2 rounded-lg bg-black/20 ${
                plan.highlighted ? 'border-pink' : 'border-border'
              }`}
            >
              <div className="flex flex-col gap-1">
                <h3 className={`m-0 text-[clamp(20px,1.8vw,28px)] font-semibold ${plan.highlighted ? 'text-pink' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className="m-0 mb-1 text-[clamp(13px,1vw,15px)] text-white-55 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="flex flex-wrap items-baseline gap-1 pb-4 mb-1 border-b border-border-light">
                  {plan.contactUs ? (
                    <span className="text-[clamp(20px,1.8vw,28px)] font-semibold text-white-55">Custom pricing</span>
                  ) : displayPrice !== null ? (
                    <>
                      <span className="text-[clamp(28px,2.2vw,40px)] font-bold text-white leading-none">
                        {formatPrice(displayPrice, currency)}
                      </span>
                      <span className="text-[clamp(14px,1vw,16px)] text-white-55 font-medium">/mo</span>
                      {interval === 'yearly' && prices && (
                        <span className="w-full text-[clamp(12px,0.9vw,14px)] text-white/40">
                          {formatPrice(prices.annual, currency)} billed annually
                        </span>
                      )}
                    </>
                  ) : null}
                </div>

                {/* Features */}
                <ul className="list-none m-0 p-0 flex flex-col">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex flex-col gap-0.5 py-2.5 border-t border-border-light last:border-b">
                      <span className="text-[clamp(11px,0.85vw,13px)] text-white-45 font-medium uppercase tracking-wider">
                        {feature.label}
                      </span>
                      {feature.icons ? (
                        <span className="flex gap-2.5 items-center">
                          {feature.icons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              className="h-[clamp(24px,2vh,32px)] w-auto object-contain"
                            />
                          ))}
                          {feature.value && (
                            <span className="text-[clamp(13px,1vw,15px)] text-white font-medium">{feature.value}</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-[clamp(13px,1vw,15px)] text-white font-medium">{feature.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              {plan.contactUs ? (
                <a
                  href="mailto:cooksey@nicetouch.app"
                  className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-pink text-white font-semibold text-[clamp(14px,1.1vw,17px)] text-center rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Us
                </a>
              ) : activeLink ? (
                <a
                  href={activeLink}
                  className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-pink text-white font-semibold text-[clamp(14px,1.1vw,17px)] text-center rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe
                </a>
              ) : (
                <span className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-white/10 text-white/40 font-semibold text-[clamp(14px,1.1vw,17px)] text-center rounded-lg pointer-events-none">
                  Coming soon
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
