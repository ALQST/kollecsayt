'use client'

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { QuestionSolid } from '@mynaui/icons-react';

const InfoCardsHeader = () => {
  return (
    <Box w="100%" px="10%" mt={12}>
      <Flex align="center" gap={3} mb={4}>
        <Box
          bg="#143151"
          p={3.5}
          borderRadius="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="60px"
          h="60px"
        >
          <QuestionSolid width={32} height={32} style={{ color: "white" }} />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="#111827">
          Niyə Bakı Dövlət Sosial-İqtisadi kollec?
        </Text>
      </Flex>
    </Box>
  );
};

export default InfoCardsHeader;
