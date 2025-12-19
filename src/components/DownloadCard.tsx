import type { ReactElement } from 'react'
import appleIcon from '../assets/icons/apple.svg'
import windowsIcon from '../assets/icons/windows.svg'

interface DownloadCardProps {
  macUrl: string
  winUrl: string
  macVersion?: string
  winVersion?: string
  className?: string
}

function DownloadCard({
  macUrl,
  winUrl,
  macVersion,
  winVersion,
  className = ''
}: DownloadCardProps): ReactElement {
  const macLabel = `Download for macOS${macVersion ? ` v${macVersion}` : ''}`
  const winLabel = `Download for Windows${winVersion ? ` v${winVersion}` : ''}`

  return (
    <div className={`download-section ${className}`.trim()}>
      <div className="download-card">
        <h2 className="download-title">Download The App</h2>
        <div className="platform-buttons">
          <a href={macUrl} className="platform-button" aria-label={macLabel}>
            <img src={appleIcon} alt="" className="platform-icon" />
          </a>
          <a href={winUrl} className="platform-button" aria-label={winLabel}>
            <img src={windowsIcon} alt="" className="platform-icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default DownloadCard

