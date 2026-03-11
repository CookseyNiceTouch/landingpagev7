import type { CSSProperties, ReactElement, ReactNode } from 'react'
import type { InfocardContent } from '@/data/home'

interface InfocardProps {
  content: InfocardContent
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function Infocard({
  content,
  className = '',
  style,
  children,
}: InfocardProps): ReactElement {
  const isList = Array.isArray(content.body)

  return (
    <div className={`infocard ${className}`.trim()} style={style}>
      {children}
      <h3 className="type-card-heading para-gap">{content.heading}</h3>
      {isList ? (
        <ul className="infocard-list">
          {(content.body as string[]).map((item, i) => (
            <li key={i} className="infocard-list-item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body infocard-body">{content.body}</p>
      )}
    </div>
  )
}
