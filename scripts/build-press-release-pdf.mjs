#!/usr/bin/env node
/**
 * Renders the press release defined in src/data/press.ts to a PDF at
 * public/press/assets/press-release/nice-touch-v2-press-release.pdf, so it can
 * be downloaded directly and bundled into the press kit ZIP.
 *
 * Run:   npm run press:pdf
 *
 * Imports the press release content straight from the data file (the single
 * source of truth) using Node's TypeScript type-stripping. Requires Node >= 22.
 */

import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const PDFDocument = require('pdfkit')

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const DATA_PATH = resolve(REPO_ROOT, 'src', 'data', 'press.ts')
const OUT_DIR = resolve(REPO_ROOT, 'public', 'press', 'assets', 'press-release')
const OUT_PATH = resolve(OUT_DIR, 'nice-touch-v2-press-release.pdf')

// Palette / layout constants
const PINK = '#ec4899'
const INK = '#1a1a1a'
const MUTED = '#555555'

async function loadPressRelease() {
  const mod = await import(pathToFileURL(DATA_PATH).href)
  if (!mod.PRESS_RELEASE) throw new Error('PRESS_RELEASE not exported from press.ts')
  return mod.PRESS_RELEASE
}

function quoteBlock(doc, quote) {
  doc.moveDown(0.6)
  const left = doc.page.margins.left
  const y0 = doc.y
  doc
    .font('Helvetica-Oblique')
    .fontSize(12)
    .fillColor(INK)
    .text(`“${quote.quote}”`, left + 16, doc.y, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right - 16,
    })
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(MUTED)
    .text(`— ${quote.attribution}, ${quote.role}`, left + 16, doc.y + 2, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right - 16,
    })
  // Pink rule down the left edge of the quote
  doc
    .save()
    .lineWidth(2)
    .strokeColor(PINK)
    .moveTo(left, y0)
    .lineTo(left, doc.y)
    .stroke()
    .restore()
  doc.moveDown(0.6)
}

async function main() {
  const pr = await loadPressRelease()
  await mkdir(OUT_DIR, { recursive: true })

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 64, bottom: 64, left: 64, right: 64 },
    info: {
      Title: 'Nice Touch V2 — Press Release',
      Author: 'Nice Touch',
      Subject: pr.headline,
    },
  })

  const done = new Promise((resolveDone, rejectDone) => {
    const stream = createWriteStream(OUT_PATH)
    doc.pipe(stream)
    stream.on('finish', resolveDone)
    stream.on('error', rejectDone)
  })

  const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right

  // Masthead
  doc.font('Helvetica-Bold').fontSize(20).fillColor(PINK).text('Nice Touch')
  doc.moveDown(0.4)

  // Embargo / release line
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(MUTED)
    .text(pr.embargoLine.toUpperCase(), { characterSpacing: 1.5 })
  doc.moveDown(0.6)

  // Headline
  doc.font('Helvetica-Bold').fontSize(17).fillColor(INK).text(pr.headline, { lineGap: 2 })
  doc.moveDown(0.8)

  // Body — first paragraph carries the dateline
  doc.font('Helvetica').fontSize(11).fillColor(INK)
  doc.text(`${pr.dateline} — ${pr.body[0]}`, { lineGap: 3, align: 'left' })
  for (let i = 1; i < pr.body.length; i++) {
    doc.moveDown(0.5)
    doc.text(pr.body[i], { lineGap: 3, align: 'left' })
  }

  // Quotes
  quoteBlock(doc, pr.founderQuote)
  if (pr.customerQuote) quoteBlock(doc, pr.customerQuote)

  // Closing line
  doc.font('Helvetica').fontSize(11).fillColor(INK).text(pr.closingParagraph, { lineGap: 3 })
  doc.moveDown(1)

  // Divider
  doc
    .save()
    .lineWidth(0.5)
    .strokeColor('#cccccc')
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.margins.left + contentWidth, doc.y)
    .stroke()
    .restore()
  doc.moveDown(0.8)

  // Boilerplate
  doc.font('Helvetica-Bold').fontSize(12).fillColor(INK).text(pr.boilerplateHeading)
  doc.moveDown(0.3)
  doc.font('Helvetica').fontSize(10).fillColor(MUTED).text(pr.boilerplate, { lineGap: 2 })
  doc.moveDown(0.8)

  // Contact block
  pr.contactBlock.forEach((line, idx) => {
    if (idx === 0) {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(line)
    } else {
      doc.font('Helvetica').fontSize(10).fillColor(MUTED).text(line)
    }
  })

  doc.end()
  await done
  console.log(`[press:pdf] wrote ${OUT_PATH}`)
}

main().catch((err) => {
  console.error('[press:pdf] failed:', err)
  process.exit(1)
})
