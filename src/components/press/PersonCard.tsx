import type { ReactElement } from 'react'
import type { Person } from '@/data/press'

interface PersonCardProps {
  person: Person
  variant?: 'founder' | 'investor'
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function PersonCard({ person, variant = 'founder' }: PersonCardProps): ReactElement {
  const isFounder = variant === 'founder'

  return (
    <div className="flex flex-col rounded-lg border-2 border-border bg-black/20 overflow-hidden pointer-events-auto">
      {/* Headshot — edge-to-edge, no padding */}
      {person.headshot ? (
        <img
          src={person.headshot}
          alt={`${person.name} headshot`}
          className="w-full object-cover object-top"
          style={{ aspectRatio: '4 / 3' }}
        />
      ) : (
        <div
          className="flex w-full aspect-[4/3] items-center justify-center bg-black/40"
        >
          <span
            className={`font-heading font-semibold text-white/40 ${isFounder ? 'text-4xl' : 'text-3xl'}`}
          >
            {initials(person.name)}
          </span>
        </div>
      )}

      {/* Name, title, bio */}
      <div className="flex flex-col gap-3 p-[clamp(16px,1.6vw,24px)]">
        <div className="flex flex-col">
          <span
            className={`font-semibold text-white ${
              isFounder ? 'text-[clamp(15px,1.2vw,19px)]' : 'text-[clamp(14px,1.1vw,17px)]'
            }`}
          >
            {person.name}
          </span>
          <span className="text-[clamp(12px,0.85vw,14px)] text-white/50">{person.title}</span>
        </div>
        <p className="m-0 text-[clamp(13px,1vw,15px)] text-white/70 leading-relaxed">
          {person.bio}
        </p>
      </div>
    </div>
  )
}
