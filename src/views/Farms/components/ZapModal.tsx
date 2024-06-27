/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { Button, Modal, AutoRenewIcon, Heading, Text, Box } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import Select from 'components/Select/Select'
import { FetchStatus } from 'config/constants/types'
import { useERC20, useZapContract } from 'hooks/useContract'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import { formatEther, parseEther, parseUnits } from '@ethersproject/units'
import { ChainId, Token } from '@pancakeswap/sdk'
import useTokenAllowance from 'hooks/useTokenAllowance'
import { useApproveCallback } from 'hooks/useApproveCallback'
import multicall from 'utils/multicall'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getZapAddress } from 'utils/addressHelpers'
import erc20ABI from 'config/abi/erc20.json'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import useToast from 'hooks/useToast'
import useZapInToken from '../hooks/useZapInToken'
import styled from 'styled-components'
import { ZapModalInput } from 'components/Modal/ModalInput'
import { useApproveZap } from 'views/Farms/hooks/useApproveFarm2'

const RoiInputContainer = styled(Box)`
  position: relative;
  & > input {
    padding-left: 28px;
    max-width: 70%;
  }
  &:before {
    position: absolute;
    content: '$';
    color: ${({ theme }) => theme.colors.textSubtle};
    left: 16px;
    top: 8px;
  }
`

interface ZapModalProps {
  token0Decimals?: number
  token1Decimals?: number
  token0Name?: string
  token1Name?: string
  token0Address?: string
  token1Address?: string
  lpAddress?: string
  lpTokenName?: string
  addLiquidityUrl: string
  pid: number
  onDismiss?: () => void
}

