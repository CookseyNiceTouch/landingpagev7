import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import GetAppBlock from '../components/shared/GetAppBlock'
import SEOHead from '../components/shared/SEOHead'
import { content } from '../data/content'
import { seoData } from '../data/seo'
import { generateSoftwareApplicationSchema, generateFAQSchema, combinedSchema } from '../utils/structuredData'

function Product(): ReactElement {
  const productContent = content.product
  const productSEO = seoData.product

  const structuredData = combinedSchema(
    generateSoftwareApplicationSchema(
      'Nice Touch',
      'AI video editing assistant for professional editors and teams'
    ),
    generateFAQSchema(productContent.faq)
  )

  return (
    <PageLayout>
      <SEOHead
        title={productSEO.title}
        description={productSEO.description}
        canonicalUrl={productSEO.canonicalUrl}
        ogImage={productSEO.ogImage}
        structuredData={structuredData}
      />

      <div className="product-page container-narrow">
        {/* Hero */}
        <section className="product-hero">
          <h1 className="page-title">{productContent.hero.h1}</h1>
          <p className="page-description">{productContent.hero.description}</p>
        </section>

        {/* Core Outcomes */}
        <section className="product-section">
          <div className="outcomes-grid">
            {productContent.outcomes.map((outcome, index) => (
              <div key={index} className="outcome-card card">
                <h3 className="outcome-title">{outcome.title}</h3>
                <p className="outcome-description">{outcome.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="product-section">
          <h2 className="section-heading">{productContent.howItWorks.heading}</h2>
          <div className="how-it-works-steps">
            {productContent.howItWorks.steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="product-section">
          <h2 className="section-heading">{productContent.capabilities.heading}</h2>
          <div className="capabilities-groups">
            {productContent.capabilities.groups.map((group, index) => (
              <div key={index} className="capability-group">
                <h3 className="capability-group-title">{group.title}</h3>
                <ul className="capability-list">
                  {group.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* For Editors */}
        <section id={productContent.forEditors.id} className="product-section for-audience">
          <h2 className="section-heading">{productContent.forEditors.heading}</h2>
          <div className="audience-content">
            <div className="audience-column">
              <h3>Pain points</h3>
              <ul>
                {productContent.forEditors.painPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="audience-column">
              <h3>How Nice Touch helps</h3>
              <ul>
                {productContent.forEditors.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/workflows" className="section-link">
            Explore workflows →
          </Link>
        </section>

        {/* For Teams */}
        <section id={productContent.forTeams.id} className="product-section for-audience">
          <h2 className="section-heading">{productContent.forTeams.heading}</h2>
          <div className="audience-content">
            <div className="audience-column">
              <h3>Pain points</h3>
              <ul>
                {productContent.forTeams.painPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="audience-column">
              <h3>How Nice Touch helps</h3>
              <ul>
                {productContent.forTeams.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/pricing" className="section-link">
            View pricing →
          </Link>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-list">
            {productContent.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default Product




