export const USE_CASES_HERO = {
  heading: 'Whether you edit solo or run the team',
  subtitle:
    "Nice Touch earns its place wherever there's more footage than time — dialogue-led work like podcasts, interviews, talking heads, and documentary, where the first pass eats the hours you'd rather spend on the cut.",
} as const

export interface UseCase {
  audience: string
  description: string
}

export const USE_CASES: UseCase[] = [
  {
    audience: 'Freelance & solo editors',
    description:
      'You shoot it, you cut it, you deliver it — and the first pass through the footage is your evening gone. Nice Touch does the trawl and the string-out so you get to the real edit faster, on every client project.',
  },
  {
    audience: 'Podcast & interview teams',
    description:
      'Long-form talking heads, multi-angle setups, and cut-downs: the most repeatable work there is, and the most time-intensive. Nice Touch handles the first listen and the rough assembly so the edit starts sooner.',
  },
  {
    audience: 'Documentary & factual',
    description:
      'Hundreds of hours of cards, one usable line at a time. Nice Touch sifts the material, tracks who said what, and builds structure out of the chaos before you touch the timeline.',
  },
  {
    audience: 'SME video agencies',
    description:
      'Delivery pressure and thin margins make throughput commercial. Nice Touch helps the team ship more without adding headcount — and keeps the first pass consistent from editor to editor.',
  },
  {
    audience: 'In-house brand & content teams',
    description:
      'Regular output cycles and multi-stakeholder approvals pile on overhead. Nice Touch clears the repetitive first pass so the team spends its time on the work that actually gets noticed.',
  },
  {
    audience: 'Post houses & enterprise',
    description:
      'Higher volume, pooled usage, and one standard workflow across a room of editors. Custom plans, admin controls, and dedicated support — talk to us about team licensing.',
  },
]

export const BUYING_MOTION =
  'Nice Touch typically wins the economic buyer with throughput and ROI, then wins the editor with proof that the product respects real workflows and keeps creative control intact. Both audiences need to say yes.'
