import { useState, useEffect, useCallback } from 'react'
import type { ReactElement } from 'react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import { GALLERY, PRESS_KIT_ZIP_PATH } from '@/data/press'
import type { GalleryItem } from '@/data/press'

// --------------------------------------------------------------------------
// Lightbox
// --------------------------------------------------------------------------

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem
  onClose: () => void
}): ReactElement {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    // Lock scroll without jumping to top
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-10 pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-10 right-0 text-white/60 hover:text-white text-[clamp(20px,1.8vw,28px)] leading-none"
        >
          ✕
        </button>

        {item.type === 'image' ? (
          <img
            src={item.web}
            alt={item.caption}
            className="rounded-lg max-w-[90vw] max-h-[80vh] object-contain shadow-2xl"
          />
        ) : (
          <video
            src={item.web}
            controls
            autoPlay
            className="rounded-lg max-w-[90vw] max-h-[80vh] shadow-2xl"
          />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-[clamp(12px,0.9vw,14px)] text-white/65 leading-snug max-w-xl">
            {item.caption}
          </p>
          <div className="flex flex-wrap gap-2 shrink-0">
            {item.alpha && !item.print ? (
              <Button as="a" href={item.alpha} variant="secondary" size="sm" download>
                Download PNG (alpha)
              </Button>
            ) : (
              <>
                <Button as="a" href={item.web} variant="secondary" size="sm" download>
                  {item.type === 'video' ? 'Download MP4' : 'Web res'}
                </Button>
                {item.print && (
                  <Button as="a" href={item.print} variant="ghost" size="sm" download>
                    In-situ PNG
                  </Button>
                )}
                {item.alpha && (
                  <Button as="a" href={item.alpha} variant="ghost" size="sm" download>
                    Alpha PNG
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// Gallery card
// --------------------------------------------------------------------------

function GalleryCard({
  item,
  onOpen,
}: {
  item: GalleryItem
  onOpen: (item: GalleryItem) => void
}): ReactElement {
  return (
    <div className="group flex flex-col rounded-lg border-2 border-border bg-black/20 overflow-hidden pointer-events-auto">
      {/* Image / video — fills card edge-to-edge, expands on hover */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="block w-full overflow-hidden cursor-zoom-in border-0 p-0"
        style={
          item.alpha && !item.print
            ? {
                backgroundColor: '#1e1e1e',
                backgroundImage:
                  'repeating-conic-gradient(#383838 0% 25%, transparent 0% 50%)',
                backgroundSize: '20px 20px',
              }
            : { backgroundColor: '#000' }
        }
        aria-label={`View larger: ${item.caption}`}
      >
        {item.type === 'image' ? (
          <img
            src={item.web}
            alt={item.caption}
            loading="lazy"
            className={`w-full transition-transform duration-300 ease-out group-hover:scale-[1.04] ${
              item.alpha && !item.print ? 'object-contain p-4' : 'object-cover'
            }`}
          />
        ) : (
          <video
            src={item.web}
            muted
            playsInline
            preload="metadata"
            className="w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        )}
      </button>

      {/* Caption + downloads */}
      <div className="flex flex-col gap-3 p-3">
        <p className="m-0 text-[clamp(12px,0.9vw,14px)] text-white/75 leading-snug">
          {item.caption}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {item.alpha && !item.print ? (
            /* Alpha-only card — single download */
            <Button as="a" href={item.alpha} variant="secondary" size="sm" download>
              Download PNG (alpha)
            </Button>
          ) : (
            /* In-situ card — web + in-situ + alpha options */
            <>
              <Button as="a" href={item.web} variant="secondary" size="sm" download>
                {item.type === 'video' ? 'Download MP4' : 'Web res'}
              </Button>
              {item.print && (
                <Button as="a" href={item.print} variant="ghost" size="sm" download>
                  In-situ PNG
                </Button>
              )}
              {item.alpha && (
                <Button as="a" href={item.alpha} variant="ghost" size="sm" download>
                  Alpha PNG
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// Main export
// --------------------------------------------------------------------------

export default function GalleryGrid(): ReactElement | null {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)
  const closeLightbox = useCallback(() => setLightboxItem(null), [])

  if (GALLERY.length === 0) return null

  return (
    <>
      <FadeIn className="w-full">
        <section className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-[clamp(22px,2vw,32px)] font-semibold text-white">
                Product images
              </h2>
              <p className="m-0 text-[clamp(13px,1vw,16px)] text-white/55">
                Click any image to view full size. Print-resolution PNGs are included in the press
                kit ZIP.
              </p>
            </div>
            <div className="pointer-events-auto">
              <Button as="a" href={PRESS_KIT_ZIP_PATH} variant="secondary" size="sm" download rel="nofollow">
                Download press kit (.zip)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(12px,1.5vw,20px)]">
            {GALLERY.map((item) => (
              <GalleryCard key={item.id} item={item} onOpen={setLightboxItem} />
            ))}
          </div>
        </section>
      </FadeIn>

      {lightboxItem && <Lightbox item={lightboxItem} onClose={closeLightbox} />}
    </>
  )
}
