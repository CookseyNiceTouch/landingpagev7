import { useState, useMemo, useRef } from 'react'
import type { ReactElement } from 'react'
import GetAppModal from '@/components/GetAppModal'
import CableConnector from '@/components/ui/CableConnector'
import { PLANS, detectCurrency, formatPrice } from '@/data/pricing'
import type { Interval } from '@/data/pricing'
import section01 from '@/assets/images/Section01_Login.png'
import section02 from '@/assets/images/Section02_RoughCut02.png'
import section03 from '@/assets/images/Section03_Mulit.png'
import section04 from '@/assets/images/Section04_BuiltFor.png'
import section05 from '@/assets/images/Section05_Price.png'

const STEPS = [
  {
    id: 'analyse',
    title: 'Analyse',
    lines: ['Upload footage.', 'Extract transcript.', 'Identify speakers', 'and themes.'],
  },
  {
    id: 'explore',
    title: 'Explore',
    lines: ['Chat with your', 'footage. Find topics.', 'Isolate speakers.', 'Test narratives.'],
  },
  {
    id: 'roughcut',
    title: 'Rough Cut',
    lines: ['Generate', 'structured timeline', 'edits in minutes.'],
  },
]

const WORKFLOWS = [
  {
    id: 'corporate',
    label: 'Corporate interviews',
    copy: 'Structure interview footage fast. Find the best answers, cut out the dead air and build a clean assembly ready for finishing.',
  },
  {
    id: 'documentary',
    label: 'Documentary storytelling',
    copy: 'Identify narrative threads across hours of footage. Surface the moments that matter and shape your story before you touch the timeline.',
  },
  {
    id: 'podcast',
    label: 'Podcast / long-form conversations',
    copy: 'Trim dead air, find the highlights and build a punchy edit from long unscripted recordings in a fraction of the usual time.',
  },
  {
    id: 'cutdowns',
    label: 'Cutdowns & social versions',
    copy: 'Re-purpose your long-form content into targeted short-form cuts. Nice Touch finds the best moments for every format.',
  },
]

