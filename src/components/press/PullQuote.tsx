import type { ReactElement } from 'react'
import type { Quote } from '@/data/press'

interface PullQuoteProps {
  quote: Quote
  accent?: 'pink' | 'yellow' | 'cyan'
}

/** Accent is carried by the border only — no tinted fill. */
const accentClasses: Record<NonNullable<PullQuoteProps['accent']>, string> = {
  pink: 'border-pink/40',
  yellow: 'border-yellow/40',
  cyan: 'border-cyan/40',
}

/**
 * Large-format pull-quote block, sized for clean screenshots in articles.
 */
export default function PullQuote({ quote, accent = 'pink' }: PullQuoteProps): ReactElement {
  return (
    <figure
      className={`m-0 flex h-full flex-col justify-between gap-6 rounded-lg border-2 bg-surface p-[clamp(24px,2.8vw,44px)] pointer-events-auto ${accentClasses[accent]}`}
    >
      <blockquote className="m-0">
        <p className="m-0 font-heading text-[clamp(20px,2vw,32px)] font-semibold leading-[1.25] text-white">
          “{quote.quote}”
        </p>
      </blockquote>
      <figcaption className="flex flex-col">
        <span className="text-[clamp(14px,1.05vw,17px)] font-semibold text-white">
          {quote.attribution}
        </span>
        <span className="text-[clamp(12px,0.9vw,14px)] text-white/55">{quote.role}</span>
      </figcaption>
    </figure>
  )
}
