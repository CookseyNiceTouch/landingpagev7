import { useState, useCallback } from 'react'
import type { ReactElement } from 'react'
import { FAQ_ITEMS } from '@/data/home'

export default function FaqSection(): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }, [])

  return (
    <section className="faq-section">
      <dl className="faq-list">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
              <dt>
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    {isOpen ? '\u2212' : '+'}
                  </span>
                </button>
              </dt>
              <dd className="faq-answer">
                <p className="faq-answer-text">{item.answer}</p>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
