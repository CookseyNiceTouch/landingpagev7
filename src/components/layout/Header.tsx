import { useState } from 'react'
import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import niceTouchLogo from '@/assets/images/nice-touch-logo.png'
import { NAV_LINKS } from '@/data/navigation'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'
import GetAppModal from '@/components/GetAppModal'
import Button from '@/components/ui/Button'

export default function Header(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3.5 h-20 shrink-0 backdrop-blur-md bg-black/30 border-b border-white/08">
        <a href="/" className="block h-full transition-opacity hover:opacity-85" aria-label="Nice Touch Home">
          <img src={niceTouchLogo} alt="Nice Touch" className="h-full w-auto object-contain" />
        </a>

        <div className="flex items-center gap-4 h-full">
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-yellow'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <span className="hidden md:block text-white-30 font-light">|</span>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-white/70 transition-colors hover:text-yellow whitespace-nowrap max-sm:hidden"
          >
            Contact Us
          </a>

          <span className="hidden sm:block text-white-30 font-light max-sm:hidden">|</span>

          <nav className="flex gap-4 items-center h-full" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-[clamp(20px,2.5vh,30px)] h-[clamp(20px,2.5vh,30px)] opacity-70 transition-all hover:opacity-100 hover:-translate-y-0.5"
                aria-label={social.label}
              >
                <img
                  src={social.icon}
                  alt=""
                  className="w-full h-full brightness-0 invert"
                />
              </a>
            ))}
          </nav>

          <Button
            size="sm"
            className="ml-2"
            onClick={() => setIsModalOpen(true)}
          >
            Try now
          </Button>
        </div>
      </header>

      <GetAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