const ZapModal: React.FC<ZapModalProps> = ({
  token0Decimals = 18,
  token1Decimals = 18,
  token0Name = '',
  token1Name = '',
  token0Address = '0xA1077a294dDE1B09bB078844df40758a5D0f9a27',
  token1Address = '0xefD766cCb38EaF1dfd701853BFCe31359239F305',
  lpAddress = '0xefD766cCb38EaF1dfd701853BFCe31359239F305',
  lpTokenName = 'DEX-WPLS',
  addLiquidityUrl,
  pid,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { account, chainId } = useActiveWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const zapContract = useZapContract(true)
  const { onZap } = useZapInToken()
  const { balance: token0Balance, fetchStatus: token0BalanceStatus } = useTokenBalance(token0Address)
  const { balance: token1Balance, fetchStatus: token1BalanceStatus } = useTokenBalance(token1Address)
  const { fetchWithCatchTxError, loading: _pendingTx } = useCatchTxError()
  const [allowances, setAllowances] = useState(['0', '0'])
  const [val, setVal] = useState('')
  const lpTokensToStake = new BigNumber(val)
  const [zappingToken, setZappingToken] = useState(token0Name)
  const [estimate, setEstimate] = useState({ token0: '0', token1: '0' })
  const [zappingTokenBalance, setZappingTokenBalance] = useState(token0Balance)
  const [zappingTokenDecimals, setZappingTokenDecimals] = useState(18)

  // eslint-disable-next-line consistent-return
  const getTokenAddress = (_tokenName) => {
    if (_tokenName === token0Name) {
      if (token0Name === 'DAI') {
        return token1Address
      }

      return token0Address
    }
  }
  const getAllowance = useCallback(async () => {
    const calls = [token0Address, token1Address].map((address) => {
      const lpContractAddress = address
      return { address: lpContractAddress, name: 'allowance', params: [account, getZapAddress()] }
    })
    const rawLpAllowances = await multicall<BigNumber[]>(erc20ABI, calls, chainId)
    const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
      return new BigNumber(lpBalance).toJSON()
    })

    setAllowances(parsedLpAllowances)
    return parsedLpAllowances
  }, [account, chainId, token0Address, token1Address])
  useEffect(() => {
    setZappingTokenBalance(token0Balance)
    setZappingTokenDecimals(token0Decimals)
    setZappingToken(token0Name)
    getAllowance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token0BalanceStatus])

  function isNumeric(n: any) {
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  const handleChangeAsset = async (event: any) => {
    const { value } = event
    const _tokenBalance = value === token0Name ? token0Balance : token1Balance
    const _tokenDecimals = value === token0Name ? token0Decimals : token1Decimals
    setZappingToken(value)
    setZappingTokenBalance(_tokenBalance)
    setZappingTokenDecimals(_tokenDecimals)

    const estimateZap = await zapContract?.estimateZapInToken(
      value === token0Name ? token0Address : token1Address,
      lpAddress,
      ROUTER_ADDRESS[ChainId.PULSE_CHAIN],
      parseUnits(val, _tokenDecimals),
    )
    if (pid === 3 || pid === 7) {
      setEstimate({ token0: estimateZap[1].toString(), token1: estimateZap[0].toString() })
    } else setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() })
  }

  const handleChange = async (e: any) => {
    if (e.target.value === '' || e.target.value === '0' || e.target.value === 0) {
      setVal(e.target.value)
      setEstimate({ token0: '0', token1: '0' })
      return
    }
    if (!isNumeric(e.target.value)) return
    setVal(e.target.value)
    const estimateZap = await zapContract?.estimateZapInToken(
      zappingToken === token0Name ? token0Address : token1Address,
      lpAddress,
      ROUTER_ADDRESS[ChainId.PULSE_CHAIN],
      parseUnits(e.target.value, zappingTokenDecimals),
    )
    if (pid === 3 || pid === 7) {
      setEstimate({ token0: estimateZap[1].toString(), token1: estimateZap[0].toString() })
    } else setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() })
  }

  const handleSelectMax = async () => {
    setVal(String(getFullDisplayBalance(zappingTokenBalance, zappingTokenDecimals)))
    const estimateZap = await zapContract?.estimateZapInToken(
      zappingToken === token0Name ? token0Address : token1Address,
      lpAddress,
      ROUTER_ADDRESS[ChainId.PULSE_CHAIN],
      parseUnits(
        String(getFullDisplayBalance(zappingTokenBalance, zappingTokenDecimals, 3)),
        zappingToken === token0Name ? token0Decimals : token1Decimals,
      ),
    )

    if (pid === 3 || pid === 7) {
      setEstimate({ token0: estimateZap[1].toString(), token1: estimateZap[0].toString() })
    } else setEstimate({ token0: estimateZap[0].toString(), token1: estimateZap[1].toString() })
  }

  const handleZap = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onZap(
        zappingToken === token0Name ? token0Address : token1Address,
        parseUnits(val, zappingTokenDecimals).toString(),
        lpAddress,
        ROUTER_ADDRESS[ChainId.PULSE_CHAIN],
        account,
      )
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Staked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the farm')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const token0Contract = useERC20(token0Address)
  const token1Contract = useERC20(token1Address)
  const { onApprove } = useApproveZap(zappingToken === token0Name ? token0Contract : token1Contract)

  const handleApprove = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove()
    })
    if (receipt?.status) {
      getAllowance()
      toastSuccess(t('Token Enabled to Zap contract'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    }
  }, [fetchWithCatchTxError, onApprove, getAllowance, toastSuccess, t])

  return (
    <Modal title={`Zap in ${lpTokenName}`} onDismiss={onDismiss}>
      <Select
        style={{ marginBottom: '10px' }}
        options={[
          {
            label: token0Name,
            value: token0Name,
          },
          {
            label: token1Name,
            value: token1Name,
          },
        ]}
        onOptionChange={handleChangeAsset}
      />
      <RoiInputContainer>
        <ZapModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={
            token0BalanceStatus === FetchStatus.Fetched
              ? String(getFullDisplayBalance(zappingTokenBalance, zappingTokenDecimals, 3))
              : '0'
          }
          symbol={zappingToken}
          addLiquidityUrl={addLiquidityUrl}
          inputTitle={t('Zap in')}
          decimals={zappingTokenDecimals}
        />
      </RoiInputContainer>

      <Heading mt="24px" scale="sm">
        Zap Estimate:
      </Heading>
      <Text color="textSubtle">
        {`(${getFullDisplayBalance(
          new BigNumber(estimate.token0),
          token0Decimals,
          3,
        )} ${token0Name} / ${getFullDisplayBalance(
          new BigNumber(estimate.token1),
          token1Decimals,
          3,
        )} ${token1Name})`}{' '}
      </Text>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        {(zappingToken === token0Name && Number(allowances[0]) === 0) ||
        (zappingToken === token1Name && Number(allowances[1]) === 0) ? (
          pendingTx ? (
            <Button width="100%" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
              {t('Approving')}
            </Button>
          ) : (
            <Button
              width="100%"
              onClick={async () => {
                setPendingTx(true)
                await handleApprove()
                setPendingTx(false)
              }}
            >
              {t('Approve')}
            </Button>
          )
        ) : pendingTx ? (
          <Button width="100%" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
            {t('Confirming')}
          </Button>
        ) : (
          <Button
            width="100%"
            disabled={
              !lpTokensToStake.isFinite() ||
              lpTokensToStake.eq(0) ||
              lpTokensToStake.gt(new BigNumber(String(getFullDisplayBalance(zappingTokenBalance, 9))))
            }
            onClick={async () => {
              setPendingTx(true)
              await handleZap()
              onDismiss?.()
              setPendingTx(false)
            }}
          >
            {t('Confirm')}
          </Button>
        )}
      </ModalActions>
    </Modal>
  )
}

export default ZapModal
