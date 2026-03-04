import type { ReactElement } from 'react'
import type { InfocardContent } from '@/data/home'

interface InfocardProps {
  content: InfocardContent
  className?: string
}

export default function Infocard({
  content,
  className = '',
}: InfocardProps): ReactElement {
  const isList = Array.isArray(content.body)

  return (
    <div className={`infocard ${className}`.trim()}>
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
