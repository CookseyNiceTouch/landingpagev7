#!/usr/bin/env node
/**
 * Generates Open Graph share images by rasterising hand-rolled SVGs.
 *
 * Output: public/og/<slug>.png at 1200x630 (Facebook/LinkedIn/Twitter spec).
 *
 * Run:   npm run og:generate
 *
 * The SVG is text-only with system sans-serif fallbacks so the script has
 * no font dependencies. Replace the generated PNGs with designed assets at
 * the same paths whenever you have something prettier to ship.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(REPO_ROOT, 'public', 'og')

const WIDTH = 1200
const HEIGHT = 630

const PINK = '#ff008c'
const WHITE = '#ffffff'
const SUBTLE = '#888888'
const BG = '#000000'

/**
 * @param {{ wordmark: string, title: string, subtitle: string }} args
 * @returns {string}
 */
function buildSvg({ wordmark, title, subtitle }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PINK}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${PINK}" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}" />
  <circle cx="900" cy="180" r="420" fill="url(#glow)" />

  <rect x="80" y="80" width="80" height="6" fill="${PINK}" rx="3" />

  <text x="80" y="200" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="700" fill="${PINK}" letter-spacing="6">${wordmark}</text>

  <text x="80" y="350" font-family="Helvetica, Arial, sans-serif" font-size="92" font-weight="800" fill="${WHITE}" letter-spacing="-2">${title}</text>

  <text x="80" y="430" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="400" fill="${SUBTLE}">${subtitle}</text>

  <rect x="80" y="540" width="60" height="2" fill="${PINK}" rx="1" />
  <text x="160" y="552" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="500" fill="${SUBTLE}">nicetouch.app/transcribe</text>
</svg>`
}

/** @type {{ slug: string, wordmark: string, title: string, subtitle: string }[]} */
const IMAGES = [
  {
    slug: 'transcribe',
    wordmark: 'NICE TOUCH',
    title: 'Free Transcription Tool',
    subtitle: 'Export to Word, SRT, or VTT \u00b7 No sign-up',
  },
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  for (const img of IMAGES) {
    const svg = buildSvg(img)
    const outPath = resolve(OUT_DIR, `${img.slug}.png`)
    const buffer = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
    await writeFile(outPath, buffer)
    console.log(`[og] wrote ${outPath} (${buffer.length} bytes)`)
  }
}

main().catch((err) => {
  console.error('[og] failed:', err)
  process.exit(1)
})
