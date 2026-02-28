import type { ReactElement } from 'react'

interface DevicePlaceholderProps {
  label: string
  aspectRatio?: string
  className?: string
}

export default function DevicePlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
}: DevicePlaceholderProps): ReactElement {
  return (
    <div
      className={`w-full rounded-xl border border-dashed border-white/20 bg-black/40 flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ aspectRatio }}
    >
      <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center">
        <div className="w-3 h-3 rounded-sm bg-white/20" />
      </div>
      <span className="text-xs font-mono text-white/30 tracking-widest uppercase px-4 text-center">
        {label}
      </span>
    </div>
  )
}
