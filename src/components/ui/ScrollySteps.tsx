import { useLayoutEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  id: string
  title: string
  lines: string[]
}

interface ScrollyStepsProps {
  steps: [Step, Step, Step]
  images: [string, string, string, string]
}

export default function ScrollySteps({ steps, images }: ScrollyStepsProps): ReactElement {
  const outerRef = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)
  const img4Ref = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    // Skip animation on narrow screens — mobile fallback handles layout
    if (window.matchMedia('(max-width: 768px)').matches) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // ── Step 1 (Analyse): fade in, hold, fade out ──────────────────
      // Image stays on img1 (04b) — no change needed
      tl.fromTo(step1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step1Ref.current, { opacity: 1, duration: 0.6 })
        .to(step1Ref.current, { opacity: 0, duration: 0.2 })

      // ── Crossfade img1→img2 (simultaneous with step1 fade-out) ─────
        .to(img1Ref.current, { opacity: 0, duration: 0.2 }, '<')
        .fromTo(img2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

      // ── Step 2 (Explore): fade in, hold, fade out ──────────────────
        .fromTo(step2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step2Ref.current, { opacity: 1, duration: 0.6 })
        .to(step2Ref.current, { opacity: 0, duration: 0.2 })

      // ── Crossfade img2→img3 (simultaneous with step2 fade-out) ─────
        .to(img2Ref.current, { opacity: 0, duration: 0.2 }, '<')
        .fromTo(img3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

      // ── Step 3 (Rough Cut): fade in, hold ──────────────────────────
        .fromTo(step3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step3Ref.current, { opacity: 1, duration: 0.6 })

      // ── Crossfade img3→img4 mid-way through step3 hold ─────────────
        .to(img3Ref.current, { opacity: 0, duration: 0.2 }, '-=0.4')
        .fromTo(img4Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

      // ── End hold: step3 + img4 remain ──────────────────────────────
        .to(step3Ref.current, { opacity: 1, duration: 0.2 })
    }, outer)

    return () => ctx.revert()
  }, [])

  const stepFontSize = 'clamp(14px, 1.1vw, 17px)'

  return (
    <>
    {/* ── Mobile fallback (≤768px): static stacked layout ─────────── */}
    <div className="md:hidden px-6" style={{ marginTop: '22vh', paddingBottom: '60px' }}>
      <div style={{ width: 'min(1200px, calc(100% - 48px))', margin: '0 auto' }}>
        <img
          src={images[0]}
          alt="Section 2 device"
          className="block w-full rounded-xl object-contain mx-auto mb-10"
          style={{ maxHeight: '118vh', width: 'auto' }}
        />
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col gap-2 mb-8">
            <h3 className="m-0 font-bold text-yellow" style={{ fontSize: 'clamp(14px, 4vw, 17px)' }}>
              {i + 1}.&nbsp;&nbsp;{step.title}
            </h3>
            <div className="flex flex-col gap-0.5">
              {step.lines.map((line, j) => (
                <p key={j} className="m-0 text-white/60 leading-snug" style={{ fontSize: 'clamp(13px, 3.5vw, 15px)' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Desktop: scrollytelling sticky layout (>768px) ────────── */}
    <div
      ref={outerRef}
      className="hidden md:block"
      style={{ height: '300vh', position: 'relative', marginTop: '22vh' }}
    >
      {/* ── Sticky viewport-height frame ─────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="relative px-6"
          style={{ width: 'min(1200px, calc(100% - 48px))', margin: '0 auto' }}
        >
          {/* 3-column grid: text | image (center anchor) | spacer */}
          <div
            className="grid grid-cols-1 items-center"
            style={{
              gridTemplateColumns: 'minmax(200px, 420px) minmax(280px, 480px) minmax(200px, 420px)',
              columnGap: '64px',
            }}
          >
            {/* Col 1 — stacked text blocks, all absolute over each other */}
            <div style={{ position: 'relative', height: '260px' }}>
              {[
                { ref: step1Ref, step: steps[0], index: 0 },
                { ref: step2Ref, step: steps[1], index: 1 },
                { ref: step3Ref, step: steps[2], index: 2 },
              ].map(({ ref, step, index }) => (
                <div
                  key={step.id}
                  ref={ref}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                  }}
                  className="flex flex-col gap-2"
                >
                  <h3
                    className="m-0 font-bold text-yellow"
                    style={{ fontSize: stepFontSize }}
                  >
                    {index + 1}.&nbsp;&nbsp;{step.title}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    {step.lines.map((line, j) => (
                      <p
                        key={j}
                        className="m-0 text-white/60 leading-snug"
                        style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2 — stacked images, all absolute, 04b starts visible */}
            <div
              className="flex justify-center items-center"
              style={{ position: 'relative', height: '1601px', maxHeight: '156vh' }}
            >
              {[img1Ref, img2Ref, img3Ref, img4Ref].map((ref, i) => (
                <img
                  key={i}
                  ref={ref}
                  src={images[i]}
                  alt={`Section 2 step ${i + 1}`}
                  className="rounded-xl object-contain"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxHeight: '156vh',
                    width: 'auto',
                    opacity: i === 0 ? 1 : 0,
                  }}
                />
              ))}
            </div>

            {/* Col 3 — empty spacer */}
            <div />
          </div>
        </div>
      </div>
    </div>{/* end desktop sticky outer */}
    </>
  )
}
