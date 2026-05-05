import { useCallback } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import { OPEN_TRY_NOW } from '@/components/layout/Header'

export default function ResultCTA(): ReactElement {
  const openModal = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_TRY_NOW))
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-[clamp(20px,2.5vw,32px)] border border-border rounded-lg bg-pink/10 pointer-events-auto">
      <div className="flex flex-col gap-1">
        <span className="text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
          Editing in Resolve or Premiere?
        </span>
        <span className="text-[clamp(13px,1vw,15px)] text-white/70 leading-snug">
          Get Nice Touch free &mdash; AI-assisted editing inside the timeline you already know.
        </span>
      </div>
      <Button variant="primary" size="md" onClick={openModal} className="shrink-0">
        Get the App
      </Button>
    </div>
  )
}
