import LendXABI from 'config/abi/lendX.json'
// import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getLendXAddress } from 'utils/addressHelpers'
// import { bscTokens } from 'config/constants/tokens'
import { pulseChainTokens } from '@pancakeswap/tokens'
// import { MaxUint256 } from '@ethersproject/constants'

export const fetchLendXUser = async (account: string) => {
  const lendXAddress = getLendXAddress()

  const calls = [
    {
      address: lendXAddress,
      name: 'isAvailableToDeposit',
      params: [account],
    },
    {
      address: lendXAddress,
      name: 'users',
      params: [account],
    },
    {
      address: pulseChainTokens.dai.address,
      name: 'allowance',
      params: [account, lendXAddress],
    },
  ]

  const callResult = await multicall(LendXABI, calls)
  return callResult
}
