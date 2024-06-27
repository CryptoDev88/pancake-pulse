import styled from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from 'config/constants'

const StyledPage = styled.div<{ $removePadding: boolean; $noMinHeight; $isSwap: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 148px)')};
  // // background: ${({ theme }) => theme.colors.gradientBubblegum};
  // background-image: url('/images/bg-swap.jpg');
  background-position: top, center;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  // ${({ theme }) => theme.mediaQueries.xs} {
  //   background-size: auto;
  // }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 148px)')};
  }
`

const Page: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      removePadding?: boolean
      hideFooterOnDesktop?: boolean
      noMinHeight?: boolean
      helpUrl?: string
      isSwap?: boolean
    }
  >
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  isSwap = false,
  ...props
}) => {
  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} $noMinHeight={noMinHeight} $isSwap={isSwap} {...props}>
        {children}
        <Flex flexGrow={1} />
        {/* <Box display={['block', null, null, hideFooterOnDesktop ? 'none' : 'block']} width="100%">
          <Footer helpUrl={helpUrl} />
        </Box> */}
      </StyledPage>
    </>
  )
}

export default Page
