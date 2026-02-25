import type { ReactElement, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-pink text-white hover:bg-pink-hover',
  secondary:
    'bg-white/10 text-white border border-white/20 hover:bg-white/15',
  ghost:
    'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-14 py-4 text-lg',
}

function omitButtonMeta<T extends ButtonProps>(
  props: T,
): Omit<T, 'as' | 'variant' | 'size'> {
  const { as, variant, size, ...rest } = props
  void as; void variant; void size
  return rest as Omit<T, 'as' | 'variant' | 'size'>
}

export default function Button(props: ButtonProps): ReactElement {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
  } = props

  const classes = [
    'inline-flex items-center justify-center font-semibold rounded-lg',
    'transition-all duration-150',
    'hover:-translate-y-0.5 active:translate-y-0',
    'pointer-events-auto cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (props.as === 'a') {
    const anchorProps = omitButtonMeta(props as ButtonAsAnchor)
    return <a {...anchorProps} className={classes} />
  }

  const buttonProps = omitButtonMeta(props as ButtonAsButton)
  return <button {...buttonProps} className={classes} />
}
