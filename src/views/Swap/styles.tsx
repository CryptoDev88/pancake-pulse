import styled, { keyframes } from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  position: relative;
  z-index: 0;
  margin: 20px;
  border-radius: 30px;
  overflow: hidden;
  padding: 4px;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   z-index: -2;
  //   left: -50%;
  //   top: -50%;
  //   width: 200%;
  //   height: 200%;
  //   background-color: #1a232a;
  //   background-repeat: no-repeat;
  //   background-position: 0 0;
  //   background-image: conic-gradient(transparent, rgba(68, 239, 255, 1), transparent 20%);
  //   animation: ${rotate} 2s linear infinite;
  // }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 5px;
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  max-width: 451px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 350px;
  }
  min-width: 300px;
`
