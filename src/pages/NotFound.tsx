import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFound(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 pointer-events-none">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="text-lg text-white/60">Page not found</p>
      <Link to="/" className="pointer-events-auto">
        <Button variant="primary" size="md">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
