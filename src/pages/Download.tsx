import type { ReactElement } from 'react'
import Header from '../components/Header'
import DownloadCard from '../components/DownloadCard'

interface DownloadPageProps {
  macUrl: string
  winUrl: string
  macVersion?: string
  winVersion?: string
}

function Download({ macUrl, winUrl, macVersion, winVersion }: DownloadPageProps): ReactElement {
  return (
    <div className="download-page">
      <Header />
      <main className="download-main">
        <DownloadCard
          macUrl={macUrl}
          winUrl={winUrl}
          macVersion={macVersion}
          winVersion={winVersion}
          className="download-card-standalone"
        />
      </main>
    </div>
  )
}

export default Download

