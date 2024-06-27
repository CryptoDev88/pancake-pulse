import { Currency } from '@pancakeswap/sdk'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useCallback } from 'react'
import currencyId from 'utils/currencyId'
import { useLocation } from 'react-router-dom'

export const useCurrencySelectRoute = () => {
  const router = useLocation()
  const native = useNativeCurrency()
  const [currencyIdA, currencyIdB] = ['', '']

  const handleCurrencyASelect = useCallback(
    (currencyA_: Currency) => {
      const newCurrencyIdA = currencyId(currencyA_)
      if (newCurrencyIdA === currencyIdB) {
        router.pathname.replace(`/add/${currencyIdB}/${currencyIdA}`, undefined)
      } else if (currencyIdB) {
        router.pathname.replace(`/add/${newCurrencyIdA}/${currencyIdB}`, undefined)
      } else {
        router.pathname.replace(`/add/${newCurrencyIdA}`, undefined)
      }
    },
    [currencyIdB, history, currencyIdA],
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB_: Currency) => {
      const newCurrencyIdB = currencyId(currencyB_)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          router.pathname.replace(`/add/${currencyIdB}/${newCurrencyIdB}`, undefined)
        } else {
          router.pathname.replace(`/add/${newCurrencyIdB}`, undefined)
        }
      } else {
        router.pathname.replace(`/add/${currencyIdA || native.symbol}/${newCurrencyIdB}`, undefined)
      }
    },
    [currencyIdA, history, currencyIdB, native],
  )

  return {
    handleCurrencyASelect,
    handleCurrencyBSelect,
  }
}
