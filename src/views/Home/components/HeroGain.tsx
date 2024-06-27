import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import bunnyImage from '../../../../public/images/home/trade/questions.jpg'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'

const textBox = {
  backgroundColor: 'rgba(50, 50, 50, 0.3)',
  borderRadius: '25px',
  border: '1px solid gray',
  padding: '10px',
}

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  // position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`
const BunnyWrapper = styled.div`
  // width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
  grid-gap: 10px; /* Adjust the gap between images as needed */
  // animation: ${flyingAnim} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const BunnyHeading = styled(Heading)`
  font-size: 64px;
  // flex: flex;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      <style>
        {`
          .slide-svg-dark {
            display: none;
          }
          .slide-svg-light {
            display: block;
          }
          [data-theme='dark'] .slide-svg-dark {
            display: block;
          }
          [data-theme='dark'] .slide-svg-light {
            display: none;
          }
        `}
      </style>

      <div style={textBox}>
        <Flex
          position="relative"
          flexDirection={['column-reverse', null, null, 'row']}
          alignItems={['flex-end', null, null, 'center']}
          justifyContent="center"
          mt={[account ? '50px' : '30px', null, 0]}
          id="homepage-hero"
        >
          <Flex flex="1" flexDirection="column" style={{ paddingLeft: '10px' }}>
            <Heading scale="df" color="#fff" mb="24px" style={{ lineHeight: '30px' }}>
              {t('The DexTop team is working hard on a new product that’s launching SOON.')}
            </Heading>
          </Flex>
          <Flex
            flex={[null, null, null, '1.5']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '15px' }}
          >
            <Flex flex="1" flexDirection="column" style={{ paddingLeft: '30px' }}>
              <div style={{ color: '#fff', fontSize: '38px' }}>{t('SOMETHING EXCITING LAUNCHING SOON')}</div>
              <BunnyWrapper>
                <img
                  src={bunnyImage}
                  alt={t('Lunar bunny')}
                  style={{ maxWidth: '40%', borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}
                />
              </BunnyWrapper>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default Hero
