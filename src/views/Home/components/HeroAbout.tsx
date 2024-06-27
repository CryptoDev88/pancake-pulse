import { Button, Flex, Heading } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from 'contexts/Localization'

const textBox = {
  backgroundColor: 'rgba(50, 50, 50, 0.3)',
  borderRadius: '25px',
  border: '1px solid gray',
  padding: '10px',
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
            <Heading scale="xxl" color="#fff" mb="48px">
              {t('ABOUT DEX')}
            </Heading>
            <Heading scale="md" color="#fff" mb="24px" style={{ lineHeight: '30px' }}>
              {t(
                'In the intricate dance of decentralized finance, visionaries often rise, setting the rhythm for the future. DexTop Finance is the brainchild of such a visionary – Matt, popularly recognized in the community as EpicDefi Nomadz.',
              )}
            </Heading>
            <Heading scale="md" color="#fff" mb="24px" style={{ lineHeight: '30px' }}>
              {t(
                "With over four years in the DeFi landscape, Matt's journey is nothing short of remarkable. His deep-rooted expertise and insights have not only kept him ahead of the DeFi evolution, but have also empowered him to shape it. EpicDefi Nomadz is not just a moniker; it’s a testament to his relentless pursuit of innovation, his nomadic journey through the vast plains of DeFi, and his quest to redefine the financial norms.",
              )}
            </Heading>
            <Heading scale="md" color="#fff" mb="24px" style={{ lineHeight: '30px' }}>
              {t(
                "At DexTop Finance, we’re sculpting the future of finance, fusing classical principles with decentralized innovations. Our mission is to make finance more open, equitable, and empowering for all. Join us in this revolution, as we, with you the community, look forward to redefining what's possible in the world of DeFi.",
              )}
            </Heading>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

export default Hero
