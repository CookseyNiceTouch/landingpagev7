import { useState } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { DEMO_VIDEO } from '@/data/press'
import TodoPlaceholder from './TodoPlaceholder'

export default function PressVideo(): ReactElement {
  const [active, setActive] = useState(false)
  const { youtubeId, title, mp4Path } = DEMO_VIDEO
  const thumbnail = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg` : null

  return (
    <FadeIn className="w-full">
      <section id="demo" className="flex flex-col gap-4 scroll-mt-24">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">Demo</h2>
          <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
            Two-minute walkthrough of Nice Touch V2 in Adobe Premiere Pro.
          </p>
        </div>

        {youtubeId ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-border bg-black pointer-events-auto">
            {active ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(true)}
                className="absolute inset-0 w-full h-full group cursor-pointer bg-transparent border-none p-0"
                aria-label={`Play: ${title}`}
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pink text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        ) : (
          <TodoPlaceholder label="Demo video">
            Add the YouTube ID to <code className="font-mono text-yellow">DEMO_VIDEO.youtubeId</code>{' '}
            in <code className="font-mono text-yellow">src/data/press.ts</code>.
          </TodoPlaceholder>
        )}

        <div className="pointer-events-auto">
          <Button as="a" href={mp4Path} variant="secondary" size="sm" download>
            Download MP4
          </Button>
        </div>
      </section>
    </FadeIn>
  )
}
