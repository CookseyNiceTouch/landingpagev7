import { useState } from 'react'
import type { ReactElement } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import type { VideoEntry } from '@/data/press'

interface PromoVideoSectionProps {
  video: VideoEntry
  heading?: string
  subtitle?: string
}

/**
 * Click-to-play YouTube embed used to showcase the glossy promo/ad. Shared
 * between the homepage and Features page rather than duplicated, since both
 * placements use the same video and the same click-to-load pattern already
 * established in PressVideo / Tutorials.
 */
export default function PromoVideoSection({ video, heading, subtitle }: PromoVideoSectionProps): ReactElement {
  const [active, setActive] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`

  return (
    <FadeIn className="flex justify-center">
      <section className="promo-video-section">
        {heading && <h2 className="promo-video-heading">{heading}</h2>}
        {subtitle && <p className="promo-video-subtitle">{subtitle}</p>}

        <div className="promo-video-frame">
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
                <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-pink text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </section>
    </FadeIn>
  )
}
