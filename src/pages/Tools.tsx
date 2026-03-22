import type { ReactElement } from 'react'
import SEO from '@/components/ui/SEO'
import Container from '@/components/ui/Container'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { TOOLS } from '@/data/tools'
import { useConverterReleases } from '@/hooks/useConverterReleases'
import appleIcon from '@/assets/icons/apple.svg'
import windowsIcon from '@/assets/icons/windows.svg'

function ConverterCard(): ReactElement {
  const { winUrl, macArmUrl, macIntelUrl, loading } = useConverterReleases()
  const tool = TOOLS[0]
  const disabled = loading ? 'opacity-50 pointer-events-none' : ''

  return (
    <FadeIn>
      <div className="flex flex-col gap-[clamp(24px,2.5vw,40px)] p-[clamp(28px,3vw,48px)] border-2 border-border rounded-lg bg-black/20 w-full pointer-events-auto">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <span className="self-start px-3 py-1 rounded-full text-[clamp(10px,0.8vw,12px)] font-semibold uppercase tracking-wider bg-pink/15 text-pink leading-none">
            Free
          </span>
          <h2 className="m-0 text-[clamp(24px,2.5vw,40px)] font-bold text-white leading-tight">
            {tool.name}
          </h2>
          <p className="m-0 text-[clamp(14px,1.1vw,18px)] text-white/55 leading-relaxed max-w-[48ch]">
            {tool.description}
          </p>
        </div>

        {/* Features */}
        <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {tool.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[clamp(13px,0.95vw,15px)] text-white/70 leading-snug"
            >
              <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-pink" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Downloads */}
        <div className="flex flex-col gap-4">
          <h3 className="m-0 text-[clamp(14px,1vw,16px)] font-semibold text-white/70 uppercase tracking-wider">
            Download
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              as="a"
              href={winUrl}
              variant="secondary"
              size="md"
              className={`w-full gap-3 ${disabled}`}
            >
              <img src={windowsIcon} alt="" className="w-5 h-5 brightness-0 invert" />
              Windows
            </Button>
            <Button
              as="a"
              href={macArmUrl}
              variant="secondary"
              size="md"
              className={`w-full gap-3 ${disabled}`}
            >
              <img src={appleIcon} alt="" className="w-5 h-5 brightness-0 invert" />
              Mac (Apple Silicon)
            </Button>
            <Button
              as="a"
              href={macIntelUrl}
              variant="secondary"
              size="md"
              className={`w-full gap-3 ${disabled}`}
            >
              <img src={appleIcon} alt="" className="w-5 h-5 brightness-0 invert" />
              Mac (Intel)
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function Tools(): ReactElement {
  return (
    <div className="flex-1 flex flex-col items-center gap-[clamp(32px,4vw,64px)] p-[clamp(24px,4vw,96px)] px-4 sm:px-10 pointer-events-none">
      <SEO
        title="Tools"
        description="Free tools and resources from Nice Touch. Download the NT Converter — a free video converter for macOS and Windows."
        path="/tools"
      />

      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h1 className="m-0 text-[clamp(28px,3.5vw,52px)] font-bold text-white leading-tight tracking-tight">
          Tools &amp; Resources
        </h1>
        <p className="m-0 text-[clamp(14px,1.1vw,18px)] text-white/55 max-w-[32rem]">
          Free, standalone tools built by the Nice Touch team — no sign-up required.
        </p>
      </FadeIn>

      <Container size="lg" className="flex justify-center">
        <ConverterCard />
      </Container>
    </div>
  )
}
