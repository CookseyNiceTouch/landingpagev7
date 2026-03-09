import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import { PLANS, ADD_ON_PACKS, detectCurrency, formatPrice } from '@/data/pricing'
import type { Interval, Currency, AddOnPack } from '@/data/pricing'

// Positive feature values get pink; absent ones are dimmed.
function featureValueClass(value: string | undefined): string {
  if (!value) return 'text-white'
  if (value === 'Not included') return 'text-white/35'
  if (value === 'Included' || value === 'Unlimited' || value === 'Priority' || value === 'Priority + onboarding') return 'text-pink'
  return 'text-white'
}

function savingsPercent(pack: AddOnPack, currency: Currency): number {
  const pro = pack.pricing.pro[currency]
  const ultra = pack.pricing.ultra[currency]
  return Math.round(((pro - ultra) / pro) * 100)
}

function parseGenerations(planName: string): number {
  const plan = PLANS.find(p => p.name === planName)
  const feature = plan?.features.find(f => f.label === 'Edit Generations')
  const match = feature?.value?.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

function ultraVsProSavingPerGen(currency: Currency): number {
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

export default function Pricing(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')
  const ultraSavingPerGen = useMemo(() => ultraVsProSavingPerGen(currency), [currency])

  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(40px,5vw,72px)] p-[clamp(24px,4vw,96px)] px-[clamp(40px,8vw,160px)] pointer-events-none overflow-y-auto">
      {/* Interval Toggle */}
      <div className="flex flex-col items-center gap-3 pointer-events-auto">
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
        <span className="text-[clamp(11px,0.85vw,13px)] text-yellow font-semibold tracking-wide uppercase">
          Save 20% annually
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-4 gap-[clamp(12px,1.5vw,20px)] w-full max-w-[1360px] pointer-events-auto max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
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
              className="relative flex flex-col justify-between gap-1 p-[clamp(18px,1.8vw,28px)] border-2 rounded-lg bg-black/20 border-border"
            >
              {plan.name === 'Ultra' && ultraSavingPerGen > 0 && (
                <span className="absolute top-3 right-3 px-2 py-1 rounded text-[clamp(10px,0.75vw,11px)] font-semibold bg-pink/15 text-pink leading-none">
                  {ultraSavingPerGen}% cheaper per gen vs Pro
                </span>
              )}

              <div className="flex flex-col gap-1">
                <h3 className="m-0 text-[clamp(18px,1.6vw,26px)] font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="m-0 mb-1 text-[clamp(12px,0.9vw,14px)] text-white-55 leading-relaxed">
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="flex flex-wrap items-baseline gap-1 pb-4 mb-1 border-b border-border-light">
                  {plan.contactUs ? (
                    <span className="text-[clamp(18px,1.6vw,26px)] font-semibold text-white-55">Custom pricing</span>
                  ) : displayPrice !== null ? (
                    <>
                      <span className="text-[clamp(24px,2vw,36px)] font-bold text-white leading-none">
                        {formatPrice(displayPrice, currency)}
                      </span>
                      <span className="text-[clamp(13px,0.9vw,15px)] text-white-55 font-medium">/mo</span>
                      {interval === 'yearly' && prices && (
                        <span className="w-full text-[clamp(11px,0.8vw,13px)] text-white/40">
                          {formatPrice(prices.annual, currency)} billed annually
                        </span>
                      )}
                    </>
                  ) : null}
                </div>

                {/* Features */}
                <ul className="list-none m-0 p-0 flex flex-col">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex flex-col gap-0.5 py-2 border-t border-border-light last:border-b">
                      <span className="text-[clamp(10px,0.75vw,12px)] text-white-45 font-medium uppercase tracking-wider">
                        {feature.label}
                      </span>
                      {feature.icons ? (
                        <span className="flex gap-2 items-center">
                          {feature.icons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              className="h-[clamp(20px,1.8vh,28px)] w-auto object-contain"
                            />
                          ))}
                          {feature.value && (
                            <span className={`text-[clamp(12px,0.9vw,14px)] font-medium ${featureValueClass(feature.value)}`}>
                              {feature.value}
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className={`text-[clamp(12px,0.9vw,14px)] font-medium ${featureValueClass(feature.value)}`}>
                          {feature.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              {plan.contactUs ? (
                <a
                  href="mailto:cooksey@nicetouch.app"
                  className="block w-full mt-4 py-[clamp(10px,1.2vh,14px)] bg-yellow text-black font-semibold text-[clamp(13px,1vw,16px)] text-center rounded-lg transition-all hover:bg-yellow/90 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Contact Us
                </a>
              ) : activeLink ? (
                <a
                  href={activeLink}
                  className="block w-full mt-4 py-[clamp(10px,1.2vh,14px)] font-semibold text-[clamp(13px,1vw,16px)] text-center rounded-lg transition-all hover:-translate-y-0.5 active:translate-y-0 bg-yellow text-black hover:bg-yellow/90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe
                </a>
              ) : (
                <span className="block w-full mt-4 py-[clamp(10px,1.2vh,14px)] bg-white/10 text-white/40 font-semibold text-[clamp(13px,1vw,16px)] text-center rounded-lg pointer-events-none">
                  Coming soon
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Add-On Packs */}
      <div className="flex flex-col items-center gap-[clamp(20px,2.5vw,40px)] w-full max-w-[1360px] pointer-events-auto">
        <div className="text-center">
          <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
            Add-On Packs
          </h2>
          <p className="m-0 mt-2 text-[clamp(13px,1vw,16px)] text-white-55">
            Top up generations and audio hours
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[clamp(12px,1.5vw,20px)] w-full max-w-[900px] max-[700px]:grid-cols-1">
          {ADD_ON_PACKS.map((pack) => {
            const savings = savingsPercent(pack, currency)

            return (
              <div
                key={pack.name}
                className="flex flex-col gap-4 p-[clamp(18px,1.8vw,28px)] border-2 border-border rounded-lg bg-black/20"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 text-[clamp(20px,1.8vw,28px)] font-bold text-white">
                    Pack {pack.name}
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(11px,0.8vw,13px)] text-white-45 font-medium uppercase tracking-wider">Generations</span>
                      <span className="text-[clamp(13px,1vw,16px)] text-white font-semibold">{pack.generations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(11px,0.8vw,13px)] text-white-45 font-medium uppercase tracking-wider">Audio hours</span>
                      <span className="text-[clamp(13px,1vw,16px)] text-white font-semibold">{pack.audioHours}</span>
                    </div>
                  </div>

                  <div className="border-t border-border-light pt-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(12px,0.9vw,14px)] text-white-55 font-medium">With Pro</span>
                      <span className="text-[clamp(14px,1.1vw,18px)] text-white font-semibold">
                        {formatPrice(pack.pricing.pro[currency], currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[clamp(12px,0.9vw,14px)] text-pink font-medium">With Ultra</span>
                      <span className="flex items-center gap-2">
                        <span className="text-[clamp(10px,0.75vw,12px)] font-semibold px-1.5 py-0.5 rounded bg-yellow/15 text-yellow">
                          Save {savings}%
                        </span>
                        <span className="text-[clamp(14px,1.1vw,18px)] text-pink font-semibold">
                          {formatPrice(pack.pricing.ultra[currency], currency)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="block w-full mt-auto py-[clamp(10px,1.2vh,14px)] bg-yellow text-black font-semibold text-[clamp(13px,1vw,16px)] text-center rounded-lg transition-all hover:bg-yellow/90 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Add Pack {pack.name}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
