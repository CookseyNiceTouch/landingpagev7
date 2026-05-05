import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Features from '@/pages/Features'
import MulticamPage from '@/pages/MulticamPage'
import Integrations from '@/pages/Integrations'
import UseCases from '@/pages/UseCases'
import About from '@/pages/About'
import Security from '@/pages/Security'
import Pricing from '@/pages/Pricing'
import Download from '@/pages/Download'
import Tools from '@/pages/Tools'
import Transcribe from '@/pages/Transcribe'
import Tutorials from '@/pages/Tutorials'
import Newsletter from '@/pages/Newsletter'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/multicam" element={<MulticamPage />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/about" element={<About />} />
          <Route path="/security" element={<Security />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/transcribe" element={<Transcribe />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
