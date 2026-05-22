# Downloads paused — waitlist mode

App downloads are temporarily disabled while a new version of Nice Touch is being prepared. The HubSpot "Try Now" form now acts as a waitlist signup. This document captures everything that was changed so the download flow can be restored cleanly when the new build ships.

## Status

- Disabled on: 2026-05-22
- Re-enable when: the next app version is ready for public download
- HubSpot form ID still in use (`e7b7312c-1884-4467-a616-42a27512a402`) — leads now treated as waitlist entries

## Files that were changed

### 1. `src/components/ui/TryNowModal.tsx`

What changed:

- Removed `useNavigate` import and the `navigate` constant.
- Removed the post-submit redirect inside the `onFormSubmitted` callback (was `navigate('/download')`).
- Removed the `ResizeObserver` fallback block that detected the HubSpot thank-you screen and called `navigate('/download')`. That observer was the only reason we needed to measure form height after a 1.5s settle timer — none of it is needed for a pure waitlist signup.
- Updated `aria-label` from `"Get early access"` to `"Join the waitlist"`.
- Updated the visible `<h2>` title from `Get early access` to `Join the waitlist`.
- Updated the subtitle copy to mention the new version and waitlist.

To re-enable downloads:

1. Re-add `import { useNavigate } from 'react-router-dom'` and `const navigate = useNavigate()`.
2. Re-add `onFormSubmitted: () => { onClose(); navigate('/download') }` to the `hbspt.forms.create` call.
3. Re-add the `ResizeObserver` fallback block (the version with `baseline`, `settled`, `settleTimer`, and the 60%-of-baseline trigger that calls `navigate('/download')`).
4. Restore the original title/subtitle copy if desired.

The pre-change implementation is preserved in git history — `git log -- src/components/ui/TryNowModal.tsx` will show the previous version.

### 2. `src/pages/Download.tsx`

What changed:

The entire page was replaced. It no longer renders `DownloadCard` or calls `useReleases()`. It now shows a "A new version is on the way" panel with a "Join the Waitlist" button that dispatches the `OPEN_TRY_NOW` event to open the HubSpot modal.

To re-enable downloads, restore this content:

```tsx
import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import DownloadCard from '@/components/DownloadCard'
import { useReleases } from '@/hooks/useReleases'

export default function Download(): ReactElement {
  const { macDownloadUrl, winDownloadUrl, macVersion, winVersion } = useReleases()

  return (
    <div className="flex-1 flex items-center justify-center p-[clamp(24px,4vw,96px)] pointer-events-none">
      <SEO
        title="Download"
        description="Download Nice Touch for macOS or Windows. Get the AI-powered edit assistant running inside DaVinci Resolve or Adobe Premiere Pro."
        path="/download"
      />
      <DownloadCard
        macUrl={macDownloadUrl}
        winUrl={winDownloadUrl}
        macVersion={macVersion}
        winVersion={winVersion}
      />
    </div>
  )
}
```

### 3. `src/components/layout/Footer.tsx`

What changed:

The hardcoded footer link's label was changed from `Download` to `Coming Soon`. The `to="/download"` target is unchanged.

To re-enable downloads, change `Coming Soon` back to `Download` on the same line.

## Files intentionally NOT changed

These are still in the tree and continue to work — they just have no active consumers while downloads are paused. Leaving them in place makes restoration a small, low-risk change.

- `src/components/DownloadCard.tsx` — unused; no edits needed to re-enable.
- `src/hooks/useReleases.ts` — unused; no edits needed to re-enable.
- `src/App.tsx` — `/download` route is still registered (now serving the waitlist page).
- `src/data/navigation.ts` — never had a Download entry, so nothing to change.
- `src/components/layout/Header.tsx` — the "Try Now" button text is unchanged per the brief; the modal it opens now acts as the waitlist signup.
- `src/components/sections/HeroSection.tsx` — hero "Try Now" CTA unchanged for the same reason.

## Quick re-enable checklist

When the new app version is ready:

1. Revert the three files above (use git history or follow the snippets in this doc).
2. Verify the `/download` route renders `DownloadCard` again and pulls live URLs from `useReleases()`.
3. Verify the HubSpot modal redirects to `/download` after submit.
4. Update or remove this document.
