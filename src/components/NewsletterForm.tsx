import type { ReactElement } from 'react'

export default function NewsletterForm(): ReactElement {

  return (
    <div className="flex flex-col items-center gap-5 p-[clamp(24px,2vw,40px)] border-2 border-border rounded-lg w-[min(720px,90%)] pointer-events-auto bg-black/20 max-[768px]:p-[clamp(16px,2vw,28px)] max-[768px]:gap-4 max-[768px]:w-[min(640px,92%)] max-[480px]:p-[clamp(14px,2vw,24px)] max-[480px]:gap-3.5 max-[480px]:w-[min(540px,94%)]">
      <h1 className="m-0 text-[clamp(28px,2.5vw,42px)] font-semibold text-white text-center max-[768px]:text-[clamp(24px,4vw,36px)] max-[480px]:text-[clamp(20px,5vw,30px)]">
        Stay Updated
      </h1>
      <p className="m-0 text-[clamp(14px,1.2vw,18px)] text-white/70 text-center max-w-[420px] max-[768px]:text-[clamp(13px,1.5vw,16px)] max-[480px]:text-[clamp(12px,1.2vw,15px)]">
        Subscribe to our newsletter for the latest updates and features. No Spam. Unsub anytime.
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
