'use client'

import { Box, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="white"
    >
      <VStack spacing={6}>
        <Link href="/">
          <Text
            fontSize="8xl"
            cursor="pointer"
            _hover={{ transform: 'scale(1.1)' }}
            transition="transform 0.2s"
          >
            😢
          </Text>
        </Link>
        <Text
          fontSize="xl"
          color="#111827"
          fontWeight="medium"
        >
          Səhifə tapılmadı
        </Text>
      </VStack>
    </Box>
  )
}
