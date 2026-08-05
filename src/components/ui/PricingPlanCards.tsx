import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import {
  PLANS,
  ADD_ON_PACKS,
  detectCurrency,
  formatPrice,
  featureValueClass,
  ultraVsProSavingPerGen,
} from '@/data/pricing'
import type { Interval, Currency, AddOnPack } from '@/data/pricing'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

function savingsPercent(pack: AddOnPack, currency: Currency): number {
  const pro = pack.pricing.pro[currency]
  const ultra = pack.pricing.ultra[currency]
  return Math.round(((pro - ultra) / pro) * 100)
}

function openTryNow(): void {
  window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))
}

interface PricingPlanCardsProps {
  /** Where the Enterprise CTA should send users */
  enterpriseHref?: string
  /** Label for the Enterprise CTA */
  enterpriseLabel?: string
  /** Show the Add-On Packs section (default true) */
  showAddOns?: boolean
}

export default function PricingPlanCards({
  enterpriseHref = '/for-teams/',
  enterpriseLabel = 'Talk to us',
  showAddOns = true,
}: PricingPlanCardsProps): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')
  const ultraSavingPerGen = useMemo(() => ultraVsProSavingPerGen(currency), [currency])

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* Interval Toggle */}
      <div className="flex flex-col items-center gap-3 pointer-events-auto" role="group" aria-label="Billing interval">
        <div className="flex rounded-full border border-border overflow-hidden">
          <button
            type="button"
            aria-pressed={interval === 'monthly'}
            className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
              interval === 'monthly'
                ? 'bg-pink text-white rounded-full'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
            onClick={() => setInterval('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={interval === 'yearly'}
            className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
              interval === 'yearly'
                ? 'bg-pink text-white rounded-full'
                : 'bg-transparent text-white/60 hover:text-white'
            }`}
            onClick={() => setInterval('yearly')}
          >
            Yearly
          </button>
        </div>
        <span className="text-xs text-yellow font-semibold tracking-wide uppercase">
          Save 20% annually
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1360px] pointer-events-auto">
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
              className="nt-card relative flex flex-col justify-between gap-1 p-6"
            >
              {plan.name === 'Ultra' && ultraSavingPerGen > 0 && (
                <span className="absolute top-3 right-3 px-2 py-1 rounded text-[11px] font-semibold bg-pink/15 text-pink leading-none">
                  {ultraSavingPerGen}% cheaper per gen vs Pro
                </span>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="m-0 text-xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="m-0 mb-1 text-sm text-white-60 leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="flex flex-wrap items-baseline gap-1 pb-4 mb-1 border-b border-border-light">
                  {plan.contactUs ? (
                    <span className="text-xl font-semibold text-white-60">Custom pricing</span>
                  ) : displayPrice !== null ? (
                    <>
                      <span className="text-3xl font-bold text-white leading-none">
                        {formatPrice(displayPrice, currency)}
                      </span>
                      <span className="text-sm text-white-60 font-medium">/mo</span>
                      {interval === 'yearly' && prices && (
                        <span className="w-full text-xs text-white-60">
                          {formatPrice(prices.annual, currency)} billed annually
                        </span>
                      )}
                    </>
                  ) : null}
                </div>

                <ul className="list-none m-0 p-0 flex flex-col">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex flex-col gap-0.5 py-2 border-t border-border-light last:border-b">
                      <span className="text-[11px] text-white-60 font-medium uppercase tracking-wider">
                        {feature.label}
                      </span>
                      {feature.icons ? (
                        <span className="flex gap-2 items-center">
                          {feature.icons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              className="h-6 w-auto object-contain"
                            />
                          ))}
                          {feature.value && (
                            <span className={`text-sm font-medium ${featureValueClass(feature.value)}`}>
                              {feature.value}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className={`text-sm font-medium ${featureValueClass(feature.value)}`}>
                          {feature.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.contactUs ? (
                <Button as="a" href={enterpriseHref} variant="primary" size="md" className="w-full mt-4">
                  {enterpriseLabel}
                </Button>
              ) : activeLink ? (
                <Button type="button" onClick={openTryNow} variant="primary" size="md" className="w-full mt-4">
                  Try Free Now
                </Button>
              ) : (
                <span className="block w-full mt-4 py-3 bg-white/10 text-white/40 font-semibold text-sm text-center rounded-lg pointer-events-none">
                  Coming soon
                </span>
              )}
            </div>
          )
        })}
      </div>

      <p className="m-0 text-xs text-white-60 text-center w-full max-w-[1360px]">
        All prices exclude VAT.
      </p>

      {showAddOns && (
        <div className="flex flex-col items-center gap-8 w-full max-w-[1360px] pointer-events-auto">
          <div className="text-center">
            <h2 className="m-0 text-2xl font-semibold text-white">
              Add-On Packs
            </h2>
            <p className="m-0 mt-2 text-base text-white-60">
              Top up generations and audio hours
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[900px]">
            {ADD_ON_PACKS.map((pack) => {
              const savings = savingsPercent(pack, currency)

              return (
                <div
                  key={pack.name}
                  className="nt-card flex flex-col gap-4 p-6"
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="m-0 text-2xl font-bold text-white">
                      Pack {pack.name}
                    </h3>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white-60 font-medium uppercase tracking-wider">Generations</span>
                        <span className="text-base text-white font-semibold">{pack.generations}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white-60 font-medium uppercase tracking-wider">Audio hours</span>
                        <span className="text-base text-white font-semibold">{pack.audioHours}</span>
                      </div>
                    </div>

                    <div className="border-t border-border-light pt-3 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white-60 font-medium">With Pro</span>
                        <span className="text-base text-white font-semibold">
                          {formatPrice(pack.pricing.pro[currency], currency)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-pink font-medium">With Ultra</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-yellow/15 text-yellow">
                            Save {savings}%
                          </span>
                          <span className="text-base text-pink font-semibold">
                            {formatPrice(pack.pricing.ultra[currency], currency)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button type="button" onClick={openTryNow} variant="primary" size="md" className="w-full mt-auto">
                    Add to Subscription
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
