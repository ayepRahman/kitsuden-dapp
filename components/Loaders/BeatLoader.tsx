import React from 'react'
import { LoaderSizeMarginProps } from './definitions'
import { createAnimation, cssValue } from './helper'

const beat = createAnimation(
  'BeatLoader',
  '50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}',
  'beat',
)

export interface BeatLoaderProps extends LoaderSizeMarginProps {
  /**
   * isLoading {boolean} to display loader, default to true
   */
  isLoading?: boolean
  /**
   * color {string}
   */
  color?: string
  /**
   * speedMultiplier {number}
   */
  speedMultiplier?: number
}

const BeatLoader: React.FC<BeatLoaderProps> = ({
  isLoading = true,
  color = '#000000',
  speedMultiplier = 1,
  cssOverride = {},
  size = 16,
  margin = 2,
  ...props
}) => {
  const wrapper: React.CSSProperties = {
    display: 'inline-block',
    ...cssOverride,
  }

  const style = (i: number): React.CSSProperties => {
    return {
      display: 'inline-block',
      backgroundColor: color,
      width: cssValue(size),
      height: cssValue(size),
      margin: `0 ${cssValue(margin)}`,
      borderRadius: '100%',
      animation: `${beat} ${0.7 / speedMultiplier}s ${
        i % 2 ? '0s' : `${0.35 / speedMultiplier}s`
      } infinite linear`,
      animationFillMode: 'both',
    }
  }

  if (!isLoading) {
    return null
  }

  return (
    <span style={wrapper} {...props}>
      <span style={style(1)} />
      <span style={style(2)} />
      <span style={style(3)} />
    </span>
  )
}

export default BeatLoader
