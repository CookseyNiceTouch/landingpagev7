import { useEffect, useLayoutEffect, useRef } from 'react'
import type { ReactElement } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CableConnectorProps {
  triggerRef: React.RefObject<HTMLElement | null>
  /** The SVG path d attribute */
  pathD?: string
  /** SVG viewBox string. Defaults to Cable 1 viewBox. */
  viewBoxValue?: string
  /** SVG intrinsic width. Defaults to 789. */
  svgWidth?: number
  /** SVG intrinsic height. Defaults to 815. */
  svgHeight?: number
  /** Vertical position of the cable (top of SVG). Use % or px, e.g. '55%' or '400px' */
  top?: string
  /** Horizontal offset in px from center of the 1200px content column. Positive = right, negative = left. */
  offsetX?: number
  /** Scale factor. 1 = original size, 0.5 = half, 1.2 = 20% larger */
  scale?: number
  /** Pixels of scroll after which the cable is fully drawn. e.g. 600 */
  scrollDistance?: number
  /** ScrollTrigger start value. e.g. 'top top' (default), 'top 80%', 'top bottom' */
  scrollStart?: string
  /** Easing curve. 'power2.out' = snappy start, 'power2.in' = snappy end, 'none' = linear */
  ease?: string
  /** SVG stroke width in px. Defaults to 25. */
  strokeWidth?: number
  /** If true, shows the full path statically with no scroll animation — useful for positioning */
  noAnimation?: boolean
}

const CABLE1_PATH = 'M0.429688 0.257324C71.7049 118.995 372.3 10.0398 524.147 59.6263C629.511 94.0333 759.665 222.891 781.358 393.576C811.195 628.349 744.171 715.625 626.412 779.474C446.674 876.929 378.498 738.658 177.068 738.658'

export default function CableConnector({
  triggerRef,
  pathD = CABLE1_PATH,
  viewBoxValue = '-25 -25 850 930',
  svgWidth = 789,
  svgHeight = 815,
  top = '10%',
  offsetX = 0,
  scale = 1,
  scrollDistance = 100,
  scrollStart = 'top top',
  ease = 'power10.out',
  strokeWidth = 25,
  noAnimation = false,
}: CableConnectorProps): ReactElement {
  const pathRef = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    if (noAnimation) {
      // Show the full path immediately with no dash clipping
      path.removeAttribute('stroke-dasharray')
      path.removeAttribute('stroke-dashoffset')
      path.style.visibility = 'visible'
      return
    }
    const length = path.getTotalLength()
    path.setAttribute('stroke-dasharray', String(length))
    path.setAttribute('stroke-dashoffset', String(length))
    path.style.visibility = 'visible'
  }, [noAnimation])

  useEffect(() => {
    if (noAnimation) return
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
            start: scrollStart,
            end: `+=${scrollDistance}`,
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [triggerRef, scrollDistance, scrollStart, ease, noAnimation])

  const transform = `translateX(calc(-50% + ${offsetX}px)) scale(${scale})`

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ top, zIndex: -1 }}
    >
      {/* Constrained column — mirrors the 1200px content container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', height: '100%' }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBoxValue}
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
          d={pathD}
          stroke="#F2E94E"
          strokeWidth={strokeWidth}
          fill="none"
          style={{ visibility: noAnimation ? 'visible' : 'hidden' }}
        />
      </svg>
      </div>
    </div>
  )
}
