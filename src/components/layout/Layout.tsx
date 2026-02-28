import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import LiquidEther from '@/backgrounds/LiquidEther'
import Header from './Header'
import Footer from './Footer'

export default function Layout(): ReactElement {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
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
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      />
      <Header />
      <main className="relative z-10 flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
