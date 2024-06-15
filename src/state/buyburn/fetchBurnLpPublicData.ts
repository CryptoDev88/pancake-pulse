import BurnABI from 'config/abi/burn.json'
import { multicallv2 } from 'utils/multicall'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@pancakeswap/sdk'
// import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import { getBurnAddress } from '../../utils/addressHelpers'

const burnLpCall = (chainId: ChainId) => {
  const burnLpAddress = getBurnAddress(chainId)

  return [
    {
      address: burnLpAddress,
      name: 'burnedDEX',
    },
  ]
}

export const fetchBurnLpPublicData = async (chainId: ChainId): Promise<any> => {
  const call = burnLpCall(chainId)

  const callResult = await multicallv2({ abi: BurnABI, calls: call, chainId, options: { requireSuccess: false } })
  return callResult
}
