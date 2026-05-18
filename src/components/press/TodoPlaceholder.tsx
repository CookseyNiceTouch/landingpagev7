import type { ReactElement, ReactNode } from 'react'

interface TodoPlaceholderProps {
  /** Short label shown above the body, e.g. "Customer quote". */
  label: string
  /** Description of what the team needs to provide. */
  children: ReactNode
  /**
   * When true the placeholder is also rendered in production builds.
   * Defaults to false so launch builds stay clean even when copy is missing.
   */
  showInProd?: boolean
}

/**
 * Yellow dashed-border block that surfaces missing press-kit content during
 * development. Hidden in production unless `showInProd` is set.
 */
export default function TodoPlaceholder({
  label,
  children,
  showInProd = false,
}: TodoPlaceholderProps): ReactElement | null {
  if (!import.meta.env.DEV && !showInProd) return null

  return (
    <div className="pointer-events-auto rounded-lg border-2 border-dashed border-yellow/60 bg-yellow/5 p-[clamp(16px,1.6vw,24px)]">
      <span className="text-[clamp(10px,0.8vw,12px)] font-semibold uppercase tracking-wider text-yellow">
        TODO · {label}
      </span>
      <div className="mt-2 text-[clamp(13px,1vw,15px)] text-white/70">{children}</div>
    </div>
  )
}
