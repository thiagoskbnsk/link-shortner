export type ButtonVariants = 'primary' | 'secondary'
export type ButtonSizes = 'sm' | 'lg'

interface DefaultProps {
  isLoading?: boolean
  variant?: ButtonVariants
  size?: ButtonSizes
  leftIcon?: any
  rightIcon?: any
  disabled?: boolean
  className?: React.ComponentProps<'button'>['className']
  children?: React.ReactNode
  onClick?: () => void
}

type AsButtonComponentProps = {
  href?: never
  type?: 'button' | 'submit' | 'reset'
}

export type ButtonProps = AsButtonComponentProps & DefaultProps
