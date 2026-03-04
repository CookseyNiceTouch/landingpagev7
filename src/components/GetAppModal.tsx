import type { ReactElement } from 'react'

interface GetAppModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GetAppModal({ isOpen, onClose }: GetAppModalProps): ReactElement {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[1000] p-5 transition-[opacity,backdrop-filter] duration-200 ${
        isOpen
          ? 'bg-black/75 backdrop-blur-sm pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0 invisible'
      }`}
      onClick={isOpen ? onClose : undefined}
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
