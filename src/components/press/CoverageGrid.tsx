import type { ReactElement } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { PREVIOUS_COVERAGE } from '@/data/press'
import TodoPlaceholder from './TodoPlaceholder'

export default function CoverageGrid(): ReactElement | null {
  const hasCoverage = PREVIOUS_COVERAGE.length > 0

  if (!hasCoverage && !import.meta.env.DEV) return null

  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
            Nice Touch in the press
          </h2>
          <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
            Selected coverage from across the industry.
          </p>
        </div>

        {hasCoverage ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(12px,1.5vw,20px)]">
            {PREVIOUS_COVERAGE.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex h-full flex-col gap-3 rounded-lg border-2 border-border bg-black/20 p-[clamp(16px,1.8vw,28px)] transition-colors duration-150 hover:border-white/40"
              >
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.publication} logo`}
                    className="h-8 w-auto object-contain opacity-80"
                  />
                ) : (
                  <span className="text-[clamp(13px,1vw,15px)] font-semibold uppercase tracking-wider text-white/55">
                    {item.publication}
                  </span>
                )}
                <p className="m-0 text-[clamp(14px,1.05vw,17px)] font-medium text-white leading-snug">
                  {item.headline}
                </p>
                <span className="mt-auto text-[clamp(12px,0.9vw,14px)] text-pink">
                  Read article →
                </span>
              </a>
            ))}
          </div>
        ) : (
          <TodoPlaceholder label="Previous coverage">
            Add coverage as articles publish by appending to{' '}
            <code className="font-mono text-yellow">PREVIOUS_COVERAGE</code> in{' '}
            <code className="font-mono text-yellow">src/data/press.ts</code>. This whole section is
            hidden in production while the array is empty.
          </TodoPlaceholder>
        )}
      </section>
    </FadeIn>
  )
}
