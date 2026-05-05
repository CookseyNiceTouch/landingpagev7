import Redis from 'ioredis'
import { loadEnv } from './config.js'

/**
 * Tiny key-value abstraction over either Redis (production) or an in-memory
 * Map (local dev). The transcribe API only needs four primitives:
 *   - GET <key> -> string | null
 *   - INCRBYFLOAT <key> <delta> -> new total
 *   - EXPIRE <key> <ttl-seconds>
 *   - SET <key> <value> EX <ttl-seconds> NX -> "OK" | null
 *
 * Set REDIS_URL to use Redis; leave it unset to use the in-memory fallback.
 * The in-memory fallback is fine for local development but obviously does not
 * survive process restarts and is not safe across multiple instances.
 */

export interface Storage {
  get(key: string): Promise<string | null>
  incrByFloat(key: string, delta: number): Promise<number>
  expire(key: string, seconds: number): Promise<void>
  /** Returns true if the key was set, false if it already existed. */
  setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean>
}

class RedisStorage implements Storage {
  constructor(private readonly client: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }
  async incrByFloat(key: string, delta: number): Promise<number> {
    const total = await this.client.incrbyfloat(key, delta)
    return Number.parseFloat(total)
  }
  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds)
  }
  async setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    const res = await this.client.set(key, value, 'EX', ttlSeconds, 'NX')
    return res === 'OK'
  }
}

interface MemoryEntry {
  value: string
  expiresAt: number | null
}

class MemoryStorage implements Storage {
  private store = new Map<string, MemoryEntry>()

  private getEntry(key: string): MemoryEntry | undefined {
    const e = this.store.get(key)
    if (!e) return undefined
    if (e.expiresAt !== null && e.expiresAt < Date.now()) {
      this.store.delete(key)
      return undefined
    }
    return e
  }

  async get(key: string): Promise<string | null> {
    return this.getEntry(key)?.value ?? null
  }

  async incrByFloat(key: string, delta: number): Promise<number> {
    const current = this.getEntry(key)
    const prev = current ? Number.parseFloat(current.value) : 0
    const next = (Number.isFinite(prev) ? prev : 0) + delta
    this.store.set(key, {
      value: next.toString(),
      expiresAt: current?.expiresAt ?? null,
    })
    return next
  }

  async expire(key: string, seconds: number): Promise<void> {
    const e = this.store.get(key)
    if (!e) return
    e.expiresAt = Date.now() + seconds * 1000
  }

  async setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean> {
    if (this.getEntry(key)) return false
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
    return true
  }
}

let cached: Storage | null = null

export function getStorage(): Storage {
  if (cached) return cached
  const env = loadEnv()
  if (env.REDIS_URL) {
    const client = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      lazyConnect: false,
      enableReadyCheck: true,
    })
    client.on('error', (err) => {
      console.error('[redis] error:', err.message)
    })
    cached = new RedisStorage(client)
    console.log('[storage] using Redis')
  } else {
    cached = new MemoryStorage()
    console.log('[storage] REDIS_URL not set \u2014 using in-memory storage (dev only)')
  }
  return cached
}
