'use client'

import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

const Logo = () => {
  return (
    <Box 
      width="100%"
      pt={2}  // More padding on top
      pb={4}  // Less padding on bottom
    >
      <Container maxW="container.xl">
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <NextLink href="/" passHref>
            <Box as="span" display="block">
              <Image
                src="/logo.svg"
                alt="Website Logo"
                width={300}
                height={50}
                priority
                style={{ display: 'block' }}
              />
            </Box>
          </NextLink>
        </Box>
      </Container>
    </Box>
  );
};

export default Logo;