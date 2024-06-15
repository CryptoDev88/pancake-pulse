import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import { resetUserState } from '../global/actions'
import { fetchLendXPublicData } from './fetctLendXPublicData'
import { fetchLendXUser } from './fetchLendXUser'

const initialState = {
  data: {
    minXfnAmount: '0',
    totalInvestors: '0',
    totalRaised: '0',
  },
  userData: {
    isAllowance: '0',
    isAvailable: false,
    totalInvested: '0',
    totalClaimed: '0',
  },
  userDataLoaded: false,
}

export const fetchLendXData = createAsyncThunk('farms/fetchLendXData', async (chainId: ChainId) => {
  const farms = await fetchLendXPublicData(chainId)
  return {
    minXfnAmount: new BigNumber(farms[0]).toJSON(),
    totalInvestors: new BigNumber(farms[1]).toJSON(),
    totalRaised: new BigNumber(farms[2]).toJSON(),
  }
})

export const fetchLendXUserDataAsync = createAsyncThunk<any, { account: string }>(
  'farms/fetchLendXUserDataAsync',
  async ({ account }) => {
    const userInfo = await fetchLendXUser(account)
    return {
      isAvailable: userInfo[0][0],
      totalInvested: new BigNumber(userInfo[1].totalInvested._hex).toJSON(),
      totalClaimed: new BigNumber(userInfo[1].totalClaimed._hex).toJSON(),
      isAllowance: new BigNumber(userInfo[2]).toJSON(),
    }
  },
)

export const lendXSlice = createSlice({
  name: 'LendX',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      state.userData = {
        isAllowance: '0',
        isAvailable: false,
        totalInvested: '0',
        totalClaimed: '0',
      }
      state.userDataLoaded = false
    })
    builder.addCase(fetchLendXData.fulfilled, (state, action) => {
      state.data = { ...action.payload }
    })
    builder.addCase(fetchLendXUserDataAsync.fulfilled, (state, action) => {
      state.userData = { ...action.payload }
      state.userDataLoaded = true
    })
  },
})

export default lendXSlice.reducer
