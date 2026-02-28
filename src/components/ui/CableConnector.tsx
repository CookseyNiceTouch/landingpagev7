import { useEffect, useLayoutEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CableConnectorProps {
  triggerRef: React.RefObject<HTMLElement | null>
  /** Vertical position of the cable (top of SVG). Use % or px, e.g. '55%' or '400px' */
  top?: string
  /** Horizontal offset from center in px. Positive = right, negative = left. */
  offsetX?: number
  /** Horizontal offset as % of viewport. Positive = right. e.g. 20 for 20vw */
  offsetXPercent?: number
  /** Scale factor. 1 = original size, 0.5 = half, 1.2 = 20% larger */
  scale?: number
  /** Pixels of scroll after which the cable is fully drawn. e.g. 600 */
  scrollDistance?: number
  /** Easing curve. 'power2.out' = snappy start, 'power2.in' = snappy end, 'none' = linear */
  ease?: string
}

export default function CableConnector({
  triggerRef,
  top = '10%',
  offsetX = 0,
  offsetXPercent = 0,
  scale = 1,
  scrollDistance = 600,
  ease = 'power2.out',
}: CableConnectorProps): ReactElement {
  const pathRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    path.setAttribute('stroke-dasharray', String(length))
    path.setAttribute('stroke-dashoffset', String(length))
    path.style.visibility = 'visible'
    // #region agent log
    fetch('http://127.0.0.1:7291/ingest/50168c08-f856-4393-8da5-0d994aeb6fba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f8dce4'},body:JSON.stringify({sessionId:'f8dce4',location:'CableConnector.tsx:useLayoutEffect',message:'Layout effect ran',data:{length,attrDasharray:path.getAttribute('stroke-dasharray'),attrDashoffset:path.getAttribute('stroke-dashoffset'),styleDashoffset:path.style.strokeDashoffset,visibility:path.style.visibility},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{})
    // #endregion
  }, [])

  useEffect(() => {
    const path = pathRef.current
    const trigger = triggerRef.current
    if (!path || !trigger) return

    const length = path.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          ease,
          scrollTrigger: {
            trigger,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: 1,
          },
        }
      )
      // #region agent log
      requestAnimationFrame(() => {
        fetch('http://127.0.0.1:7291/ingest/50168c08-f856-4393-8da5-0d994aeb6fba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f8dce4'},body:JSON.stringify({sessionId:'f8dce4',location:'CableConnector.tsx:useEffect:rAF',message:'After GSAP setup (rAF)',data:{attrDasharray:path.getAttribute('stroke-dasharray'),attrDashoffset:path.getAttribute('stroke-dashoffset'),styleDashoffset:path.style.strokeDashoffset,scrollY:window.scrollY},timestamp:Date.now(),hypothesisId:'D'})}).catch(()=>{})
      })
      // #endregion
    })

    return () => ctx.revert()
  }, [triggerRef, scrollDistance, ease])

  const xOffset = offsetXPercent ? `${offsetX}px + ${offsetXPercent}vw` : `${offsetX}px`
  const transform = `translateX(calc(-50% + ${xOffset})) scale(${scale})`

  return (
    <div
      className="absolute inset-0 pointer-events-none flex justify-center"
      style={{ top, zIndex: -1 }}
    >
      <svg
        width="789"
        height="815"
        viewBox="-25 -25 850 930"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{
          left: '50%',
          transform,
          transformOrigin: 'center top',
          overflow: 'visible',
        }}
      >
        <path
          ref={pathRef}
          d="M0.429688 0.257324C71.7049 118.995 372.3 10.0398 524.147 59.6263C629.511 94.0333 759.665 222.891 781.358 393.576C811.195 628.349 744.171 715.625 626.412 779.474C446.674 876.929 378.498 738.658 177.068 738.658"
          stroke="#F2E94E"
          strokeWidth="25"
          fill="none"
          style={{ visibility: 'hidden' }}
        />
      </svg>
    </div>
  )
}
