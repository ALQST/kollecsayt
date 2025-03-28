'use client';

import { Box, Heading, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FeatureProps } from '../../types';

export const Feature = ({ icon, title, text }: FeatureProps) => (
  <Box textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
    <Icon as={icon} w={10} h={10} mb={1} color="brand.500" />
    <Heading as="h3" size="sm" mb={2}>{title}</Heading>
    <Text fontSize="sm">{text}</Text>
  </Box>
);
