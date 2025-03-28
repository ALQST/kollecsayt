'use client';

import { Box, VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

interface StructureSidebarProps {
  currentPath: string;
}

const positions = [
  { title: 'Direktor', href: '/struktur/direktor' },
  { title: 'Tədris İşləri Üzrə Direktor Müavini', href: '/struktur/tedrisisleriuzredirektormuavini' },
  { title: 'Sosial və Humanitar Məsələlər Üzrə Müavini', href: '/struktur/sosialvehumanitarmeseleleruzre' },
  { title: 'Tədris Hissə Müdiri', href: '/struktur/tedrishissemudiri' },
  { title: 'Metodiki Kabinet', href: '/struktur/metodikikabinet' },
  { title: 'Mühasibatlıq', href: '/struktur/muhasibatliq' },
  { title: 'Hüquqşünas', href: '/struktur/huquqsunas' },
  { title: 'Psixoloq', href: '/struktur/psixoloq' },
  { title: 'Arxiv Müdiri', href: '/struktur/arxivmudiri' },
  { title: 'Komendant', href: '/struktur/komendant' },
];

export default function StructureSidebar({ currentPath }: StructureSidebarProps) {
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
        {positions.map((position, index) => (
          <Link 
            as={NextLink}
            key={index} 
            href={position.href}
            py={2}
            px={4}
            borderRadius="md"
            _hover={position.href === currentPath ? {} : { bg: '#E6E6E6' }}
            fontWeight={position.href === currentPath ? 'bold' : 'normal'}
            bg={position.href === currentPath ? '#1e497a' : 'transparent'}
            color={position.href === currentPath ? 'white' : 'inherit'}
          >
            {position.title}
          </Link>
        ))}
      </VStack>
    </Box>
  );
}