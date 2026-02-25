import { useEffect, useState } from 'react'

interface PlatformRelease {
  platform: string
  latestVersion: string
  minSupportedVersion: string
  releaseNotesUrl: string
  downloadUrl: string
}

export interface ReleasesData {
  win: PlatformRelease
  mac: PlatformRelease
  linux: PlatformRelease
}

const RELEASES_URL =
  'https://raw.githubusercontent.com/CookseyNiceTouch/nice-touch-app-releases/main/nice-touch-releases.json'

export function useReleases() {
  const [releases, setReleases] = useState<ReleasesData | null>(null)

  useEffect(() => {
    fetch(RELEASES_URL)
      .then((res) => res.json())
      .then((data: ReleasesData) => setReleases(data))
      .catch((err) => console.error('Failed to fetch releases:', err))
  }, [])

  return {
    releases,
    macDownloadUrl: releases?.mac?.downloadUrl || '#',
    winDownloadUrl: releases?.win?.downloadUrl || '#',
    macVersion: releases?.mac?.latestVersion,
    winVersion: releases?.win?.latestVersion,
  }
}
