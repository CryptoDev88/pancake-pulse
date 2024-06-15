import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
// import { resetUserState } from '../global/actions'
import { fetchBurnLpPublicData } from './fetchBurnLpPublicData'
import { fetchBurnLpDetails } from './fetchBurnLpDetails'
import { getBalanceNumber } from 'utils/formatBalance'

const initialState = {
  data: {
    burnedDEX: '0',
    dexPrice: '0',
    lps: [],
  },
  dataLoaded: false,
}

const getDexPrice = async () => {
  let dexPrice = '0'
  const response = await fetch(
    'https://api.dexscreener.com/latest/dex/pairs/pulsechain/0x635969e2c12ab4938f9b31bf69aca724df1f2c42',
  )
  if (response.ok) {
    const data = await response.json()
    dexPrice = data.pair.priceUsd
  }
  return dexPrice
}

export const fetchBurnLpData = createAsyncThunk('burn/fetchBurnLpData', async (chainId: ChainId) => {
  const burn = await fetchBurnLpPublicData(chainId)
  const lps = await fetchBurnLpDetails(chainId)
  const dexPrice = await getDexPrice()

  return {
    burnedDEX: getBalanceNumber(new BigNumber(burn[0])).toString(),
    dexPrice: dexPrice,
    lps,
  }
})

export const burnLPSlice = createSlice({
  name: 'burnLp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBurnLpData.fulfilled, (state, action) => {
      state.data = { ...action.payload }
      state.dataLoaded = true
    })
  },
})

export default burnLPSlice.reducer
