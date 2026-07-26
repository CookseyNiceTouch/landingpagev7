import type { ReactElement } from 'react'

export default function NewsletterForm(): ReactElement {
  return (
    <div className="nt-card flex flex-col items-center gap-5 p-8 sm:p-10 w-full max-w-xl pointer-events-auto">
      <h1 className="type-title text-center text-[clamp(1.75rem,3vw,2.5rem)]">
        Stay Updated
      </h1>
      <p className="m-0 type-body text-center max-w-sm">
        Subscribe to our newsletter for the latest updates and features. No spam. Unsubscribe anytime.
      </p>
      <div
        className="hs-form-frame w-full pointer-events-auto [&_*]:pointer-events-auto [&_iframe]:pointer-events-auto [&_iframe_*]:pointer-events-auto"
        data-region="eu1"
        data-form-id="98567906-bbd8-4dde-99f6-4581261e62cf"
        data-portal-id="146425863"
      />
    </div>
  )
}
