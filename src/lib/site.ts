/**
 * Which environment this build is for.
 *
 * The site is deployed twice from the same repo (see docs/deployment.md):
 *   - production — `main` -> https://nicetouch.app
 *   - staging    — `staging` -> https://preview.nicetouch.app
 *
 * Staging must never be indexed, or it competes with production in search.
 * Indexability is derived from `SITE_URL` rather than a separate flag so a
 * staging deploy cannot opt itself back into indexing by forgetting to set a
 * second variable — anything that isn't the production origin is noindex.
 *
 * `scripts/site-env.mjs` mirrors this for the Node-side build scripts.
 */

/** Canonical public origin. Also the stable id for the Organization entity. */
export const PRODUCTION_URL = 'https://nicetouch.app'

/**
 * Origin this build is served from, used for canonicals, `og:url`, and the
 * sitemap. Set `VITE_SITE_URL` in the Sevalla static site's environment
 * variables for any non-production deploy.
 */
export const SITE_URL = ((import.meta.env['VITE_SITE_URL'] as string | undefined) ?? PRODUCTION_URL).replace(/\/$/, '')

/** Only the production origin may be crawled and indexed. */
export const IS_INDEXABLE = SITE_URL === PRODUCTION_URL
