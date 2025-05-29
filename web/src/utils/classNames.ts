type ClassNamesProps = string | Record<string, boolean> | undefined | boolean

export const classNames = (...classes: ClassNamesProps[]) => {
  return classes
    .map((className) => {
      if (!className) return ''
      if (typeof className === 'string') return className
      return Object.entries(className)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(' ')
    })
    .join(' ')
}
