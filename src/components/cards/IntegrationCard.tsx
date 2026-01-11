import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface IntegrationCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  url: string
  className?: string
}

function IntegrationCard({
  icon,
  title,
  description,
  features,
  url,
  className = '',
}: IntegrationCardProps): ReactElement {
  return (
    <Link to={url} className={`integration-card card ${className}`.trim()}>
      <div className="integration-card-header">
        <img src={icon} alt={title} className="integration-card-icon" />
        <h3 className="integration-card-title">{title}</h3>
      </div>
      
      <p className="integration-card-description">{description}</p>
      
      <ul className="integration-card-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      
      <span className="integration-card-link-text">Learn more →</span>
    </Link>
  )
}

export default IntegrationCard

