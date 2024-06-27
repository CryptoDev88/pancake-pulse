import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@pancakeswap/wagmi'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import Hero from './components/Hero'
import DaysRunning from './components/DaysRunning'
import HeroChart from './components/HeroChart'
import HeroDive from './components/HeroDive'
import HeroAbout from './components/HeroAbout'
import HeroQa from './components/HeroQa'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import { isAddress } from 'utils'
import rot13 from 'utils/encode'

const bgTopGradientStyle = {
  background: 'linear-gradient(to bottom, black, transparent)',
}

const bgSideGradientStyle = {
  background: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1))`,
}

const Home: React.FC<React.PropsWithChildren> = () => {
  // const router = useRouter()
  // const { ref } = router.query
  const cookies = new Cookies()
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(isSafariBrowser)
  }, [])

  // if (ref) {
  //   if (isAddress(rot13(ref))) {
  //     cookies.set('ref', ref)
  //   }
  // }
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '1100px' }

  return (
    <>
      <PageMeta />

      {isSafari ? (
        <style>
          {`
            body:after {
              content: '';
              position: fixed;
              top: 0;
              height: 100vh; /* fix for mobile browser address bar appearing disappearing */
              left: 0;
              right: 0;
              z-index: -1;
              background: url('/images/home/lunar-bunny/background.jpg?') center center;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              background-attachment: scroll;
            }
          `}
        </style>
      ) : (
        <style>
          {`
            body {
              background-image: url('/images/home/lunar-bunny/background.jpg?');
              background-size: cover;
              background-repeat: no-repeat;
              background-attachment: fixed;
              background-position: center center;
          `}
        </style>
      )}

      <div style={bgSideGradientStyle}>
        <div style={bgTopGradientStyle}>
          <PageSection
            innerProps={{ style: HomeSectionContainerStyles }}
            containerProps={{
              id: 'home-1',
            }}
            index={2}
            hasCurvedDivider={false}
          >
            <Hero />
          </PageSection>
        </div>

        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          containerProps={{
            id: 'home-2',
          }}
          index={2}
          hasCurvedDivider={false}
          mt="-108px"
          mb="-128px"
        >
          <DaysRunning />
        </PageSection>

        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          containerProps={{
            id: 'home-2',
          }}
          index={2}
          hasCurvedDivider={false}
        >
          <HeroChart />
        </PageSection>
        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          containerProps={{
            id: 'home-5',
          }}
          index={2}
          hasCurvedDivider={false}
        >
          <HeroDive />
        </PageSection>
        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          containerProps={{
            id: 'home-6',
          }}
          index={2}
          hasCurvedDivider={false}
        >
          <HeroAbout />
        </PageSection>
        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          background="linear-gradient(180deg, #fff 0%, #fff 100%)"
          containerProps={{
            id: 'home-7',
          }}
          index={2}
          hasCurvedDivider={false}
        >
          <HeroQa />
        </PageSection>
        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          background="linear-gradient(180deg, #000 0%, #000 100%)"
          containerProps={{
            id: 'home-8',
          }}
          index={2}
          hasCurvedDivider={false}
        >
          <Footer />
        </PageSection>
      </div>
    </>
  )
}

export default Home
