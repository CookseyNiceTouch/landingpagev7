import type { FaqItem } from '@/data/home'

/**
 * Copy for the /for-teams page — aimed at the User-Decisionmaker ICP: the
 * senior editor (Head of Post, Lead Editor, Post Supervisor) who does the work,
 * feels the value, and makes the case for a team licence internally.
 */

export const FOR_TEAMS_HERO = {
  heading: 'Bring Nice Touch to your edit team',
  subtitle:
    "You feel the first-pass grind at team scale — every editor trawling footage, every project starting from the same manual work. Nice Touch clears that layer for the whole room, so the team spends less time on the first pass and more on the work that matters.",
} as const

export interface TeamValue {
  heading: string
  body: string
}

export const TEAM_VALUE: TeamValue[] = [
  {
    heading: 'Consistency across editors',
    body: "When editors jump into each other's projects, the first pass looks the same every time. Nice Touch applies one repeatable approach to footage prep, string-outs, and rough cuts — so a cut started by one editor is legible to the next.",
  },
  {
    heading: 'Faster time to first cut',
    body: 'The team stops losing the front of every project to watching, logging, and organising. Nice Touch does that pass, and everyone starts from structure instead of a blank timeline.',
  },
  {
    heading: 'Fits your existing pipeline',
    body: 'It runs inside DaVinci Resolve and Adobe Premiere Pro — the tools your team already uses. No new editing environment to roll out, no files to move, no retraining the room.',
  },
  {
    heading: 'The creative calls stay with your editors',
    body: "Nice Touch handles the repetitive, mechanical part of the job. It doesn't make the creative decisions — those stay with the people you hired to make them.",
  },
  {
    heading: 'Pooled usage and admin',
    body: 'Team and enterprise plans share generation and audio allowances across the group, with admin controls and dedicated support. You manage seats; the team just edits.',
  },
  {
    heading: 'Built for sensitive material',
    body: 'Footage is processed in isolated, ephemeral environments, encrypted in transit and at rest, and never used for model training — the answers your AI-governance review will ask for.',
  },
]

export const TEAM_FAQ: FaqItem[] = [
  {
    question: 'How does team pricing work?',
    answer:
      'Team and enterprise plans are licensed per seat with pooled generation and audio-analysis allowances shared across your editors, plus admin controls and dedicated support. Tell us your team size and we will put together the right plan.',
  },
  {
    question: 'Can I trial it before involving the whole team?',
    answer:
      'Yes — and most teams do. A senior editor typically trials Nice Touch on real projects first, then makes the case internally. Start on a personal plan tonight, or reach out and we will set you up to evaluate it properly with your team.',
  },
  {
    question: 'Will it force my editors into a new workflow?',
    answer:
      'No. Nice Touch runs alongside Resolve and Premiere and adapts to how your team already works. It takes on the repetitive first-pass work; your editors keep their own process and their creative control.',
  },
  {
    question: 'What does the AI-governance / data handling story look like?',
    answer:
      'Footage is processed in isolated, ephemeral environments that are destroyed after each job. All data is encrypted in transit (TLS 1.3) and at rest (AES-256), retained only as long as you configure, and never used to train models. See the Security page for the full technical architecture.',
  },
  {
    question: 'Which NLEs and platforms do you support?',
    answer:
      'DaVinci Resolve and Adobe Premiere Pro, on macOS and Windows, with the same capabilities across both.',
  },
]

/**
 * HubSpot form embedded on the team-enquiry page. Defaults to the shared
 * lead-capture form so enquiries are captured today; replace with a dedicated
 * "Team enquiry" form (company, team size, NLE) in HubSpot when one exists.
 */
export const TEAM_ENQUIRY_FORM_ID = 'e7b7312c-1884-4467-a616-42a27512a402'
