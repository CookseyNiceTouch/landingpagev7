import type { ReactElement } from 'react'

/**
 * Soft vignette overlay. Scanlines and phosphor bloom were removed
 * for a cleaner dark SaaS look; the component is kept for layout wiring.
 */
export default function CrtOverlay(): ReactElement {
  return <div className="crt-vignette" aria-hidden />
}
