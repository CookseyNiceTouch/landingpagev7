import type { ReactElement } from 'react'
import type { Interval } from '@/data/pricing'

interface IntervalToggleProps {
  interval: Interval
  onIntervalChange: (interval: Interval) => void
}

export default function IntervalToggle({ interval, onIntervalChange }: IntervalToggleProps): ReactElement {
  return (
    <div className="flex rounded-full border-2 border-border overflow-hidden">
      <button
        className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
          interval === 'monthly'
            ? 'bg-pink text-white rounded-full'
            : 'bg-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onIntervalChange('monthly')}
      >
        Monthly
      </button>
      <button
        className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
          interval === 'yearly'
            ? 'bg-pink text-white rounded-full'
            : 'bg-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onIntervalChange('yearly')}
      >
        Yearly
      </button>
    </div>
  )
}
