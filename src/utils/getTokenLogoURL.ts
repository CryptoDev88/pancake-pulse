import { ChainId, Token } from '@pancakeswap/sdk'

const mapping = {
  [ChainId.PULSE_CHAIN]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
}

const getTokenLogoURL = (token?: Token) => {
  if (token && mapping[token.chainId]) {
    return `/images/tokens/${token.address}.png`
    // return `images/${mapping[token.chainId]}/assets/${token.address}/logo.png`
  }
  return null
}

export default getTokenLogoURL
