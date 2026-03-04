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
      <TextType
        as="h2"
        text={children}
        className="type-title"
        typingSpeed={28}
        initialDelay={150}
        showCursor
        cursorCharacter="_"
        cursorBlinkDuration={0.6}
        loop={false}
        startOnVisible
      />
    </div>
  )
}
