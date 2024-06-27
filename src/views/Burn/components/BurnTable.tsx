import { useState, useMemo, useCallback, useEffect, Fragment, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import {
  Text,
  Flex,
  Box,
  Skeleton,
  ArrowBackIcon,
  ArrowForwardIcon,
  useMatchBreakpoints,
  Radio,
} from '@pancakeswap/uikit'
import { BurnLpData } from 'state/info/types'
import { CurrencyLogo, DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'
import orderBy from 'lodash/orderBy'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from './shared'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 2fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 2fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr 1fr;
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
      display: none;
    }
  }
`

const TableLoader: React.FC<React.PropsWithChildren> = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

let selectedUsd = 0
let estBounty = 0
let estBurnDex = 0
let token0s = []
let token1s = []

const DataRow: React.FC<
  React.PropsWithChildren<{
    burnLPData: BurnLpData
    index: number
    dexPrice: string
    setSelectedUsd: Dispatch<SetStateAction<number>>
    setEstBurnDex: Dispatch<SetStateAction<number>>
    setEstBounty: Dispatch<SetStateAction<number>>
    setToken0s: Dispatch<SetStateAction<any[]>>
    setToken1s: Dispatch<SetStateAction<any[]>>
  }>
> = ({ burnLPData, index, setSelectedUsd, setEstBurnDex, setEstBounty, setToken0s, setToken1s, dexPrice }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (checked) {
      selectedUsd += burnLPData.liquidityUSD
      setSelectedUsd(selectedUsd)

      estBurnDex += burnLPData.liquidityUSD / parseFloat(dexPrice)
      setEstBurnDex(estBurnDex)

      estBounty += burnLPData.liquidityUSD / parseFloat(dexPrice) / 1000
      setEstBounty(estBounty)

      token0s.push(burnLPData.token0)
      setToken0s(token0s)

      token1s.push(burnLPData.token1)
      setToken1s(token1s)
    } else {
      if (token0s.length > 0) {
        selectedUsd -= burnLPData.liquidityUSD
        setSelectedUsd(selectedUsd < 0 ? 0 : selectedUsd)

        estBurnDex -= burnLPData.liquidityUSD / parseFloat(dexPrice)
        setEstBurnDex(estBurnDex < 0 ? 0 : estBurnDex)

        estBounty -= burnLPData.liquidityUSD / parseFloat(dexPrice) / 1000
        setEstBounty(estBounty < 0 ? 0 : estBounty)

        token0s = token0s.filter((token0) => token0 != burnLPData.token0)
        setToken0s(token0s)
        token1s = token1s.filter((token1) => token1 != burnLPData.token1)
        setToken1s(token1s)
      } else {
        setSelectedUsd(0)
        setEstBounty(0)
        setEstBurnDex(0)
        setToken0s([])
        setToken1s([])
      }
    }
  }, [checked])

  return (
    <ResponsiveGrid>
      <Flex
        width={24}
        onClick={() => {
          setChecked(!checked)
        }}
      >
        <Radio scale="sm" onChange={() => null} checked={checked} />
      </Flex>
      <Flex alignItems="center">
        <DoubleCurrencyLogo address0={burnLPData.token0} address1={burnLPData.token1} />
        {(isXs || isSm) && <Text ml="8px">{burnLPData.name}</Text>}
        {!isXs && !isSm && (
          <Flex marginLeft="10px">
            <Text>{burnLPData.name}</Text>
          </Flex>
        )}
      </Flex>
      <Text fontWeight={400}>${formatAmount(burnLPData.liquidityUSD, { notation: 'standard' })}</Text>
      <Text fontWeight={400}>{formatAmount(burnLPData.liquidityToken0)}</Text>
      <Text fontWeight={400}>{formatAmount(burnLPData.liquidityToken1)}</Text>
      <Text fontWeight={400}>{formatAmount(getBalanceNumber(new BigNumber(burnLPData.liquidityAmount)))}</Text>
    </ResponsiveGrid>
  )
}

const SORT_FIELD = {
  name: 'name',
  liquidityUSD: 'liquidityUSD',
  liquidityToken0: 'liquidityToken0',
  liquidityToken1: 'liquidityToken1',
  liquidityAmount: 'liquidityAmount',
}

const MAX_ITEMS = 10

const BurnTable: React.FC<
  React.PropsWithChildren<{
    burnLPDatas: BurnLpData[] | undefined
    setSelectedUsd: Dispatch<SetStateAction<number>>
    setEstBurnDex: Dispatch<SetStateAction<number>>
    setEstBounty: Dispatch<SetStateAction<number>>
    setToken0s: Dispatch<SetStateAction<any[]>>
    setToken1s: Dispatch<SetStateAction<any[]>>
    dexPrice: string
    maxItems?: number
  }>
> = ({
  burnLPDatas,
  maxItems = MAX_ITEMS,
  setSelectedUsd,
  setEstBurnDex,
  setEstBounty,
  setToken0s,
  setToken1s,
  dexPrice,
}) => {
  const [sortField, setSortField] = useState(SORT_FIELD.liquidityUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (burnLPDatas) {
      if (burnLPDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(burnLPDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, burnLPDatas])

  const sortedTokens = useMemo(() => {
    return burnLPDatas
      ? orderBy(
          burnLPDatas,
          (burnLPData) => burnLPData[sortField as keyof BurnLpData],
          sortDirection ? 'desc' : 'asc',
        ).slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [burnLPDatas, maxItems, page, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  if (!burnLPDatas) {
    return <Skeleton />
  }

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="secondary" fontSize="16px" bold></Text>
        <ClickableColumnHeader
          color="secondary"
          fontSize="16px"
          bold
          onClick={() => handleSort(SORT_FIELD.name)}
          textTransform="uppercase"
        >
          {t('Lps')} {arrow(SORT_FIELD.name)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="16px"
          bold
          onClick={() => handleSort(SORT_FIELD.liquidityUSD)}
          textTransform="uppercase"
        >
          {t('Usd Value')} {arrow(SORT_FIELD.liquidityUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="16px"
          bold
          onClick={() => handleSort(SORT_FIELD.liquidityToken0)}
          textTransform="uppercase"
        >
          {t('Token0 Amount')} {arrow(SORT_FIELD.liquidityToken0)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="16px"
          bold
          onClick={() => handleSort(SORT_FIELD.liquidityToken1)}
          textTransform="uppercase"
        >
          {t('Token1 Amount')} {arrow(SORT_FIELD.liquidityToken1)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="16px"
          bold
          onClick={() => handleSort(SORT_FIELD.liquidityAmount)}
          textTransform="uppercase"
        >
          {t('LP Amount')} {arrow(SORT_FIELD.liquidityAmount)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      <Break />
      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data, i) => {
            if (data) {
              return (
                <Fragment key={data.address}>
                  <DataRow
                    index={(page - 1) * MAX_ITEMS + i}
                    burnLPData={data}
                    setEstBounty={setEstBounty}
                    setSelectedUsd={setSelectedUsd}
                    setEstBurnDex={setEstBurnDex}
                    setToken0s={setToken0s}
                    setToken1s={setToken1s}
                    dexPrice={dexPrice}
                  />
                  <Break />
                </Fragment>
              )
            }
            return null
          })}
          <PageButtons>
            <Arrow
              onClick={() => {
                setPage(page === 1 ? page : page - 1)
              }}
            >
              <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
            </Arrow>
            <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
            <Arrow
              onClick={() => {
                setPage(page === maxPage ? page : page + 1)
              }}
            >
              <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
            </Arrow>
          </PageButtons>
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default BurnTable
