# Deployment — environments and workflow

The site is deployed twice from this one repo, by two separate Sevalla static
sites. Each Sevalla site is pinned to exactly one branch and rebuilds on every
push to it — there is no "deploy any branch" behaviour.

| Environment | Branch | Sevalla site | URL |
| --- | --- | --- | --- |
| Production | `main` | `NT Website` (`landingpagev7-iebwv`) | https://nicetouch.app (+ `www.`) |
| Staging | `staging` | `NT Website Staging` (`landingpagev7-7f38n`) | https://preview.nicetouch.app |

Both run `npm run build` and publish `dist/`.

## Workflow

```
feature branch  ->  staging  ->  main
```

1. Branch off `staging` for the work.
2. PR into `staging`. Merging deploys to https://preview.nicetouch.app within a
   minute or two. Review it there.
3. PR `staging` into `main` to release. Merging deploys to production.

Keep `staging` and `main` from drifting: release regularly, and don't commit
directly to `main` except for hotfixes (fast-forward those back into `staging`
straight away).

## Staging is deliberately not public

Two copies of the same marketing site is an SEO liability — the staging copy
competes with production for the same keywords. Three layers prevent that:

1. **Cloudflare Access** in front of `preview.nicetouch.app`. Crawlers never
   reach the origin. This is the real gate; the rest is defence in depth.
2. **`noindex, nofollow`** on every prerendered page.
3. **`robots.txt` disallowing everything**, written by `scripts/prerender.mjs`
   in place of the production `public/robots.txt`.

Layers 2 and 3 are driven by a single environment variable.

## `VITE_SITE_URL`

The origin the build is served from. It feeds every canonical, `og:url`, and
the generated `sitemap.xml`.

- **Production** — unset. Defaults to `https://nicetouch.app`.
- **Staging** — set to `https://preview.nicetouch.app` in the Sevalla site's
  environment variables.

Indexability is *derived* from this value rather than being a second flag:
anything that isn't exactly the production origin is treated as non-public and
forced to `noindex`. That way a new environment cannot accidentally opt itself
into indexing by forgetting to set something.

The logic lives in `src/lib/site.ts` (browser/SSR) and `scripts/site-env.mjs`
(build scripts). `scripts/verify-prerender.mjs` fails the build in both
directions — a staging build that is still indexable, or a production build
that has gone `noindex`.

To reproduce a staging build locally:

```bash
VITE_SITE_URL=https://preview.nicetouch.app npm run build
```

## Things that are shared, not duplicated

Staging is a copy of the *site*, not of the stack behind it. It points at the
same HubSpot portal, the same Stripe checkout links, and the same transcribe
API (`VITE_TRANSCRIBE_API_URL`) as production. Form submissions and test
checkouts made on staging land in the production systems.
