import type { ReactElement } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import { FOUNDERS, INVESTORS, INVESTOR_JOINT_PHOTO, PRESS_RELEASE } from '@/data/press'
import CopyButton from './CopyButton'
import PersonCard from './PersonCard'

export default function AboutBlock(): ReactElement {
  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
                About Nice Touch
              </h2>
              <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
                Approved boilerplate — copy directly into articles.
              </p>
            </div>
            <div className="pointer-events-auto">
              <CopyButton text={PRESS_RELEASE.boilerplate} label="Copy boilerplate" copiedLabel="Boilerplate copied" />
            </div>
          </div>
          <div className="rounded-lg border-2 border-border bg-black/20 p-[clamp(20px,2.2vw,32px)] pointer-events-auto">
            <p className="m-0 text-[clamp(14px,1.05vw,17px)] text-white/80 leading-relaxed">
              {PRESS_RELEASE.boilerplate}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="m-0 text-[clamp(18px,1.5vw,24px)] font-semibold text-white">Founders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(12px,1.5vw,20px)]">
            {FOUNDERS.map((person) => (
              <PersonCard key={person.name} person={person} variant="founder" />
            ))}
          </div>
        </div>

        {INVESTORS.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="m-0 text-[clamp(18px,1.5vw,24px)] font-semibold text-white">
              Investors & Advisors
            </h3>
            {/* Combined single panel: photo + both bios side by side */}
            <div className="rounded-lg border-2 border-border bg-black/20 overflow-hidden pointer-events-auto">
              <div className="flex flex-col md:flex-row">
                {INVESTOR_JOINT_PHOTO && (
                  <div className="shrink-0 md:w-[260px] overflow-hidden">
                    <img
                      src={INVESTOR_JOINT_PHOTO}
                      alt="Rich and Jonny Townsend, Circus Street co-founders and pre-seed investors in Nice Touch"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 25%', minHeight: '180px', maxHeight: '280px' }}
                    />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border-light flex-1">
                  {INVESTORS.map((person) => (
                    <div key={person.name} className="flex flex-col gap-2 p-[clamp(16px,1.8vw,24px)] flex-1">
                      <div className="flex flex-col">
                        <span className="text-[clamp(14px,1.1vw,17px)] font-semibold text-white">
                          {person.name}
                        </span>
                        <span className="text-[clamp(11px,0.85vw,13px)] text-white/50">
                          {person.title}
                        </span>
                      </div>
                      <p className="m-0 text-[clamp(12px,0.9vw,14px)] text-white/70 leading-relaxed">
                        {person.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </FadeIn>
  )
}
