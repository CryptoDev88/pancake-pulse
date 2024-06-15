import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { provider } from 'utils/wagmi'
import { Contract } from '@ethersproject/contracts'
import poolsConfig from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import { DEX } from '@pancakeswap/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getTradingCompetitionAddressEaster,
  getEasterNftAddress,
  getCakeVaultAddress,
  getMulticallAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressMoD,
  getBunnySpecialXmasAddress,
  getPotteryDrawAddress,
  getZapAddress,
  getCakeFlexibleSideVaultAddress,
  getPredictionsV1Address,
  getPresaleAddress,
  getLendXAddress,
  getBurnAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import presale from 'config/abi/presale.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import tradingCompetitionEasterAbi from 'config/abi/tradingCompetitionEaster.json'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import cakeFlexibleSideVaultV2Abi from 'config/abi/cakeFlexibleSideVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import predictionsV1Abi from 'config/abi/predictionsV1.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import potteryVaultAbi from 'config/abi/potteryVaultAbi.json'
import potteryDrawAbi from 'config/abi/potteryDrawAbi.json'
import zapAbi from 'config/abi/zap.json'
import cakePredictionsAbi from 'config/abi/cakePredictions.json'
import lendX from 'config/abi/lendX.json'
import burn from 'config/abi/burn.json'
// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  Erc20,
  Erc721,
  Cake,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  Presale,
  SousChef,
  SousChefV2,
  LpToken,
  TradingCompetitionEaster,
  EasterNft,
  Multicall,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  CakeVaultV2,
  CakeFlexibleSideVaultV2,
  TradingCompetitionMoD,
  PotteryVaultAbi,
  PotteryDrawAbi,
  Zap,
  PredictionsV1,
  Burn,
} from 'config/abi/types'
import { ChainId } from '@pancakeswap/sdk'

export const getContract = ({
  abi,
  address,
  chainId = ChainId.PULSE_CHAIN,
  signer,
}: {
  abi: any
  address: string
  chainId?: ChainId
  signer?: Signer | Provider
}) => {
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: bep20Abi, address, signer }) as Erc20
}
export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: erc721Abi, address, signer }) as Erc721
}
export const getLpContract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: lpTokenAbi, address, signer, chainId }) as LpToken
}
export const getSouschefContract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract({ abi, address: getAddress(config.contractAddress), signer }) as SousChef
}
export const getSouschefV2Contract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract({ abi: sousChefV2, address: getAddress(config.contractAddress), signer }) as SousChefV2
}

export const getCakeContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: cakeAbi,
    address: chainId ? DEX[chainId].address : DEX[ChainId.PULSE_CHAIN].address,
    signer,
  }) as Cake
}
export const getProfileContract = (signer?: Signer | Provider) => {
  return getContract({ abi: profileABI, address: getPancakeProfileAddress(), signer }) as PancakeProfile
}
export const getLotteryV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: lotteryV2Abi, address: getLotteryV2Address(), signer }) as LotteryV2
}
export const getMasterchefContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: masterChef, address: getMasterChefAddress(chainId), signer }) as Masterchef
}
export const getPresaleContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: presale, address: getPresaleAddress(chainId), signer }) as Presale
}
export const getBurnContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: burn, address: getBurnAddress(chainId), signer }) as Burn
}
export const getLendXContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: lendX, address: getLendXAddress(chainId), signer }) as Presale
}
export const getTradingCompetitionContractEaster = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionEasterAbi,
    address: getTradingCompetitionAddressEaster(),
    signer,
  }) as TradingCompetitionEaster
}

export const getTradingCompetitionContractMoD = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionMoDAbi,
    address: getTradingCompetitionAddressMoD(),
    signer,
  }) as TradingCompetitionMoD
}

export const getEasterNftContract = (signer?: Signer | Provider) => {
  return getContract({ abi: easterNftAbi, address: getEasterNftAddress(), signer }) as EasterNft
}
export const getCakeVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: cakeVaultV2Abi, address: getCakeVaultAddress(), signer }) as CakeVaultV2
}

export const getCakeFlexibleSideVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({
    abi: cakeFlexibleSideVaultV2Abi,
    address: getCakeFlexibleSideVaultAddress(),
    signer,
  }) as CakeFlexibleSideVaultV2
}

export const getPredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: predictionsAbi, address, signer }) as Predictions
}

export const getPredictionsV1Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: predictionsV1Abi, address: getPredictionsV1Address(), signer }) as PredictionsV1
}

export const getCakePredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: cakePredictionsAbi, address, signer }) as Predictions
}

export const getChainlinkOracleContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: chainlinkOracleAbi, address, signer }) as ChainlinkOracle
}
export const getMulticallContract = (chainId: ChainId) => {
  return getContract({ abi: MultiCallAbi, address: getMulticallAddress(chainId), chainId }) as Multicall
}
export const getBunnySpecialXmasContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bunnySpecialXmasAbi, address: getBunnySpecialXmasAddress(), signer })
}
export const getFarmAuctionContract = (signer?: Signer | Provider) => {
  return getContract({ abi: farmAuctionAbi, address: getFarmAuctionAddress(), signer }) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: anniversaryAchievementAbi,
    address: getAnniversaryAchievement(),
    signer,
  }) as AnniversaryAchievement
}

export const getNftMarketContract = (signer?: Signer | Provider) => {
  return getContract({ abi: nftMarketAbi, address: getNftMarketAddress(), signer }) as NftMarket
}
export const getNftSaleContract = (signer?: Signer | Provider) => {
  return getContract({ abi: nftSaleAbi, address: getNftSaleAddress(), signer }) as NftSale
}
export const getPancakeSquadContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pancakeSquadAbi, address: getPancakeSquadAddress(), signer }) as PancakeSquad
}
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  return getContract({ abi: erc721CollectionAbi, address, signer }) as Erc721collection
}

export const getPotteryVaultContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: potteryVaultAbi, address, signer }) as PotteryVaultAbi
}

export const getPotteryDrawContract = (signer?: Signer | Provider) => {
  return getContract({ abi: potteryDrawAbi, address: getPotteryDrawAddress(), signer }) as PotteryDrawAbi
}

export const getZapContract = (signer?: Signer | Provider) => {
  return getContract({ abi: zapAbi, address: getZapAddress(), signer }) as Zap
}
