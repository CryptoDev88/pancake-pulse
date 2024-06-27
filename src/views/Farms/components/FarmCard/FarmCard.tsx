import { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Card, Flex, Text, Skeleton } from '@pancakeswap/uikit'
import { getBlockExploreLink } from 'utils'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import { FarmWithStakedValue } from '../types'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

const rotate = keyframes`
  100% {
    transform: rotate(1turn);
  }
`

const ConicBorder = styled.div`
  position: relative;
  z-index: 0;
  margin: 10px;
  border-radius: 30px;
  overflow: hidden;
  padding: 4px !important;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #1a232a;
    background-repeat: no:
    repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(transparent, rgba(255, 165, 0, 1), transparent 20%);
    animation: ${rotate} 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    border-radius: 5px;
  }
`

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 3px 2px 2px;
  }
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, displayApr, removed, cakePrice, account }) => {
  const { t } = useTranslation()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 3 })}`
      : ''
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('DEX')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  // const lpAddress = farm.lpAddress
  // const isPromotedFarm = farm.token.symbol === 'DEX'

  const toggleExpandableSection = useCallback(() => {
    setShowExpandableSection((prev) => !prev)
  }, [])

  return (
    <>
      {removed !== true ? (
        <ConicBorder>
          <StyledCard isActive={false}>
            <FarmCardInnerContainer>
              <CardHeading
                lpLabel={lpLabel}
                multiplier={farm.multiplier}
                isCommunityFarm={farm.isCommunity}
                token={farm.token}
                quoteToken={farm.quoteToken}
              />
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{t('APR')}:</Text>
                <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                  {farm.apr ? (
                    <ApyButton
                      variant="text-and-button"
                      pid={farm.pid}
                      lpSymbol={farm.lpSymbol}
                      multiplier={farm.multiplier}
                      lpLabel={lpLabel}
                      addLiquidityUrl={addLiquidityUrl}
                      cakePrice={cakePrice}
                      apr={farm.apr}
                      displayApr={displayApr}
                    />
                  ) : (
                    <Skeleton height={24} width={80} />
                  )}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>{t('Earn')}:</Text>
                <Text bold>{earnLabel}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>{t('Deposit Fee')}:</Text>
                <Text bold>{farm.depositFeeBP / 100}%</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>{t('Withdraw Fee')}:</Text>
                <Text bold>{farm.withdrawFeeBP / 100}%</Text>
              </Flex>
              <CardActionsContainer
                farm={farm}
                lpLabel={lpLabel}
                account={account}
                addLiquidityUrl={addLiquidityUrl}
                displayApr={displayApr}
              />
            </FarmCardInnerContainer>

            <ExpandingWrapper>
              <ExpandableSectionButton onClick={toggleExpandableSection} expanded={showExpandableSection} />
              {showExpandableSection && (
                <DetailsSection
                  farm={farm}
                  removed={removed}
                  bscScanAddress={getBlockExploreLink(farm.lpAddress, 'address')}
                  infoAddress={`/info/pool/${farm.lpAddress}`}
                  totalValueFormatted={totalValueFormatted}
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  isCommunity={farm.isCommunity}
                  auctionHostingEndDate={farm.auctionHostingEndDate}
                />
              )}
            </ExpandingWrapper>
          </StyledCard>
        </ConicBorder>
      ) : (
        <StyledCard isActive={false}>
          <FarmCardInnerContainer>
            <CardHeading
              lpLabel={lpLabel}
              multiplier={farm.multiplier}
              isCommunityFarm={farm.isCommunity}
              token={farm.token}
              quoteToken={farm.quoteToken}
            />
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{t('APR')}:</Text>
              <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                {farm.apr ? (
                  <ApyButton
                    variant="text-and-button"
                    pid={farm.pid}
                    lpSymbol={farm.lpSymbol}
                    multiplier={farm.multiplier}
                    lpLabel={lpLabel}
                    addLiquidityUrl={addLiquidityUrl}
                    cakePrice={cakePrice}
                    apr={farm.apr}
                    displayApr={displayApr}
                  />
                ) : (
                  <Skeleton height={24} width={80} />
                )}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('Earn')}:</Text>
              <Text bold>{earnLabel}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('Deposit Fee')}:</Text>
              <Text bold>{farm.depositFeeBP / 100}%</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>{t('Withdraw Fee')}:</Text>
              <Text bold>{farm.withdrawFeeBP / 100}%</Text>
            </Flex>
            <CardActionsContainer
              farm={farm}
              lpLabel={lpLabel}
              account={account}
              addLiquidityUrl={addLiquidityUrl}
              displayApr={displayApr}
            />
          </FarmCardInnerContainer>

          <ExpandingWrapper>
            <ExpandableSectionButton onClick={toggleExpandableSection} expanded={showExpandableSection} />
            {showExpandableSection && (
              <DetailsSection
                farm={farm}
                removed={removed}
                bscScanAddress={getBlockExploreLink(farm.lpAddress, 'address')}
                infoAddress={`/info/pool/${farm.lpAddress}`}
                totalValueFormatted={totalValueFormatted}
                lpLabel={lpLabel}
                addLiquidityUrl={addLiquidityUrl}
                isCommunity={farm.isCommunity}
                auctionHostingEndDate={farm.auctionHostingEndDate}
              />
            )}
          </ExpandingWrapper>
        </StyledCard>
      )}
    </>
  )
}

export default FarmCard
