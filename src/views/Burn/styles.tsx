import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const StyledSwapContainer = styled(Flex)`
  flex-shrink: 0;
  height: fit-content;
  padding: 0 24px;
  margin-bottom: 64px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 0 40px;
  }
  min-height: 436px;
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 326px;
  ${({ theme }) => theme.mediaQueries.xl} {
    min-width: 440px;
  }
`
