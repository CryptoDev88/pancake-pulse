// import { useWeb3React } from '@pancakeswap/wagmi'
import { SLOW_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchBurnLpData } from '.'

export function useBurnLpState(): AppState['burnLp'] {
  return useSelector<AppState, AppState['burnLp']>((state) => state.burnLp)
}

export const useBurnLpData = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useActiveWeb3React()

  useSWRImmutable(
    ['burnLpData'],
    () => {
      dispatch(fetchBurnLpData(chainId))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}
