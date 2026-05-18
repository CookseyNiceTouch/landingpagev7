#!/usr/bin/env node
/**
 * Generates optimised WebP web versions of hi-res press product shots.
 * Run: node scripts/resize-press-images.mjs
 */
import sharp from 'sharp'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(__dirname, '..', 'public', 'press', 'assets', 'images')

const FILES = [
  'product-pill-hires.png',
  'product-import-hires.png',
  'product-overview-hires.png',
  'product-questions-hires.png',
  'product-edit-hires.png',
]

for (const f of FILES) {
  const src = resolve(DIR, f)
  const dest = resolve(DIR, f.replace('-hires.png', '-web.webp'))
  const info = await sharp(src)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest)
  const kb = (info.size / 1024).toFixed(0)
  console.log(`[resize] ${f.replace('-hires.png', '')} → ${info.width}×${info.height} — ${kb}KB`)
}

console.log('[resize] done')
