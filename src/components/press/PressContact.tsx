import type { ReactElement } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { PRESS_CONTACT } from '@/data/press'

export default function PressContact(): ReactElement {
  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
            Press contact
          </h2>
          <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
            For interviews, briefings or anything else, get in touch directly.
          </p>
        </div>

        <div className="rounded-lg border-2 border-border bg-black/20 p-[clamp(20px,2.2vw,32px)] pointer-events-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[clamp(16px,1.3vw,20px)] font-semibold text-white">
              {PRESS_CONTACT.name}
            </span>
            <span className="text-[clamp(13px,1vw,15px)] text-white/55">{PRESS_CONTACT.title}</span>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-[clamp(13px,1vw,15px)]">
            <a
              href={`mailto:${PRESS_CONTACT.email}`}
              className="text-pink underline-offset-2 hover:underline"
            >
              {PRESS_CONTACT.email}
            </a>
            {PRESS_CONTACT.phone && (
              <a
                href={`tel:${PRESS_CONTACT.phone.replace(/\s+/g, '')}`}
                className="text-white/75 underline-offset-2 hover:underline"
              >
                {PRESS_CONTACT.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </FadeIn>
  )
}
