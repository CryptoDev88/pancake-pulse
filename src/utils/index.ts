import type { Signer } from '@ethersproject/abstract-signer'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import type { Provider } from '@ethersproject/providers'
import { ChainId, Currency } from '@pancakeswap/sdk'
import { bsc } from '@pancakeswap/wagmi/chains'
import memoize from 'lodash/memoize'
import { TokenAddressMap } from '@pancakeswap/tokens'
import { chains } from './wagmi'

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})

export const BASE_BSC_SCAN_URLS = {
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [ChainId.PULSE_CHAIN]: 'https://scan.pulsechain.com',
}

export function getBlockExploreLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || ChainId.PULSE_CHAIN
  switch (type) {
    case 'transaction': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`
    }
    case 'token': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`
    }
    case 'block': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`
    }
    case 'countdown': {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`
    }
  }
}

export function getBlockExploreName(chainIdOverride?: number) {
  const chainId = chainIdOverride || ChainId.PULSE_CHAIN
  const chain = chains.find((c) => c.id === chainId)

  return chain?.blockExplorers?.default.name || bsc.blockExplorers.default.name
}

export function getBscScanLinkForNft(collectionAddress: string, tokenId: string): string {
  return `${bsc.blockExplorers.default.url}/token/${collectionAddress}?a=${tokenId}`
}

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000))
}

// account is optional
export function getContract(address: string, ABI: any, signer?: Signer | Provider): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency?.isNative) return true
  return Boolean(currency?.isToken && defaultTokens[currency.chainId]?.[currency.address])
}
