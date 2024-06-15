import React from 'react'
import { ModalProvider, light, dark, UIKitProvider } from '@pancakeswap/uikit'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { LanguageProvider } from 'contexts/Localization'
import { ToastsProvider } from 'contexts/ToastsContext'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { WagmiProvider } from '@pancakeswap/wagmi'
import { client } from 'utils/wagmi'
// import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <UIKitProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({
  children,
  store,
}) => {
  return (
    <WagmiProvider client={client}>
      <Provider store={store}>
        <ToastsProvider>
          <NextThemeProvider>
            <StyledUIKitProvider>
              <LanguageProvider>
                <SWRConfig
                  value={{
                    use: [fetchStatusMiddleware],
                  }}
                >
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </SWRConfig>
              </LanguageProvider>
            </StyledUIKitProvider>
          </NextThemeProvider>
        </ToastsProvider>
      </Provider>
    </WagmiProvider>
  )
}

export default Providers
