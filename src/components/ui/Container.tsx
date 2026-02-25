import type { ReactElement, HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const maxWidths: Record<string, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export default function Container({
  size = 'lg',
  className = '',
  children,
  ...props
}: ContainerProps): ReactElement {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${maxWidths[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
