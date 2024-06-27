import { CSSProperties, useMemo, useState } from 'react'
import { Flex, Heading, Card, Box, Text, CardBody, CardFooter, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import styled, { useTheme } from 'styled-components'
import Page from 'components/Layout/Page'
import { useAllTokenData } from 'state/info/hooks'
import { BurnCard } from './components/BurnCard'
import BurnTable from './components/BurnTable'
import { useBurnLpData, useBurnLpState } from 'state/buyburn/hooks'
import useBurn from './hooks/useBurnContract'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { formatAmount } from 'utils/formatInfoNumbers'

const gradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage:
    'radial-gradient(50% 500px at 50% -6%, rgba(0, 41, 102, 0.7) 0%, rgb(7, 24, 50) 50%, rgb(6, 22, 45) 100%), radial-gradient(circle at -70% 50%, rgba(0, 43, 102, 0.7) 0px, transparent 50%)',
  opacity: 1,
  zIndex: -1,
}

const BurnFlexWrapper = styled(Flex)`
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-wrap: nowrap;
  }
`

export const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 400px;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 296px;
    margin-left: 50px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`
export const ImageWrapper = styled.div`
  position: absolute;
  top: -50px;
  transform: translateY(-50%) scale(75%);
  right: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    right: auto;
    top: 50%;
    left: -70px;
    transform: translateY(-50%);
  }
  z-index: 2;
`
const StyledCardBody = styled(CardBody)`
  border-bottom: none;
`
const StyledCardFooter = styled(CardFooter)`
  border-top: none;
  position: relative;
  padding: 8px 24px 16px;
  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% - 48px);
    top: 0px;
    left: 24px;
    background-color: ${({ theme }) => theme.colors.cardBorder};
  }
`

const Burn: React.FC<React.PropsWithChildren> = () => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const theme = useTheme()
  const { account, chainId } = useActiveWeb3React()
  useBurnLpData()
  const data = useBurnLpState()

  const [selectedUsd, setSelectedUsd] = useState(0)
  const [estBurnDex, setEstBurnDex] = useState(0)
  const [estBounty, setEstBounty] = useState(0)
  const [token0s, setToken0s] = useState([])
  const [token1s, setToken1s] = useState([])
  const totalBurned = parseFloat(data.data.burnedDEX)

  const { onBurn } = useBurn(token0s, token1s)
  return (
    <Page>
      <div style={gradientOverlayStyle}></div>
      <BurnFlexWrapper justifyContent="space-between">
        <Box>
          <Heading scale="xl" mb="16px" id="info-overview-title">
            {t('DexTop Buy & Burn')}
          </Heading>
          <Heading scale="lg" mt="10px" mb="16px">
            {t('Select Lps to Buy and Burn DEX')}
          </Heading>
        </Box>
        <Box>
          <CardWrapper>
            <Card p="0px" style={{ zIndex: 1 }}>
              <StyledCardBody style={{ padding: '18px 24px' }}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <Text fontSize={22} bold color="text" display="inline-block">
                    {t('Burn DEX')}
                  </Text>
                  <Text>Total DEX burned: {formatAmount(totalBurned)}🔥</Text>
                </Flex>
                <Text fontSize={16}>Selected USD value: ${formatAmount(selectedUsd)}</Text>
                <Text fontSize={16}>This would burn: ~{formatAmount(estBurnDex)} DEX</Text>
                <Text bold fontSize={16}>
                  Bounty: {formatAmount(estBounty)} DEX/~$0.00
                </Text>
              </StyledCardBody>
              <StyledCardFooter>
                {!account ? (
                  <Box>
                    <ConnectWalletButton width="100%" style={{ backgroundColor: theme.colors.textSubtle }} />
                  </Box>
                ) : (
                  <Box>
                    <Button width={'100%'} onClick={async () => await onBurn()}>
                      Burn
                    </Button>
                  </Box>
                )}
              </StyledCardFooter>
            </Card>
          </CardWrapper>
        </Box>
      </BurnFlexWrapper>
      <Heading scale="lg" m="16px">
        LPs to Burn
      </Heading>

      <BurnTable
        burnLPDatas={data.data.lps}
        setSelectedUsd={setSelectedUsd}
        setEstBounty={setEstBounty}
        setEstBurnDex={setEstBurnDex}
        setToken0s={setToken0s}
        setToken1s={setToken1s}
        dexPrice={data.data.dexPrice}
      />
    </Page>
  )
}

export default Burn
