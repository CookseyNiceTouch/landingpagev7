import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import DownloadCard from '@/components/DownloadCard'
import { useReleases } from '@/hooks/useReleases'

export default function Download(): ReactElement {
  const { macDownloadUrl, winDownloadUrl, macVersion, winVersion } = useReleases()

  return (
    <div className="flex-1 flex items-center justify-center p-[clamp(24px,4vw,96px)] pointer-events-none">
      <SEO
        title="Download"
        description="Download Nice Touch for macOS or Windows. Get the AI-powered edit assistant running inside DaVinci Resolve or Adobe Premiere Pro."
        path="/download"
      />
      <DownloadCard
        macUrl={macDownloadUrl}
        winUrl={winDownloadUrl}
        macVersion={macVersion}
        winVersion={winVersion}
      />
    </div>
  )
}
