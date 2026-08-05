import type { ReactElement, ReactNode } from 'react'
import FadeIn from '@/components/ui/FadeIn'

/** Content width cap. `full` keeps the gutters but removes the cap. */
export type SectionWidth = 'narrow' | 'content' | 'wide' | 'full'

/** Vertical rhythm. `none` is for sections that own their own spacing. */
export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg'

interface SectionProps {
  /** Small uppercase label above the title. */
  eyebrow?: string
  title?: string
  subtitle?: string
  width?: SectionWidth
  spacing?: SectionSpacing
  align?: 'left' | 'center'
  /**
   * Heading level for `title`. Defaults to h2 — every page already has its
   * h1 elsewhere, and verify-prerender fails the build on a second one.
   */
  headingLevel?: 'h2' | 'h3'
  id?: string
  className?: string
  children?: ReactNode
}

export default function Section({
  eyebrow,
  title,
  subtitle,
  width = 'content',
  spacing = 'lg',
  align = 'left',
  headingLevel: Heading = 'h2',
  id,
  className = '',
  children,
}: SectionProps): ReactElement {
  const hasHead = Boolean(eyebrow || title || subtitle)

  return (
    <section id={id} className={`nt-section nt-section--sp-${spacing} ${className}`.trim()}>
      <div className={`nt-section__inner nt-section__inner--${width}`}>
        {hasHead && (
          <FadeIn>
            <div className={`nt-section__head${align === 'center' ? ' nt-section__head--center' : ''}`}>
              {eyebrow && <span className="type-eyebrow">{eyebrow}</span>}
              {title && <Heading className="type-title">{title}</Heading>}
              {subtitle && <p className="nt-section__subtitle type-subtitle">{subtitle}</p>}
            </div>
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
