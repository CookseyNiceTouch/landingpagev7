import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import niceTouchLogo from '@/assets/images/nice-touch-logo.png'
import { NAV_LINKS } from '@/data/navigation'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social'

export default function Header(): ReactElement {
  return (
    <header className="relative z-10 flex items-center justify-between px-8 py-3.5 h-20 shrink-0 pointer-events-none">
      <a href="/" className="block h-full transition-opacity hover:opacity-85 pointer-events-auto" aria-label="Nice Touch Home">
        <img src={niceTouchLogo} alt="Nice Touch" className="h-full w-auto object-contain" />
      </a>

      <div className="flex items-center gap-4 h-full">
        <nav className="hidden md:flex items-center gap-6 pointer-events-auto" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-pink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <span className="hidden md:block text-white-30 font-light pointer-events-none">|</span>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm text-white/70 transition-colors hover:text-pink pointer-events-auto whitespace-nowrap max-sm:hidden"
        >
          Contact Us
        </a>

        <span className="hidden sm:block text-white-30 font-light pointer-events-none max-sm:hidden">|</span>

        <nav className="flex gap-5 items-center h-full" aria-label="Social media links">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[clamp(24px,3vh,36px)] h-[clamp(24px,3vh,36px)] opacity-90 transition-all hover:opacity-100 hover:-translate-y-0.5 pointer-events-auto"
              aria-label={social.label}
            >
              <img
                src={social.icon}
                alt=""
                className="w-full h-full brightness-0 invert transition-[filter] hover:brightness-0 hover:saturate-100 hover:invert-[20%] hover:sepia-100 hover:saturate-[7000%] hover:hue-rotate-[320deg] hover:brightness-105 hover:contrast-105"
              />
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
