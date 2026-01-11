import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../contexts/ModalContext'

interface CTABlockProps {
  heading?: string
  description?: string
  showContactLink?: boolean
  className?: string
}

function CTABlock({
  heading = 'See this in your workflow',
  description,
  showContactLink = true,
  className = '',
}: CTABlockProps): ReactElement {
  const { openGetAppModal } = useModal()

  return (
    <section className={`cta-block ${className}`.trim()}>
      <div className="cta-block-content">
        <h2 className="cta-block-heading">{heading}</h2>
        {description && <p className="cta-block-description">{description}</p>}
        
        <div className="cta-block-actions">
          <button onClick={openGetAppModal} className="get-app-button">
            Get the App
          </button>
          {showContactLink && (
            <Link to="/contact" className="cta-block-secondary-link">
              Contact us
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CTABlock

