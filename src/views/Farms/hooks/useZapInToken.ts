import { useCallback } from 'react'
import { zapTokenIn } from 'utils/calls'
import { useZapContract } from 'hooks/useContract'

const useZapInToken = () => {
  const zapContract = useZapContract()

  const handleZap = useCallback(
    async (from: string, amount: string, to: string, routerAddr: string, recipient: string) => {
      return zapTokenIn(zapContract, from, amount, to, routerAddr, recipient)
    },
    [zapContract],
  )

  return { onZap: handleZap }
}

export default useZapInToken
