import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import DownloadCard from '@/components/DownloadCard'
import Button from '@/components/ui/Button'
import { useReleases } from '@/hooks/useReleases'

export default function Download(): ReactElement {
  const { macDownloadUrl, winDownloadUrl, macVersion, winVersion } = useReleases()

  return (
    <div className="flex-1 flex flex-col items-center gap-10 py-16 px-4 sm:px-10 lg:px-16 pointer-events-none">
      <SEO
        title="Download"
        description="Download Nice Touch for macOS or Windows. Get the AI-powered edit assistant running inside DaVinci Resolve or Adobe Premiere Pro."
        path="/download"
      />

      <div className="flex flex-col items-center gap-3 text-center max-w-xl">
        <span className="type-eyebrow">Get the app</span>
        <h1 className="type-title text-center">Download Nice Touch</h1>
        <p className="m-0 type-body text-center">
          Available for macOS and Windows. Runs alongside Adobe Premiere Pro and DaVinci Resolve.
        </p>
      </div>

      <DownloadCard
        macUrl={macDownloadUrl}
        winUrl={winDownloadUrl}
        macVersion={macVersion}
        winVersion={winVersion}
      />

      <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
        <Button as="a" href="/tutorials/" variant="secondary" size="md">
          Tutorials &amp; Media
        </Button>
        <Button as="a" href="/pricing/" variant="ghost" size="md">
          View Pricing
        </Button>
        <Link to="/features/" className="text-sm text-white-60 hover:text-white transition-colors">
          Explore Features
        </Link>
      </div>

      <p className="m-0 text-sm text-white-60 text-center max-w-md">
        Requires macOS 12+ or Windows 10+. An active internet connection is needed for AI features.
      </p>
    </div>
  )
}
