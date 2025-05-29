import {forwardRef} from 'react'

import { WarningIcon } from '@phosphor-icons/react'
import { classNames } from '@/utils'
import type { Path, UseFormRegister } from 'react-hook-form'

export interface InputProps {
  label: string
  id: Path<any>
  register: UseFormRegister<any>
  placeholder?: string
  errorMessage?: string
  className?: string
  required?: boolean
  disabled?: boolean
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      id,
      placeholder,
      className,
      register,
      required,
      disabled,
      prefix
    },
    ref
  ) => {
    return (
      <div className={classNames('group', className)}>
        <label
          htmlFor={id}
          className={classNames('text-xs text-gray-500 mb-2 flex uppercase',
            'group-focus-within:font-bold group-focus-within:text-blue-base',
            !!errorMessage && 'text-danger font-bold group-focus-within:text-danger',
          )}
        >
          {label}
        </label>

        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-4 text-gray-600 pointer-events-none text-md font-normal leading-[19px]">
              {prefix}
            </span>
          )}

          <input
            {...register(id, {
              required: required && `${label} é obrigatório`,
            })}
            id={id}
            disabled={disabled}
            className={
              classNames(
                'rounded-lg border border-gray-300 text-gray-600 text-md font-normal p-4 h-12 w-full focus:border-blue-base outline-1 outline-blue-base',
                errorMessage && 'border-danger focus:border-danger outline-danger',
                'disabled:bg-gray-200',
                'transition-all duration-200 ease-in-out',
                prefix && 'pl-16'
              )}
            placeholder={placeholder}
          />
        </div>

        {errorMessage && (
          <div className='text-sm text-gray-500 mt-2 flex items-center'>
            <WarningIcon size={16} className="mr-2 text-danger" /> {errorMessage}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
