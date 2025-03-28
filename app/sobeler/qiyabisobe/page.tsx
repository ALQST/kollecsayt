import { Box, Text, VStack, Flex, UnorderedList, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '../../components/PageTemplate';
import DepartmentSidebar from '../../components/DepartmentSidebar';

// This page is statically generated at build time
export const dynamic = 'force-static';

export default function DistanceLearningPage() {
  return (
    <PageTemplate>
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <DepartmentSidebar currentPath="/sobeler/qiyabisobe" />
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
                alt="Qiyabi şöbə"
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
              <Text fontSize="4xl" fontWeight="bold">Qiyabi şöbə</Text>
              
              <Text color="gray.700" lineHeight="tall">
                Qiyabi şöbə tələbələrə müasir təhsil texnologiyalarından istifadə edərək 
                keyfiyyətli təhsil alma imkanı təqdim edir. Tələbələr işləyərkən təhsil 
                almaq və ya digər səbəblərdən qiyabi təhsil almaq istəyənlər üçün ideal seçimdir.
              </Text>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>Təhsil imkanları:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>Online təhsil platforması</ListItem>
                  <ListItem>Video dərslər</ListItem>
                  <ListItem>Elektron təhsil materialları</ListItem>
                  <ListItem>Online konsultasiyalar</ListItem>
                  <ListItem>İnteraktiv təcrübələr</ListItem>
                  <ListItem>Virtual laboratoriyalar</ListItem>
                  <ListItem>Online imtahanlar</ListItem>
                  <ListItem>Distant təhsil texnologiyaları</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Text fontSize="xl" fontWeight="semibold" mb={4}>Üstünlüklər:</Text>
                <UnorderedList spacing={2} color="gray.700">
                  <ListItem>İşləyərkən təhsil alma imkanı</ListItem>
                  <ListItem>Məkan məhdudiyyətindən asılı olmamaq</ListItem>
                  <ListItem>Öz təhsil sürətini tənzimləmək</ListItem>
                  <ListItem>Müasir təhsil texnologiyalarından istifadə</ListItem>
                  <ListItem>Əsaslı təhsil almaq</ListItem>
                  <ListItem>Praktiki təcrübə qazanmaq</ListItem>
                </UnorderedList>
              </Box>

              <Text color="gray.700" lineHeight="tall">
                Qiyabi şöbənin məzunları müxtəlif sahələrdə uğurla çalışırlar. 
                Onlar həm iş təcrübəsi, həm də təhsil təcrübəsi ilə təchiz olunmuş 
                mütəxəssislərdir. Qiyabi təhsil onlara həm işləmək, həm də təhsil 
                almaq imkanı verir.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
