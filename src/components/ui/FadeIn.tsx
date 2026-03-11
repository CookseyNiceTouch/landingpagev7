import type { ReactElement, ReactNode, CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function FadeIn({ children, delay = 0, className = '', style }: FadeInProps): ReactElement {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      className={`fade-in ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  )
}
