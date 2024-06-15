import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useWallet } from 'hooks/useWallet'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import styled from 'styled-components'
import Trans from './Trans'

const StyledInput = styled(Button)`
  padding: 24px;
  border-radius: 24px;
`

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }

  return (
    <StyledInput onClick={handleClick} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </StyledInput>
  )
}

export default ConnectWalletButton
