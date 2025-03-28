'use client'

import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import Events from './Events';
import Announcements from './Announcements';

const EventsAndAnnouncements = () => {
  return (
    <VStack
      w="100%"
      px="10%"
      spacing={16}
      pb={12}
      align="stretch"
    >
      <Events />
      <Announcements />
    </VStack>
  );
};

export default EventsAndAnnouncements;
