import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'

interface CopyButtonProps {
  /** Text to copy to the clipboard when the button is clicked. */
  text: string
  /** Default label. */
  label?: string
  /** Label shown briefly after a successful copy. */
  copiedLabel?: string
  className?: string
}

/**
 * Small inline copy-to-clipboard button using the native Clipboard API.
 * Falls back to a no-op (and brief error label) when the API is unavailable.
 */
export default function CopyButton({
  text,
  label = 'Copy to clipboard',
  copiedLabel = 'Copied',
  className = '',
}: CopyButtonProps): ReactElement {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    },
    [],
  )

  const handleClick = useCallback(async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('error')
    }
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setState('idle'), 2000)
  }, [text])

  const display = state === 'copied' ? copiedLabel : state === 'error' ? 'Copy failed' : label

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-[clamp(12px,0.9vw,14px)] font-semibold text-white transition-all duration-150 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      aria-live="polite"
    >
      {display}
    </button>
  )
}
