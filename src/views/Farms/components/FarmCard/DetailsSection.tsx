/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton, Button, useModal } from '@pancakeswap/uikit'
import DepositModal from '../DepositModal'
import ZapModal from '../ZapModal'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
  isCommunity?: boolean
  auctionHostingEndDate?: string
  farm?: any
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  farm,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
  isCommunity,
  auctionHostingEndDate,
}) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { account } = useActiveWeb3React()
  const [onPresentDeposit] = useModal(
    <ZapModal
      token0Decimals={farm.token.decimals}
      token1Decimals={farm.quoteToken.decimals}
      token0Name={farm.token.symbol}
      token1Name={farm.quoteToken.symbol}
      token0Address={farm.token.address}
      token1Address={farm.quoteToken.address}
      lpAddress={farm.lpAddress}
      lpTokenName={lpLabel}
      addLiquidityUrl={addLiquidityUrl}
      pid={farm.pid}
    />,
  )

  return (
    <Wrapper>
      {isCommunity && auctionHostingEndDate && (
        <Flex justifyContent="space-between">
          <Text>{t('Auction Hosting Ends')}:</Text>
          <Text>
            {new Date(auctionHostingEndDate).toLocaleString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
      {!removed && (
        <Button width="100%" marginTop="8px" disabled={!account} onClick={onPresentDeposit}>
          Zap in
        </Button>
      )}
      {/* <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal> */}
    </Wrapper>
  )
}

export default DetailsSection
