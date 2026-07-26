import type { ReactElement } from 'react'
import appleIcon from '@/assets/icons/apple.svg'
import windowsIcon from '@/assets/icons/windows.svg'

interface DownloadCardProps {
  macUrl: string
  winUrl: string
  macVersion?: string
  winVersion?: string
}

const ctaClass =
  'inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3 text-base bg-pink text-white'

export default function DownloadCard({
  macUrl,
  winUrl,
  macVersion,
  winVersion,
}: DownloadCardProps): ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pointer-events-auto">
      <a
        href={macUrl}
        className="nt-card flex flex-col items-center gap-4 p-8 text-center no-underline"
        aria-label={`Download for macOS${macVersion ? ` v${macVersion}` : ''}`}
      >
        <img src={appleIcon} alt="" className="w-12 h-12 brightness-0 invert" />
        <div>
          <p className="m-0 text-lg font-semibold text-white">macOS</p>
          {macVersion && (
            <p className="m-0 mt-1 text-sm text-white-60">Version {macVersion}</p>
          )}
        </div>
        <span className={ctaClass}>Download for Mac</span>
      </a>

      <a
        href={winUrl}
        className="nt-card flex flex-col items-center gap-4 p-8 text-center no-underline"
        aria-label={`Download for Windows${winVersion ? ` v${winVersion}` : ''}`}
      >
        <img src={windowsIcon} alt="" className="w-12 h-12 brightness-0 invert" />
        <div>
          <p className="m-0 text-lg font-semibold text-white">Windows</p>
          {winVersion && (
            <p className="m-0 mt-1 text-sm text-white-60">Version {winVersion}</p>
          )}
        </div>
        <span className={ctaClass}>Download for Windows</span>
      </a>
    </div>
  )
}
