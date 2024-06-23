import { useLocation } from 'react-router-dom'
import SubgraphHealthIndicator from '../SubgraphHealthIndicator'

export const FixedSubgraphHealthIndicator = () => {
  const { pathname } = useLocation()
  const isOnNftPages = pathname.includes('nfts')
  return isOnNftPages ? <SubgraphHealthIndicator subgraphName="pancakeswap/nft-market" /> : null
}
