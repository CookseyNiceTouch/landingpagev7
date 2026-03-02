import { useLayoutEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STEPS } from '@/data/home'
import img04b from '@/assets/images/Section02_RoughCut04b.png'
import img04c from '@/assets/images/Section02_RoughCut04c.png'
import img04d from '@/assets/images/Section02_RoughCut04d.png'
import img04e from '@/assets/images/Section02_RoughCut04e.png'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [img04b, img04c, img04d, img04e] as const

export default function StepsSection(): ReactElement {
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

      tl.fromTo(step1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step1Ref.current, { opacity: 1, duration: 0.6 })
        .to(step1Ref.current, { opacity: 0, duration: 0.2 })

        .to(img1Ref.current, { opacity: 0, duration: 0.2 }, '<')
        .fromTo(img2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

        .fromTo(step2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step2Ref.current, { opacity: 1, duration: 0.6 })
        .to(step2Ref.current, { opacity: 0, duration: 0.2 })

        .to(img2Ref.current, { opacity: 0, duration: 0.2 }, '<')
        .fromTo(img3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

        .fromTo(step3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
        .to(step3Ref.current, { opacity: 1, duration: 0.6 })

        .to(img3Ref.current, { opacity: 0, duration: 0.2 }, '-=0.4')
        .fromTo(img4Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '<')

        .to(step3Ref.current, { opacity: 1, duration: 0.2 })
    }, outer)

    return () => ctx.revert()
  }, [])

  const stepRefs = [step1Ref, step2Ref, step3Ref]
  const imgRefs = [img1Ref, img2Ref, img3Ref, img4Ref]

  return (
    <>
      {/* Mobile: static stacked layout */}
      <section className="md:hidden px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
        <div className="max-w-6xl mx-auto">
          <img
            src={IMAGES[0]}
            alt="Section 2 device"
            className="block w-auto max-h-[80vh] rounded-xl object-contain mx-auto mb-10"
          />
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex flex-col gap-2 mb-8 last:mb-0">
              <h3 className="m-0 font-bold text-yellow text-[clamp(14px,4vw,17px)]">
                {i + 1}.&nbsp;&nbsp;{step.title}
              </h3>
              <div className="flex flex-col gap-0.5">
                {step.lines.map((line, j) => (
                  <p key={j} className="m-0 text-white/60 leading-snug text-[clamp(13px,3.5vw,15px)]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop: scrollytelling sticky layout */}
      <div ref={outerRef} className="hidden md:block h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center px-[clamp(24px,8vw,120px)]">
          <div className="max-w-6xl mx-auto w-full flex items-center gap-[clamp(32px,4vw,64px)]">
            {/* Text column */}
            <div className="w-[clamp(200px,30%,380px)] shrink-0 relative h-[200px]">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  ref={stepRefs[i]}
                  className="absolute inset-x-0 top-0 flex flex-col gap-2"
                  style={{ opacity: 0 }}
                >
                  <h3 className="m-0 font-bold text-yellow text-[clamp(14px,1.1vw,17px)]">
                    {i + 1}.&nbsp;&nbsp;{step.title}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    {step.lines.map((line, j) => (
                      <p key={j} className="m-0 text-white/60 leading-snug text-[clamp(13px,1vw,15px)]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Image column */}
            <div className="flex-1 flex justify-center items-center relative">
              {IMAGES.map((src, i) => (
                <img
                  key={i}
                  ref={imgRefs[i]}
                  src={src}
                  alt={`Section 2 step ${i + 1}`}
                  className={`rounded-xl object-contain max-h-[90vh] w-auto ${i > 0 ? 'absolute inset-0 m-auto' : ''}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
