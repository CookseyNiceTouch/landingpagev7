import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

export default function Download(): ReactElement {
  return (
    <div className="flex-1 flex items-center justify-center p-[clamp(24px,4vw,96px)] pointer-events-none">
      <SEO
        title="Coming Soon"
        description="A new version of Nice Touch is on the way. Join the waitlist to be first in line for early access."
        path="/download"
      />

      <div className="flex flex-col items-center gap-6 p-[clamp(24px,2vw,40px)] border-2 border-border rounded-lg w-[min(640px,92%)] pointer-events-auto bg-black/20 text-center">
        <h1 className="m-0 text-[clamp(28px,2.5vw,42px)] font-semibold text-white max-[768px]:text-[clamp(24px,4vw,36px)] max-[480px]:text-[clamp(22px,5vw,30px)]">
          A new version is on the way
        </h1>

        <p className="m-0 text-[clamp(15px,1.2vw,18px)] text-white/70 max-w-[480px] max-[768px]:text-[clamp(14px,1.5vw,16px)]">
          We're working on a major update to Nice Touch and have paused downloads of the current version. Join the waitlist and we'll let you know the moment it's ready.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_TRY_NOW))}
        >
          Join the Waitlist
        </Button>
      </div>
    </div>
  )
}
