/**
 * Build-time prerender entry. Bundled by `vite build --ssr` and invoked from
 * scripts/prerender.mjs for each route to produce static HTML that crawlers
 * (search engines, AI answer engines, social scrapers) can read without
 * executing JavaScript. The browser bundle still boots normally via main.tsx.
 *
 * Note: react-helmet-async v3 + React 19 hoists <title>/<meta>/<link> to the
 * START of the renderToString output (React's native metadata hoisting)
 * instead of populating the Helmet server context. We split that leading
 * block off and return it as `head`. Tags are marked with `data-ssr` so
 * main.tsx can remove them at boot before React re-renders live equivalents.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from './App'
import { ROUTES } from './routes'

export interface RenderResult {
  appHtml: string
  head: string
}

export const ROUTE_PATHS: { path: string; sitemapPriority?: number }[] = ROUTES.map(
  ({ path, sitemapPriority }) => ({ path, sitemapPriority }),
)

export function render(url: string): RenderResult {
  const html = renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  )

  // Everything before the first real element is hoisted metadata.
  const firstElement = html.indexOf('<div')
  const hoisted = firstElement > 0 ? html.slice(0, firstElement) : ''
  const appHtml = firstElement > 0 ? html.slice(firstElement) : html

  const head = hoisted.replace(/<(title|meta|link|style)(?=[\s>])/g, '<$1 data-ssr')

  return { appHtml, head }
}
