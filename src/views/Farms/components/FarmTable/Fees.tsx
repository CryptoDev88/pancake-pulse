import styled from 'styled-components'
import { Skeleton } from '@pancakeswap/uikit'
import { getNumberForMobile } from '../FarmCard/HarvestAction'

export interface FeesProps {
  fees: number
}

const Amount = styled.span<{ fees: number }>`
  color: ${({ fees, theme }) => (fees ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

const Fees: React.FunctionComponent<FeesProps> = ({ fees }) => {
  return <Amount fees={fees}>{fees / 100}%</Amount>
}

export default Fees
