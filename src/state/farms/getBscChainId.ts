import NoBscVaultAbi from 'config/abi/NoBscVaultAbi.json'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { ChainId } from '@pancakeswap/sdk'

// will return BSC or BSC Testnet chainId
export const getBscChainId = async (chainId: number) => {
  try {
    if (!chainId) {
      return ChainId.PULSE_CHAIN
    }

    const calls = [
      {
        name: 'BSC_CHAIN_ID',
        address: getMasterChefAddress(chainId),
      },
    ]
    const [[bscChainId]] = await multicallv2({ abi: NoBscVaultAbi, calls, chainId })
    return bscChainId
  } catch (error) {
    console.error('Get PULSE Chain Id Error: ', error)
    return ChainId.PULSE_CHAIN
  }
}
