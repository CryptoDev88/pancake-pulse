import { ChainId } from '@pancakeswap/sdk'

export const verifyBscNetwork = (chainId: number) => {
  return chainId === ChainId.PULSE_CHAIN || chainId === ChainId.BSC_TESTNET
}
