export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  repo: string
}

export const TOOLS: Tool[] = [
  {
    id: 'nt-converter',
    name: 'Nice Touch File Converter',
    tagline: 'Free video converter for macOS and Windows.',
    description:
      'Offline file converter. Drop in your footage and convert between formats in a single click. Supports all major codecs including ProRes, H.264, H.265, and DNxHR — no watermarks, no limits, no account required.',
    features: [
      'Batch convert multiple files at once',
      'ProRes, H.264, H.265, DNxHR & more',
      'No watermarks or file-size limits',
      'Completely free — no account needed',
    ],
    repo: 'CookseyNiceTouch/nt_converter',
  },
]
