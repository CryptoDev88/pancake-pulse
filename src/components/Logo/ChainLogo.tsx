import { HelpIcon } from '@pancakeswap/uikit'
import { isChainSupported } from 'utils/wagmi'
import { memo } from 'react'

export const ChainLogo = memo(({ chainId }: { chainId: number }) => {
  if (isChainSupported(chainId)) {
    return <img src={`/images/chains/${chainId}.png`} width={24} height={24} alt={`chain-${chainId}`} />
  }

  return <HelpIcon width={24} height={24} />
})
