import type { ReactElement } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon?: string
  className?: string
}

function FeatureCard({
  title,
  description,
  icon,
  className = '',
}: FeatureCardProps): ReactElement {
  return (
    <div className={`feature-card card ${className}`.trim()}>
      {icon && (
        <div className="feature-card-icon-wrapper">
          <img src={icon} alt="" className="feature-card-icon" />
        </div>
      )}
      
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  )
}

export default FeatureCard



