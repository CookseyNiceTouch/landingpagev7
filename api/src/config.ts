import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(8787),

  ASSEMBLYAI_API_KEY: z.string().min(20, 'ASSEMBLYAI_API_KEY is required'),

  /**
   * Redis connection URL. Leave unset (or empty) for local dev to use the
   * in-memory fallback in `storage.ts`. Required in production for any
   * multi-instance deployment so the daily spend cap is shared.
   */
  REDIS_URL: z
    .string()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined))
    .pipe(z.string().url().optional()),

  ALLOWED_ORIGIN: z
    .string()
    .url()
    .default('https://nicetouch.app'),

  /** Daily spend cap, in USD. Defaults to ~GBP 100 at ~1.27. */
  DAILY_CAP_USD: z.coerce.number().positive().default(127),

  /**
   * USD cost per second of audio transcribed.
   * AssemblyAI Universal-2 is currently ~$0.37/hr = ~$0.000103/sec.
   */
  RATE_PER_SEC: z.coerce.number().positive().default(0.000103),

  /** Hard upload cap (bytes). */
  MAX_BYTES: z.coerce.number().int().positive().default(100 * 1024 * 1024),

  /**
   * Maximum audio duration we'll accept, in minutes. AssemblyAI will reject
   * longer files; this lets us show a friendly message before even trying.
   * Note: we can't cheaply enforce this server-side without decoding, so the
   * primary defence against very long files is the daily spend cap.
   */
  MAX_DURATION_MIN: z.coerce.number().int().positive().default(180),
})

export type Env = z.infer<typeof EnvSchema>

let cached: Env | null = null

export function loadEnv(): Env {
  if (cached) return cached
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid environment variables:\n${issues}`)
  }
  cached = parsed.data
  return cached
}
