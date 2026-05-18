import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { FACTSHEET, FACTSHEET_PDF } from '@/data/press'

export default function Factsheet(): ReactElement {
  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">Factsheet</h2>
            <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
              Quick reference on Nice Touch — copy any row, or download the PDF.
            </p>
          </div>
          <div className="pointer-events-auto">
            <Button as="a" href={FACTSHEET_PDF} variant="secondary" size="sm" download>
              Download factsheet (PDF)
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(20px,2.5vw,40px)] gap-y-0 rounded-lg border-2 border-border bg-black/20 p-[clamp(20px,2.2vw,32px)] pointer-events-auto">
          {FACTSHEET.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1.5 border-b border-border-light py-4 first:pt-0 last:border-b-0 last:pb-0 md:[&:nth-last-child(2)]:border-b-0 md:[&:nth-last-child(2)]:pb-0"
            >
              <dt className="text-[clamp(10px,0.8vw,12px)] font-semibold uppercase tracking-wider text-white/45">
                {row.label}
              </dt>
              <dd className="m-0 text-[clamp(13px,1vw,15px)] text-white/80 leading-relaxed">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </FadeIn>
  )
}
