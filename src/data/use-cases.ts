export const USE_CASES_HERO = {
  heading: 'Built for professional post-production teams',
  subtitle:
    'Nice Touch delivers the strongest return where there is meaningful footage volume and enough workflow repetition for automation to create clear value.',
} as const

export interface UseCase {
  audience: string
  description: string
}

export const USE_CASES: UseCase[] = [
  {
    audience: 'Dedicated freelance editors',
    description:
      'Speed up rough cuts and reduce repetitive edit administration across multiple client projects. Spend more time on the creative work that keeps clients coming back.',
  },
  {
    audience: 'SME video agencies',
    description:
      'Client delivery pressure and margin sensitivity make throughput improvements commercially meaningful. Nice Touch helps teams deliver more with the same headcount.',
  },
  {
    audience: 'In-house brand teams',
    description:
      'Regular output cycles and multi-stakeholder approval workflows create overhead that Nice Touch reduces, freeing creative resource for higher-value work.',
  },
  {
    audience: 'Podcast and multicam teams',
    description:
      'Long-form, multi-angle, and cut-down workflows are time-intensive and highly repeatable. Nice Touch accelerates the first-pass listen and rough assembly significantly.',
  },
  {
    audience: 'High-volume creator teams',
    description:
      'Publishing and repurposing at scale creates repeated edit patterns that benefit from automation. Nice Touch handles the repetitive parts so teams can focus on storytelling.',
  },
  {
    audience: 'Enterprise post teams',
    description:
      'Larger accounts with organisational complexity, pooled usage needs, and higher throughput requirements. Custom plans, dedicated support, and admin controls included.',
  },
]

export const BUYING_MOTION =
  'Nice Touch typically wins the economic buyer with throughput and ROI, then wins the editor with proof that the product respects real workflows and keeps creative control intact. Both audiences need to say yes.'
