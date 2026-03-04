import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import FaultyTerminal from '@/backgrounds/FaultyTerminal'
import CrtOverlay from '@/components/ui/CrtOverlay'
import CableLayer from '@/components/ui/CableLayer'
import Header from './Header'
import Footer from './Footer'

const HUBSPOT_SCRIPT_SRC = 'https://js-eu1.hsforms.net/forms/embed/146425863.js'

export default function Layout(): ReactElement {
  useEffect(() => {
    if (document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = HUBSPOT_SCRIPT_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="relative min-h-screen bg-bg flex flex-col">
      {/* Preload newsletter form iframe in background so it's ready when user navigates to /newsletter */}
      <div
        className="hs-form-frame"
        data-region="eu1"
        data-form-id="98567906-bbd8-4dde-99f6-4581261e62cf"
        data-portal-id="146425863"
        style={{ position: 'fixed', visibility: 'hidden', left: '-9999px', width: '1px', height: '1px' }}
      />
      <FaultyTerminal
        scale={2.5}
        digitSize={1.2}
        scanlineIntensity={0.1}
        glitchAmount={0.5}
        flickerAmount={0.5}
        noiseAmp={1}
        chromaticAberration={1}
        dither={0.5}
        curvature={0.05}
        tint="#FFE200"
        mouseReact
        mouseStrength={0.5}
        brightness={0.2}
      />
      {/* glowBlur: bloom radius px · glowOpacity: strength 0–1 · glowThreshold: min brightness 0–1 */}
      <CrtOverlay glowBlur={24} glowOpacity={0.3} glowThreshold={0.5} />
      <CableLayer />
      {/* Header and footer sit above all CRT effects via z-index in their CSS */}
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