export default function Home(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [interval, setInterval] = useState<Interval>('yearly')
  const [activeWorkflow, setActiveWorkflow] = useState('corporate')
  const currency = useMemo(() => detectCurrency(), [])

  const activeWorkflowData = WORKFLOWS.find((w) => w.id === activeWorkflow) ?? WORKFLOWS[0]
  const heroSection2Ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={heroSection2Ref} className="relative">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative px-6 pointer-events-none" style={{ paddingTop: '240px', paddingBottom: '40px' }}>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col items-center text-center gap-8">
          <h1
            className="m-0 w-full max-w-[800px] font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow"
            style={{
              fontSize: 'clamp(52px, 6vw, 96px)',
              textShadow: '0 0 60px rgba(242,233,78,0.25)',
            }}
          >
            Assistant<br />video editor
          </h1>
          <p
            className="m-0 w-full max-w-[720px] font-light font-subheading leading-[1.16] tracking-[-0.04em] text-yellow"
            style={{ fontSize: 'clamp(15px, 1.3vw, 20px)' }}
          >
            turns interviews, documentaries and long-form footage into structured rough cuts in minutes — inside Premiere and DaVinci
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="max-w-[460px] w-full pointer-events-auto transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer bg-transparent border-none p-0"
            aria-label="Try now"
          >
            <img src={section01} alt="Try now" className="w-full rounded-xl" />
          </button>
        </div>
      </section>

      {/* ── Three Steps ───────────────────────────────────────────── */}
      <section className="relative px-6 pointer-events-none" style={{ paddingTop: '90px', paddingBottom: '140px' }}>
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div
          className="relative flex flex-col gap-16"
          style={{ width: 'min(1200px, calc(100% - 48px))', margin: '0 auto' }}
        >
          {/* 3-column symmetric grid: text | image (center anchor) | spacer */}
          <div
            className="grid grid-cols-1 items-center"
            style={{
              gridTemplateColumns: 'minmax(200px, 420px) minmax(280px, 480px) minmax(200px, 420px)',
              columnGap: '64px',
            }}
          >
            {/* Col 1: numbered steps */}
            <div className="flex flex-col" style={{ gap: '48px' }}>
              {STEPS.map((step, i) => (
                <div key={step.id} className="flex flex-col gap-2">
                  <h3
                    className="m-0 font-bold text-yellow"
                    style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                  >
                    {i + 1}.&nbsp;&nbsp;{step.title}
                  </h3>
                  <div className="flex flex-col gap-0.5">
                    {step.lines.map((line, j) => (
                      <p
                        key={j}
                        className="m-0 text-white/60 leading-snug"
                        style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2: image — center anchor */}
            <div className="flex justify-center items-center">
              <img
                src={section02}
                alt="Analyse, Explore and Rough Cut modules"
                className="block rounded-xl object-contain"
                style={{ maxHeight: '820px', width: 'auto', margin: '0 auto' }}
              />
            </div>

            {/* Col 3: empty spacer — mirrors col 1 to keep col 2 centered */}
            <div />

          </div>

          {/* Long-form copy — two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-[880px]">
            {/* Part 1 */}
            <div className="flex flex-col gap-5">
              <p className="m-0 font-semibold text-white" style={{ fontSize: 'clamp(16px, 1.3vw, 20px)' }}>
                Analyse. Explore. Rough Cut.
              </p>
              <p className="m-0 text-white/70 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                Nice Touch starts by understanding your footage.
              </p>
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                It transcribes interviews, detects speakers, and surfaces themes across long-form conversations. Instead of scrubbing through hours of material, you can see the shape of the story immediately.
              </p>
            </div>

            {/* Part 2 */}
            <div className="flex flex-col gap-5">
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                From there, you can explore. Ask questions about topics captured in your footage and refine the direction of an edit before you commit to a timeline.
              </p>
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                When you're ready, generate a structured first pass inside Premiere or DaVinci. Not a finished film. Not locked decisions. Just a clean, intelligent starting point.
              </p>
              <p className="m-0 text-white/70 font-medium leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                The slow part is handled.<br />You stay in control.
              </p>
            </div>
          </div>
        </div>
      </section>

        <CableConnector
          triggerRef={heroSection2Ref}
          top="30%"
          offsetX={240}
          scale={0.625}
          scrollDistance={600}
          ease="power2.in"
        />
      </div>

      {/* ── Multicam ──────────────────────────────────────────────── */}
      <section className="relative px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)] pointer-events-none">
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col gap-[clamp(32px,4vw,64px)]">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2
              className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                textShadow: '0 0 40px rgba(242,233,78,0.2)',
              }}
            >
              Multicam footage. edit<br className="hidden md:block" /> straight to your timeline
            </h2>
            <p
              className="m-0 font-light font-subheading leading-[1.16] tracking-[-0.04em] text-yellow"
              style={{ fontSize: 'clamp(16px, 1.4vw, 20px)' }}
            >
              Giving you back time to be more creative
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-[clamp(32px,4vw,64px)] items-start">
            <div className="flex flex-col gap-6 max-w-sm">
              <p className="m-0 font-semibold text-white" style={{ fontSize: 'clamp(16px, 1.3vw, 20px)' }}>
                Multicam, without the chaos.
              </p>
              <p className="m-0 text-white/70 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                Multiple cameras. Multiple speakers. One conversation.
              </p>
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                Nice Touch analyses synced multicam footage as a single narrative. It tracks who's speaking, identifies key moments, and builds structure across every angle.
              </p>
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                Instead of watching eight timelines to find one usable beat, you start with clarity.
              </p>
              <p className="m-0 text-white/70 font-medium leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                It doesn't replace your edit.<br />It removes the repetitive part that gets in the way of it.
              </p>
            </div>

            <img
              src={section03}
              alt="Multicam timeline device"
              className="w-full md:w-[75%] rounded-l-xl shrink-0 md:-mr-[clamp(48px,12vw,200px)]"
            />
          </div>
        </div>
      </section>

      {/* ── Built For Workflows ───────────────────────────────────── */}
      <section className="relative px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)] pointer-events-none">
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col gap-[clamp(40px,5vw,72px)]">
          <h2
            className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              textShadow: '0 0 40px rgba(242,233,78,0.2)',
            }}
          >
            Built for real post-<br className="hidden md:block" />production workflows.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(32px,4vw,64px)] items-start">
            {/* Left: device + workflow buttons */}
            <div className="flex flex-col gap-6">
              <img
                src={section04}
                alt="Built for workflows device"
                className="w-full rounded-xl"
              />
              <div className="flex flex-col pointer-events-auto">
                {WORKFLOWS.map((workflow) => (
                  <button
                    key={workflow.id}
                    onClick={() => setActiveWorkflow(workflow.id)}
                    className={`flex items-center gap-3 py-3.5 px-4 rounded-lg text-left transition-all border border-transparent ${
                      activeWorkflow === workflow.id
                        ? 'bg-white/08 border-white/12'
                        : 'hover:bg-white/05'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                        activeWorkflow === workflow.id ? 'bg-pink' : 'bg-white/20'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${
                        activeWorkflow === workflow.id ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {workflow.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: copy */}
            <div className="flex flex-col gap-4 lg:pt-4">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                Explore
              </span>
              <h3 className="m-0 text-white font-semibold leading-snug" style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>
                {activeWorkflowData.label}
              </h3>
              <p className="m-0 text-white/55 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                {activeWorkflowData.copy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────── */}
      <section className="relative px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)] pointer-events-none">
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-[clamp(32px,4vw,56px)]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Pricing</span>
            <h2
              className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-white"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              Simple, transparent plans.
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex rounded-full border-2 border-border overflow-hidden pointer-events-auto">
            <button
              className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
                interval === 'monthly'
                  ? 'bg-pink text-white rounded-full'
                  : 'bg-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => setInterval('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-7 py-2.5 text-sm font-semibold border-none cursor-pointer transition-all ${
                interval === 'yearly'
                  ? 'bg-pink text-white rounded-full'
                  : 'bg-transparent text-white/60 hover:text-white'
              }`}
              onClick={() => setInterval('yearly')}
            >
              Yearly
            </button>
          </div>

          <img
            src={section05}
            alt="Pricing overview"
            className="w-full max-w-[1080px] rounded-xl"
          />

          {/* Plan cards */}
          <div className="flex gap-[clamp(16px,2vw,24px)] w-full max-w-[1080px] pointer-events-auto max-[768px]:flex-col">
            {PLANS.map((plan) => {
              const prices = plan.pricing?.[currency]
              const planLinks = plan.links?.[currency]
              const activeLink = planLinks
                ? interval === 'yearly'
                  ? planLinks.annual
                  : planLinks.monthly
                : ''
              const displayPrice = prices
                ? interval === 'yearly'
                  ? prices.annual / 12
                  : prices.monthly
                : null

              return (
                <div
                  key={plan.name}
                  className={`flex-1 flex flex-col justify-between gap-1 p-[clamp(20px,2vw,32px)] border-2 rounded-xl bg-black/40 backdrop-blur-sm transition-transform hover:-translate-y-1 ${
                    plan.highlighted ? 'border-yellow' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <h3
                      className={`m-0 font-semibold ${plan.highlighted ? 'text-yellow' : 'text-white'}`}
                      style={{ fontSize: 'clamp(20px, 1.8vw, 28px)' }}
                    >
                      {plan.name}
                    </h3>
                    <p className="m-0 mb-1 text-white-55 leading-relaxed" style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}>
                      {plan.tagline}
                    </p>

                    <div className="flex flex-wrap items-baseline gap-1 pb-4 mb-1 border-b border-border-light">
                      {plan.contactUs ? (
                        <span className="text-white-55 font-semibold" style={{ fontSize: 'clamp(20px, 1.8vw, 28px)' }}>
                          Custom pricing
                        </span>
                      ) : displayPrice !== null ? (
                        <>
                          <span className="font-bold text-white leading-none" style={{ fontSize: 'clamp(28px, 2.2vw, 40px)' }}>
                            {formatPrice(displayPrice, currency)}
                          </span>
                          <span className="text-white-55 font-medium" style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}>/mo</span>
                          {interval === 'yearly' && prices && (
                            <span className="w-full text-white/40" style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }}>
                              {formatPrice(prices.annual, currency)} billed annually
                            </span>
                          )}
                        </>
                      ) : null}
                    </div>

                    <ul className="list-none m-0 p-0 flex flex-col">
                      {plan.features.map((feature) => (
                        <li key={feature.label} className="flex flex-col gap-0.5 py-2.5 border-t border-border-light last:border-b">
                          <span className="text-white-45 font-medium uppercase tracking-wider" style={{ fontSize: 'clamp(11px, 0.85vw, 13px)' }}>
                            {feature.label}
                          </span>
                          <span className="text-white font-medium" style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}>
                            {feature.value ?? '—'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.contactUs ? (
                    <a
                      href="mailto:cooksey@nicetouch.app"
                      className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-pink text-white font-semibold text-center rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                    >
                      Contact Us
                    </a>
                  ) : activeLink ? (
                    <a
                      href={activeLink}
                      className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-pink text-white font-semibold text-center rounded-lg transition-all hover:bg-pink-hover hover:-translate-y-0.5 active:translate-y-0"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                    >
                      Subscribe
                    </a>
                  ) : (
                    <span
                      className="block w-full mt-5 py-[clamp(12px,1.5vh,16px)] bg-white/10 text-white/40 font-semibold text-center rounded-lg pointer-events-none"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
