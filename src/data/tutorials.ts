export interface Video {
  id: string
  title: string
  youtubeId: string
  /** One-line summary used for the VideoObject schema. */
  description: string
  /** ISO 8601 publish date (from YouTube) — required for VideoObject rich results. */
  uploadDate: string
  /** ISO 8601 duration (e.g. 'PT6M25S'). */
  duration: string
}

export interface VideoSection {
  heading: string
  description: string
  videos: Video[]
}

export const VIDEO_SECTIONS: VideoSection[] = [
  {
    heading: 'Multicam Tutorials',
    description:
      'Step-by-step guides to setting up and editing multicam projects in DaVinci Resolve, Premiere Pro, and with Nice Touch AI.',
    videos: [
      {
        id: 'multicam-resolve',
        title: 'DaVinci Resolve Multicam Tutorial: Audio Sync, Color Correction & More',
        youtubeId: 'q0J5tYnyfV8',
        description:
          'How to set up multicam clips in DaVinci Resolve — audio sync options, organising angles, multicam monitor switching, and rippling colour corrections through your edit.',
        uploadDate: '2026-03-12T13:06:25-07:00',
        duration: 'PT6M25S',
      },
      {
        id: 'multicam-premiere',
        title: 'Premiere Pro Multicam Setup: Complete Guide to Multi-Angle Editing',
        youtubeId: 'wUCCqFD7rME',
        description:
          'A complete guide to multicam sequences in Adobe Premiere Pro — choosing the right sync method, organising camera angles, and switching angles in real time for non-destructive edits.',
        uploadDate: '2026-03-12T13:04:57-07:00',
        duration: 'PT5M54S',
      },
      {
        id: 'multicam-nicetouch',
        title: 'Nice Touch AI Editing: Turn Multicam Into Professional Cuts Automatically',
        youtubeId: 'fXa2B20VIc8',
        description:
          'How Nice Touch works with multicam footage: import a multicam clip, let it analyse and generate a first cut, then iterate non-destructively while keeping every creative call in your hands.',
        uploadDate: '2026-03-12T13:09:15-07:00',
        duration: 'PT5M44S',
      },
    ],
  },
  {
    heading: 'More from Nice Touch',
    description:
      'Walkthroughs, explainers, and creator stories.',
    videos: [
      {
        id: 'walkthrough',
        title: 'Nice Touch Walkthrough',
        youtubeId: 'z1yfr3MYluQ',
        description:
          'A full walkthrough of setting up and using Nice Touch inside Adobe Premiere Pro and DaVinci Resolve — creating a project, analysing rushes, generating a rough cut, and iterating with the assistant.',
        uploadDate: '2026-02-14T03:12:33-08:00',
        duration: 'PT4M24S',
      },
      {
        id: 'ai-models',
        title: 'AI Models Explained with Toy Cars (Haiku vs Sonnet vs Opus)',
        youtubeId: 'mYrL0UfsHe4',
        description:
          'A plain-English explainer of AI model trade-offs — speed, capability, and context length — and how Nice Touch matches Claude Haiku, Sonnet, and Opus to different jobs in the app.',
        uploadDate: '2026-02-07T12:12:49-08:00',
        duration: 'PT2M47S',
      },
      {
        id: 'creator-story',
        title: 'AI Editing Tool Saves This Creator Hours Per Week',
        youtubeId: 'bQEBYO5fCDM',
        description:
          'Woodworker and creator Alex shows how he uses Nice Touch to clean up long voiceover recordings — cutting retakes, ums, and repetition down to a polished first pass inside DaVinci Resolve.',
        uploadDate: '2026-03-18T05:52:57-07:00',
        duration: 'PT3M20S',
      },
    ],
  },
]
