import { useWeb3React } from '@pancakeswap/wagmi'
import { useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { isChainSupported } from 'utils/wagmi'
import { useProvider } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { useActiveChainId } from './useActiveChainId'
import { useSwitchNetworkLoading } from './useSwitchNetworkLoading'

function useNetworkConnectorUpdater() {
  const { chainId } = useActiveWeb3React();
  const [loading] = useSwitchNetworkLoading();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (loading) return;

    const parsedQueryChainId = Number(new URLSearchParams(location.search).get('chainId'));

    if (!parsedQueryChainId && chainId === ChainId.PULSE_CHAIN) return;
    
    if (parsedQueryChainId !== chainId && isChainSupported(chainId)) {
      const uriHash = location.hash;
      const newQuery = new URLSearchParams(location.search);
      newQuery.set('chainId', chainId.toString());

      const newSearch = newQuery.toString();

      history.replace({
        search: newSearch,
        hash: uriHash || undefined
      });
    }
  }, [chainId, loading, location, history]);
}

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { account } = useWeb3React()
  const web3React = useWeb3React()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const provider = useProvider({ chainId })

  return {
    provider,
    ...web3React,
    chainId,
    account,
    isWrongNetwork,
  }
}

export default useActiveWeb3React
