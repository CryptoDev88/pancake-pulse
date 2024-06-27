import { Button, Flex, Heading, Link } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import bunnyImage from '../../../../public/images/home/earn/2graph.png'
import bunnyChart from '../../../../public/images/home/earn/2circlechart.png'

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
const BunnyWrapper = styled.div`
  width: 100%;
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
          <Flex
            flex={[null, null, null, '0.8']}
            mb={['24px', null, null, '0']}
            position="relative"
            style={{ paddingRight: '15px' }}
          >
            <BunnyWrapper>
              <img
                src={bunnyImage}
                alt={t('Lunar bunny')}
                style={{ borderRadius: '25px', boxShadow: '0 0 8px rgba(0, 0, 0, 1)' }}
              />
              <img src={bunnyChart} alt={t('Lunar bunny')} />
            </BunnyWrapper>
          </Flex>
          <Flex flex="1" flexDirection="column">
            <BunnyHeading scale="xxl" color="#fff" mb="24px" mt="30px">
              {t('DEX TOKEN')}
            </BunnyHeading>
            <Heading scale="df" color="#fff" mb="24px" style={{ lineHeight: '25px' }}>
              {t(
                'Dive into the next-generation of DeFi innovation, brought to life on the PulseChain network. We proudly present "DexTop", a cutting-edge token designed to fuse advanced tokenomics with unparalleled utility',
              )}
            </Heading>
            <Heading scale="df" color="#fff" mb="24px" style={{ lineHeight: '25px' }}>
              {t(
                "Our token presale has already passed, with the successsful launch of the DexTop token. Recognizing the trust and commitment of our early supporters, 25% of the supply was allocated for the presale, granting them the unique opportunity to contribute to and benefit from DexTop's liquidity foundation. But if you missed the presale, do not worry you are still very early and have the oportunity to swap your Pulse tokens for the DexTop tokens, or pair and add liquidity to X-Yield pools to earn high APR’s. With plenty more features and ways to make your tokens work for you coming soon",
              )}
            </Heading>
            <Heading scale="df" color="#fff" mb="0px" style={{ lineHeight: '25px' }}>
              {t(
                "Join a vibrant community at the heart of the DeFi revolution. Together, as the DexTop family, we're harnessing the power of innovative tokenomics and the immense potential of the PulseChain. With your support and belief, we're not just envisioning the next era of finance; we're building it, one block at a time",
              )}
            </Heading>
            <Flex></Flex>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default Hero
