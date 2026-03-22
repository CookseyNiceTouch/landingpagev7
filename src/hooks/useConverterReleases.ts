import { useEffect, useState } from 'react'

interface GitHubAsset {
  name: string
  browser_download_url: string
}

interface GitHubRelease {
  tag_name: string
  assets: GitHubAsset[]
}

interface ConverterReleases {
  winUrl: string
  macArmUrl: string
  macIntelUrl: string
  version: string | undefined
  loading: boolean
}

const API_URL =
  'https://api.github.com/repos/CookseyNiceTouch/nt_converter/releases/latest'

function findAssetUrl(assets: GitHubAsset[], suffix: string): string {
  return assets.find((a) => a.name.endsWith(suffix))?.browser_download_url ?? '#'
}

export function useConverterReleases(): ConverterReleases {
  const [release, setRelease] = useState<GitHubRelease | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: GitHubRelease) => setRelease(data))
      .catch((err) => console.error('Failed to fetch converter releases:', err))
      .finally(() => setLoading(false))
  }, [])

  const assets = release?.assets ?? []

  return {
    winUrl: findAssetUrl(assets, '-win-x64.exe'),
    macArmUrl: findAssetUrl(assets, '-mac-arm64.dmg'),
    macIntelUrl: findAssetUrl(assets, '-mac-x64.dmg'),
    version: release?.tag_name,
    loading,
  }
}
