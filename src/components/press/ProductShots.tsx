import type { ReactElement } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { PRODUCT_SHOTS } from '@/data/press'
import TodoPlaceholder from './TodoPlaceholder'

/**
 * Featured product hero shot. Sits between the demo video and the press
 * release to give the page a strong visual anchor before the copy-heavy
 * sections. Designed for one or two shots; auto-layouts to a single column.
 */
export default function ProductShots(): ReactElement {
  const available = PRODUCT_SHOTS.filter((s) => s.src !== null)

  if (available.length === 0 && !import.meta.env.DEV) return <></>

  const gridCols = available.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'

  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">Hero shot</h2>
          <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
            Featured marketing image. Additional product screenshots are further down the page.
          </p>
        </div>

        <div className={`grid ${gridCols} gap-[clamp(12px,1.5vw,20px)]`}>
          {PRODUCT_SHOTS.map((shot) =>
            shot.src ? (
              <figure key={shot.id} className="m-0 flex flex-col gap-3">
                <div className="overflow-hidden rounded-lg border-2 border-border bg-black">
                  <img
                    src={shot.src}
                    alt={shot.caption}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </div>
                <figcaption className="flex flex-col gap-1 px-1">
                  <span className="text-[clamp(13px,1vw,15px)] font-semibold text-white/80">
                    {shot.label}
                  </span>
                  <span className="text-[clamp(12px,0.9vw,14px)] text-white/55 leading-snug">
                    {shot.caption}
                  </span>
                </figcaption>
              </figure>
            ) : (
              <div key={shot.id} className="flex flex-col gap-3">
                <TodoPlaceholder label={`Hero shot — ${shot.label}`}>
                  Set <code className="font-mono text-yellow">src</code> on the{' '}
                  <code className="font-mono text-yellow">"{shot.id}"</code> entry in{' '}
                  <code className="font-mono text-yellow">PRODUCT_SHOTS</code> (
                  <code className="font-mono text-yellow">src/data/press.ts</code>) and drop the
                  file into{' '}
                  <code className="font-mono text-yellow">public/press/assets/images/</code>.
                </TodoPlaceholder>
              </div>
            ),
          )}
        </div>
      </section>
    </FadeIn>
  )
}
