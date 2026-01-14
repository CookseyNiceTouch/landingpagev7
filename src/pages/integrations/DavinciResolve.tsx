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

function DavinciResolve(): ReactElement {
  const resolveContent = content.integrationsDetail.resolve
  const resolveSEO = seoData.integrationsDetail.resolve

  const structuredData = combinedSchema(
    generateSoftwareApplicationSchema(
      'Nice Touch for DaVinci Resolve',
      'AI assistant for DaVinci Resolve that helps editors apply feedback, speed up rough cuts, and reduce delivery errors'
    ),
    generateFAQSchema(resolveContent.faq)
  )

  return (
    <PageLayout>
      <SEOHead
        title={resolveSEO.title}
        description={resolveSEO.description}
        canonicalUrl={resolveSEO.canonicalUrl}
        ogImage={resolveSEO.ogImage}
        structuredData={structuredData}
      />

      <div className="integration-detail-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{resolveContent.hero.h1}</h1>
          <p className="page-description">{resolveContent.hero.description}</p>
        </section>

        {/* Video */}
        <section className="product-section">
          <VideoEmbed
            videoUrl={resolveContent.hero.videoUrl}
            title={resolveContent.hero.videoTitle}
            transcript={resolveContent.hero.videoTranscript}
          />
        </section>

        {/* What You Can Do */}
        <section className="product-section">
          <h2 className="section-heading">{resolveContent.whatYouCanDo.heading}</h2>
          <ul className="feature-list">
            {resolveContent.whatYouCanDo.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Example Workflow */}
        <section className="product-section">
          <h2 className="section-heading">{resolveContent.exampleWorkflow.heading}</h2>
          <ol className="workflow-steps">
            {resolveContent.exampleWorkflow.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        {/* Compatibility */}
        <section className="product-section">
          <h2 className="section-heading">{resolveContent.compatibility.heading}</h2>
          <div className="compatibility-content">
            <div>
              <h3>Requirements</h3>
              <ul>
                {resolveContent.compatibility.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Limitations</h3>
              <ul>
                {resolveContent.compatibility.limitations.map((lim, index) => (
                  <li key={index}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">DaVinci Resolve FAQ</h2>
          <div className="faq-list">
            {resolveContent.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks links={resolveContent.related} />

        {/* CTA Block */}
        <CTABlock />

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default DavinciResolve



