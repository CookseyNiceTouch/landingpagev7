import type { ReactElement } from 'react'

export interface CrtOverlayProps {
  /**
   * Bloom blur radius in pixels. 0 = off.
   * 4–8 = soft phosphor glow · 12–20 = heavy bloom.
   * Default: 8
   */
  glowBlur?: number

  /**
   * Bloom strength (0–1). Scales the bloom layer before the screen blend.
   * Higher = brighter glow. Default: 0.4
   */
  glowOpacity?: number

  /**
   * Brightness threshold (0–1). Only pixels brighter than this value bloom.
   * 0.0 = everything glows · 0.4 = midtones+ · 0.7 = highlights only.
   * Default: 0.3
   */
  glowThreshold?: number
}

export default function CrtOverlay({
  glowBlur      = 8,
  glowOpacity   = 0.4,
  glowThreshold = 0.3,
}: CrtOverlayProps): ReactElement {
  const t         = Math.min(Math.max(glowThreshold, 0), 0.999)
  const slope     = 1 / (1 - t)
  const intercept = -(t / (1 - t))

  return (
    <>
      {/*
        Self-contained bloom filter:
          1. Extract pixels above glowThreshold (feComponentTransfer)
          2. Blur them (feGaussianBlur)
          3. Scale by glowOpacity (feComponentTransfer)
          4. Screen blend back onto SourceGraphic (feBlend mode="screen")
        Screen blend can only lighten — output is always >= input at every pixel.
        Applied via CSS `filter` on the content; no backdrop-filter, no blend-mode hacks.
      */}
      {glowBlur > 0 && (
        <svg
          style={{ position: 'absolute', width: 0, height: 0 }}
          aria-hidden
        >
          <defs>
            <filter id="crt-glow" x="-20%" y="-20%" width="140%" height="140%">
              {/* Step 1 — threshold: remap [threshold, 1] → [0, 1], clip below to black */}
              <feComponentTransfer in="SourceGraphic" result="brights">
                <feFuncR type="linear" slope={slope} intercept={intercept} />
                <feFuncG type="linear" slope={slope} intercept={intercept} />
                <feFuncB type="linear" slope={slope} intercept={intercept} />
              </feComponentTransfer>

              {/* Step 2 — blur the bright pixels */}
              <feGaussianBlur in="brights" stdDeviation={glowBlur} result="rawBloom" />

              {/* Step 3 — scale bloom by glowOpacity */}
              <feComponentTransfer in="rawBloom" result="bloom">
                <feFuncR type="linear" slope={glowOpacity} />
                <feFuncG type="linear" slope={glowOpacity} />
                <feFuncB type="linear" slope={glowOpacity} />
              </feComponentTransfer>

              {/* Step 4 — screen blend: always lightens, result >= original */}
              <feBlend in="SourceGraphic" in2="bloom" mode="screen" />
            </filter>
          </defs>
        </svg>
      )}

      <div className="crt-scanlines" aria-hidden />
      <div className="crt-vignette" aria-hidden />
    </>
  )
}
