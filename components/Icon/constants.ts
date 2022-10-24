import { IconSize } from './definitions'

export const sizeStyle: { [key in IconSize]: string } = {
  xs: 'w-[0.975rem] h-[0.975rem]',
  sm: 'w-[1rem] h-[1rem]',
  md: 'w-[1.25rem] h-[1.25rem]',
  lg: 'w-[1.5rem] h-[1.5rem]',
  xl: 'w-[1.75rem] h-[1.75rem]',
  '2xl': 'w-[2rem] h-[2rem]',
}

export const iconStyle = (
  src: string,
  isMask: boolean,
  sizing: string,
): React.CSSProperties => {
  return isMask
    ? {
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        maskSize: sizing,
        backgroundRepeat: 'no-repeat',
        WebkitMaskSize: sizing,
        maskPosition: 'center',
        backgroundColor: 'currentColor',
        WebkitMaskPosition: 'center center',
      }
    : {
        backgroundImage: `url(${src})`,
        backgroundColor: 'unset',
        backgroundSize: sizing,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }
}
