import { useState } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { PROMO_VIDEO, DEMO_VIDEO } from '@/data/press'
import type { VideoEntry } from '@/data/press'

// --------------------------------------------------------------------------
// Single video embed (click-to-load)
// --------------------------------------------------------------------------

function VideoEmbed({ video }: { video: VideoEntry }): ReactElement {
  const [active, setActive] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-border bg-black pointer-events-auto">
        {active ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer bg-transparent border-none p-0"
            aria-label={`Play: ${video.title}`}
          >
            <img
              src={thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/55">{video.description}</p>
        {video.mp4Path && (
          <div className="pointer-events-auto shrink-0">
            <Button as="a" href={video.mp4Path} variant="secondary" size="sm" download>
              Download MP4
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// Section
// --------------------------------------------------------------------------

export default function PressVideo(): ReactElement {
  return (
    <FadeIn className="w-full">
      <section id="videos" className="flex flex-col gap-[clamp(28px,3vw,44px)] scroll-mt-24">
        {/* Promo */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">Promo</h2>
            <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
              One-minute trailer — safe to embed or share.
            </p>
          </div>
          <VideoEmbed video={PROMO_VIDEO} />
        </div>

        {/* Demo */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">Demo</h2>
            <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
              Hands-on walkthrough of Nice Touch V2 inside Adobe Premiere Pro.
            </p>
          </div>
          <VideoEmbed video={DEMO_VIDEO} />
        </div>
      </section>
    </FadeIn>
  )
}
