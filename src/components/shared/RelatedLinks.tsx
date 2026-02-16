import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface RelatedLink {
  title: string
  url: string
  description?: string
}

interface RelatedLinksProps {
  links: RelatedLink[]
  heading?: string
  className?: string
}

function RelatedLinks({
  links,
  heading = 'Related',
  className = '',
}: RelatedLinksProps): ReactElement {
  return (
    <section className={`related-links ${className}`.trim()}>
      <h2 className="related-links-heading">{heading}</h2>
      <div className="related-links-list">
        {links.map((link, index) => (
          <Link key={index} to={link.url} className="related-link-item">
            <h3 className="related-link-title">{link.title}</h3>
            {link.description && (
              <p className="related-link-description">{link.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedLinks




