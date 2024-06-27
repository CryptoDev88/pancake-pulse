import { useCallback } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { useMasterchef, useNftContract, useNftSaleContract, useZapContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getNftSaleContract } from 'utils/contractHelpers'

const useApproveFarm = (lpContract: Contract) => {
  const masterChefContract = useMasterchef()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(lpContract, 'approve', [masterChefContract.address, MaxUint256])
  }, [lpContract, masterChefContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export const useApproveZap = (lpContract: Contract) => {
  const zapContract = useZapContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(lpContract, 'approve', [zapContract.address, MaxUint256])
  }, [lpContract, zapContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveFarm
