import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '../../components/PageTemplate';
import StructureSidebar from '../../components/StructureSidebar';

// This page is statically generated at build time
export const dynamic = 'force-static';

export default function DirectorPage() {
  return (
    <PageTemplate 
    >
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <StructureSidebar currentPath="/struktur/direktor" />
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          <VStack spacing={8} align="stretch">
            <Box 
              borderRadius="xl" 
              overflow="hidden"
              bg="blue.50"
              mb={6}
              position="relative"
              boxShadow="lg"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-r, blue.500, transparent)"
                opacity={0.1}
                zIndex={1}
              />
              <Image
                src="/images/director.jpg"
                alt="Şəhriyar Laçınov"
                width={800}
                height={500}
                style={{ 
                  width: '100%', 
                  height: '500px', 
                  objectFit: 'cover',
                  objectPosition: 'top'
                }}
                priority
                unoptimized
              />
            </Box>
            
            <VStack spacing={3} align="stretch" bg="white" p={6} borderRadius="xl" boxShadow="sm">
              <Text fontSize="4xl" fontWeight="bold">Şəhriyar Laçınov</Text>
              <Text fontSize="xl" color="gray.600" mb={4}>Direktor</Text>
              <Text color="gray.700" lineHeight="tall">
              Şəhriyar Laçınov bakalavriat təhsilini Azərbaycan Dövlət İqtisad Universitetində, magistratura təhsilini isə Azərbaycan Dövlət Pedaqoji Universitetinin ABŞ-nin Corc Vaşinqton Universiteti ilə birgə həyata keçirdiyi “Təhsil menecmenti/Təhsil və insan inkişafı” istiqaməti üzrə almışdır.
              </Text>
              <Text color="gray.700" lineHeight="tall">
                3 iyun 2024-cü il tarixində UNEC nəzdində Sosial-İqtisadi Kollecinə direktor təyin edilib.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}