#!/usr/bin/env node
/**
 * Build-time prerenderer (SEO / AI-search fix).
 *
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle) and:
 *   1. Renders every route in src/routes.tsx to static HTML so crawlers that
 *      don't execute JavaScript (search engines, AI answer engines, social
 *      scrapers) see real titles, meta tags, JSON-LD, H1s, and links.
 *   2. Writes dist/<route>/index.html per route (root -> dist/index.html)
 *      and dist/404.html for the not-found fallback.
 *   3. Generates dist/sitemap.xml from the same route manifest, so the
 *      sitemap can never drift from the actual route table.
 *
 * Run via `npm run build` (see package.json). The browser app still boots
 * normally from main.tsx and re-renders over the static markup.
 */

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const DIST = resolve(REPO_ROOT, 'dist')
const SERVER_DIST = resolve(REPO_ROOT, 'dist-server')
const BASE_URL = 'https://nicetouch.app'

async function main() {
  // Prefer the pristine template copy so the step is safe to re-run after
  // dist/index.html has been overwritten with the prerendered homepage.
  const templatePath = join(DIST, '.template.html')
  let template = await readFile(templatePath, 'utf-8').catch(() => null)
  if (template === null) {
    template = await readFile(join(DIST, 'index.html'), 'utf-8')
    await writeFile(templatePath, template, 'utf-8')
  }
  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders — re-run `vite build`')
  }

  const entryUrl = pathToFileURL(join(SERVER_DIST, 'entry-server.js')).href
  const { render, ROUTE_PATHS } = await import(entryUrl)

  const targets = [
    ...ROUTE_PATHS.map(({ path }) => ({ url: path, outFile: outFileFor(path) })),
    { url: '/404', outFile: join(DIST, '404.html') },
  ]

  for (const { url, outFile } of targets) {
    const { appHtml, head } = render(url)
    const html = template
      .replace('<!--app-head-->', head)
      .replace('<!--app-html-->', appHtml)

    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, html, 'utf-8')
    console.log(`[prerender] ${url} -> ${outFile.slice(REPO_ROOT.length + 1)}`)
  }

  await writeSitemap(ROUTE_PATHS)

  // Build intermediates — keep them out of the deploy.
  await rm(SERVER_DIST, { recursive: true, force: true })
  await rm(templatePath, { force: true })
  console.log(`[prerender] done: ${targets.length} pages + sitemap.xml`)
}

function outFileFor(routePath) {
  return routePath === '/'
    ? join(DIST, 'index.html')
    : join(DIST, ...routePath.split('/').filter(Boolean), 'index.html')
}

async function writeSitemap(routePaths) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routePaths
    .filter(({ sitemapPriority }) => typeof sitemapPriority === 'number')
    .map(({ path, sitemapPriority }) => {
      const loc = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`
      return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${sitemapPriority.toFixed(1)}</priority></url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf-8')
  console.log('[prerender] wrote dist/sitemap.xml')
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
