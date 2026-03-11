import type { ReactElement } from 'react'
import TextType from '@/components/ui/TextType'

interface SectionTitleProps {
  children: string
  className?: string
}

export default function SectionTitle({
  children,
  className = '',
}: SectionTitleProps): ReactElement {
  return (
    <div className={`section-title-wrapper ${className}`}>
      <div className="section-title-inner">
        {/* Ghost: invisible copy that always holds the final rendered height */}
        <h2 className="type-title section-title-ghost" aria-hidden="true">
          <span className="section-title-highlight">{children}</span>
        </h2>

        {/* Typed text sits on top via position:absolute */}
        <TextType
          as="h2"
          text={children}
          className="type-title section-title-typed"
          typingSpeed={28}
          initialDelay={150}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.6}
          loop={false}
          startOnVisible
        />
      </div>
    </div>
  )
}
