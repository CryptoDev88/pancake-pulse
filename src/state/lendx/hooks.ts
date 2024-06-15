// import { useWeb3React } from '@pancakeswap/wagmi'
import { SLOW_INTERVAL } from 'config/constants'
import useSWRImmutable from 'swr/immutable'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { fetchLendXData, fetchLendXUserDataAsync } from '.'

export function useLendXState(): AppState['lendX'] {
  return useSelector<AppState, AppState['lendX']>((state) => state.lendX)
}

export const useLendXUserData = () => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useActiveWeb3React()

  useSWRImmutable(
    ['lendXData'],
    () => {
      dispatch(fetchLendXData(chainId))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )

  useSWRImmutable(
    account ? ['lendXWithUserData', account] : null,
    () => {
      dispatch(fetchLendXUserDataAsync({ account }))
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}
