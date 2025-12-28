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

    // Load HubSpot script once when the modal is opened for the first time.
    const existing = document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.src = HUBSPOT_SCRIPT_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        
        <h2 className="modal-title">Get the App</h2>

        <div
          className="hs-form-frame"
          data-region="eu1"
          data-form-id="e7b7312c-1884-4467-a616-42a27512a402"
          data-portal-id="146425863"
        />
      </div>
    </div>
  )
}

