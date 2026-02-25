import type { ReactElement } from 'react'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter(): ReactElement {
  return (
    <div className="flex-1 flex items-center justify-center p-[clamp(24px,4vw,96px)] pointer-events-none">
      <NewsletterForm />
    </div>
  )
}
