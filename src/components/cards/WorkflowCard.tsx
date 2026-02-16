import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface WorkflowCardProps {
  title: string
  targetAudience: string
  outcome: string
  features: string[]
  url: string
  className?: string
}

function WorkflowCard({
  title,
  targetAudience,
  outcome,
  features,
  url,
  className = '',
}: WorkflowCardProps): ReactElement {
  return (
    <Link to={url} className={`workflow-card card ${className}`.trim()}>
      <div className="workflow-card-header">
        <h3 className="workflow-card-title">{title}</h3>
        <span className="workflow-card-audience">{targetAudience}</span>
      </div>
      
      <p className="workflow-card-outcome">{outcome}</p>
      
      <ul className="workflow-card-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      
      <span className="workflow-card-link-text">View workflow →</span>
    </Link>
  )
}

export default WorkflowCard




