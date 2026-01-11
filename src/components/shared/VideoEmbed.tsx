import { useState, type ReactElement } from 'react'

interface VideoEmbedProps {
  videoUrl: string
  title: string
  caption?: string
  transcript?: string
  showTranscript?: boolean
  className?: string
}

function VideoEmbed({
  videoUrl,
  title,
  caption,
  transcript,
  showTranscript = true,
  className = '',
}: VideoEmbedProps): ReactElement {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)

  return (
    <div className={`video-embed ${className}`.trim()}>
      <div className="video-embed-container">
        <iframe
          className="video-embed-iframe"
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          allowFullScreen
        />
      </div>
      
      {caption && <p className="video-embed-caption">{caption}</p>}
      
      {showTranscript && transcript && (
        <div className="video-embed-transcript">
          <button
            className="video-embed-transcript-toggle"
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            aria-expanded={isTranscriptOpen}
          >
            {isTranscriptOpen ? 'Hide' : 'Show'} Transcript
          </button>
          
          {isTranscriptOpen && (
            <div className="video-embed-transcript-content">
              <p>{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default VideoEmbed

