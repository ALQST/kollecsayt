import React from 'react';
import { Box, Container, Grid, Text, Link, Flex, Image, SimpleGrid, HStack, VStack, Divider } from '@chakra-ui/react';
import NextLink from 'next/link';
import { 
  BrandInstagram,
  BrandFacebook,
  BrandYoutube,
  BrandThreads,
  ArrowUpRightSolid
} from '@mynaui/icons-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false
});

const Footer = () => {
  return (
    <Box>
      {/* Social Media Cards Section */}
      <SimpleGrid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} spacing={4} mb={4} mx="auto" maxW="container.xl">
        {/* Instagram Box */}
        <NextLink href="https://www.instagram.com/cse.unec/" passHref>
          <Box border="1px" borderColor="#C1CAD6" borderRadius="md" p={4} position="relative" aspectRatio="1/1" cursor="pointer" _hover={{ borderColor: "#1f487a" }} width="100%">
            <Flex direction="column" justify="space-between" h="100%">
              <Flex justify="space-between" align="center" w="100%">
                <BrandInstagram width={48} height={48} style={{ color: "#143151" }} />
                <ArrowUpRightSolid width={48} height={48} style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }} />
              </Flex>
              <Text fontSize="lg" position="absolute" bottom={4} left={4}>Instagram</Text>
            </Flex>
          </Box>
        </NextLink>

        {/* Facebook Box */}
        <NextLink href="https://www.facebook.com/cse.unec" passHref>
          <Box border="1px" borderColor="#C1CAD6" borderRadius="md" p={4} position="relative" aspectRatio="1/1" cursor="pointer" _hover={{ borderColor: "#1f487a" }} width="100%">
            <Flex direction="column" justify="space-between" h="100%">
              <Flex justify="space-between" align="center" w="100%">
                <BrandFacebook width={48} height={48} style={{ color: "#143151" }} />
                <ArrowUpRightSolid width={48} height={48} style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }} />
              </Flex>
              <Text fontSize="lg" position="absolute" bottom={4} left={4}>Facebook</Text>
            </Flex>
          </Box>
        </NextLink>

        {/* YouTube Box */}
        <NextLink href="https://www.youtube.com/@SosialIqtisadiKollecTV" passHref>
          <Box border="1px" borderColor="#C1CAD6" borderRadius="md" p={4} position="relative" aspectRatio="1/1" cursor="pointer" _hover={{ borderColor: "#1f487a" }} width="100%">
            <Flex direction="column" justify="space-between" h="100%">
              <Flex justify="space-between" align="center" w="100%">
                <BrandYoutube width={48} height={48} style={{ color: "#143151" }} />
                <ArrowUpRightSolid width={48} height={48} style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }} />
              </Flex>
              <Text fontSize="lg" position="absolute" bottom={4} left={4}>YouTube</Text>
            </Flex>
          </Box>
        </NextLink>

        {/* Threads Box */}
        <NextLink href="https://www.threads.net" passHref>
          <Box border="1px" borderColor="#C1CAD6" borderRadius="md" p={4} position="relative" aspectRatio="1/1" cursor="pointer" _hover={{ borderColor: "#1f487a" }} width="100%">
            <Flex direction="column" justify="space-between" h="100%">
              <Flex justify="space-between" align="center" w="100%">
                <BrandThreads width={48} height={48} style={{ color: "#143151" }} />
                <ArrowUpRightSolid width={48} height={48} style={{ marginLeft: 'auto', transition: 'transform 0.3s ease' }} />
              </Flex>
              <Text fontSize="lg" position="absolute" bottom={4} left={4}>Threads</Text>
            </Flex>
          </Box>
        </NextLink>

        {/* Map Box */}
        <Box 
          border="1px" 
          borderColor="#C1CAD6" 
          borderRadius="md" 
          p={4} 
          position="relative" 
          aspectRatio="1/1"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          overflow="hidden"
        >
          <Box 
            h="100%" 
            w="100%" 
            position="relative"
            overflow="hidden"
            borderRadius="md"
          >
            <MapComponent />
          </Box>
        </Box>
      </SimpleGrid>

      {/* Main Footer Section - With Standalone College Logo Box */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        gap={4} 
        mx="auto" 
        maxW="container.xl"
        mt={8} // Add margin top for better spacing
      >
        {/* Standalone Column 1: College Logo & Info */}
        <Box 
          border="1px" 
          borderColor="#C1CAD6" 
          borderRadius="md" 
          p={4} 
          position="relative"
          width={{ base: '100%', md: '20%' }}
          height="fit-content"
        >
          <Flex direction="column" align="center" justify="center" py={4}>
            <Image 
              src="/minilogo.svg" 
              alt="Mini Logo" 
              boxSize="60px" 
              mb={4} 
            />
            <Text 
              fontWeight="md" 
              textAlign="center" 
              fontSize="sm"
              color="#111111"
            >
              2025
            </Text>
            <Text 
              fontWeight="md" 
              textAlign="center" 
              fontSize="sm"
              color="#111111"
              mb={2}
            >
              SOSİAL-İQTİSADI KOLLEC
            </Text>
            <Text 
              fontSize="xs" 
              textAlign="center"
              color="#636363"
              px={2}
            >
              Sayt Vüsal Mövsümlü və İsmayılov Məhəmməd tərəfindən hazırlanıb
            </Text>
          </Flex>
        </Box>

        {/* Other 4 columns grouped together */}
        <Box 
          border="1px" 
          borderColor="#C1CAD6" 
          borderRadius="md" 
          p={{ base: 4, md: 6 }}
          width={{ base: '100%', md: '80%' }}
        >
          <Grid 
            templateColumns={{ 
              base: 'repeat(1, 1fr)', 
              md: 'repeat(3, 1fr)' 
            }} 
            gap={{ base: 6, md: 4 }}
          >
            {/* Column 1: Contact Section */}
            <Box>
              <Text fontSize="lg" mb={4} color="#111111">Əlaqə</Text>
              <div>
                <div>
                  <Text fontSize="sm" fontWeight="light" mb={2}>Telefon: <NextLink href="tel:+994124254707" passHref><Text as="span" cursor="pointer" _hover={{ color: "#143151" }} display="inline" fontSize="sm" fontWeight="light">+994 12 425-47-07</Text></NextLink></Text>
                </div>
                <div>
                  <Text fontSize="sm" fontWeight="light" mb={2}>Ünvan: <NextLink href="https://maps.app.goo.gl/X6wzBKTCbyPkAvqN9" passHref target="_blank"><Text as="span" cursor="pointer" _hover={{ color: "#143151" }} display="inline" fontSize="sm" fontWeight="light">Bakıxanov qəsəbəsi R.Qəmbərov 61</Text></NextLink></Text>
                </div>
              </div>
            </Box>

            {/* Column 2: Site Map Section */}
            <Box>
              <Text fontSize="lg" mb={4} color="#111111">Saytın Xəritəsi</Text>
              <NextLink href="/direktor" passHref>
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>Struktur</Text>
              </NextLink>
              <NextLink href="/sobeler" passHref>
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>Şöbələr</Text>
              </NextLink>
              <NextLink href="/tedris" passHref>
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>Tədris</Text>
              </NextLink>
              <NextLink href="/sosial-fealiyyetler" passHref>
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>Sosial Fəaliyyətlər</Text>
              </NextLink>
              <NextLink href="/tyutor-xidmeti" passHref>
                <Text fontSize="sm" fontWeight="light" cursor="pointer" _hover={{ color: "#143151" }}>Tyutor xidməti</Text>
              </NextLink>
            </Box>

            {/* Column 3: Links Section */}
            <Box>
              <Text fontSize="lg" mb={4} color="#111111">Keçidlər</Text>
              <NextLink href="https://birpencere.edu.az" passHref target="_blank">
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>BİRPƏNCƏRƏ</Text>
              </NextLink>
              <NextLink href="https://azerbaijan.az" passHref target="_blank">
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>AZƏRBAYCAN</Text>
              </NextLink>
              <NextLink href="https://edu.gov.az" passHref target="_blank">
                <Text fontSize="sm" fontWeight="light" mb={2} cursor="pointer" _hover={{ color: "#143151" }}>TƏHSİL NAZİRLİYİ</Text>
              </NextLink>
              <NextLink href="https://virtualkarabakh.az" passHref target="_blank">
                <Text fontSize="sm" fontWeight="light" cursor="pointer" _hover={{ color: "#143151" }}>VIRTUAL QARABAĞ</Text>
              </NextLink>
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;