import React, { ReactNode, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { useWeb3React } from '@pancakeswap/wagmi'
import { BLOCKED_ADDRESSES } from './config/constants'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import { chains } from './utils/wagmi'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, initializeStore } from './state'
import './index.css'
import App from './App'
import Providers from './Providers'

import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

export function Updaters() {
  return (
    <>
      <ListsUpdater />
      {chains.map((chain) => (
        <TransactionUpdater key={`trxUpdater#${chain.id}`} chainId={chain.id} />
      ))}
      <MulticallUpdater />
    </>
  )
}

export function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Providers store={initializeStore(undefined)}>
      <Blocklist>
        <PersistGate loading={null} persistor={persistor}>
          <Updaters />
          <App />
        </PersistGate>
      </Blocklist>
    </Providers>
  </React.StrictMode>,
)
