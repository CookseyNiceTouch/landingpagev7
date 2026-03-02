import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import IntervalToggle from '@/components/ui/IntervalToggle'
import PlanCards from '@/components/ui/PlanCards'
import { detectCurrency } from '@/data/pricing'
import type { Interval } from '@/data/pricing'
import section05 from '@/assets/images/Section05_Price.png'

export default function HomePricingSection(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')

  return (
    <section className="px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-[clamp(32px,4vw,56px)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Pricing</span>
          <h2 className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-white text-[clamp(28px,3.5vw,52px)]">
            Simple, transparent plans.
          </h2>
        </div>

        <IntervalToggle interval={interval} onIntervalChange={setInterval} />

        <img
          src={section05}
          alt="Pricing overview"
          className="w-full max-w-[1080px] rounded-xl"
        />

        <PlanCards interval={interval} currency={currency} />
      </div>
    </section>
  )
}
