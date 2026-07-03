import type { FaqItem } from '@/data/home'

/**
 * Dialogue-led vertical landing pages. Each entry is a full page's worth of
 * copy, rendered by the shared VerticalLanding component and registered in
 * routes.tsx / navigation.ts. These target the ICP's sweet-spot content types
 * (podcasts, interviews, sermons) for both messaging fit and SEO.
 */
export interface VerticalHelp {
  heading: string
  body: string
}

export interface Vertical {
  slug: string
  navLabel: string
  seoTitle: string
  seoDescription: string
  hero: { heading: string; subtitle: string }
  painHeading: string
  pain: string[]
  helpsHeading: string
  helps: VerticalHelp[]
  faq: FaqItem[]
}

export const VERTICALS: Vertical[] = [
  {
    slug: '/podcast-editing',
    navLabel: 'Podcast editing',
    seoTitle: 'Podcast Video Editing',
    seoDescription:
      'Cut video podcasts faster in Adobe Premiere Pro and DaVinci Resolve. Nice Touch transcribes the full episode, syncs multicam, and builds a first-pass rough cut so you start from structure. The AI edit assistant that leaves the creative calls to you.',
    hero: {
      heading: 'Podcast editing, minus the first pass',
      subtitle:
        'Multi-cam conversations, hours long, every week. Nice Touch listens through the whole recording, finds the moments, and builds the rough cut inside Premiere Pro or DaVinci Resolve — so you start from a structured timeline instead of raw tracks. The creative calls stay yours.',
    },
    painHeading: 'The part of podcast editing nobody films',
    pain: [
      "The recording lands and it's two or three hours across four cameras and a couple of recorders. Before you make a single creative decision, you're syncing, listening end to end, and marking the bits worth keeping.",
      "Do that every week, on every episode, and the front of the job quietly eats the time you'd rather spend shaping the cut — or the evening you'd rather have back.",
    ],
    helpsHeading: 'What Nice Touch does for podcast editors',
    helps: [
      {
        heading: 'Full-episode transcription',
        body: 'A word-level transcript of the whole conversation, with speaker labels, so every line is searchable before you touch the timeline.',
      },
      {
        heading: 'First-pass rough cut',
        body: 'Nice Touch pulls the strongest moments and assembles a structured rough cut in your NLE — dead air and false starts trimmed, ready for you to shape.',
      },
      {
        heading: 'Multi-cam, handled',
        body: 'Multiple angles and recorder tracks scored and synced as one conversation, so you stop watching four timelines to find one beat. Multicam is on Pro plans and above.',
      },
      {
        heading: 'Cut-downs and clips',
        body: 'Once the long-form cut exists, spinning out shorter segments and highlights starts from a searchable transcript, not a scrub through the whole episode.',
      },
    ],
    faq: [
      {
        question: 'Does Nice Touch work with multi-camera podcast setups?',
        answer:
          'Yes. Multicam is available on Pro plans and above. Nice Touch scores the audio across your camera and recorder sources, syncs the angles, and treats the whole conversation as one narrative.',
      },
      {
        question: 'Which audio does it use — camera mics or my recorder?',
        answer:
          'Nice Touch scores every available audio candidate and suggests the strongest one. You stay in control: the suggested default can be confirmed or overridden before transcription runs.',
      },
      {
        question: 'Will it cut the whole episode for me automatically?',
        answer:
          'It builds a first-pass rough cut from your footage for you to review and refine. Nice Touch handles the repetitive assembly; the creative decisions stay yours.',
      },
      {
        question: 'Which editors does it run in?',
        answer:
          'DaVinci Resolve and Adobe Premiere Pro, on macOS and Windows, with the same capabilities across both.',
      },
    ],
  },
  {
    slug: '/interview-editing',
    navLabel: 'Interview editing',
    seoTitle: 'Interview & Talking-Head Editing',
    seoDescription:
      'Edit talking-head interviews faster. Nice Touch transcribes every answer, finds the usable takes, and builds a first-pass string-out inside Adobe Premiere Pro and DaVinci Resolve — an AI edit assistant for interview and documentary editors.',
    hero: {
      heading: 'Interview editing that starts from structure',
      subtitle:
        'Talking-head footage is mostly listening — hours of it, before the story takes shape. Nice Touch transcribes every answer, finds the usable takes, and builds a first-pass string-out inside Premiere Pro or DaVinci Resolve. You make the story; it does the trawl.',
    },
    painHeading: 'Before the interview becomes a story',
    pain: [
      "You come back with hours of talking heads and a brief. The first job isn't editing — it's watching everything, twice, to know what you've actually got and where the good answers are.",
      "It's the least visible part of the work and one of the longest, and it stands between you and the edit that's actually worth your time.",
    ],
    helpsHeading: 'What Nice Touch does for interview editors',
    helps: [
      {
        heading: 'Every answer, transcribed',
        body: 'A word-level transcript with speaker labels turns hours of talking heads into searchable text you can scan in minutes.',
      },
      {
        heading: 'Find the usable takes',
        body: 'Ask for a moment, a theme, or a soundbite and Nice Touch surfaces it with timecode — no scrubbing back and forth.',
      },
      {
        heading: 'First-pass string-out',
        body: 'Nice Touch assembles a rough string-out of the strongest answers in your NLE, so the story starts from structure rather than raw clips.',
      },
      {
        heading: 'Multi-cam interviews',
        body: 'Two-camera and multi-angle interviews synced and scored as one conversation. Multicam is on Pro plans and above.',
      },
    ],
    faq: [
      {
        question: 'Does it handle two-camera interview setups?',
        answer:
          'Yes. Multicam is included on Pro plans and above. Nice Touch syncs the angles and scores the audio so the interview is treated as a single conversation.',
      },
      {
        question: 'Can I search the footage for a specific quote?',
        answer:
          'Yes. Every answer is transcribed with word-level timecodes, so you can search the footage as text and jump straight to the moment.',
      },
      {
        question: 'Does it decide the narrative for me?',
        answer:
          'No. Nice Touch builds a first-pass string-out of the strongest material; shaping the story and the final cut stays with you.',
      },
      {
        question: 'Is my footage used to train models?',
        answer:
          'No. Footage is processed in isolated, ephemeral environments, encrypted in transit and at rest, and never used for model training.',
      },
    ],
  },
  {
    slug: '/sermon-editing',
    navLabel: 'Sermon editing',
    seoTitle: 'Sermon & Church Video Editing',
    seoDescription:
      'Faster sermon and church service editing. Nice Touch transcribes the message, syncs multicam, and builds the rough cut in Adobe Premiere Pro and DaVinci Resolve — with captions and subtitles via the free transcription tool.',
    hero: {
      heading: 'Sermon and church video editing, the fast way to the first cut',
      subtitle:
        'A service or sermon is long, multi-cam, and it goes out every week. Nice Touch transcribes the message, builds the rough cut, and helps you pull shareable clips inside Premiere Pro or DaVinci Resolve — so your media team ships sooner without living in the timeline.',
    },
    painHeading: 'The weekly turnaround nobody sees',
    pain: [
      'Every week the service has to be cut, captioned, and clipped — often by a small team or a single volunteer, always against a deadline. The recording is long and multi-cam, and most of the time goes on the first pass before any real editing begins.',
      "It's the same shape of work, week after week, and it's exactly the part that keeps the team up late.",
    ],
    helpsHeading: 'What Nice Touch does for church media teams',
    helps: [
      {
        heading: 'Full-length transcription',
        body: 'The whole message transcribed with word-level accuracy — ready for captions, subtitles, and a searchable record of what was said.',
      },
      {
        heading: 'First-pass rough cut',
        body: 'Nice Touch assembles a structured rough cut of the service or sermon in your NLE, so the edit starts from a timeline instead of raw multicam.',
      },
      {
        heading: 'Clips for sharing',
        body: 'Pull shareable moments and short segments from a searchable transcript, rather than scrubbing through the full recording.',
      },
      {
        heading: 'Multi-cam services',
        body: 'Multiple angles synced and scored as one, so a small team is not juggling timelines. Multicam is on Pro plans and above.',
      },
    ],
    faq: [
      {
        question: 'Can I get captions and subtitles for the service?',
        answer:
          'Yes. Nice Touch transcribes the full message with word-level accuracy, and the free Nice Touch transcription tool exports SRT and VTT subtitle files for your timeline.',
      },
      {
        question: 'Does it work for a small volunteer media team?',
        answer:
          'Yes — that is much of who it is built for. Nice Touch takes on the long first pass so a small team can turn the service around faster and more consistently, week to week.',
      },
      {
        question: 'Does it handle multi-camera services?',
        answer:
          'Yes. Multicam is available on Pro plans and above. Nice Touch syncs the angles and scores the audio so the service is handled as one recording.',
      },
      {
        question: 'Which editing software does it support?',
        answer:
          'DaVinci Resolve and Adobe Premiere Pro, on macOS and Windows, with the same capabilities across both.',
      },
    ],
  },
]

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug)
}
