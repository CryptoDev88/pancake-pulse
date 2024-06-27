import styled from 'styled-components'
import { Flex, Heading, Text, Link, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useWeb3React } from '@pancakeswap/wagmi'
import SunburstSvg from './SunburstSvg'
import bunnyImage1 from '../../../../public/images/home/trade/star1.png'
import bunnyImage2 from '../../../../public/images/home/trade/star2.png'
import bunnyImage3 from '../../../../public/images/home/trade/star3.png'
import CompositeImage from './CompositeImage'

const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledSunburst = styled(SunburstSvg)`
  height: 350%;
  width: 350%;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 400%;
    width: 400%;
  }
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const FloatingPancakesWrapper = styled(Container)`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${({ theme }) => theme.mediaQueries.xs} {
    visibility: visible;
  }
`

const TopLeftImgWrapper = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
`

const HeadingText = styled(Heading)`
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

const BunnyWrapper = styled.div`
  // width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Two equal-width columns */
  grid-gap: 10px; /* Adjust the gap between images as needed */
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const Footer = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { isTablet, isDesktop } = useMatchBreakpoints()

  return (
    <>
      {/* <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          <StyledSunburst />
        </Flex>
      </BgWrapper> */}
      {/* {(isTablet || isDesktop) && (
        <FloatingPancakesWrapper>
          <TopLeftImgWrapper>
            <CompositeImage {...topLeftImage} maxHeight="256px" />
          </TopLeftImgWrapper>
          <BottomRightImgWrapper>
            <CompositeImage {...bottomRightImage} maxHeight="256px" />
          </BottomRightImgWrapper>
        </FloatingPancakesWrapper>
      )} */}
      <Flex
        position="relative"
        flexDirection={['inherit', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '10px' : '10px', null, 0]}
        id="homepage-hero"
      >
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '0.3']}
          mb={['24px', null, null, '0']}
          position="relative"
          style={{ paddingRight: '15px' }}
        >
          <BunnyWrapper>
            <img src={bunnyImage1} alt={t('Lunar bunny')} />
            <img src={bunnyImage2} alt={t('Lunar bunny')} />
            <img src={bunnyImage3} alt={t('Lunar bunny')} />
          </BunnyWrapper>
        </Flex>
        <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
          <Wrapper>
            <Heading mb="24px" scale="xxl" color="white">
              {t('CONTACT & SUPPORT')}
            </Heading>
            <HeadingText mb="24px" color="white">
              {t('support@dextop.pro')}
            </HeadingText>
          </Wrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Footer
