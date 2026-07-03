import { useEffect, useRef } from 'react'
import type { ReactElement } from 'react'

const DEFAULT_PORTAL_ID = '146425863'
const DEFAULT_REGION = 'eu1'

interface HubSpotFormProps {
  /** HubSpot form GUID to embed. */
  formId: string
  portalId?: string
  region?: string
  className?: string
}

/**
 * Declarative HubSpot form embed. HubSpot's loader script (injected site-wide
 * in index.html) converts the `hs-form-frame` div into the live form/iframe.
 * Same mechanism as NewsletterForm; extracted so any page can drop in a form.
 */
export default function HubSpotForm({
  formId,
  portalId = DEFAULT_PORTAL_ID,
  region = DEFAULT_REGION,
  className,
}: HubSpotFormProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null)

  // Re-create the frame on client mount so client-side navigations (which
  // don't re-run the loader) still render the form.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const win = window as Window & { hbspt?: { forms?: { create: (o: Record<string, unknown>) => void } } }
    if (win.hbspt?.forms?.create && el.childElementCount === 0) {
      win.hbspt.forms.create({ region, portalId, formId, target: `#${el.id}` })
    }
  }, [formId, portalId, region])

  return (
    <div
      id={`hs-${formId}`}
      ref={ref}
      className={`hs-form-frame w-full pointer-events-auto [&_*]:pointer-events-auto [&_iframe]:pointer-events-auto [&_iframe_*]:pointer-events-auto${className ? ` ${className}` : ''}`}
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  )
}
