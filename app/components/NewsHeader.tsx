'use client'

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { RssSolid } from '@mynaui/icons-react';

const NewsHeader = () => {
  return (
    <Box w="100%" px="10%">
      <Flex align="center" gap={3} mb={4}>
        <Box
          bg="#143151"
          p={1}
          borderRadius="15px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <RssSolid width={48} height={48} style={{ color: "white" }} />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" color="#111827">
          Xəbərlər
        </Text>
      </Flex>
    </Box>
  );
};

export default NewsHeader;