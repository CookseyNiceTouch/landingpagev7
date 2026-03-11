import { useEffect, useRef, useCallback } from 'react'
import type { ReactElement } from 'react'
import './HeroImage.css'

interface HeroImageProps {
  src: string
  alt?: string
  className?: string
}

export default function HeroImage({ src, alt = '', className = '' }: HeroImageProps): ReactElement {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const el = wrapRef.current
    if (!el) return

    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      const dist = Math.min(Math.hypot(dx, dy), 1.2)

      const shiftX = dx * dist * 60
      const shiftY = dy * dist * 30

      el.style.setProperty('--ab-rx', `${shiftX}px`)
      el.style.setProperty('--ab-ry', `${shiftY}px`)
      el.style.setProperty('--ab-gx', `${-shiftX * 0.6}px`)
      el.style.setProperty('--ab-gy', `${-shiftY * 0.6}px`)
      el.style.setProperty('--ab-bx', `${-shiftX * 1.1}px`)
      el.style.setProperty('--ab-by', `${shiftY * 0.8}px`)
    })
  }, [])

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
    const el = wrapRef.current
    if (!el) return

    const section = el.closest('.hero-section')
    const target = (section ?? document) as HTMLElement

    target.addEventListener('pointermove', handlePointerMove as EventListener)
    target.addEventListener('pointerleave', handlePointerLeave as EventListener)

    return () => {
      target.removeEventListener('pointermove', handlePointerMove as EventListener)
      target.removeEventListener('pointerleave', handlePointerLeave as EventListener)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [handlePointerMove, handlePointerLeave])

  return (
    <div
      ref={wrapRef}
      className={`hero-img-wrap ${className}`.trim()}
      aria-hidden="true"
      style={{
        '--ab-rx': '0px',
        '--ab-ry': '0px',
        '--ab-gx': '0px',
        '--ab-gy': '0px',
        '--ab-bx': '0px',
        '--ab-by': '0px',
      } as React.CSSProperties}
    >
      {/* Base image — all channels visible */}
      <img src={src} alt={alt} className="hero-img hero-img--base" />
      {/* R channel layer */}
      <img src={src} alt="" className="hero-img hero-img--r" />
      {/* G channel layer */}
      <img src={src} alt="" className="hero-img hero-img--g" />
      {/* B channel layer */}
      <img src={src} alt="" className="hero-img hero-img--b" />
    </div>
  )
}
