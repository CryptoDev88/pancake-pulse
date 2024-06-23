import styled from 'styled-components'
import { Flex, Skeleton, UserMenuItem, Link } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from 'contexts/Localization'

interface ProfileUserMenuItemProps {
  isLoading: boolean
  hasProfile: boolean
  disabled: boolean
}

const Dot = styled.div`
  background-color: ${({ theme }) => theme.colors.failure};
  border-radius: 50%;
  height: 8px;
  width: 8px;
`

const ProfileUserMenuItem: React.FC<React.PropsWithChildren<ProfileUserMenuItemProps>> = ({
  isLoading,
  hasProfile,
  disabled,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <UserMenuItem>
        <Skeleton height="24px" width="35%" />
      </UserMenuItem>
    )
  }

  if (!hasProfile) {
    return (
      <Link href="/create-profile">
        <UserMenuItem as="a" disabled={disabled}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            {t('Make a Profile')}
            <Dot />
          </Flex>
        </UserMenuItem>
      </Link>
    )
  }

  return (
    <Link href={`/profile/${account?.toLowerCase()}/achievements`}>
      <UserMenuItem as="a" disabled={disabled}>
        {t('Your Profile')}
      </UserMenuItem>
    </Link>
  )
}

export default ProfileUserMenuItem
