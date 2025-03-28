// This page is statically generated at build time
export const dynamic = 'force-static';

import { Box, Text, VStack, Flex, UnorderedList, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '../../components/PageTemplate';
import DepartmentSidebar from '../../components/DepartmentSidebar';

export default function ManagementPage() {
  return (
    <PageTemplate>
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <DepartmentSidebar currentPath="/sobeler/idareetme" />
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
                alt="İdarəetmə şöbəsi"
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
              <Text fontSize="4xl" fontWeight="bold">Vaqif Alışov</Text>
              
              <Text color="gray.700" lineHeight="tall">
                İdarəetmə şöbəsinin müdürü
              </Text>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>İxtisas fənləri:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>Menecment</ListItem>
                  <ListItem>Strateji idarəetmə</ListItem>
                  <ListItem>İnsan resurslarının idarə edilməsi</ListItem>
                  <ListItem>Layihələrin idarə edilməsi</ListItem>
                  <ListItem>Biznes planlaşdırma</ListItem>
                  <ListItem>Liderlik və komanda idarəetməsi</ListItem>
                  <ListItem>Risk menecmenti</ListItem>
                  <ListItem>Marketinq əsasları</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>Karyera imkanları:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>Biznes meneceri</ListItem>
                  <ListItem>İnsan resursları meneceri</ListItem>
                  <ListItem>Layihə meneceri</ListItem>
                  <ListItem>Marketinq meneceri</ListItem>
                  <ListItem>Kiçik və orta biznes sahibi</ListItem>
                  <ListItem>İdarəetmə məsləhətçisi</ListItem>
                </UnorderedList>
              </Box>

              <Text color="gray.700" lineHeight="tall">
                Məzunlarımız yerli və beynəlxalq şirkətlərdə, dövlət qurumlarında və özəl sektorda uğurla çalışır. Şöbəmiz tələbələrin praktiki təcrübə qazanması üçün müxtəlif şirkətlərlə əməkdaşlıq edir və təcrübə proqramları təşkil edir.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
