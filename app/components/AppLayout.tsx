'use client'

import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from './Navigation';
import Footer from './NewFooter';
import Logo from './Logo';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Logo />
      <Navigation />
      {children}
      <Footer />
    </Box>
  );
};

export default AppLayout;
