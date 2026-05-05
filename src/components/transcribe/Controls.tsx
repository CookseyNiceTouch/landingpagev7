import type { ReactElement } from 'react'

export interface ControlsState {
  speakers: boolean
  timestamps: boolean
}

interface ControlsProps {
  value: ControlsState
  onChange: (next: ControlsState) => void
  disabled?: boolean
}

interface ToggleProps {
  label: string
  description: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}

function Toggle({ label, description, checked, onChange, disabled }: ToggleProps): ReactElement {
  return (
    <label
      className={[
        'flex items-start gap-3 p-3 rounded-md',
        'transition-colors duration-150',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5',
      ].join(' ')}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-1 w-4 h-4 accent-pink cursor-pointer"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[clamp(13px,1vw,15px)] font-semibold text-white leading-tight">
          {label}
        </span>
        <span className="text-[clamp(12px,0.9vw,13px)] text-white/55 leading-snug">
          {description}
        </span>
      </span>
    </label>
  )
}

export default function Controls({ value, onChange, disabled }: ControlsProps): ReactElement {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pointer-events-auto">
      <Toggle
        label="Speaker labels"
        description="Mark who's speaking. Best for interviews and podcasts."
        checked={value.speakers}
        onChange={(speakers) => onChange({ ...value, speakers })}
        disabled={disabled}
      />
      <Toggle
        label="Timestamps in download"
        description="Include time markers in the Word document. SRT and VTT always have them."
        checked={value.timestamps}
        onChange={(timestamps) => onChange({ ...value, timestamps })}
        disabled={disabled}
      />
    </div>
  )
}
