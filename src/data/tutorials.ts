export interface Video {
  id: string
  title: string
  youtubeId: string
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
      },
      {
        id: 'multicam-premiere',
        title: 'Premiere Pro Multicam Setup: Complete Guide to Multi-Angle Editing',
        youtubeId: 'wUCCqFD7rME',
      },
      {
        id: 'multicam-nicetouch',
        title: 'Nice Touch AI Editing: Turn Multicam Into Professional Cuts Automatically',
        youtubeId: 'fXa2B20VIc8',
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
      },
      {
        id: 'ai-models',
        title: 'AI Models Explained with Toy Cars (Haiku vs Sonnet vs Opus)',
        youtubeId: 'mYrL0UfsHe4',
      },
      {
        id: 'creator-story',
        title: 'AI Editing Tool Saves This Creator Hours Per Week',
        youtubeId: 'bQEBYO5fCDM',
      },
    ],
  },
]
