'use client';

import { Box, VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface DepartmentSidebarProps {
  currentPath: string;
}

const departments = [
  { title: 'Bank işi', href: '/sobeler/bankisi' },
  { title: 'İdarəetmə', href: '/sobeler/idareetme' },
  { title: 'Mühasibat uçotu', href: '/sobeler/muhasibatucotu' },
  { title: 'Qiyabi şöbə', href: '/sobeler/qiyabisobe' },
];

export default function DepartmentSidebar({ currentPath }: DepartmentSidebarProps) {
  return (
    <Box w={{ base: 'full', md: '300px' }} flexShrink={0}>
      <VStack 
        spacing={2} 
        align="stretch"
        bg="white"
        p={4}
        borderRadius="md"
        border="1px"
        borderColor="#C1CAD6"
      >
        {departments.map((department, index) => (
          <Link 
            as={NextLink}
            key={index} 
            href={department.href}
            py={2}
            px={4}
            borderRadius="md"
            _hover={department.href === currentPath ? {} : { bg: '#E6E6E6' }}
            fontWeight={department.href === currentPath ? 'bold' : 'normal'}
            bg={department.href === currentPath ? '#1e497a' : 'transparent'}
            color={department.href === currentPath ? 'white' : 'inherit'}
          >
            {department.title}
          </Link>
        ))}
      </VStack>
    </Box>
  );
} 