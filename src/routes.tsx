import type { ComponentType } from 'react'
import Home from '@/pages/Home'
import Features from '@/pages/Features'
import MulticamPage from '@/pages/MulticamPage'
import Integrations from '@/pages/Integrations'
import UseCases from '@/pages/UseCases'
import ForTeams from '@/pages/ForTeams'
import PodcastEditing from '@/pages/PodcastEditing'
import InterviewEditing from '@/pages/InterviewEditing'
import SermonEditing from '@/pages/SermonEditing'
import About from '@/pages/About'
import Security from '@/pages/Security'
import Privacy from '@/pages/Privacy'
import Pricing from '@/pages/Pricing'
import Download from '@/pages/Download'
import Tools from '@/pages/Tools'
import Transcribe from '@/pages/Transcribe'
import Tutorials from '@/pages/Tutorials'
import Newsletter from '@/pages/Newsletter'
import Press from '@/pages/Press'

export interface RouteDef {
  path: string
  Component: ComponentType
  /** Sitemap priority (0–1). Routes without one are excluded from the sitemap. */
  sitemapPriority?: number
}

/**
 * Single source of truth for the site's routes.
 * Consumed by App.tsx (client router), entry-server.tsx (prerendering),
 * and scripts/prerender.mjs (static HTML + sitemap.xml generation).
 */
export const ROUTES: RouteDef[] = [
  { path: '/', Component: Home, sitemapPriority: 1.0 },
  { path: '/features', Component: Features, sitemapPriority: 0.9 },
  { path: '/multicam', Component: MulticamPage, sitemapPriority: 0.8 },
  { path: '/integrations', Component: Integrations, sitemapPriority: 0.8 },
  { path: '/podcast-editing', Component: PodcastEditing, sitemapPriority: 0.9 },
  { path: '/interview-editing', Component: InterviewEditing, sitemapPriority: 0.9 },
  { path: '/sermon-editing', Component: SermonEditing, sitemapPriority: 0.8 },
  { path: '/use-cases', Component: UseCases, sitemapPriority: 0.8 },
  { path: '/for-teams', Component: ForTeams, sitemapPriority: 0.8 },
  { path: '/about', Component: About, sitemapPriority: 0.6 },
  { path: '/security', Component: Security, sitemapPriority: 0.7 },
  { path: '/privacy', Component: Privacy, sitemapPriority: 0.3 },
  { path: '/pricing', Component: Pricing, sitemapPriority: 0.9 },
  { path: '/download', Component: Download, sitemapPriority: 0.7 },
  { path: '/tools', Component: Tools, sitemapPriority: 0.8 },
  { path: '/transcribe', Component: Transcribe, sitemapPriority: 0.9 },
  { path: '/tutorials', Component: Tutorials, sitemapPriority: 0.6 },
  { path: '/newsletter', Component: Newsletter, sitemapPriority: 0.5 },
  { path: '/press', Component: Press, sitemapPriority: 0.6 },
]
