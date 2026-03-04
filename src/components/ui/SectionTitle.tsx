import type { ReactElement } from 'react'

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
      <h2 className="type-title">{children}</h2>
    </div>
  )
}
