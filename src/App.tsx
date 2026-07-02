import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import NotFound from '@/pages/NotFound'
import { ROUTES } from '@/routes'

/** Route tree shared by the browser app and the build-time prerenderer. */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {ROUTES.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
