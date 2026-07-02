import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Drop prerendered head tags — React re-renders live equivalents via Helmet,
// and leaving the static copies in place would duplicate title/meta/canonical.
document.querySelectorAll('[data-ssr]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
