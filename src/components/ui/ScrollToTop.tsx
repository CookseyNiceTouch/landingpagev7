import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router doesn't reset scroll position on navigation the way a full
 * page load does. Without this, clicking a nav/footer link while scrolled
 * down on one page lands you at the same scroll offset on the next page,
 * which reads as "the link didn't work".
 */
export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
