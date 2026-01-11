import type { ReactElement } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import VideoEmbed from '../../components/shared/VideoEmbed'
import RelatedLinks from '../../components/shared/RelatedLinks'
import CTABlock from '../../components/shared/CTABlock'
import GetAppBlock from '../../components/shared/GetAppBlock'
import SEOHead from '../../components/shared/SEOHead'
import { content } from '../../data/content'
import { seoData } from '../../data/seo'
import { generateFAQSchema } from '../../utils/structuredData'

function TimecodedFeedback(): ReactElement {
  const workflowContent = content.workflowsDetail.timecodedFeedback
  const workflowSEO = seoData.workflowsDetail.timecodedFeedback

  return (
    <PageLayout>
      <SEOHead
        title={workflowSEO.title}
        description={workflowSEO.description}
        canonicalUrl={workflowSEO.canonicalUrl}
        ogImage={workflowSEO.ogImage}
        structuredData={generateFAQSchema(workflowContent.faq)}
      />

      <div className="workflow-detail-page container-narrow">
        {/* Hero */}
        <section className="page-hero">
          <h1 className="page-title">{workflowContent.hero.h1}</h1>
          <p className="page-description">{workflowContent.hero.description}</p>
        </section>

        {/* Video */}
        <section className="product-section">
          <VideoEmbed
            videoUrl={workflowContent.hero.videoUrl}
            title={workflowContent.hero.videoTitle}
            transcript={workflowContent.hero.videoTranscript}
          />
        </section>

        {/* The Problem */}
        <section className="product-section">
          <h2 className="section-heading">{workflowContent.problem.heading}</h2>
          <p>{workflowContent.problem.description}</p>
        </section>

        {/* How It Works */}
        <section className="product-section">
          <h2 className="section-heading">{workflowContent.howItWorks.heading}</h2>
          <ol className="workflow-steps">
            {workflowContent.howItWorks.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          
          <div className="inputs-outputs">
            <h3>{workflowContent.howItWorks.inputsOutputs.heading}</h3>
            <div className="io-grid">
              <div className="io-item">
                <h4>Input</h4>
                <p>{workflowContent.howItWorks.inputsOutputs.input}</p>
              </div>
              <div className="io-item">
                <h4>Output</h4>
                <p>{workflowContent.howItWorks.inputsOutputs.output}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Fit */}
        <section className="product-section">
          <h2 className="section-heading">{workflowContent.bestFit.heading}</h2>
          <p><strong>Who it's for:</strong> {workflowContent.bestFit.whoFor}</p>
          <p><strong>When it's not a fit:</strong> {workflowContent.bestFit.whenNot}</p>
        </section>

        {/* FAQ */}
        <section className="product-section faq-section">
          <h2 className="section-heading">Workflow FAQ</h2>
          <div className="faq-list">
            {workflowContent.faq.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <RelatedLinks links={workflowContent.related} />

        {/* CTA Block */}
        <CTABlock />

        {/* Get App Block */}
        <GetAppBlock />
      </div>
    </PageLayout>
  )
}

export default TimecodedFeedback

