import { IconName } from '@components/Icon/definitions'

export type ButtonVariants = 'primary' | 'secondary' | 'outlined' | 'tertiary'
export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'
export type ButtonColorScheme = 'default' | 'error'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button prefix icon
   */
  prefixIcon?: IconName
  /**
   * Button suffix icon
   */
  suffixIcon?: IconName
  /**
   * Button prefix icon mask
   */
  prefixIconMask?: boolean
  /**
   * Button suffix icon mask
   */
  suffixIconMask?: boolean
  /**
   * Display Icon only button, this props will overwrite
   * prefixIcon, suffixIcon && children
   */
  buttonIcon?: IconName
  /**
   * Button Variants, default to 'primary'
   */
  variants?: ButtonVariants
  /**
   * Button Size, default to 'md'
   */
  size?: ButtonSize
  /**
   * Button Color Scheme, default to 'default'
   */
  colorScheme?: ButtonColorScheme
  /**
   * Button loader
   */
  isLoading?: boolean
  /**
   * Button full width
   */
  isFullWidth?: boolean
}
