# Downloads — status log

## Status

- **Live.** Re-enabled on 2026-07-26.
- `/download` renders `DownloadCard` again and pulls live URLs from `useReleases()`, so visitors can grab the macOS or Windows build directly — no modal or waitlist step.
- The footer's `Product` column link reads `Download` again (was `Coming Soon`).
- `Download.tsx` owns the page's single `<h1>` ("Download Nice Touch"). `DownloadCard` renders no heading of its own, so do not add one — `scripts/verify-prerender.mjs` fails the build unless each route has exactly one `<h1>`.

## Intentionally left as-is

The "Try Now" button (header + hero) still opens `TryNowModal`. Copy was updated on 2026-07-26 from "Join the waitlist" to "Get Nice Touch" (going live soon), but the mechanics are unchanged: it's still a plain email-capture form ("Get Nice Touch" → "You're on the list!") and does **not** redirect to `/download` after submit. Direct download and this signup are deliberately independent flows for now.

Note the consequence: downloads are live, but the primary header/hero CTA still funnels to email capture rather than the download page.

If that should change, the pre-waitlist version of the modal — with the `useNavigate` redirect to `/download` and the `ResizeObserver` thank-you-screen fallback — is preserved in git history:

```
git log -- src/components/ui/TryNowModal.tsx
```

To restore that behaviour:

1. Re-add `import { useNavigate } from 'react-router-dom'` and `const navigate = useNavigate()`.
2. Re-add `onFormSubmitted: () => { onClose(); navigate('/download') }` to the `hbspt.forms.create` call.
3. Re-add the `ResizeObserver` fallback (the version with `baseline`, `settled`, `settleTimer`, and the 60%-of-baseline trigger).
4. Update the title/subtitle copy if needed — it no longer uses waitlist wording.

HubSpot form ID in use: `e7b7312c-1884-4467-a616-42a27512a402`.

## Known limitation

`useReleases()` fetches the release manifest client-side, so the prerendered HTML ships `href="#"` and the real installer URLs are filled in on hydration. With JavaScript disabled the buttons do nothing. Fixing that would mean fetching the manifest at build time in `scripts/prerender.mjs`.

Manifest source:

```
https://raw.githubusercontent.com/CookseyNiceTouch/nice-touch-app-releases/main/nice-touch-releases.json
```

## History

- **2026-05-22** — Downloads paused. `/download` was replaced with an "A new version is on the way" panel plus a "Join the Waitlist" button dispatching `OPEN_TRY_NOW`; the footer link became `Coming Soon`; `TryNowModal` lost its post-submit redirect. See commit `a8b0339`.
- **2026-07-26** — Downloads restored on `main` and deployed. `/download` and the footer link are back on the direct-download flow; `TryNowModal` waitlist behaviour kept as-is.
- **2026-07-26** — `TryNowModal` copy changed from "Join the waitlist" to "Get Nice Touch" ahead of general availability. Still no redirect to `/download` on submit — see above.
