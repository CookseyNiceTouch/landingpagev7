import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter(): ReactElement {
  return (
    <div className="flex-1 flex items-center justify-center p-[clamp(24px,4vw,96px)] pointer-events-none">
      <SEO
        title="Newsletter"
        description="Subscribe to the Nice Touch newsletter for product updates, feature releases, and insights on AI-assisted video editing workflows."
        path="/newsletter"
      />
      <NewsletterForm />
    </div>
  )
}
