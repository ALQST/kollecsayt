// This page is statically generated at build time
export const dynamic = 'force-static';

import { Box, Text, VStack, Flex, UnorderedList, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '../../components/PageTemplate';
import DepartmentSidebar from '../../components/DepartmentSidebar';

export default function AccountingPage() {
  return (
    <PageTemplate>
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <DepartmentSidebar currentPath="/sobeler/muhasibatucotu" />
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
                alt="Mühasibat uçotu şöbəsi"
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
              <Text fontSize="4xl" fontWeight="bold">Mühasibat uçotu</Text>
              
              <Text color="gray.700" lineHeight="tall">
                Mühasibat uçotu şöbəsi tələbələrə müasir mühasibat sisteminin əsasları, 
                maliyyə hesabatları, vergi uçotu və audit sahəsində təcrübəli mütəxəssislər hazırlayır.
              </Text>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>İxtisas fənləri:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>Mühasibat uçotunun əsasları</ListItem>
                  <ListItem>Maliyyə hesabatları</ListItem>
                  <ListItem>Vergi uçotu</ListItem>
                  <ListItem>Audit</ListItem>
                  <ListItem>Maliyyə analizi</ListItem>
                  <ListItem>Büdcə uçotu</ListItem>
                  <ListItem>İnvestisiya uçotu</ListItem>
                  <ListItem>Beynəlxalq mühasibat standartları</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>Karyera imkanları:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>Mühasibat şöbələrində</ListItem>
                  <ListItem>Audit firmalarında</ListItem>
                  <ListItem>Vergi orqanlarında</ListItem>
                  <ListItem>Maliyyə təşkilatlarında</ListItem>
                  <ListItem>Mühasibat mütəxəssisi</ListItem>
                  <ListItem>Auditor</ListItem>
                </UnorderedList>
              </Box>

              <Text color="gray.700" lineHeight="tall">
                Mühasibat uçotu şöbəsinin məzunları Azərbaycanın aparıcı şirkətlərində və 
                təşkilatlarında uğurla çalışırlar. Onlar müasir mühasibat sisteminin 
                təkmilləşdirilməsində və maliyyə hesabatlarının hazırlanmasında mühüm rol oynayırlar.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
