import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import bunnyImage from '../../../../public/images/home/trade/gain.png'
import bunnyChart from '../../../../public/images/home/trade/alplifier.png'
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
            <Heading scale="xxl" color="#fff" mb="24px">
              {t('DIVE DEEP INTO OUR LIQUIDITY POOLS')}
            </Heading>
            <Heading scale="df" color="#fff" mb="24px" style={{ lineHeight: '30px' }}>
              {t(
                'Our liquidity pools are live - we are excited to present X-Yield, stake LP tokens to earn great APR! X-Yield also supports the zap function so you can add liquidity easily.',
              )}
            </Heading>
            <Heading scale="xl" color="#fff" mb="24px" mt="24px">
              {t('THE DEX ADVANTAGE:')}
            </Heading>
            <ul style={{ lineHeight: '30px', color: 'white', fontSize: '20px' }}>
              <li>{t('Crystal-Clear: Full insights into your financial journey')}</li>
              <li>
                {t('Fort Knox Secure: Our contracts pass rigorous audits, safeguarding every penny you trust us with')}
              </li>
              <li>{t('Genuinely Decentralized: Ushering in a new era of equitable and open finance')}</li>
            </ul>
            <Flex></Flex>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default Hero
