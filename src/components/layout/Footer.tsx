import type { ReactElement } from 'react'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'
import { NAV_LINKS } from '@/data/navigation'
import { Link } from 'react-router-dom'

export default function Footer(): ReactElement {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-white/10 pointer-events-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-white">Nice Touch</span>
            <span className="text-xs text-white/50">Your AI Video Edit Assistant</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xs text-white/50 hover:text-pink transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Product</span>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Connect</span>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
          &copy; {year} Nice Touch. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
