import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import FaultyTerminal from '@/backgrounds/FaultyTerminal'
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
        dither={0}
        curvature={0.05}
        tint="#6f6549"
        mouseReact
        mouseStrength={0.5}
        brightness={0.4}
      />
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
