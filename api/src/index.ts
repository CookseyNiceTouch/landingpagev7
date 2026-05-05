import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { loadEnv } from './config.js'
import {
  getTranscript,
  submitTranscript,
  uploadFile,
} from './assemblyai.js'
import {
  estimateCostUsd,
  getDailySpendUsd,
  incrementDailySpendUsd,
  isOverDailyCap,
  markCounted,
} from './spend-cap.js'

const env = loadEnv()
const app = new Hono()

app.use('*', logger())
const allowedOrigins =
  env.NODE_ENV === 'production'
    ? env.ALLOWED_ORIGIN
    : [...env.ALLOWED_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173']

app.use(
  '/api/*',
  cors({
    origin: allowedOrigins,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'X-Speakers', 'X-Timestamps'],
    maxAge: 600,
  }),
)

app.get('/healthz', (c) => c.text('ok'))

/**
 * POST /api/transcribe/submit
 *
 * Body: raw file bytes (any audio/video MIME type). The body MUST be the file
 * itself (no multipart wrapping) — keeps the proxy streaming and removes the
 * cost of buffering 100 MB into memory.
 *
 * Query params:
 *   speakers   - "true" | "false" (default "true")
 *   timestamps - kept client-side only; word timestamps are always returned by
 *                AssemblyAI and the frontend toggle just controls the TXT
 *                download.
 *
 * Returns: { id }
 */
app.post('/api/transcribe/submit', async (c) => {
  if (await isOverDailyCap()) {
    return c.json(
      {
        error: 'daily_cap',
        message:
          'Free transcription is at capacity for today. Please try again tomorrow.',
      },
      429,
    )
  }

  const lengthHeader = c.req.header('content-length')
  const length = lengthHeader ? Number.parseInt(lengthHeader, 10) : NaN
  if (!Number.isFinite(length) || length <= 0) {
    return c.json(
      { error: 'missing_length', message: 'Content-Length header required.' },
      411,
    )
  }
  if (length > env.MAX_BYTES) {
    return c.json(
      {
        error: 'file_too_large',
        message: `File exceeds the ${Math.round(env.MAX_BYTES / 1024 / 1024)} MB limit.`,
        max_bytes: env.MAX_BYTES,
      },
      413,
    )
  }

  const body = c.req.raw.body
  if (!body) {
    return c.json({ error: 'no_body', message: 'Request body required.' }, 400)
  }

  const speakers = c.req.query('speakers') !== 'false'

  let uploadUrl: string
  try {
    uploadUrl = await uploadFile(body)
  } catch (err) {
    console.error('[submit] upload failed:', err)
    return c.json(
      { error: 'upload_failed', message: 'Could not upload file for transcription.' },
      502,
    )
  }

  let job
  try {
    job = await submitTranscript(uploadUrl, { speakers })
  } catch (err) {
    console.error('[submit] submit failed:', err)
    return c.json(
      { error: 'submit_failed', message: 'Could not start transcription.' },
      502,
    )
  }

  return c.json({ id: job.id, status: job.status })
})

/**
 * GET /api/transcribe/:id
 *
 * Proxies AssemblyAI status. On the first time we see status === "completed",
 * increments the daily spend counter using audio_duration * RATE_PER_SEC.
 * We use a per-id Redis flag to guarantee single-increment even if the client
 * polls past completion.
 */
app.get('/api/transcribe/:id', async (c) => {
  const id = c.req.param('id')
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    return c.json({ error: 'bad_id' }, 400)
  }

  let job
  try {
    job = await getTranscript(id)
  } catch (err) {
    console.error('[poll] fetch failed:', err)
    return c.json(
      { error: 'poll_failed', message: 'Could not check transcription status.' },
      502,
    )
  }

  if (job.status === 'completed' && typeof job.audio_duration === 'number') {
    try {
      if (await markCounted(id)) {
        const cost = estimateCostUsd(job.audio_duration)
        await incrementDailySpendUsd(cost)
      }
    } catch (err) {
      console.error('[poll] spend increment failed:', err)
    }
  }

  return c.json({
    id: job.id,
    status: job.status,
    text: job.text ?? null,
    audio_duration: job.audio_duration ?? null,
    language_code: job.language_code ?? null,
    utterances: job.utterances ?? null,
    words: job.words ?? null,
    error: job.error ?? null,
  })
})

/** Optional: lightweight admin view of today's spend for debugging. */
app.get('/api/transcribe/_/spend', async (c) => {
  const spent = await getDailySpendUsd()
  return c.json({
    spent_usd: spent,
    cap_usd: env.DAILY_CAP_USD,
    remaining_usd: Math.max(0, env.DAILY_CAP_USD - spent),
  })
})

const port = env.PORT
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`[transcribe-api] listening on :${info.port} (${env.NODE_ENV})`)
})
