import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '@/app/components/PageTemplate';
import StructureSidebar from '../../components/StructureSidebar';

// This page is statically generated at build time
export const dynamic = 'force-static';

export default function HumanitarianPage() {
  return (
    <PageTemplate>
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <StructureSidebar currentPath="/struktur/sosialvehumanitarmeseleleruzre" />
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
                src="/images/sosialvehumanitarmeseleler.jpg"
                alt="Sosial və Humanitar Məsələlər Üzrə Direktor Müavini"
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
              <Text fontSize="4xl" fontWeight="bold">Vəliyev Zaur</Text>
              <Text fontSize="xl" color="gray.600" mb={4}>Sosial və Humanitar Məsələlər Üzrə Direktor Müavini</Text>
              <Text color="gray.700" lineHeight="tall">
              Zaur Fazil oğlu Vəliyev 1976-cı ildə Ağdam rayonunun Ətyeməzli kəndində anadan olmuşdur. 1981-ci ildə Ağdam rayonu Ətyeməzli kənd orta məktəbinin 1-ci sinifinə daxil olmuş, 1991-ci ildə həmin məktəbi bitirmişdir. Həmin il Həsən bəy Zərdabi adına Gəncə Dövlət Pedaqoji İnstitunun "Tarix, əlavə dövlət hüqüqü" fakültəsinə daxil olmuşdur. 1996-cı ildə həmin institutun "Tarix və hüqüq müəllimliyi" ixtisasını bitirmişdir.

1996-cı ildə  "Ədalət" qəzetində müxbir kimi əmək fəaliyyətinə başlamışdır. 1997-ci ildə MN-nin N saylı hərbi hissəsinin təbliğat və təşviqat qrupunda həqiqi hərbi xidmətdə olmuşdur. 1998-ci ildə hərbi xidmətini başa vurub yenidən "Ədalət" qəzetində müxbir, şöbə müdiri vəzifəsində çalışmışdır.
                <br />
                2008-ci ildən Bakı Dövlət Sosial-İqtisadi Kollecində tarix müəllimi kimi pedaqoji fəaliyyətə başlamışdır.

Elm və Təhsil Nazirliyinin 08.12.2022 tarixli F-699 nömrəli əmri ilə təsdiq edilmiş orta ixtisas təhsili müəssisələri üçün "Azərbaycan Tarixi" dərs vəsaitinin müəllifidir. 

2021-ci ildən Azərbaycan Dövlət İqtisad Universitetinin nəzdində Sosial-İqtisadi Kollecdə Sosial və Humanitar məsələlər üzrə direktor müavini vəzifəsində çalışır.

Ailəlidir, üç övladı var.


              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
