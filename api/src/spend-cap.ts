import { loadEnv } from './config.js'
import { getStorage } from './storage.js'

/**
 * Daily-spend tracking. Keyed by UTC date so the budget rolls over at midnight
 * UTC. Each key TTLs to 48h to keep storage tidy.
 */

const TTL_SECONDS = 60 * 60 * 48

function todayKey(now: Date = new Date()): string {
  const yyyy = now.getUTCFullYear()
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(now.getUTCDate()).padStart(2, '0')
  return `transcribe:spend:${yyyy}-${mm}-${dd}`
}

export async function getDailySpendUsd(): Promise<number> {
  const raw = await getStorage().get(todayKey())
  if (!raw) return 0
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 0
}

export async function isOverDailyCap(): Promise<boolean> {
  const env = loadEnv()
  const spent = await getDailySpendUsd()
  return spent >= env.DAILY_CAP_USD
}

/**
 * Increment today's spend by the USD amount.
 */
export async function incrementDailySpendUsd(usd: number): Promise<number> {
  if (!Number.isFinite(usd) || usd <= 0) return getDailySpendUsd()
  const storage = getStorage()
  const key = todayKey()
  const total = await storage.incrByFloat(key, usd)
  await storage.expire(key, TTL_SECONDS)
  return total
}

/** Returns true if this is the first time we've counted this transcript ID. */
export async function markCounted(transcriptId: string): Promise<boolean> {
  return getStorage().setIfAbsent(`transcribe:counted:${transcriptId}`, '1', TTL_SECONDS)
}

/** USD cost estimate for a given audio duration in seconds. */
export function estimateCostUsd(audioDurationSec: number): number {
  if (!Number.isFinite(audioDurationSec) || audioDurationSec <= 0) return 0
  const env = loadEnv()
  return audioDurationSec * env.RATE_PER_SEC
}
