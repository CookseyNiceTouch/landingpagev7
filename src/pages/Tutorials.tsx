import { useState } from 'react'
import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import { VIDEO_SECTIONS } from '@/data/tutorials'
import type { Video } from '@/data/tutorials'

function VideoCard({ video }: { video: Video }): ReactElement {
  const [active, setActive] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`

  return (
    <div className="flex flex-col gap-3 pointer-events-auto">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-border bg-black">
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
            onClick={() => setActive(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer bg-transparent border-none p-0"
            aria-label={`Play: ${video.title}`}
          >
            <img
              src={thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        )}
      </div>
      <h3 className="m-0 text-[clamp(14px,1vw,17px)] font-semibold text-white/80 leading-snug">
        {video.title}
      </h3>
    </div>
  )
}

export default function Tutorials(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(40px,5vw,72px)] p-[clamp(24px,4vw,96px)] px-4 sm:px-10 pointer-events-none">
      <SEO
        title="Tutorials & Media"
        description="Video tutorials, walkthroughs, and creator stories from the Nice Touch team. Learn multicam editing in DaVinci Resolve and Premiere Pro."
        path="/tutorials"
      />

      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h1 className="m-0 text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight tracking-tight">
          Tutorials &amp; Media
        </h1>
        <p className="m-0 text-[clamp(14px,1.1vw,18px)] text-white/55 max-w-[36rem]">
          Video guides, walkthroughs, and creator stories from the Nice Touch team.
        </p>
      </FadeIn>

      {VIDEO_SECTIONS.map((section, sIdx) => (
        <Container key={section.heading} size="lg">
          <div className="flex flex-col gap-[clamp(20px,2.5vw,36px)]">
            <FadeIn>
              <div className="flex flex-col gap-2">
                <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
                  {section.heading}
                </h2>
                <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/45 max-w-[40rem]">
                  {section.description}
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(16px,2vw,28px)]">
              {section.videos.map((video, vIdx) => (
                <FadeIn key={video.id} delay={(sIdx * 3 + vIdx) * 60}>
                  <VideoCard video={video} />
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      ))}
    </div>
  )
}
