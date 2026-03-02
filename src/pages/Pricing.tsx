import { useState, useMemo } from 'react'
import type { ReactElement } from 'react'
import IntervalToggle from '@/components/ui/IntervalToggle'
import PlanCards from '@/components/ui/PlanCards'
import { detectCurrency } from '@/data/pricing'
import type { Interval } from '@/data/pricing'

export default function Pricing(): ReactElement {
  const currency = useMemo(() => detectCurrency(), [])
  const [interval, setInterval] = useState<Interval>('yearly')

  return (
    <section className="px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-[clamp(40px,5vw,72px)]">
        <IntervalToggle interval={interval} onIntervalChange={setInterval} />
        <PlanCards interval={interval} currency={currency} />
      </div>
    </section>
  )
}
