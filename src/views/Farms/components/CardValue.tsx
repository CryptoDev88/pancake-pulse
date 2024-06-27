import { Text } from '@pancakeswap/uikit'
import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  suffix?: string
  bold?: boolean
  color?: string
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '28px',
  lineHeight = '1',
  prefix = '',
  suffix = '',
  bold = true,
  color = 'text',
}) => {
  return (
    <Text bold={bold} fontSize={fontSize} style={{ lineHeight }} color={color}>
      {prefix}
      {value.toFixed(2)}
      {suffix}
    </Text>
  )
}

export default CardValue
