/**
 * Node-side mirror of `src/lib/site.ts` for the build scripts.
 *
 * `loadEnv` is used rather than reading `process.env` directly so a local
 * `.env` file and a Sevalla build-time environment variable resolve
 * identically — otherwise the prerendered HTML (built by Vite, which reads
 * `.env`) could disagree with the sitemap (written by plain Node, which
 * doesn't).
 */
import { loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const env = loadEnv(process.env.NODE_ENV ?? 'production', REPO_ROOT, 'VITE_')

/** Canonical public origin. Keep in sync with `PRODUCTION_URL` in src/lib/site.ts. */
export const PRODUCTION_URL = 'https://nicetouch.app'

/** Origin this build is served from. */
export const SITE_URL = (env.VITE_SITE_URL ?? PRODUCTION_URL).replace(/\/$/, '')

/** Only the production origin may be crawled and indexed. */
export const IS_INDEXABLE = SITE_URL === PRODUCTION_URL
