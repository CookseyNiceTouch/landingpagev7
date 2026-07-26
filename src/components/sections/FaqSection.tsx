import { useState, useCallback } from 'react'
import type { ReactElement } from 'react'
import { FAQ_ITEMS } from '@/data/home'
import type { FaqItem } from '@/data/home'

interface FaqSectionProps {
  /** FAQ entries to render. Defaults to the homepage set. */
  items?: FaqItem[]
}

export default function FaqSection({ items = FAQ_ITEMS }: FaqSectionProps): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }, [])

  return (
    <section className="faq-section">
      <dl className="faq-list">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          const panelId = `faq-panel-${i}`
          const buttonId = `faq-button-${i}`
          return (
            <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
              <dt>
                <button
                  id={buttonId}
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    {isOpen ? '\u2212' : '+'}
                  </span>
                </button>
              </dt>
              <dd className="faq-answer" id={panelId} role="region" aria-labelledby={buttonId}>
                <p className="faq-answer-text">{item.answer}</p>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
