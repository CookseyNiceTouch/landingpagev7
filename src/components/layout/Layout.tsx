import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import FaultyTerminal from '@/backgrounds/FaultyTerminal'
import CrtOverlay from '@/components/ui/CrtOverlay'
import Header from './Header'
import Footer from './Footer'

export default function Layout(): ReactElement {
  return (
    <div className="relative min-h-screen bg-bg flex flex-col">
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
      {/* Header and footer sit above all CRT effects via z-index in their CSS */}
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
