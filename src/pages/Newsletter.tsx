import type { ReactElement } from 'react'
import PageLayout from '../components/layout/PageLayout'
import NewsletterForm from '../components/NewsletterForm'

function Newsletter(): ReactElement {
  return (
    <PageLayout className="newsletter-page">
      <div className="newsletter-main">
        <NewsletterForm />
      </div>
    </PageLayout>
  )
}

export default Newsletter



