import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import Button from '@/components/ui/Button'

export default function NotFound(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 py-24 px-4 pointer-events-none">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." path="/404" noindex />
      <span className="type-eyebrow">Error</span>
      <h1 className="type-display">404</h1>
      <p className="type-body text-center">Page not found</p>
      <Link to="/" className="pointer-events-auto">
        <Button variant="primary" size="md">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
