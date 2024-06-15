import useSWRImmutable from 'swr/immutable'
import { getPotteryVaultContract } from 'utils/contractHelpers'

export const usePotteryStatus = () => {
  const { data: potteryStatus } = useSWRImmutable('potteryLastStatus', async () => {
    const lastVaultAddress = ''
    const potteryVaultContract = getPotteryVaultContract(lastVaultAddress)
    return potteryVaultContract.getStatus()
  })

  return potteryStatus
}
