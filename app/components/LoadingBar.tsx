'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

function LoadingBarComponent() {
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const barColor = useColorModeValue('#1E497A', '#1E497A')

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAnimating(true)
      setProgress(0)
    }

    const handleRouteChangeComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }

    // Listen to Next.js route changes
    window.addEventListener('routeChangeStart', handleRouteChangeStart)
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart)
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      height="4px"
      overflow="hidden"
      zIndex={9999}
      pointerEvents="none"
    >
      <Box
        height="100%"
        width={`${progress}%`}
        bg={barColor}
        transition="width 0.3s ease-in-out"
        opacity={isAnimating ? 1 : 0}
        transitionDuration="0.3s"
      />
    </Box>
  )
}

// Dynamically import the component with SSR disabled
const LoadingBar = dynamic(() => Promise.resolve(LoadingBarComponent), {
  ssr: false
})

export default LoadingBar
