import type { ReactElement } from 'react'
import Header from '../components/Header'
import NewsletterForm from '../components/NewsletterForm'

function Newsletter(): ReactElement {
  return (
    <div className="newsletter-page">
      <Header />
      <main className="newsletter-main">
        <NewsletterForm />
      </main>
    </div>
  )
}

export default Newsletter

