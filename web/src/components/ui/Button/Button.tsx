import {forwardRef} from 'react'

import {Loading} from '@/components/ui/Loading'
import {classNames} from '@/utils'

import type {
  ButtonProps,
  ButtonVariants,
  ButtonSizes,
} from './Button.types'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const {
    disabled,
    isLoading,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    size = 'lg',
    variant = 'primary',
    className,
    children,
    ...rest
  } = props

  const variants: Record<ButtonVariants, string> = {
    primary: classNames(
      'btn bg-blue-base text-white hover:bg-blue-dark'
    ),
    secondary: classNames(
      'btn bg-gray-200 text-gray-500 border border-transparent hover:border-blue-base'
    ),
  }

  const sizes: Record<ButtonSizes, string> = {
    lg: classNames('min-h-[48px] px-4 py-3 w-full', 'text-md'),
    sm: classNames('min-h-[32px] px-2 py-1 rounded-[4px]', 'text-sm'),
  }

  const style = classNames(
    className,
    variants[variant],
    sizes[size],
    disabled && 'cursor-not-allowed opacity-50 border-0',
    'transition-all duration-200 ease-in-out'
  )

  const allProps = {
    ...rest,
    className: style,
    disabled: isLoading || disabled,
  } as ButtonProps

  const ChildWithIcons = () => (
    <>
      {LeftIcon && (
        <span aria-hidden='true'>
          <LeftIcon size={16}  />
        </span>
      )}
      {children && <span className={classNames({'ml-2': LeftIcon, 'mr-2': RightIcon})}>{children}</span>}
      {RightIcon && (
        <span aria-hidden='true'>
          <RightIcon size={16}  />
        </span>
      )}
    </>
  )

  const Component = () => (isLoading ? <Loading /> : <ChildWithIcons />)

  return (
    <button {...allProps} ref={ref}>
      <Component />
    </button>
  )
})