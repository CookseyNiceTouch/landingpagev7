# Downloads — status log

## Status

- **Live.** Re-enabled on 2026-07-26.
- `/download` renders `DownloadCard` again and pulls live URLs from `useReleases()`, so visitors can grab the macOS or Windows build directly — no modal or waitlist step.
- The footer's `Product` column link reads `Download` again (was `Coming Soon`).
- `DownloadCard.tsx`'s heading is an `<h1>` (was `<h2>`) because `Download.tsx` no longer renders a heading of its own, and `scripts/verify-prerender.mjs` fails the build unless each route has exactly one `<h1>`.

## Intentionally left as-is

The "Try Now" button (header + hero) still opens `TryNowModal`, which behaves as a pure waitlist signup ("Join the waitlist" → "You're on the list!") and does **not** redirect to `/download` after submit. Direct download and the Try Now waitlist are deliberately independent flows for now.

If that should change, the pre-waitlist version of the modal — with the `useNavigate` redirect to `/download` and the `ResizeObserver` thank-you-screen fallback — is preserved in git history:

```
git log -- src/components/ui/TryNowModal.tsx
```

To restore that behaviour:

1. Re-add `import { useNavigate } from 'react-router-dom'` and `const navigate = useNavigate()`.
2. Re-add `onFormSubmitted: () => { onClose(); navigate('/download') }` to the `hbspt.forms.create` call.
3. Re-add the `ResizeObserver` fallback (the version with `baseline`, `settled`, `settleTimer`, and the 60%-of-baseline trigger).
4. Update the title/subtitle copy away from waitlist wording.

HubSpot form ID in use: `e7b7312c-1884-4467-a616-42a27512a402`.

## History

- **2026-05-22** — Downloads paused. `/download` was replaced with an "A new version is on the way" panel plus a "Join the Waitlist" button dispatching `OPEN_TRY_NOW`; the footer link became `Coming Soon`; `TryNowModal` lost its post-submit redirect. See commit `a8b0339`.
- **2026-07-26** — Downloads restored. `/download` and the footer link are back on the direct-download flow; `TryNowModal` waitlist behaviour kept as-is (see above).
