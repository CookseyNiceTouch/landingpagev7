import type { ReactElement } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import VideoEmbed from '../../components/shared/VideoEmbed'
import RelatedLinks from '../../components/shared/RelatedLinks'
import CTABlock from '../../components/shared/CTABlock'
import GetAppBlock from '../../components/shared/GetAppBlock'
import SEOHead from '../../components/shared/SEOHead'
import { content } from '../../data/content'
import { seoData } from '../../data/seo'
import { generateSoftwareApplicationSchema, generateFAQSchema, combinedSchema } from '../../utils/structuredData'

function PremierePro(): ReactElement {
  const premiereContent = content.integrationsDetail.premiere
  const premiereSEO = seoData.integrationsDetail.premiere

  const structuredData = combinedSchema(
    generateSoftwareApplicationSchema(
      'Nice Touch for Adobe Premiere Pro',
      'AI assistant for Adobe Premiere Pro that helps editors apply feedback, speed up rough cuts, and improve delivery confidence'
    ),
    generateFAQSchema(premiereContent.faq)
  )

  return (
    <PageLayout>
      <SEOHead
        title={premiereSEO.title}
        description={premiereSEO.description}
        canonicalUrl={premiereSEO.canonicalUrl}
        ogImage={premiereSEO.ogImage}
        structuredData={structuredData}
      />

      <div className="integration-detail-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{premiereContent.hero.h1}</h1>
          <p className="page-description">{premiereContent.hero.description}</p>
        </section>

        {/* Video */}
        <section className="product-section">
          <VideoEmbed
            videoUrl={premiereContent.hero.videoUrl}
            title={premiereContent.hero.videoTitle}
            transcript={premiereContent.hero.videoTranscript}
          />
        </section>

        {/* What You Can Do */}
        <section className="product-section">
          <h2 className="section-heading">{premiereContent.whatYouCanDo.heading}</h2>
          <ul className="feature-list">
            {premiereContent.whatYouCanDo.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Example Workflow */}
        <section className="product-section">
          <h2 className="section-heading">{premiereContent.exampleWorkflow.heading}</h2>
          <ol className="workflow-steps">
            {premiereContent.exampleWorkflow.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Compatibility */}
        <section className="product-section">
          <h2 className="section-heading">{premiereContent.compatibility.heading}</h2>
          <div className="compatibility-content">
            <div>
              <h3>Requirements</h3>
              <ul>
                {premiereContent.compatibility.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Limitations</h3>
              <ul>
                {premiereContent.compatibility.limitations.map((lim, index) => (
                  <li key={index}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">Premiere Pro FAQ</h2>
          <div className="faq-list">
            {premiereContent.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks links={premiereContent.related} />

        {/* CTA Block */}
        <CTABlock />

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default PremierePro



