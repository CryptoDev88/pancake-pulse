import { setUser } from '@sentry/react'
import { useEffect } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'

function useSentryUser() {
  const { account } = useWeb3React()
  useEffect(() => {
    if (account) {
      setUser({ account })
    }
  }, [account])
}

export default useSentryUser
