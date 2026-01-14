import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import WorkflowCard from '../../components/cards/WorkflowCard'
import GetAppBlock from '../../components/shared/GetAppBlock'
import SEOHead from '../../components/shared/SEOHead'
import { content } from '../../data/content'
import { seoData } from '../../data/seo'

function WorkflowsHub(): ReactElement {
  const workflowsContent = content.workflows
  const workflowsSEO = seoData.workflows

  return (
    <PageLayout>
      <SEOHead
        title={workflowsSEO.title}
        description={workflowsSEO.description}
        canonicalUrl={workflowsSEO.canonicalUrl}
        ogImage={workflowsSEO.ogImage}
      />

      <div className="workflows-hub-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{workflowsContent.hero.h1}</h1>
          <p className="page-description">{workflowsContent.hero.description}</p>
        </section>

        {/* Workflow Cards */}
        <section className="workflows-list">
          <div className="workflows-grid">
            {workflowsContent.cards.map((workflow, index) => (
              <WorkflowCard
                key={index}
                title={workflow.title}
                targetAudience={workflow.targetAudience}
                outcome={workflow.outcome}
                features={workflow.features}
                url={workflow.url}
              />
            ))}
          </div>
        </section>

        {/* Mapping to Nice Touch */}
        <section className="product-section">
          <h2 className="section-heading">{workflowsContent.mapping.heading}</h2>
          <p>{workflowsContent.mapping.description}</p>
          <div className="mapping-links">
            {workflowsContent.mapping.links.map((link, index) => (
              <Link key={index} to={link.url} className="section-link">
                {link.text}
              </Link>
            ))}
          </div>
        </section>

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default WorkflowsHub



