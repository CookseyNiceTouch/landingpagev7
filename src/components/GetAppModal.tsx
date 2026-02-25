import { useEffect } from 'react'
import type { ReactElement } from 'react'

interface GetAppModalProps {
  isOpen: boolean
  onClose: () => void
}

const HUBSPOT_SCRIPT_SRC = 'https://js-eu1.hsforms.net/forms/embed/146425863.js'

export default function GetAppModal({ isOpen, onClose }: GetAppModalProps): ReactElement | null {
  useEffect(() => {
    if (!isOpen) return

    const existing = document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.src = HUBSPOT_SCRIPT_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-[1000] p-5 pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-black border-2 border-border rounded-xl p-[clamp(24px,4vw,40px)] max-w-[760px] w-full max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[32px] text-white/60 hover:text-white transition-colors leading-none cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="m-0 mb-6 text-[clamp(24px,4vw,32px)] font-semibold text-white">
          Get the App
        </h2>

        <div
          className="hs-form-frame pointer-events-auto"
          data-region="eu1"
          data-form-id="e7b7312c-1884-4467-a616-42a27512a402"
          data-portal-id="146425863"
        />
      </div>
    </div>
  )
}
