import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useLocation } from 'react-router-dom'

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const router = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (router.pathname) {
    case '/x-yield':
      activeIndex = 0
      break
    case '/x-yield/history':
      activeIndex = 1
      break
    case '/_mp/x-yield/history':
      activeIndex = 1
      break
    case '/x-yield/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem id="finished-farms-button">
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`
