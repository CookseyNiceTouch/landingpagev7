#!/usr/bin/env node
/**
 * Post-build sanity checks for the prerendered output in dist/.
 * Verifies per-page title, meta description, canonical, OG/Twitter tags,
 * exactly one <h1>, valid JSON-LD, and crawlable internal links.
 * Exits non-zero on any failure. Run: node scripts/verify-prerender.mjs
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { IS_INDEXABLE, SITE_URL } from './site-env.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')

// Derive the page list from the generated sitemap so every prerendered route
// is verified automatically (no hardcoded list to keep in sync). 404 is
// noindex, so it's not in the sitemap — add it explicitly.
const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf-8')
const PAGES = [
  ...[...sitemap.matchAll(/<loc>[^<]*?\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => {
    const path = m[1].replace(/\/$/, '')
    return path === '' ? 'index.html' : `${path.slice(1)}/index.html`
  }),
  '404.html',
]

let failures = 0
const titles = new Map()
const descriptions = new Map()

function fail(page, msg) {
  failures++
  console.error(`  FAIL [${page}] ${msg}`)
}

for (const page of PAGES) {
  const html = await readFile(join(DIST, page), 'utf-8')
  const head = html.slice(0, html.indexOf('</head>'))

  const title = /<title[^>]*>([^<]*)<\/title>/.exec(head)?.[1]
  const desc = /name="description"\s+content="([^"]*)"/.exec(head)?.[1]
  const canonical = /rel="canonical"\s+href="([^"]*)"/.exec(head)?.[1]
  const robots = /name="robots"\s+content="([^"]*)"/.exec(head)?.[1] ?? ''
  const ogImage = /property="og:image"\s+content="([^"]*)"/.exec(head)?.[1]
  const twitterCard = /name="twitter:card"\s+content="([^"]*)"/.exec(head)?.[1]
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length
  const jsonLd = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  const internalLinks = new Set(
    [...html.matchAll(/href="(\/[a-z0-9/-]*)"/g)].map((m) => m[1]),
  )

  if (!title) fail(page, 'missing <title>')
  else if (titles.has(title)) fail(page, `duplicate title (also on ${titles.get(title)}): "${title}"`)
  else titles.set(title, page)

  if (!desc) fail(page, 'missing meta description')
  else if (descriptions.has(desc) && page !== '404.html') fail(page, `duplicate description (also on ${descriptions.get(desc)})`)
  else descriptions.set(desc, page)

  const isNoindex = /(^|[\s,])noindex([\s,]|$)/.test(robots)
  if (page === '404.html') {
    if (!isNoindex) fail(page, 'missing noindex robots meta')
    if (canonical) fail(page, '404 should not have a canonical')
  } else if (!canonical) {
    fail(page, 'missing canonical')
  } else if (!canonical.startsWith(`${SITE_URL}/`)) {
    fail(page, `canonical points outside the build origin ${SITE_URL}: ${canonical}`)
  }

  // Both directions fail silently in the wild: a staging page that stays
  // indexable competes with production in search, and a production page that
  // ships noindex quietly drops out of it.
  if (!IS_INDEXABLE && !isNoindex) fail(page, `${SITE_URL} is not the production origin but the page is indexable`)
  if (IS_INDEXABLE && isNoindex && page !== '404.html') fail(page, 'production page is marked noindex')
  if (!ogImage) fail(page, 'missing og:image')
  if (!twitterCard) fail(page, 'missing twitter:card')
  if (h1s !== 1) fail(page, `expected exactly 1 <h1>, found ${h1s}`)
  if (jsonLd.length === 0) fail(page, 'no JSON-LD')
  for (const [i, m] of jsonLd.entries()) {
    try {
      const parsed = JSON.parse(m[1])
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        fail(page, `JSON-LD #${i} is not a single object`)
      }
    } catch (err) {
      fail(page, `JSON-LD #${i} is invalid JSON: ${err.message} :: ${m[1].slice(0, 120)}`)
    }
  }
  if (internalLinks.size < 5) fail(page, `only ${internalLinks.size} unique internal links found`)

  console.log(
    `  ok [${page}] title="${(title ?? '').slice(0, 60)}" h1=${h1s} jsonld=${jsonLd.length} links=${internalLinks.size}`,
  )
}

const robotsTxt = await readFile(join(DIST, 'robots.txt'), 'utf-8')
if (IS_INDEXABLE) {
  if (!/^Allow: \/$/m.test(robotsTxt)) fail('robots.txt', 'production robots.txt should allow crawling')
} else if (!/^Disallow: \/$/m.test(robotsTxt)) {
  fail('robots.txt', `${SITE_URL} is not the production origin but robots.txt does not disallow crawling`)
}

if (failures > 0) {
  console.error(`\n[verify-prerender] ${failures} failure(s)`)
  process.exit(1)
}
console.log(`\n[verify-prerender] all checks passed for ${SITE_URL}${IS_INDEXABLE ? '' : ' (noindex)'}`)
