import type { ReactElement } from 'react'

interface SectionTitleProps {
  children: string
  /** Optional small accent label above the heading */
  eyebrow?: string
  className?: string
}

export default function SectionTitle({
  children,
  eyebrow,
  className = '',
}: SectionTitleProps): ReactElement {
  return (
    <div className={`section-title-wrapper ${className}`}>
      {eyebrow && <span className="type-eyebrow">{eyebrow}</span>}
      <h2 className="type-title">{children}</h2>
    </div>
  )
}
