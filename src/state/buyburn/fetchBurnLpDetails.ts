import ERC20ABI from 'config/abi/erc20.json'
import PAIRABI from 'config/abi/dexPair.json'
import { multicallv2 } from 'utils/multicall'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'
// import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import { getBurnAddress } from '../../utils/addressHelpers'
import { burnLps } from 'config/constants/burns'
// import { chunk } from 'lodash'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import React from 'react'

const burnLpCall = (chainId: ChainId, lpAddress: string) => {
  const burnLpAddress = getBurnAddress(chainId)

  return [
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [burnLpAddress],
    },
  ]
}

const getLiquidityCall = (chainId: ChainId, lpAddress: string) => {
  return [
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    {
      address: lpAddress,
      name: 'getReserves',
    },
  ]
}

const getLiqudityUsd = async (lpAddress: string) => {
  let liqudityUsd = 0
  const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/pulsechain/${lpAddress}`)
  if (response.ok) {
    const data = await response.json()
    liqudityUsd = data.pair.liquidity.usd
  }
  return liqudityUsd
}

export const fetchBurnLpDetails = async (chainId: ChainId): Promise<any> => {
  const call = burnLps.flatMap((lp) => burnLpCall(chainId, lp.address))
  const balances = await multicallv2({ abi: ERC20ABI, calls: call, chainId, options: { requireSuccess: false } })

  const burnLpWithBalances = burnLps.map((lp, index) => {
    return { ...lp, liquidityAmount: balances[index].toString() }
  })
  const filteredBurnLp = burnLpWithBalances.filter((burnLp) => burnLp.liquidityAmount > 0)

  const lpCall = filteredBurnLp.flatMap((lp) => getLiquidityCall(chainId, lp.address))
  const lpDetails = await multicallv2({ abi: PAIRABI, calls: lpCall, chainId, options: { requireSuccess: false } })

  const liquidityUsds = await Promise.all(filteredBurnLp.map((lp) => getLiqudityUsd(lp.address)))

  const burnLpDetails = filteredBurnLp.map((lp, index) => {
    const totalSupply = lpDetails[2 * index][0]
    const reserve0 = lpDetails[2 * index + 1]._reserve0
    const reserve1 = lpDetails[2 * index + 1]._reserve1

    return {
      ...lp,
      liquidityToken0: getBalanceNumber(new BigNumber((reserve0 * lp.liquidityAmount) / totalSupply)),
      liquidityToken1: getBalanceNumber(new BigNumber((reserve1 * lp.liquidityAmount) / totalSupply)),
      liquidityUSD: (liquidityUsds[index] * lp.liquidityAmount) / totalSupply,
    }
  })

  return burnLpDetails
}
