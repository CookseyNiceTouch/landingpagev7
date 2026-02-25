import discordIcon from '@/assets/icons/discord.svg'
import linkedinIcon from '@/assets/icons/linkedin.svg'
import youtubeIcon from '@/assets/icons/youtube.svg'

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/oohnicetouch/',
    icon: linkedinIcon,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@NiceTouch318',
    icon: youtubeIcon,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/un462urQKv',
    icon: discordIcon,
  },
]

export const CONTACT_EMAIL = 'contact@nicetouch.app'
