import { useRef, useState, useEffect, useCallback, type ReactElement } from 'react'
import { DEMO_STEPS } from '@/data/home'
import Infocard from '@/components/ui/Infocard'
import demoDevice from '@/assets/images/devices/demo.png'

const DESKTOP_MQ = '(min-width: 1024px)'

function activeIndex(progress: number, total: number): number {
  return Math.min(total - 1, Math.floor(progress * total))
}

export default function DemoSection(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const isDesktop = useRef(true)

  const update = useCallback(() => {
    const el = containerRef.current
    if (!el || !isDesktop.current) return
    const rect = el.getBoundingClientRect()
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
    setActive(activeIndex(progress, DEMO_STEPS.length))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const handleMq = (e: MediaQueryListEvent | MediaQueryList) => {
      isDesktop.current = e.matches
      if (!e.matches) setActive(-1)
    }
    handleMq(mq)
    mq.addEventListener('change', handleMq)

    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      mq.removeEventListener('change', handleMq)
      window.removeEventListener('scroll', update)
    }
  }, [update])

  return (
    <section ref={containerRef} className="demo-scroll-container">
      <div className="demo-sticky-frame">
        <div className="demo-infocards">
          {DEMO_STEPS.map((step, i) => (
            <Infocard
              key={step.heading}
              content={step}
              className="type-body demo-infocard"
              style={{ opacity: active === i || active === -1 ? 1 : 0 }}
            />
          ))}
        </div>

        <img
          src={demoDevice}
          alt="Nice Touch demo — upload, chat, generate"
          className="demo-device"
          data-cable-anchor="demo-device"
        />
      </div>
    </section>
  )
}
