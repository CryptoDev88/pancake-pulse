/// <reference types="react-scripts" />

type SerializedBigNumber = string

declare let __NEZHA_BRIDGE__: any

interface Window {
    ethereum?: {
      isMetaMask?: true
      isTrust?: true
      isCoinbaseWallet?: true
      isTokenPocket?: true
      isBraveWallet?: true
      isOpera?: true
      request?: (...args: any[]) => Promise<void>
    }
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
    }
  }
  
  type SerializedBigNumber = string
  