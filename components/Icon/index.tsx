import clsx from 'clsx'
import { iconStyle, sizeStyle } from './constants'
import { IconProps } from './definitions'

const Icon: React.FC<IconProps> = ({
  className,
  name,
  size = 'md',
  isMask = true,
  sizing = 'contain',
  ...props
}) => {
  const path = `/icons/${name}.svg`

  return (
    <span
      className={clsx('inline-block align-middle ', className, sizeStyle[size])}
      style={iconStyle(path, isMask, sizing)}
      {...props}
    />
  )
}

export default Icon
export * from './definitions'
