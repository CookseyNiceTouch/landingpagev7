# Monorepo migration notes

Written 2026-08-05, before this repo moves into the app monorepo. Everything
below is the state at that point, so the migration can be checked off against
it rather than rediscovered.

## This repo produces two deployables, not one

| What | Sevalla service | Branch | Build |
| --- | --- | --- | --- |
| Marketing site (production) | `NT Website` static site `landingpagev7-iebwv` | `main` | `npm run build` -> `dist/`, root `.` |
| Marketing site (staging) | `NT Website Staging` static site `landingpagev7-7f38n` | `staging` | `npm run build` -> `dist/`, root `.` |
| Transcribe API | `nt-transcribe-api` application | `main` | Dockerfile `api/Dockerfile` |

The API is easy to miss — it lives in `api/` and is a separate Sevalla
*application*, not a static site. It already deploys monorepo-style, scoped
with `allow_deploy_paths: ["api/**"]`.

## The parts that aren't in git

Three things are configured outside the repo and won't travel with the code.
None of them need recreating if the repo simply changes location, but all
three need checking.

**Sevalla.** Each service is pinned to a repo URL + branch. Repoint
`repo_url` at the monorepo and update the branch names if the monorepo
doesn't also use `main`/`staging`.

**Cloudflare DNS** (zone `nicetouch.app`, `c987159e68fda37fbb33dbb9b5ed03e2`).
Unaffected by the move. For reference the site's records are:

- `CNAME nicetouch.app -> fallback.kinsta.page` (proxied)
- `CNAME www -> fallback.kinsta.page` (proxied)
- `CNAME preview -> fallback.sevalla.page` (proxied)
- `TXT _acme-challenge.preview` — Sevalla's SSL validation for staging

**Cloudflare Access.** `preview.nicetouch.app` is gated by the
`NT Website Staging` Access app: allow anyone with an `@nicetouch.app` email,
via one-time PIN. A second app bypasses Access for
`preview.nicetouch.app/robots.txt` so crawlers can read the disallow rather
than getting a login redirect. Unaffected by the move.

## Monorepo gotchas, in the order they'll bite

**1. Set `allow_deploy_paths` on both static sites.** Right now every push to
this repo rebuilds the site, which is correct because the repo *is* the site.
In the monorepo, every push to any app would rebuild it. Scope it to the
marketing subdirectory the same way `nt-transcribe-api` already scopes itself
to `api/**`.

**2. `root_directory` becomes the subdirectory.** Both static sites currently
use `.`. The API's `dockerfile_path` (`api/Dockerfile`) will need the new
prefix too.

**3. Check where `_headers` ends up.** This is the subtle one. `_headers` sits
at the *repo root* — not in `public/`, and it is not copied into `dist/` by the
build. Sevalla picks it up from the site's root directory. So it has to move
with the site, to `<subdir>/_headers`, not stay at the monorepo root. It
carries the CSP and all the security headers, and nothing in the build will
fail if it goes missing — the headers just silently stop being served. Verify
after the first deploy:

```bash
curl -sSI https://nicetouch.app/ | grep -i content-security-policy
```

**4. Keep `VITE_SITE_URL` on the staging site only.** It's set to
`https://preview.nicetouch.app` there and must stay unset in production. If it
goes missing on staging, staging starts advertising itself as the production
origin and becomes indexable. The build guards against this — see
`docs/deployment.md` — but the guard only catches a *wrong* value, and an
unset value looks exactly like production.

Both static sites also carry `VITE_TRANSCRIBE_API_URL` and
`VITE_MAX_DURATION_MIN`. The API carries `ASSEMBLYAI_API_KEY`,
`ALLOWED_ORIGIN`, `DAILY_CAP_USD`, `RATE_PER_SEC`, `MAX_BYTES`,
`MAX_DURATION_MIN`, `NODE_ENV`, `PORT`.

**5. Nothing in `scripts/` assumes the repo root.** They all resolve paths
relative to `__dirname`, so they survive being nested. The `@/` alias in
`vite.config.ts` is likewise resolved from the config file's own location.

## Branch state at migration

Only `main` and `staging` carry anything. Everything else was merged into
`staging` on 2026-08-05 and deleted. There were no open pull requests.

Two branches held unmerged commits and were abandoned experiments rather than
work in progress. Both were tagged before deletion, so the commits survive in
this repo's history if they're ever wanted:

- `archive/seo-buildout` (`32cb24c`) — 3 commits, last touched 2026-02-16. An
  early SEO pass built on the pre-`PageLayout`/`SEOHead` component
  architecture, long since superseded by the prerenderer and `SEO.tsx`. Note
  the local branch was one commit ahead of the remote; the tag points at the
  fuller local tip.
- `archive/websiteV2` (`c370fa1`) — 6 commits, last touched 2026-03-02. A
  CableConnector layout experiment; its final commit message is "checking in
  before reverting".

Whether those tags are worth carrying into the monorepo is a judgement call —
most history-rewriting import tools will drop them by default.
