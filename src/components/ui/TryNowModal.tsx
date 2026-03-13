import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import './TryNowModal.css'

const HUBSPOT_PORTAL_ID = '146425863'
const HUBSPOT_FORM_ID   = 'e7b7312c-1884-4467-a616-42a27512a402'

interface TryNowModalProps {
  isOpen: boolean
  onClose: () => void
}

type HubSpot = {
  forms: { create: (opts: Record<string, unknown>) => void }
}

export default function TryNowModal({ isOpen, onClose }: TryNowModalProps): ReactElement | null {
  const formRef  = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Inject the form and watch the iframe for the post-submit reload
  useEffect(() => {
    if (!isOpen || !formRef.current) return

    const container = formRef.current
    container.innerHTML = ''

    const win = window as Window & { hbspt?: HubSpot }

    if (win.hbspt?.forms?.create) {
      // Classic JS API — direct callback
      win.hbspt.forms.create({
        region:   'eu1',
        portalId: HUBSPOT_PORTAL_ID,
        formId:   HUBSPOT_FORM_ID,
        target:   '#try-now-hs-form',
        onFormSubmitted: () => {
          onClose()
          navigate('/download')
        },
      })
    } else {
      // Modern declarative embed — inject hs-form-frame div; HubSpot's
      // MutationObserver converts it to an iframe automatically.
      const frame = document.createElement('div')
      frame.className        = 'hs-form-frame'
      frame.dataset.region   = 'eu1'
      frame.dataset.formId   = HUBSPOT_FORM_ID
      frame.dataset.portalId = HUBSPOT_PORTAL_ID
      container.appendChild(frame)
    }

    // When HubSpot replaces the form with the thank-you screen the container
    // shrinks noticeably. Wait for the form to fully render, record its height,
    // then redirect whenever the height drops below 60% of that baseline.
    let baseline = 0
    let settled  = false
    let resizeObserver: ResizeObserver | null = null

    const settleTimer = setTimeout(() => {
      baseline = container.offsetHeight
      settled  = true

      resizeObserver = new ResizeObserver(() => {
        if (!settled || baseline === 0) return
        if (container.offsetHeight < baseline * 0.6) {
          resizeObserver?.disconnect()
          onClose()
          navigate('/download')
        }
      })
      resizeObserver.observe(container)
    }, 1500) // give HubSpot time to render the form before recording baseline

    return () => {
      clearTimeout(settleTimer)
      resizeObserver?.disconnect()
    }
  }, [isOpen, navigate, onClose])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="try-now-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Get early access"
      onClick={onClose}
    >
      <div className="try-now-panel" onClick={(e) => e.stopPropagation()}>
        <button className="try-now-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <div className="try-now-header">
          <h2 className="try-now-title">Get early access</h2>
          <p className="try-now-subtitle">
            Tell us a bit about yourself and we'll get you set up.
          </p>
        </div>

        <div id="try-now-hs-form" ref={formRef} className="try-now-form" />
      </div>
    </div>,
    document.body,
  )
}
