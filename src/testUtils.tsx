/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import { render as rtlRender } from '@testing-library/react'
import Provider from 'Providers'
import { WagmiConfig } from 'wagmi'
import { initializeStore, makeStore } from 'state'
import React, { createContext, useContext } from 'react'
import { SWRConfig } from 'swr'
import { client } from './utils/wagmi'

// Create a context for the router
const RouterContext = createContext(null)

// Mock router object
const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
}

// // Custom hook to use the router
// export function useRouter() {
//   return useContext(RouterContext)
// }

export function renderWithProvider(
  ui,
  { preloadedState = undefined, store = initializeStore(preloadedState), router = {}, ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <Provider store={store}>{children}</Provider>
      </RouterContext.Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export const createReduxWrapper =
  (initState = undefined) =>
  ({ children }) => <Provider store={makeStore(initState)}>{children}</Provider>

export const createSWRWrapper =
  (fallbackData = undefined) =>
  ({ children }) => (
    <WagmiConfig client={client}>
      <SWRConfig value={{ fallback: fallbackData }}>{children}</SWRConfig>
    </WagmiConfig>
  )

export const createWagmiWrapper =
  () =>
  ({ children }) => <WagmiConfig client={client}>{children}</WagmiConfig>

// re-export everything
export * from '@testing-library/react'
