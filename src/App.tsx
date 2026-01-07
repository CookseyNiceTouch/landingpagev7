import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LiquidEther from './backgrounds/LiquidEther'
import Home from './pages/Home'
import Download from './pages/Download'
import Newsletter from './pages/Newsletter'

// Release data types
interface PlatformRelease {
  platform: string
  latestVersion: string
  minSupportedVersion: string
  releaseNotesUrl: string
  downloadUrl: string
}

interface ReleasesData {
  win: PlatformRelease
  mac: PlatformRelease
  linux: PlatformRelease
}

const RELEASES_URL = 'https://raw.githubusercontent.com/CookseyNiceTouch/nice-touch-app-releases/main/nice-touch-releases.json'

function App() {
  const [releases, setReleases] = useState<ReleasesData | null>(null)

  useEffect(() => {
    fetch(RELEASES_URL)
      .then(res => res.json())
      .then((data: ReleasesData) => setReleases(data))
      .catch(err => console.error('Failed to fetch releases:', err))
  }, [])

  const macDownloadUrl = releases?.mac?.downloadUrl || '#'
  const winDownloadUrl = releases?.win?.downloadUrl || '#'
  const macVersion = releases?.mac?.latestVersion
  const winVersion = releases?.win?.latestVersion

  return (
    <BrowserRouter>
      <div className="landing-page">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ position: 'absolute', inset: 0 }}
        />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/download"
            element={
              <Download
                macUrl={macDownloadUrl}
                winUrl={winDownloadUrl}
                macVersion={macVersion}
                winVersion={winVersion}
              />
            }
          />
          <Route
            path="/newsletter"
            element={<Newsletter />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
