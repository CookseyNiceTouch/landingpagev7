export interface Step {
  id: string
  title: string
  lines: string[]
}

export interface Workflow {
  id: string
  label: string
  copy: string
}

export const STEPS: [Step, Step, Step] = [
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

export const WORKFLOWS: Workflow[] = [
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
