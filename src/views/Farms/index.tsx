import { FC } from 'react'
import Farms, { FarmsContext } from './Farms'

export const FarmsPageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Farms>{children}</Farms>
}

export { FarmsContext }
