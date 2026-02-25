import { useState } from 'react'
import type { ReactElement } from 'react'
import GetAppModal from '@/components/GetAppModal'
import Button from '@/components/ui/Button'
import premiereProIcon from '@/assets/images/premiere-pro-icon.png'
import davinciResolveIcon from '@/assets/images/davinci-resolve-icon.png'

export default function Home(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between gap-[clamp(30px,4vw,60px)] px-[clamp(40px,9.4vw,181px)] flex-1 min-h-0 pointer-events-none max-[1024px]:flex-col max-[1024px]:justify-center max-[1024px]:items-center max-[1024px]:text-center max-[1024px]:gap-[clamp(20px,3vh,40px)] max-[1024px]:px-20 max-[768px]:px-6 max-[768px]:gap-[clamp(16px,2vh,24px)]">
        <section className="flex flex-col gap-[clamp(16px,2vh,29px)] max-w-[453px] shrink-0 max-[1200px]:max-w-[380px] max-[1024px]:items-center max-[1024px]:max-w-[500px] max-[1024px]:gap-[clamp(12px,1.5vh,20px)] max-[768px]:gap-[clamp(10px,1.5vh,16px)]">
          <h1 className="flex flex-col m-0 text-[clamp(32px,2.5vw,48px)] font-semibold leading-[1.15] max-[768px]:text-[clamp(24px,5vw,32px)] max-[480px]:text-[clamp(20px,5.5vw,26px)]">
            <span className="bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Nice Touch
            </span>
            <span className="text-white">Your AI Video Edit Assistant</span>
          </h1>

          <div className="flex gap-[22px] items-end max-[1024px]:justify-center max-[768px]:gap-4">
            <img src={premiereProIcon} alt="Adobe Premiere Pro" className="w-auto h-[clamp(36px,2.8vh,50px)] object-contain max-[768px]:h-[clamp(30px,4vh,40px)] max-[480px]:h-[clamp(26px,3.5vh,34px)]" />
            <img src={davinciResolveIcon} alt="DaVinci Resolve" className="w-auto h-[clamp(36px,2.8vh,50px)] object-contain max-[768px]:h-[clamp(30px,4vh,40px)] max-[480px]:h-[clamp(26px,3.5vh,34px)]" />
          </div>

          <div className="flex flex-col pt-[clamp(24px,3vh,53px)] max-[1024px]:pt-[clamp(16px,2vh,30px)] max-[768px]:pt-[clamp(12px,2vh,20px)]">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              Get the App
            </Button>
          </div>
        </section>

        <section className="flex-1 min-w-0 flex justify-end items-center max-h-full max-[1024px]:w-full max-[1024px]:max-w-full max-[1024px]:justify-center">
          <div className="relative w-full max-w-[min(966px,55vw)] aspect-[966/543] rounded-[15px] overflow-hidden bg-black pointer-events-auto max-[1024px]:max-w-[min(700px,90vw)] max-[1024px]:max-h-[calc(50vh-40px)] max-[1024px]:w-auto max-[1024px]:h-[calc(50vh-40px)] max-[768px]:max-h-[calc(45vh-30px)] max-[768px]:h-[calc(45vh-30px)] max-[480px]:max-h-[calc(40vh-20px)] max-[480px]:h-[calc(40vh-20px)]">
            <iframe
              className="absolute inset-0 w-full h-full border-none rounded-[15px]"
              src="https://www.youtube.com/embed/7R0qvQPC96w?autoplay=0&mute=1&controls=1&rel=0"
              title="Nice Touch Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              allowFullScreen
            />
          </div>
        </section>
      </div>

      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
