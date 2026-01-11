import type { ReactElement, ReactNode } from 'react'
import LiquidEther from '../../backgrounds/LiquidEther'
import Header from './Header'
import Footer from './Footer'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  fullHeight?: boolean
  showHeader?: boolean
  showFooter?: boolean
}

function PageLayout({
  children,
  className = '',
  fullHeight = false,
  showHeader = true,
  showFooter = true,
}: PageLayoutProps): ReactElement {
  const containerClass = fullHeight
    ? 'page-container page-container--full-height'
    : 'page-container'

  return (
    <div className={`${containerClass} ${className}`.trim()}>
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
      
      {showHeader && <Header />}
      
      <main className="main-content">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  )
}

export default PageLayout

