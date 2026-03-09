import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import CrtOverlay from '@/components/ui/CrtOverlay'
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
      <div className="fixed inset-0 bg-black -z-10" />
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
