import { useCallback, useState } from 'react'
import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import DropZone from '@/components/transcribe/DropZone'
import Controls, { type ControlsState } from '@/components/transcribe/Controls'
import Progress from '@/components/transcribe/Progress'
import TranscriptView from '@/components/transcribe/TranscriptView'
import DownloadGate from '@/components/transcribe/DownloadGate'
import DownloadButtons from '@/components/transcribe/DownloadButtons'
import ResultCTA from '@/components/transcribe/ResultCTA'
import SeoContent from '@/components/transcribe/SeoContent'
import { useTranscribe } from '@/hooks/useTranscribe'
import { SEO as SEO_COPY, MAX_DURATION_LABEL, FAQ, STEPS } from '@/data/transcribe'

const PAGE_URL = 'https://nicetouch.app/transcribe/'

const STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Nice Touch Free Transcription Tool',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    url: PAGE_URL,
    description: SEO_COPY.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Automatic language detection (99+ languages)',
      'Speaker diarization',
      'Word (RTF), SRT, and VTT export',
      `Up to 100 MB and ${MAX_DURATION_LABEL} per file`,
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nice Touch',
      url: 'https://nicetouch.app',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to transcribe audio or video for free',
    description:
      'Turn an audio or video recording into a written transcript with speaker labels and exportable subtitle files in three steps.',
    totalTime: 'PT5M',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title.replace(/^\d+\.\s*/, ''),
      text: s.body,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nicetouch.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://nicetouch.app/tools/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Free Transcription Tool',
        item: PAGE_URL,
      },
    ],
  },
]

export default function Transcribe(): ReactElement {
  const [file, setFile] = useState<File | null>(null)
  const [controls, setControls] = useState<ControlsState>({ speakers: true, timestamps: false })
  const {
    status,
    transcript,
    audioDuration,
    error,
    upload,
    processingElapsedMs,
    submit,
    reset,
  } = useTranscribe()

  const onFile = useCallback((next: File) => {
    setFile(next)
  }, [])

  const onStart = useCallback(() => {
    if (!file) return
    submit(file, { speakers: controls.speakers })
  }, [file, controls.speakers, submit])

  const onTryAgain = useCallback(() => {
    reset()
    setFile(null)
  }, [reset])

  const isWorking = status === 'uploading' || status === 'queued' || status === 'processing'
  const showResult = status === 'completed' && transcript !== null
  const showError = status === 'error' && error !== null

  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(40px,5vw,80px)] p-[clamp(24px,4vw,96px)] px-4 sm:px-10 pointer-events-none">
      <SEO
        title={SEO_COPY.title}
        description={SEO_COPY.description}
        path="/transcribe"
        image="/og/transcribe.png"
        imageAlt={'Nice Touch \u2014 Free Transcription Tool. Export to Word, SRT, or VTT.'}
        largeImagePreview
        preconnect={['https://forms-eu1.hsforms.com', 'https://js-eu1.hsforms.net']}
        structuredData={STRUCTURED_DATA}
      />

      <FadeIn className="flex flex-col items-center gap-3 text-center max-w-[44rem]">
        <h1 className="m-0 text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight tracking-tight">
          {SEO_COPY.h1}
        </h1>
        <p className="m-0 text-[clamp(14px,1.1vw,18px)] text-white/55">
          {SEO_COPY.intro}
        </p>
      </FadeIn>

      <Container size="md" className="flex justify-center">
        <FadeIn className="w-full">
          <div className="flex flex-col gap-[clamp(20px,2vw,32px)] p-[clamp(24px,3vw,40px)] border-2 border-border rounded-lg bg-black/20 w-full pointer-events-auto">
            {!isWorking && !showResult && (
              <>
                <DropZone onFile={onFile} disabled={isWorking} />

                {file && (
                  <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-md bg-white/5 text-[clamp(13px,1vw,15px)] text-white/85">
                    <span className="truncate">
                      <span className="font-semibold">{file.name}</span>
                      <span className="ml-2 text-white/55">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-white/55 hover:text-white text-sm pointer-events-auto"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <Controls value={controls} onChange={setControls} disabled={isWorking} />

                <Button
                  variant="primary"
                  size="lg"
                  onClick={onStart}
                  disabled={!file}
                  className={!file ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Transcribe
                </Button>
              </>
            )}

            {isWorking && (
              <Progress
                status={status}
                upload={upload}
                processingElapsedMs={processingElapsedMs}
                audioDuration={audioDuration}
              />
            )}

            {showResult && transcript && (
              <div className="flex flex-col gap-[clamp(20px,2.5vw,36px)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="m-0 text-[clamp(18px,1.6vw,24px)] font-bold text-white">
                    Transcript
                  </h2>
                  <button
                    type="button"
                    onClick={onTryAgain}
                    className="text-[clamp(12px,0.95vw,14px)] text-white/55 hover:text-white pointer-events-auto"
                  >
                    Transcribe another file
                  </button>
                </div>

                <div className="max-h-[420px] overflow-y-auto pr-2 -mr-2">
                  <TranscriptView transcript={transcript} />
                </div>

                <DownloadGate>
                  <DownloadButtons
                    transcript={transcript}
                    speakers={controls.speakers}
                    timestamps={controls.timestamps}
                    baseName={file?.name ?? 'transcript'}
                  />
                </DownloadGate>

                <ResultCTA />
              </div>
            )}

            {showError && error && (
              <div className="flex flex-col gap-3 p-4 rounded-md bg-pink/10 border border-pink/30">
                <span className="text-[clamp(14px,1.1vw,16px)] font-semibold text-white">
                  {error.message}
                </span>
                <Button variant="secondary" size="md" onClick={onTryAgain}>
                  Try again
                </Button>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>

      <SeoContent />
    </div>
  )
}
