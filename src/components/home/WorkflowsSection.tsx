import { useState } from 'react'
import type { ReactElement } from 'react'
import { WORKFLOWS } from '@/data/home'
import section04 from '@/assets/images/Section04_BuiltFor.png'

export default function WorkflowsSection(): ReactElement {
  const [activeWorkflow, setActiveWorkflow] = useState('corporate')
  const activeData = WORKFLOWS.find((w) => w.id === activeWorkflow) ?? WORKFLOWS[0]

  return (
    <section className="px-[clamp(24px,8vw,120px)] py-[clamp(64px,8vw,120px)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-[clamp(40px,5vw,72px)]">
        <h2
          className="m-0 font-bold font-heading leading-[0.61] tracking-[-0.04em] text-yellow text-[clamp(32px,4.5vw,64px)]"
          style={{ textShadow: '0 0 40px rgba(242,233,78,0.2)' }}
        >
          Built for real post-<br className="hidden md:block" />production workflows.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(32px,4vw,64px)] items-start">
          <div className="flex flex-col gap-6">
            <img
              src={section04}
              alt="Built for workflows device"
              className="w-full rounded-xl"
            />
            <div className="flex flex-col">
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

          <div className="flex flex-col gap-4 lg:pt-4">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
              Explore
            </span>
            <h3 className="m-0 text-white font-semibold leading-snug text-[clamp(20px,2vw,28px)]">
              {activeData.label}
            </h3>
            <p className="m-0 text-white/55 leading-relaxed text-[clamp(14px,1.1vw,17px)]">
              {activeData.copy}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
