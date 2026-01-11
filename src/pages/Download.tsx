import type { ReactElement } from 'react'
import PageLayout from '../components/layout/PageLayout'
import DownloadCard from '../components/DownloadCard'

interface DownloadPageProps {
  macUrl: string
  winUrl: string
  macVersion?: string
  winVersion?: string
}

function Download({ macUrl, winUrl, macVersion, winVersion }: DownloadPageProps): ReactElement {
  return (
    <PageLayout className="download-page">
      <div className="download-main">
        <DownloadCard
          macUrl={macUrl}
          winUrl={winUrl}
          macVersion={macVersion}
          winVersion={winVersion}
          className="download-card-standalone"
        />
      </div>
    </PageLayout>
  )
}

export default Download

