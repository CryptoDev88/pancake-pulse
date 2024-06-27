/* eslint-disable @typescript-eslint/no-unused-vars */

import { useBurnContract, useERC20 } from 'hooks/useContract'
import { useCallback } from 'react'
import { BURN_ADDRESS } from 'config/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from 'contexts/Localization'

const useBurn = (token0s: string[], token1s: string[]) => {
  const { t } = useTranslation()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const burnContract = useBurnContract()
  const handleBurn = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return burnContract.convertLps(token0s, token1s)
    })
    if (receipt?.status) {
      toastSuccess(
        t('You have burned DEX tokens'),
        // <ToastDescriptionWithTx txHash={receipt.transactionHash}>{successMsg}</ToastDescriptionWithTx>,
      )
    }
  }, [callWithGasPrice, fetchWithCatchTxError, t, toastSuccess, burnContract])
  return { onBurn: handleBurn }
}

export default useBurn
