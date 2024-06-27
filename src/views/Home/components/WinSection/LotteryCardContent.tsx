import { useState, useEffect } from 'react'
import { Flex, Text, Skeleton, Button, ArrowForwardIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { usePriceCakeBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import styled from 'styled-components'
import { fetchLottery, fetchCurrentLotteryId } from 'state/lottery/helpers'
import { getBalanceAmount } from 'utils/formatBalance'
import { SLOW_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'

const StyledBalance = styled(Balance)`
  background: ${({ theme }) => theme.colors.gradientGold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const LotteryCardContent = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const cakePriceBusd = usePriceCakeBusd()
  const { data: currentLotteryId } = useSWRImmutable(loadData ? ['currentLotteryId'] : null, fetchCurrentLotteryId, {
    refreshInterval: SLOW_INTERVAL,
  })
  const { data: currentLottery } = useSWRImmutable(
    currentLotteryId ? ['currentLottery'] : null,
    async () => fetchLottery(currentLotteryId.toString()),
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )

  const cakePrizesText = t('%cakePrizeInUsd% in DEX prizes this round', { cakePrizeInUsd: cakePriceBusd.toString() })
  const [pretext, prizesThisRound] = cakePrizesText.split(cakePriceBusd.toString())
  const amountCollectedInXfn = currentLottery ? parseFloat(currentLottery.amountCollectedInXfn) : null
  const currentLotteryPrize = amountCollectedInXfn ? cakePriceBusd.times(amountCollectedInXfn) : null

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <Text color="white" bold fontSize="16px">
          {t('Lottery')}
        </Text>
        {pretext && (
          <Text color="white" mt="12px" bold fontSize="16px">
            {pretext}
          </Text>
        )}
        {currentLotteryPrize && currentLotteryPrize.gt(0) ? (
          <StyledBalance
            fontSize="40px"
            bold
            prefix="$"
            decimals={0}
            value={getBalanceAmount(currentLotteryPrize).toNumber()}
          />
        ) : (
          <>
            <Skeleton width={200} height={40} my="8px" />
            <div ref={observerRef} />
          </>
        )}
        <Text color="white" mb="24px" bold fontSize="16px">
          {prizesThisRound}
        </Text>
        <Text color="white" mb="40px">
          {t('Buy tickets with DEX, win DEX if your numbers match')}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        {/* <StyledLink to="/lottery" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Buy Tickets')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink> */}
      </Flex>
    </>
  )
}

export default LotteryCardContent
