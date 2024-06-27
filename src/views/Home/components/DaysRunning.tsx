import { Heading } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Display7 } from '../../../components/Display7'
import { useWeb3React } from '@pancakeswap/wagmi'

const textBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  borderRadius: '10px',
  border: '4px solid lightgray',
  padding: '10px',
  marginBottom: '25px',
  width: 'min(100%, 620px)',
}

const DaysRunning = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  const [daysRunning, setDaysRunning] = useState(0)
  const [dateNow, setDateNow] = useState('')

  function getNumberOfDays() {
    const start_time = moment('2023-11-09') // Start date
    const end_time = moment() // Current time
    return Math.abs(start_time.diff(end_time, 'days')) // Calculate the difference in days between two dates
  }

  useEffect(() => {
    function updateDaysRunning() {
      const days = getNumberOfDays()
      setDateNow(moment().format('YYYY-MM-DD'))
      setDaysRunning(days)
    }
    const interval = setInterval(updateDaysRunning, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '340px' }}>
          <div style={textBox}>
            <Display7
              value={daysRunning.toString()}
              count={String(daysRunning).length}
              color="orange"
              height={115}
              skew={false}
            />
            <Heading scale="lg" color="orange" mt="8px" textAlign="center">
              {t('DAYS RUNNING')}
            </Heading>
          </div>
        </div>
      </div>
    </>
  )
}

export default DaysRunning
