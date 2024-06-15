import LendXABI from 'config/abi/lendX.json'
import { multicallv2 } from 'utils/multicall'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'
// import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import { getLendXAddress } from '../../utils/addressHelpers'

const lendXCall = (chainId: ChainId) => {
  const lendXAddress = getLendXAddress(chainId)

  return [
    {
      address: lendXAddress,
      name: 'minXfnAmount',
    },
    {
      address: lendXAddress,
      name: 'totalInvestors',
    },
    {
      address: lendXAddress,
      name: 'totalRaised',
    },
  ]
}

export const fetchLendXPublicData = async (chainId: ChainId): Promise<any> => {
  const call = lendXCall(chainId)

  const callResult = await multicallv2({ abi: LendXABI, calls: call, chainId, options: { requireSuccess: false } })
  return callResult
}
