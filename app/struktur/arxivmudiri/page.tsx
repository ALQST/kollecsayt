import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import PageTemplate from '../../components/PageTemplate';
import StructureSidebar from '../../components/StructureSidebar';

// This page is statically generated at build time
export const dynamic = 'force-static';

export default function ArchiveManagerPage() {
  return (
    <PageTemplate>
      <Flex gap={8} direction={{ base: 'column', md: 'row' }} bg="gray.50" p={6} borderRadius="lg" minH="70vh">
        <Box flex={{ base: 1, md: 0 }} minW={{ base: 'full', md: '300px' }}>
          <StructureSidebar currentPath="/struktur/arxivmudiri" />
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
                src="/images/arxiv.jpg"
                alt="Arxiv Müdiri"
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
              <Text fontSize="4xl" fontWeight="bold">Məmmədova Xanım</Text>
              <Text fontSize="xl" color="gray.600" mb={4}>Arxiv Müdiri</Text>
              <Text color="gray.700" lineHeight="tall">
                Məmmədova Xanım Rafiq qızı 15 fevral 1988-ci il tarixində Qubadlı rayonunda anadan olub.

2005-ci ildə Sumqayıtda “İstedad” liseyini bitirib və Sumqayıt Dövlət Universitetinin filologiya fakültəsinə daxil olub. 2009-cu ildə “Filoloq. Azərbaycan dili və ədəbiyyatı müəllimi” ixtisası üzrə universiteti fərqlənmə diplomu ilə bitirdikdən sonra, 2009-2011-ci illərdə Bakı Dövlət Universitetinin “Azərbaycan dilçiliyi” ixtisası üzrə magistr təhsilini də fərqlənmə diplomu ilə başa vurmuşdur. 
                <br />
                Xanım Məmmədova 2013-cü ilin yanvar ayından Azərbaycan Texniki Universitetində Tələbələrin Elmi Tədqiqat İşi və Yaradıcılığı üzrə Respublika Şurasında böyük laborant kimi əmək fəaliyyətinə başlamışdır. 2013-cü ilin aprel ayından həmin Şurada elmi işçi vəzifəsinə keçirilmişdir. 2016-cı ilin sentyabr ayında Bakı Dövlət Sosial – İqtisadi Kollecində tyutor vəzifəsinə, 2016-cı ilin noyabr ayında isə “Qeydiyyat, qiymətləndirmə və monitorinq” şöbəsinin müdiri vəzifəsinə təyin edilmişdir. O, 2021-ci ilin sentyabr ayından “Keyfiyyətin təminatı” bölməsinin müdiri işləyib. 2023-cü ildən UNEC-in nəzdində Sosial-İqtisadi Kollecdə arxiv müdiri vəzifəsində çalışır.

           Ailəlidir, iki övladı var.
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </PageTemplate>
  );
}
