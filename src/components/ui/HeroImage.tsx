import { useEffect, useRef, useCallback } from 'react'
import type { ReactElement } from 'react'
import './HeroImage.css'

interface HeroImageProps {
  videoSrc: string
  posterSrc?: string
  alt?: string
  className?: string
}

export default function HeroImage({ videoSrc, posterSrc, alt = '', className = '' }: HeroImageProps): ReactElement {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLVideoElement[]>([])
  const durationRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const setVideoRef = useCallback((index: number) => (el: HTMLVideoElement | null) => {
    if (el) videosRef.current[index] = el
  }, [])

  const seekAll = useCallback((t: number) => {
    for (const v of videosRef.current) {
      if (v && Math.abs(v.currentTime - t) > 0.03) {
        v.currentTime = t
      }
    }
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const el = wrapRef.current
    if (!el) return

    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null

      // Chromatic aberration — based on full viewport position
      const dx = (e.clientX / window.innerWidth) * 2 - 1   // -1 (left) to +1 (right)
      const dy = (e.clientY / window.innerHeight) * 2 - 1  // -1 (top) to +1 (bottom)
      const dist = Math.min(Math.hypot(dx, dy), 1.2)

      const shiftX = dx * dist * 60
      const shiftY = dy * dist * 30

      el.style.setProperty('--ab-rx', `${shiftX}px`)
      el.style.setProperty('--ab-ry', `${shiftY}px`)
      el.style.setProperty('--ab-gx', `${-shiftX * 0.6}px`)
      el.style.setProperty('--ab-gy', `${-shiftY * 0.6}px`)
      el.style.setProperty('--ab-bx', `${-shiftX * 1.1}px`)
      el.style.setProperty('--ab-by', `${shiftY * 0.8}px`)

      // Video scrub based on X position across the full viewport
      if (durationRef.current > 0) {
        const progress = Math.max(0, Math.min(1, e.clientX / window.innerWidth))
        seekAll(progress * durationRef.current)
      }
    })
  }, [seekAll])

  const handlePointerLeave = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    el.style.setProperty('--ab-rx', '0px')
    el.style.setProperty('--ab-ry', '0px')
    el.style.setProperty('--ab-gx', '0px')
    el.style.setProperty('--ab-gy', '0px')
    el.style.setProperty('--ab-bx', '0px')
    el.style.setProperty('--ab-by', '0px')
  }, [])

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [handlePointerMove, handlePointerLeave])

  // Capture duration from the base video once metadata loads
  const handleMetadata = useCallback(() => {
    const base = videosRef.current[0]
    if (base) {
      durationRef.current = base.duration
      base.currentTime = 0
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`hero-img-wrap ${className}`.trim()}
      aria-hidden="true"
      aria-label={alt}
      style={{
        '--ab-rx': '0px',
        '--ab-ry': '0px',
        '--ab-gx': '0px',
        '--ab-gy': '0px',
        '--ab-bx': '0px',
        '--ab-by': '0px',
      } as React.CSSProperties}
    >
      <video
        ref={setVideoRef(0)}
        src={videoSrc}
        poster={posterSrc}
        className="hero-img hero-img--base"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleMetadata}
      />
      <video
        ref={setVideoRef(1)}
        src={videoSrc}
        className="hero-img hero-img--r"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={setVideoRef(2)}
        src={videoSrc}
        className="hero-img hero-img--g"
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={setVideoRef(3)}
        src={videoSrc}
        className="hero-img hero-img--b"
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}
