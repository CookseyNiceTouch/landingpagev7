import type { ReactElement } from 'react'
import appleIcon from '@/assets/icons/apple.svg'
import windowsIcon from '@/assets/icons/windows.svg'

interface DownloadCardProps {
  macUrl: string
  winUrl: string
  macVersion?: string
  winVersion?: string
}

export default function DownloadCard({
  macUrl,
  winUrl,
  macVersion,
  winVersion,
}: DownloadCardProps): ReactElement {
  const macLabel = `Download for macOS${macVersion ? ` v${macVersion}` : ''}`
  const winLabel = `Download for Windows${winVersion ? ` v${winVersion}` : ''}`

  return (
    <div className="flex flex-col items-center w-[min(520px,100%)]">
      <div className="flex flex-col items-center gap-3 p-[clamp(16px,1.5vw,25px)] border-2 border-border rounded-lg w-full pointer-events-auto max-[768px]:p-[clamp(12px,2vw,20px)] max-[768px]:gap-2">
        <h2 className="m-0 text-[clamp(24px,2vw,40px)] font-semibold text-white text-center max-[768px]:text-[clamp(20px,5vw,28px)] max-[480px]:text-[clamp(18px,5vw,22px)]">
          Download The App
        </h2>
        <div className="flex gap-3.5 items-center w-full max-w-[360px] h-[clamp(48px,3.5vh,61px)] max-[768px]:max-w-[280px] max-[768px]:h-[clamp(44px,6vh,52px)] max-[480px]:max-w-[240px] max-[480px]:h-[clamp(40px,5.5vh,48px)]">
          <a
            href={macUrl}
            className="flex items-center justify-center flex-1 h-full bg-pink rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0 pointer-events-auto"
            aria-label={macLabel}
          >
            <img src={appleIcon} alt="" className="w-[clamp(32px,2.5vh,47px)] h-[clamp(32px,2.5vh,47px)] brightness-0 invert max-[768px]:w-[clamp(28px,4vh,36px)] max-[768px]:h-[clamp(28px,4vh,36px)] max-[480px]:w-[clamp(24px,3.5vh,32px)] max-[480px]:h-[clamp(24px,3.5vh,32px)]" />
          </a>
          <a
            href={winUrl}
            className="flex items-center justify-center flex-1 h-full bg-pink rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0 pointer-events-auto"
            aria-label={winLabel}
          >
            <img src={windowsIcon} alt="" className="w-[clamp(32px,2.5vh,47px)] h-[clamp(32px,2.5vh,47px)] brightness-0 invert max-[768px]:w-[clamp(28px,4vh,36px)] max-[768px]:h-[clamp(28px,4vh,36px)] max-[480px]:w-[clamp(24px,3.5vh,32px)] max-[480px]:h-[clamp(24px,3.5vh,32px)]" />
          </a>
        </div>
      </div>
    </div>
  )
}
