import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CrtOverlay from '@/components/ui/CrtOverlay'
import SiteSchema from '@/components/ui/SiteSchema'
import Header from './Header'
import Footer from './Footer'

/** Routes where the CRT scanline / vignette overlay should be suppressed. */
const NO_CRT_ROUTES = new Set(['/press'])

const HUBSPOT_SCRIPT_SRC = 'https://js-eu1.hsforms.net/forms/embed/146425863.js'

export default function Layout(): ReactElement {
  const { pathname } = useLocation()
  const showCrt = !NO_CRT_ROUTES.has(pathname)

  useEffect(() => {
    if (document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)) return
    const script = document.createElement('script')
    script.src = HUBSPOT_SCRIPT_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="relative min-h-screen bg-bg flex flex-col">
      <SiteSchema />
      {/* Preload newsletter form iframe in background so it's ready when user navigates to /newsletter */}
      <div
        className="hs-form-frame"
        data-region="eu1"
        data-form-id="98567906-bbd8-4dde-99f6-4581261e62cf"
        data-portal-id="146425863"
        style={{ position: 'fixed', visibility: 'hidden', left: '-9999px', width: '1px', height: '1px' }}
      />
      <div className="fixed inset-0 bg-black -z-10" />
      {showCrt && <CrtOverlay />}
      {/* Header and footer sit above all CRT effects via z-index in their CSS */}
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
