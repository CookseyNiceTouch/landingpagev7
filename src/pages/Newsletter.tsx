import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 py-16 px-4 sm:px-10 pointer-events-none">
      <SEO
        title="Newsletter"
        description="Subscribe to the Nice Touch newsletter for product updates, feature releases, and insights on AI-assisted video editing workflows."
        path="/newsletter"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="type-eyebrow">Newsletter</span>
      </div>
      <NewsletterForm />
    </div>
  )
}
