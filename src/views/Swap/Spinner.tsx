import { useEffect, useState } from 'react'

interface SpinnerProps {
  size?: number
  pulseLogo?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ size = 205, pulseLogo = false }) => {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(isSafariBrowser)
  }, [])

  return (
    <>
      {/* {isSafari ? (
        <Image src="/images/home/lunar-bunny/logo.gif?v=2" width={size} height={size} />
      ) : (
        <video autoPlay loop muted playsInline width={size} height={size}>
          <source src="/images/home/lunar-bunny/logo.webm?v=2" type="video/webm" />
          <Image src="/images/home/lunar-bunny/logo.gif?v=2" width={size} height={size} />
        </video>
      )}
      {pulseLogo && ( */}
      <div>
        <img src="/images/logoWithText.jpg" width={size} height={size} />
      </div>
      {/* )} */}
    </>
  )
}

export default Spinner
