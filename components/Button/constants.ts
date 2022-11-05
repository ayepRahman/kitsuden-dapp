import { ButtonColorScheme, ButtonSize, ButtonVariants } from './definitions'

export const variantStyle: { [key in ButtonVariants]: string } = {
  primary: `
    bg-primary-900 
    text-white 
    border 
    border-primary-900
    hover:bg-primary-500 
    hover:border-primary-500 
    disabled:bg-neutral-300 
    disabled:border-neutral-300 
    disabled:text-neutral-500 
    disabled:cursor-not-allowed 
  `,
  secondary: `
    bg-primary2-50 
    text-primary-900 
    border 
    border-primary2-50
    hover:bg-primary2-300 
    hover:border-primary2-300 
    disabled:bg-neutral-200 
    disabled:border-neutral-200 
    disabled:cursor-not-allowed 
  `,
  outlined: `
    bg-neutral-50 
    text-neutral-600 
    border 
    border-neutral-300
    hover:bg-neutral-200 
    hover:border-neutral-300 
    disabled:bg-neutral-50 
    disabled:border-neutral-300 
    disabled:text-neutral-300 
    disabled:cursor-not-allowed 
  `,
  tertiary: `
    bg-neutral-50 
    text-primary-900 
    border 
    border-neutral-50
    hover:text-primary-500 
    disabled:text-neutral-300 
    disabled:cursor-not-allowed 
  `,
}

export const sizeStyle: { [key in ButtonSize]: string } = {
  sm: 'px-[1rem] py-[0.25rem] text-sm',
  md: 'px-[1.25rem] py-[0.375rem] text-base',
  lg: 'px-[1.5rem] py-[0.5rem] text-lg',
  xl: 'px-[1.75rem] py-[0.75rem] text-xl',
}

export const buttonIconSizeStyle: { [key in ButtonSize]: string } = {
  sm: '!p-2.5 text-sm',
  md: '!p-3 text-base',
  lg: '!p-3.5 text-lg',
  xl: '!p-4 text-xl',
}

export const loaderSizeStyle: { [key in ButtonSize]: number } = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
}

export const colorSchemeStyle: {
  [key in ButtonColorScheme]: {
    [key in ButtonVariants]: string
  }
} = {
  default: {
    primary: '',
    secondary: '',
    outlined: '',
    tertiary: '',
  },
  error: {
    primary: `
      bg-error-500 
      text-white 
      border 
      border-error-500
      hover:bg-error-300 
      hover:border-error-300 
      disabled:bg-neutral-300 
      disabled:border-neutral-300 
      disabled:cursor-not-allowed 
    `,
    secondary: `
      bg-error-50 
      text-error-900 
      border 
      border-error-50
      hover:bg-error-300 
      hover:border-error-300 
      disabled:bg-neutral-200 
      disabled:border-neutral-200 
      disabled:text-neutral-500 
      disabled:cursor-not-allowed 
    `,
    outlined: `
      bg-neutral-50 
      text-error-500 
      border 
      border-error-500
      hover:bg-error-50 
      disabled:bg-neutral-50 
      disabled:border-neutral-300 
      disabled:text-neutral-300 
      disabled:cursor-not-allowed 
    `,
    tertiary: `
      bg-neutral-50 
      text-error-500 
      border 
      border-neutral-50
      hover:text-error-700 
      disabled:text-neutral-300 
      disabled:cursor-not-allowed 
    `,
  },
}
