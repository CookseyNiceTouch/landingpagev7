import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { COOKIE_NAME, HUBSPOT_FORM } from '@/data/transcribe'
import { getCookie, setCookie } from '@/lib/cookies'
import { track } from '@/lib/analytics'

interface DownloadGateProps {
  children: ReactNode
}

const HUBSPOT_ORIGINS = [
  'https://js-eu1.hsforms.net',
  'https://js.hsforms.net',
  'https://forms-eu1.hsforms.com',
  'https://forms.hsforms.com',
]

/**
 * Heuristic: matches anything HubSpot might post that mentions submission.
 * Their modern "forms next" embed doesn't post the legacy `hsFormCallback`
 * envelope, so we have to be flexible about what counts.
 */
function looksLikeFormSubmission(data: unknown): boolean {
  if (typeof data === 'string') {
    return /(submitt|success|onForm)/i.test(data)
  }
  if (typeof data !== 'object' || data === null) return false
  const flat = JSON.stringify(data)
  return /(submitt|success|onForm)/i.test(flat)
}

/**
 * Gates `children` (the download buttons) behind a HubSpot form submission.
 *
 * Detection strategy (defence in depth, since the new HubSpot embed lives in
 * a cross-origin iframe and doesn't expose a clean callback):
 *   1. postMessage listener — broad, matches anything that smells like a
 *      submission. Logs unmatched messages in dev so we can tune this.
 *   2. ResizeObserver on the iframe — when the form swaps to "Thanks!" the
 *      iframe shrinks dramatically. Once the iframe height drops by >40%
 *      from its peak (and we've waited long enough for the form to mount),
 *      we treat that as a submission.
 *   3. Manual "I've already signed up" escape hatch — if both heuristics
 *      miss, the user can self-unlock with one click.
 *
 * On unlock: set a 1-year first-party cookie so they don't see the form again.
 */
export default function DownloadGate({ children }: DownloadGateProps): ReactElement {
  const [unlocked, setUnlocked] = useState<boolean>(() => getCookie(COOKIE_NAME) === '1')
  const containerRef = useRef<HTMLDivElement>(null)

  const unlock = useCallback(
    (source: 'postmessage' | 'iframe-shrink' | 'manual') => {
      setCookie(COOKIE_NAME, '1')
      setUnlocked(true)
      track('transcribe_form_submitted', { detection: source })
    },
    [],
  )

  useEffect(() => {
    if (unlocked) return

    function onMessage(event: MessageEvent) {
      if (!HUBSPOT_ORIGINS.includes(event.origin)) return
      if (looksLikeFormSubmission(event.data)) {
        unlock('postmessage')
      } else if (import.meta.env.DEV) {
        console.debug('[hubspot-gate] unmatched message:', event.origin, event.data)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [unlocked, unlock])

  // ResizeObserver fallback: watch the form iframe's height.
  // The form starts tall (input fields), shrinks to a small "Thanks!" panel
  // after submission. We track the peak height and unlock if it drops far
  // enough below.
  useEffect(() => {
    if (unlocked) return
    const root = containerRef.current
    if (!root) return

    let iframe: HTMLIFrameElement | null = null
    let peakHeight = 0
    let mountedAt = Date.now()
    let observer: ResizeObserver | null = null

    const tryAttach = () => {
      const found = root.querySelector('iframe')
      if (!found || found === iframe) return
      iframe = found
      peakHeight = 0
      mountedAt = Date.now()

      observer?.disconnect()
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height
          if (height > peakHeight) peakHeight = height

          // Wait until the form has had a chance to render and reach a
          // stable size. Then look for a >40% drop from peak.
          const settled = Date.now() - mountedAt > 1500
          if (
            settled &&
            peakHeight > 200 &&
            height > 0 &&
            height < peakHeight * 0.6
          ) {
            unlock('iframe-shrink')
          }
        }
      })
      observer.observe(iframe)
    }

    // Iframe is injected by HubSpot's script asynchronously. Poll for it.
    const interval = window.setInterval(tryAttach, 250)
    tryAttach()

    return () => {
      window.clearInterval(interval)
      observer?.disconnect()
    }
  }, [unlocked, unlock])

  if (unlocked) return <>{children}</>

  return (
    <div className="flex flex-col gap-3 p-5 border-2 border-border rounded-lg bg-black/20 pointer-events-auto">
      <div className="flex flex-col gap-1">
        <h3 className="m-0 text-[clamp(15px,1.2vw,18px)] font-semibold text-white leading-tight">
          Get your transcript files
        </h3>
        <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/55 leading-snug">
          Enter your email below to unlock the Word document and SRT/VTT downloads. We&rsquo;ll remember you next time.
        </p>
      </div>
      <div
        ref={containerRef}
        className="hs-form-frame w-full pointer-events-auto [&_*]:pointer-events-auto [&_iframe]:pointer-events-auto [&_iframe_*]:pointer-events-auto"
        data-region={HUBSPOT_FORM.region}
        data-form-id={HUBSPOT_FORM.formId}
        data-portal-id={HUBSPOT_FORM.portalId}
      />
      <button
        type="button"
        onClick={() => unlock('manual')}
        className="self-start text-[clamp(12px,0.9vw,13px)] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors"
      >
        I&rsquo;ve already signed up
      </button>
    </div>
  )
}
