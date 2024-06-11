import { pulseChainTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */

  {
    pid: 0,
    lpSymbol: 'DEX-WPLS LP',
    lpAddress: '0xc8DF4Af0c613C8820bE2E84e082C6d62Afbd4226',
    token: pulseChainTokens.xfn,
    quoteToken: pulseChainTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'DEX-DAI LP',
    lpAddress: '0x11A419e5F32633d607486797765c15bD932613DE',
    token: pulseChainTokens.xfn, // coins[0]
    quoteToken: pulseChainTokens.dai, // coins[1]
  },
  {
    pid: 2,
    lpSymbol: 'DEX-HEX LP',
    lpAddress: '0xe6FE14D27eD590eB4d8a4B2623F00838524048ea',
    token: pulseChainTokens.xfn, // coins[0]
    quoteToken: pulseChainTokens.hex, // coins[1]
  },
  {
    pid: 3,
    lpSymbol: 'DAI-WPLS LP',
    lpAddress: '0xE56043671df55dE5CDf8459710433C10324DE0aE',
    token: pulseChainTokens.dai, // coins[0]
    quoteToken: pulseChainTokens.wbnb, // coins[1]
  },
  {
    pid: 4,
    lpSymbol: 'USDC-WPLS LP',
    lpAddress: '0x6753560538ECa67617A9Ce605178F788bE7E524E',
    token: pulseChainTokens.usdc, // coins[0]
    quoteToken: pulseChainTokens.wbnb, // coins[1]
  },
  {
    pid: 5,
    lpSymbol: 'PLSX-WPLS LP',
    lpAddress: '0x1b45b9148791d3a104184Cd5DFE5CE57193a3ee9',
    token: pulseChainTokens.plsx, // coins[0]
    quoteToken: pulseChainTokens.wbnb, // coins[1]
  },
  {
    pid: 6,
    lpSymbol: 'HEX-WPLS LP',
    lpAddress: '0xf1F4ee610b2bAbB05C635F726eF8B0C568c8dc65',
    token: pulseChainTokens.hex, // coins[0]
    quoteToken: pulseChainTokens.wbnb, // coins[1]
  },
  {
    pid: 7,
    lpSymbol: 'TED-WPLS LP',
    lpAddress: '0xb10a60Aa2Aa458E94f5adEA7b3B183A5b4508f80',
    token: pulseChainTokens.ted, // coins[0]
    quoteToken: pulseChainTokens.wbnb, // coins[1]
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
