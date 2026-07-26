import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactElement } from 'react'
import { SOCIAL_LINKS } from '@/data/social'
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
  const formRef    = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  // Reset submitted state whenever the modal is reopened
  useEffect(() => {
    if (isOpen) setSubmitted(false)
  }, [isOpen])

  // Inject the HubSpot form. On submission, switch to the social-link
  // confirmation view instead of redirecting anywhere.
  useEffect(() => {
    if (!isOpen || !formRef.current) return

    const container = formRef.current
    container.innerHTML = ''

    const win = window as Window & { hbspt?: HubSpot }

    if (win.hbspt?.forms?.create) {
      win.hbspt.forms.create({
        region:   'eu1',
        portalId: HUBSPOT_PORTAL_ID,
        formId:   HUBSPOT_FORM_ID,
        target:   '#try-now-hs-form',
        onFormSubmitted: () => setSubmitted(true),
      })
    } else {
      // Modern declarative embed — HubSpot's MutationObserver converts the div
      // to an iframe automatically. Detect submit via the thank-you screen
      // causing a significant height drop.
      const frame = document.createElement('div')
      frame.className        = 'hs-form-frame'
      frame.dataset.region   = 'eu1'
      frame.dataset.formId   = HUBSPOT_FORM_ID
      frame.dataset.portalId = HUBSPOT_PORTAL_ID
      container.appendChild(frame)

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
            setSubmitted(true)
          }
        })
        resizeObserver.observe(container)
      }, 1500)

      return () => {
        clearTimeout(settleTimer)
        resizeObserver?.disconnect()
      }
    }
  }, [isOpen])

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
      aria-label={submitted ? 'You\'re on the list' : 'Get Nice Touch'}
      onClick={onClose}
    >
      <div className="try-now-panel" onClick={(e) => e.stopPropagation()}>
        <button className="try-now-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        {submitted ? (
          <div className="try-now-header">
            <h2 className="try-now-title">You're on the list!</h2>
            <p className="try-now-subtitle">
              We'll reach out as soon as the new version is ready. In the meantime, follow along for updates and behind-the-scenes progress.
            </p>
            <div className="try-now-socials">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="try-now-social-link"
                >
                  <img src={social.icon} alt="" className="try-now-social-icon" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="try-now-header">
              <h2 className="try-now-title">Get Nice Touch</h2>
              <p className="try-now-subtitle">
                We're putting the finishing touches on a new version. Drop your details and we'll let you know the moment it's ready.
              </p>
            </div>
            <div id="try-now-hs-form" ref={formRef} className="try-now-form" />
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
