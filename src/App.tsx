import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ModalProvider } from './contexts/ModalContext'
import Home from './pages/Home'
import Product from './pages/Product'
import IntegrationsHub from './pages/integrations/IntegrationsHub'
import PremierePro from './pages/integrations/PremierePro'
import DavinciResolve from './pages/integrations/DavinciResolve'
import WorkflowsHub from './pages/workflows/WorkflowsHub'
import TimecodedFeedback from './pages/workflows/TimecodedFeedback'
import RoughCutFromTranscript from './pages/workflows/RoughCutFromTranscript'
import ExportQC from './pages/workflows/ExportQC'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Security from './pages/Security'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
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
      <ModalProvider>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Integrations */}
          <Route path="/integrations" element={<IntegrationsHub />} />
          <Route path="/integrations/adobe-premiere-pro" element={<PremierePro />} />
          <Route path="/integrations/davinci-resolve" element={<DavinciResolve />} />
          
          {/* Workflows */}
          <Route path="/workflows" element={<WorkflowsHub />} />
          <Route path="/workflows/timecoded-feedback" element={<TimecodedFeedback />} />
          <Route path="/workflows/rough-cut-from-transcript" element={<RoughCutFromTranscript />} />
          <Route path="/workflows/export-qc-checks" element={<ExportQC />} />
          
          {/* Legal & Security */}
          <Route path="/security" element={<Security />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Existing Pages */}
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
          <Route path="/newsletter" element={<Newsletter />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App
