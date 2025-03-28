// This page is statically generated at build time
export const dynamic = 'force-static';

import PageTemplate from '@/app/components/PageTemplate';
import { Box, Heading, Text, VStack, Flex, Container, Image, Stack, SimpleGrid } from '@chakra-ui/react';

// Directors data
const directors = [
  { name: "Sadıqov Əhliman", period: "1966-1972" },
  { name: "İlyasova Firuzə", period: "1972-1976" },
  { name: "Rəna Rzayeva", period: "1976-1980" },
  { name: "Şirinov Süleyman", period: "1980-1989" },
  { name: "Qardaş", period: "1989-1990" },
  { name: "İlham Qurbanov Hüseynov", period: "1990-2013" },
  { name: "Vəliyev", period: "2013-2016" },
];

export default function AboutPage() {
  return (
    <PageTemplate>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={16} align="stretch">
          {/* Title Section */}
          <Box>
            <Heading as="h1" size="2xl" mb={6} color="navy.800">
              UNEC Nəzdində Sosial-İqtisadi Kollec
            </Heading>
          </Box>

          {/* First Content Section - Text and Image */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Box flex={1}>
              <Text fontSize="lg" color="gray.700">
                Azərbaycan Respublikası Sovetinin 23 noyabr 1965-ci il tarixi, 747 seçilmiş və Azərbaycan Respublikası Əli və Orta İxtisas Təhsili 7 may 1966-cı il tarixi, 128 saylı əmri ilə Bakı Planı-İqtisad Texnikumu İnstitutudur. Bakı Planı-İqtisad Texnikumu 1966-cı ildən 2002-ci ildən fəaliyyətə alınmışdır.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="/college.jpg" 
                alt="College Building"
                w="100%"
                h="auto"
                objectFit="cover"
                borderRadius="lg"
                boxShadow="lg"
                fallbackSrc="https://via.placeholder.com/400x300"
              />
            </Box>
          </Flex>

          {/* Second Content Section - Image and Text */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Box flex={1} order={{ base: 2, md: 1 }}>
              <Image
                src="/college-interior.png"
                alt="College Interior"
                w="100%"
                h="auto"
                objectFit="cover"
                borderRadius="lg"
                boxShadow="lg"
                fallbackSrc="https://via.placeholder.com/400x300"
              />
            </Box>
            <Box flex={1} order={{ base: 1, md: 2 }}>
              <Text fontSize="lg" color="gray.700">
                Azərbaycan Respublikası Sovetinin 23 noyabr 1965-ci il tarixi, 747 seçilmiş və Azərbaycan Respublikası Əli və Orta İxtisas Təhsili 7 may 1966-cı il tarixi, 128 saylı əmri ilə Bakı Planı-İqtisad Texnikumu İnstitutudur. Bakı Planı-İqtisad Texnikumu 1966-cı ildən 2002-ci ildən fəaliyyətə alınmışdır.
              </Text>
            </Box>
          </Flex>

          {/* Third Content Section - Text and Image */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            <Box flex={1}>
              <Text fontSize="lg" color="gray.700">
                Azərbaycan Respublikasında İdarə Heyətinin 10 iyul 2020-ci il tarixində 250 saylı seçilmiş tarixə uyğun olaraq Azərbaycan Dövlət Sosial-İqtisad Universitetinin (UNEC) nəzdində ictimai hüquqi şəxs statusuna malik olan Sosial-İqtisadi Kollecinə çevrilmişdir.
              </Text>
            </Box>
            <Box flex={1}>
              <Image
                src="/college-event.jpg"
                alt="College Event"
                w="100%"
                h="auto"
                objectFit="cover"
                borderRadius="lg"
                boxShadow="lg"
                fallbackSrc="https://via.placeholder.com/400x300"
              />
            </Box>
          </Flex>

          {/* Directors Section */}
          <Box
            bg="blue.900"
            color="white"
            p={8}
            borderRadius="md"
            mt={8}
          >
            <Heading as="h2" size="xl" mb={6}>
              Kolecin keçmiş direktorları
            </Heading>
            <VStack spacing={3} align="stretch">
              {directors.map((director, index) => (
                <Box key={index}>
                  <Text fontSize="lg">
                    {director.name} ({director.period})
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </PageTemplate>
  );
}