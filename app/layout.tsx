'use client';

import { Box, Container } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import LoadingBar from './components/LoadingBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ChakraProvider theme={theme}>
          <LoadingBar />
          <Box minH="100vh" display="flex" flexDirection="column">
            <Container as="main" maxW="container.xl" flex="1" py={8}>
              {children}
            </Container>
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
}