import { Box, ButtonMenu, ButtonMenuItem, Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import Search from 'views/Info/components/InfoSearch'
import { Link, useLocation } from 'react-router-dom'

const NavWrapper = styled(Flex)`
  background: ${({ theme }) => theme.colors.gradientCardHeader};
  justify-content: space-between;
  padding: 20px 16px;
  flex-direction: column;
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 40px;
    flex-direction: row;
  }
`

const InfoNav = () => {
  const { t } = useTranslation()
  const router = useLocation()

  const isPools = router.pathname === '/info/pools'
  const isTokens = router.pathname === '/info/tokens'
  let activeIndex = 0
  if (isPools) {
    activeIndex = 1
  }
  if (isTokens) {
    activeIndex = 2
  }
  return (
    <NavWrapper>
      <Box>
        <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
          <ButtonMenuItem>
            {t('Overview')}
          </ButtonMenuItem>
          <ButtonMenuItem>
            {t('Pools')}
          </ButtonMenuItem>
          <ButtonMenuItem>
            {t('Tokens')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Box>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>
    </NavWrapper>
  )
}

export default InfoNav
