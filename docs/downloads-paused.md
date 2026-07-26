# Downloads — status log

## Status

- Re-enabled on: 2026-07-26
- `/download` now renders `DownloadCard` again and pulls live URLs from `useReleases()`, so visitors can grab the macOS or Windows build directly — no modal/waitlist step required.
- The footer's `Product` column link is back to `Download` (was `Coming Soon`).
- `src/components/DownloadCard.tsx`'s heading was changed from `<h2>` to `<h1>` (the page needs exactly one `<h1>` for the prerender/SEO checks — see `scripts/verify-prerender.mjs`).

## Intentionally left as-is

The "Try Now" button (header + hero) still opens `TryNowModal`, which behaves as a pure waitlist signup ("Join the waitlist" → "You're on the list!") and does **not** redirect to `/download` after submit. This was a deliberate choice when downloads were reinstated — the two flows (direct download vs. Try Now waitlist) are being kept independent for now.

If that should change later, `TryNowModal.tsx`'s pre-waitlist version (with the `useNavigate`-based redirect to `/download` and the `ResizeObserver` thank-you-screen fallback) is preserved in git history:

```
git log -- src/components/ui/TryNowModal.tsx
```

## History

- 2026-05-22: downloads paused, `/download` replaced with a "new version coming soon" + waitlist panel while a new app version was being prepared (see git commit `a8b0339`).
- 2026-07-26: `/download` and the footer link restored to the direct-download flow; `TryNowModal` waitlist behavior kept as-is (see question above).
