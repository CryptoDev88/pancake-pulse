/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useCallback, useState, useMemo, useRef, createContext } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Image, Heading, Toggle, Text, Button, ArrowForwardIcon, Flex, Link, Box } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd, useTotalValue } from 'state/farms/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import ToggleView from 'components/ToggleView/ToggleView'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { FarmWithStakedValue } from './components/types'
import { Label } from 'recharts'
import CardValue from './components/CardValue'

const textBox = {
  backgroundColor: 'rgba(50, 50, 50, 0.3)',
  borderRadius: '25px',
  border: '1px solid gray',
  padding: '10px',
  margin: 'auto',
  width: 'fit-content',
  minWidth: '200px',
  maxWidth: '640px',
  color: 'white',
}

const imageStyle = {
  borderRadius: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  display: 'block',
  margin: 'auto',
  padding: '10px',
}

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const FinishedTextContainer = styled(Flex)`
  padding-bottom: 32px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const FinishedTextLink = styled(Link)`
  font-weight: 400;
  white-space: nowrap;
  text-decoration: underline;
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  let pathname = location.pathname
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded, poolLength, regularCakePerBlock } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  const tvl = useTotalValue()
  usePollFarmsWithUserData()

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const activeFarms = farmsLP.filter((farm) => farm.pid === 0 || farm.pid === 1)
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.pid !== 1)
  const archivedFarms = farmsLP

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(
              ChainId.PULSE_CHAIN,
              new BigNumber(farm.poolWeight),
              cakePrice,
              totalLiquidity,
              farm.lpAddress,
              regularCakePerBlock,
            )
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      // if (query) {
      //   const lowercaseQuery = latinise(query.toLowerCase())
      //   farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
      //     return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
      //   })
      // }
      return farmsToDisplayWithAPR
    },
    [cakePrice, isActive, regularCakePerBlock],
  )

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        case 'latest':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.pid), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <FarmsContext.Provider value={{ chosenFarmsMemoized }}>
      <PageHeader>
        <Flex flexDirection={['column', 'column', 'row', 'row']} justifyContent="space-between">
          <Box>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('X-Yield')}
            </Heading>
          </Box>
          <Box
            padding="24px"
            marginRight={[0, 0, 20, 20]}
            marginTop={[20, 20, 0, 0]}
            border="1px solid #524B63"
            borderRadius={16}
          >
            <Heading scale="lg">{t('Total LP Value')}</Heading>
            <CardValue value={tvl.toNumber()} prefix="$" fontSize="40px" decimals={2} />
          </Box>
        </Flex>
      </PageHeader>
      <Page>
        <div style={textBox}>
          <p style={{ marginBottom: '10px' }}>
            <div style={{ color: '#FFFFFF' }}>
              DexTop Finance will have two Liquidity Pools (LP's) in the "
              <u>
                <a href="/x-yield">Live</a>
              </u>
              " section fully working and earning yield, these LP's are DEX-WPLS and DEX-DAI, all other LP's can now be
              found in the "
              <u>
                <a href="/x-yield/history">Finished</a>
              </u>
              " section, users MUST withdrawal from these pools ASAP. Simply click on the "-" minus button to remove
              your stake (please note that all accrued DEX will not be harvestable in these discontinued pools)
            </div>
          </p>
        </div>
        <ControlContainer>
          <ViewControls>
            <ToggleView idPrefix="clickFarm" viewMode={viewMode} onToggle={setViewMode} />
            <ToggleWrapper>
              <Toggle
                id="staked-only-farms"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text> {t('Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                  {
                    label: t('Latest'),
                    value: 'latest',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {viewMode === ViewMode.TABLE ? (
          <Table farms={chosenFarmsMemoized} cakePrice={cakePrice} userDataReady={userDataReady} />
        ) : (
          <FlexLayout>{children}</FlexLayout>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={observerRef} />
        {/* <StyledImage src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
      </Page>
    </FarmsContext.Provider>
  )
}

export const FarmsContext = createContext({ chosenFarmsMemoized: [] })

export default Farms
