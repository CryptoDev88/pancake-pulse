import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Text,
  useTooltip,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import styled, { useTheme } from 'styled-components'
import { formatAmount } from 'utils/formatInfoNumbers'
import useBurn from '../hooks/useBurnContract'

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

interface BurnCardProps {
  totalBurned: number
  selectedUsd: number
  estBurnDex: number
  estBounty: number
  token0s: string[]
  token1s: string[]
}
export const BurnCard: React.FC<BurnCardProps> = ({
  totalBurned,
  selectedUsd,
  estBurnDex,
  estBounty,
  token0s,
  token1s,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { account, chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  // const { onBurn } = useBurn(token0s, token1s)

  return (
    <CardWrapper>
      <Card p="0px" style={{ zIndex: 1 }}>
        <StyledCardBody style={{ padding: '18px 24px' }}>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={22} bold color="text" display="inline-block">
              {t('Burn DEX')}
            </Text>
            <Text>Total DEX burned: ${formatAmount(totalBurned)}🔥</Text>
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
              <Button width={'100%'} onClick={() => null}>
                Burn
              </Button>
            </Box>
          )}
        </StyledCardFooter>
      </Card>
    </CardWrapper>
  )
}
