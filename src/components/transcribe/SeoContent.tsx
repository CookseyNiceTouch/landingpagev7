import { useCallback } from 'react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { BENEFITS, FAQ, STEPS, USE_CASES, TRANSCODER_PATH } from '@/data/transcribe'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

export default function SeoContent(): ReactElement {
  const openModal = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_TRY_NOW))
  }, [])

  return (
    <Container size="lg" className="flex flex-col gap-[clamp(48px,6vw,96px)] pointer-events-auto">
      <FadeIn className="flex flex-col gap-6">
        <h2 className="m-0 text-[clamp(22px,2.2vw,32px)] font-bold text-white leading-tight">
          Why use this transcription tool?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex flex-col gap-2 p-[clamp(18px,2vw,28px)] border-2 border-border rounded-lg bg-black/20"
            >
              <h3 className="m-0 text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
                {b.title}
              </h3>
              <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/55 leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="flex flex-col gap-6">
        <h2 className="m-0 text-[clamp(22px,2.2vw,32px)] font-bold text-white leading-tight">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-2 p-[clamp(18px,2vw,28px)] border-2 border-border rounded-lg bg-black/20"
            >
              <h3 className="m-0 text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
                {step.title}
              </h3>
              <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/55 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="flex flex-col gap-6">
        <h2 className="m-0 text-[clamp(22px,2.2vw,32px)] font-bold text-white leading-tight">
          Built for the way you actually work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {USE_CASES.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-2 p-[clamp(18px,2vw,28px)] border-2 border-border rounded-lg bg-black/20"
            >
              <h3 className="m-0 text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
                {c.title}
              </h3>
              <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/55 leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="flex flex-col gap-6">
        <h2 className="m-0 text-[clamp(22px,2.2vw,32px)] font-bold text-white leading-tight">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group p-[clamp(18px,2vw,28px)] border-2 border-border rounded-lg bg-black/20"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[clamp(14px,1.1vw,17px)] font-semibold text-white leading-tight">
                {item.q}
                <span aria-hidden className="text-pink text-2xl leading-none transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 mb-0 text-[clamp(13px,1vw,15px)] text-white/70 leading-relaxed">
                {item.q.toLowerCase().includes('bigger') ? (
                  <>
                    Run it through our{' '}
                    <Link to={TRANSCODER_PATH} className="text-pink hover:text-white underline">
                      free Nice Touch File Converter
                    </Link>{' '}
                    first to compress or trim it, then come back here.
                  </>
                ) : (
                  item.a
                )}
              </p>
            </details>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="flex flex-col items-center gap-4 text-center p-[clamp(28px,3vw,48px)] border-2 border-border rounded-lg bg-pink/10">
        <h2 className="m-0 text-[clamp(20px,2vw,28px)] font-bold text-white leading-tight">
          Edit faster with Nice Touch
        </h2>
        <p className="m-0 text-[clamp(14px,1.1vw,17px)] text-white/70 leading-relaxed max-w-[52ch]">
          Free transcripts are just the start. Nice Touch is an AI edit assistant that lives inside DaVinci Resolve and Adobe Premiere Pro &mdash; select clips, describe the cut you want, ship faster.
        </p>
        <Button variant="primary" size="lg" onClick={openModal}>
          Get Nice Touch free
        </Button>
      </FadeIn>
    </Container>
  )
}
