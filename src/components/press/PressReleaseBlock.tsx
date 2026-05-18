import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { PRESS_RELEASE } from '@/data/press'
import CopyButton from './CopyButton'
import TodoPlaceholder from './TodoPlaceholder'

function buildPlainText(): string {
  const lines: string[] = []
  lines.push(PRESS_RELEASE.embargoLine)
  lines.push(PRESS_RELEASE.headline)
  lines.push('')
  lines.push(`${PRESS_RELEASE.dateline} — ${PRESS_RELEASE.body[0]}`)
  for (let i = 1; i < PRESS_RELEASE.body.length; i++) {
    lines.push('')
    lines.push(PRESS_RELEASE.body[i])
  }
  lines.push('')
  lines.push(`"${PRESS_RELEASE.founderQuote.quote}" — ${PRESS_RELEASE.founderQuote.attribution}, ${PRESS_RELEASE.founderQuote.role}`)
  if (PRESS_RELEASE.customerQuote) {
    lines.push('')
    lines.push(`"${PRESS_RELEASE.customerQuote.quote}" — ${PRESS_RELEASE.customerQuote.attribution}, ${PRESS_RELEASE.customerQuote.role}`)
  }
  lines.push('')
  lines.push(PRESS_RELEASE.closingParagraph)
  lines.push('')
  lines.push(PRESS_RELEASE.boilerplateHeading)
  lines.push(PRESS_RELEASE.boilerplate)
  lines.push('')
  lines.push(...PRESS_RELEASE.contactBlock)
  return lines.join('\n')
}

export default function PressReleaseBlock(): ReactElement {
  const plainText = buildPlainText()

  return (
    <FadeIn className="w-full">
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
              Press Release
            </h2>
            <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
              Full release text, free to reproduce.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
            <CopyButton text={plainText} label="Copy release" copiedLabel="Release copied" />
            <Button as="a" href={PRESS_RELEASE.downloads.pdf} variant="secondary" size="sm" download>
              Download PDF
            </Button>
            <Button as="a" href={PRESS_RELEASE.downloads.docx} variant="secondary" size="sm" download>
              Download DOCX
            </Button>
          </div>
        </div>

        <article className="flex flex-col gap-5 rounded-lg border-2 border-border bg-black/20 p-[clamp(20px,2.5vw,40px)] pointer-events-auto">
          <header className="flex flex-col gap-3">
            <span className="text-[clamp(11px,0.85vw,13px)] font-semibold uppercase tracking-[0.15em] text-pink">
              {PRESS_RELEASE.embargoLine}
            </span>
            <h3 className="m-0 text-[clamp(20px,1.8vw,28px)] font-bold text-white leading-tight">
              {PRESS_RELEASE.headline}
            </h3>
          </header>

          <div className="flex flex-col gap-4 text-[clamp(14px,1.05vw,17px)] text-white/75 leading-relaxed">
            <p className="m-0">
              <span className="text-white/55">{PRESS_RELEASE.dateline} — </span>
              {PRESS_RELEASE.body[0]}
            </p>
            {PRESS_RELEASE.body.slice(1).map((para, idx) => (
              <p key={idx} className="m-0">
                {para}
              </p>
            ))}

            <blockquote className="m-0 border-l-2 border-pink/60 pl-5 italic text-white/85">
              “{PRESS_RELEASE.founderQuote.quote}”
              <footer className="mt-2 text-[clamp(12px,0.9vw,14px)] not-italic text-white/55">
                — {PRESS_RELEASE.founderQuote.attribution}, {PRESS_RELEASE.founderQuote.role}
              </footer>
            </blockquote>

            {PRESS_RELEASE.customerQuote ? (
              <blockquote className="m-0 border-l-2 border-pink/60 pl-5 italic text-white/85">
                “{PRESS_RELEASE.customerQuote.quote}”
                <footer className="mt-2 text-[clamp(12px,0.9vw,14px)] not-italic text-white/55">
                  — {PRESS_RELEASE.customerQuote.attribution}, {PRESS_RELEASE.customerQuote.role}
                </footer>
              </blockquote>
            ) : (
              <TodoPlaceholder label="Customer quote">
                Set <code className="font-mono text-yellow">PRESS_RELEASE.customerQuote</code> in{' '}
                <code className="font-mono text-yellow">src/data/press.ts</code>. Three candidates
                from the investor deck are listed in{' '}
                <code className="font-mono text-yellow">PULL_QUOTE_CANDIDATES</code> — confirm
                written sign-off from the speaker before publishing.
              </TodoPlaceholder>
            )}

            <p className="m-0">{PRESS_RELEASE.closingParagraph}</p>
          </div>

          <footer className="flex flex-col gap-4 border-t border-border-light pt-5">
            <div className="flex flex-col gap-2">
              <h4 className="m-0 text-[clamp(14px,1.05vw,17px)] font-semibold text-white">
                {PRESS_RELEASE.boilerplateHeading}
              </h4>
              <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/65 leading-relaxed">
                {PRESS_RELEASE.boilerplate}
              </p>
            </div>
            <div className="flex flex-col text-[clamp(12px,0.9vw,14px)] text-white/55">
              {PRESS_RELEASE.contactBlock.map((line, idx) => (
                <span key={idx} className={idx === 0 ? 'font-semibold text-white/75' : ''}>
                  {line}
                </span>
              ))}
            </div>
          </footer>
        </article>
      </section>
    </FadeIn>
  )
}
