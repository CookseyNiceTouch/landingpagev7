#!/usr/bin/env node
/**
 * Bundles everything under public/press/assets/ into
 * public/press/nice-touch-press-kit.zip.
 *
 * Run:   npm run press:zip
 *
 * Safe to run when the assets folder is empty — emits a warning but still
 * produces a (mostly empty) ZIP so the download link doesn't 404.
 */

import { createWriteStream } from 'node:fs'
import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { ZipArchive } from 'archiver'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const PRESS_DIR = resolve(REPO_ROOT, 'public', 'press')
const ASSETS_DIR = resolve(PRESS_DIR, 'assets')
const OUT_PATH = resolve(PRESS_DIR, 'nice-touch-press-kit.zip')

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function main() {
  await mkdir(PRESS_DIR, { recursive: true })

  if (!(await exists(ASSETS_DIR))) {
    console.warn(`[press:zip] WARNING: ${ASSETS_DIR} does not exist. Producing empty ZIP.`)
    await mkdir(ASSETS_DIR, { recursive: true })
  }

  const output = createWriteStream(OUT_PATH)
  const archive = new ZipArchive({ zlib: { level: 9 } })

  const done = new Promise((resolveDone, rejectDone) => {
    output.on('close', resolveDone)
    output.on('error', rejectDone)
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') console.warn('[press:zip] warning:', err.message)
      else rejectDone(err)
    })
    archive.on('error', rejectDone)
  })

  archive.pipe(output)
  archive.glob('**/*', {
    cwd: ASSETS_DIR,
    ignore: ['**/.gitkeep'],
    dot: false,
  })
  await archive.finalize()
  await done

  const sizeKb = (archive.pointer() / 1024).toFixed(1)
  console.log(`[press:zip] wrote ${OUT_PATH} (${sizeKb} KB)`)
}

main().catch((err) => {
  console.error('[press:zip] failed:', err)
  process.exit(1)
})
