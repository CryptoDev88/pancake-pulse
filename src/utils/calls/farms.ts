import { Contract } from '@ethersproject/contracts'
import BigNumber from 'bignumber.js'
import { BOOSTED_FARM_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract: Contract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.deposit(pid, value)
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.emergencyWithdraw(pid)
}

export const harvestFarm = async (masterChefContract, pid) => {
  return masterChefContract.deposit(pid, '0')
}

export const buy = async (presaleContract, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  return presaleContract.donate({ value })
}

export const claim = async (presaleContract) => {
  return presaleContract.claimTokens()
}

export const lendX = async (lendXContract, pid) => {
  return lendXContract.deposit(pid)
}

export const zapTokenIn = async (zapContract, from, amount, to, routerAddr, recipient) => {
  return zapContract.zapInToken(from, new BigNumber(amount).toString(), to, routerAddr, recipient)
}
