'use client'

import React from 'react';
import {
  Box,
  Flex,
  Button,
  Container,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  Link as ChakraLink,
  Collapse,
  Icon,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BuildingSolid,
  UsersSolid,
  BookSolid,
  UserSolid,
  HeadphonesSolid,
  VideoSolid,
  CalendarSolid,
  GridSolid,
  SupportSolid,
  TableSolid,
  ChevronDownSolid,
  Menu,
  X
} from '@mynaui/icons-react';

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    onToggle(); // This will toggle the isOpen state
  };

  // Solid white background style
  const solidBgStyle = {
    backgroundColor: 'white',
  };

  // Solid white background style for buttons and menu items
  const solidButtonStyle = {
    backgroundColor: 'white',
  };

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={20}
      w="100%"
      bg="transparent"
    >
      <Container maxW="container.xl" position="relative">
        <Flex align="center" py={4}>
      {/* Menu Icon */}
      <Box 
        position={{ base: "relative", lg: "absolute" }} 
        left={{ lg: 4 }} 
        zIndex={isOpen ? 2 : 0}
        transition="z-index 0.3s"
      >
        <Button
          onClick={handleMenuClick}
          p={{ base: 4, lg: 6 }}
          border="1px"
          rounded="25px"
          borderColor="#C1CAD6"
          h="auto"
          minW="auto"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            ...solidButtonStyle,
            backdropFilter: "blur(10px)", // Add blurry background
            WebkitBackdropFilter: "blur(10px)", // For Safari compatibility
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
          }}
        >
          {isOpen ? <X width={36} height={36} style={{ color: "#1E497A" }} /> : <Menu width={36} height={36} style={{ color: "#1E497A" }} />}
        </Button>
      </Box>

      {/* Centered Navigation Bar */}
      <Flex 
        as="nav" 
        p={{ base: 3, md: 6 }}
        rounded="25px" 
        justify="center"
        border="1px"
        borderColor="#C1CAD6"
        align="center"
        w="100%"
        maxW={{ base: "100%", md: "container.md" }}
        mx="auto"
        display={{ base: "none", md: "flex" }}
        position="relative"
        sx={{
          ...solidBgStyle,
          backdropFilter: "blur(15px)", // Add blurry background with slightly more blur
          WebkitBackdropFilter: "blur(15px)", // For Safari compatibility
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
        }}
      >
        {/* Centered Navigation Items */}
        <Stack 
          direction={{ base: "column", md: "row" }} 
          gap={{ base: 2, md: 8 }} 
          justify="center"
          w="100%"
            >
              <Button 
                as={NextLink} 
                href="/haqqimizda" 
                variant="ghost"
                backgroundColor={pathname === '/haqqimizda' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                color={pathname === '/haqqimizda' ? "white" : "#111827"}
                _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
              >
                Haqqımızda
              </Button>
              <Button 
                as={NextLink} 
                href="/xeberler" 
                variant="ghost"
                backgroundColor={pathname === '/xeberler' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                color={pathname === '/xeberler' ? "white" : "#111827"}
                _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
              >
                Xəbərlər
              </Button>
              <Button 
                as={NextLink} 
                href="/qalareya" 
                variant="ghost"
                backgroundColor={pathname === '/qalareya' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                color={pathname === '/qalareya' ? "white" : "#111827"}
                _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
              >
                Fotoqalareya
              </Button>
              <Button 
                as={NextLink} 
                href="/e-muhazire" 
                variant="ghost"
                backgroundColor={pathname === '/e-muhazire' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                color={pathname === '/e-muhazire' ? "white" : "#111827"}
                _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
              >
                E-Mühazirə
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Container>

      {/* Mega Menu */}
      <Collapse in={isOpen}>
        <Box
          position={{ base: "fixed", lg: "absolute" }}
          zIndex={1001}
          top={{ base: 0, lg: "100%" }}
          left={{ base: 0, lg: "50%" }}
          right={{ base: 0, lg: "auto" }}
          bottom={{ base: 0, lg: "auto" }}
          transform={{ base: "none", lg: "translateX(-50%)" }}
          width="100%"
          maxW={{ base: "100%", lg: "container.xl" }}
          mt={{ base: 0, lg: 4 }}
          overflowY={{ base: "auto", lg: "visible" }}
          borderColor="#C1CAD6"
          transition="none"
          backgroundColor="#F8FAFC" // Lighter background color
        >
          <Box
            rounded={{ base: "none", lg: "2xl" }}
            border={{ base: "none", lg: "1px solid #C1CAD6" }}
            px={{ base: 4, lg: 10 }}
            py={{ base: 4, lg: 8 }}
            sx={solidBgStyle}
          >
            {/* Close Button for Mobile */}
            <Box display={{ base: 'block', lg: 'none' }} mb={6}>
              <Button
                color="#C1CAD6"
                onClick={onToggle}
                variant="ghost"
                size="sm"
                p={2}
                rounded="md"
                _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                leftIcon={<Text fontSize="xl">×</Text>}
                backgroundColor="transparent"
              >
                Bağla
              </Button>

              {/* Mobile Navigation Grid */}
              <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={6}>
                <Button 
                  as={NextLink} 
                  href="/about" 
                  variant="ghost"
                  w="100%"
                  _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
                  backgroundColor={pathname === '/about' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                  color={pathname === '/about' ? "white" : "inherit"}
                >
                  <Text>Haqqımızda</Text>
                </Button>
                <Button 
                  as={NextLink} 
                  href="/xeberler" 
                  variant="ghost"
                  w="100%"
                  _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
                  backgroundColor={pathname === '/xeberler' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                  color={pathname === '/xeberler' ? "white" : "inherit"}
                >
                  <Text>Xəbərlər</Text>
                </Button>
                <Button 
                  as={NextLink} 
                  href="/qalareya" 
                  variant="ghost"
                  w="100%"
                  _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
                  backgroundColor={pathname === '/qalareya' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                  color={pathname === '/qalareya' ? "white" : "inherit"}
                >
                  <Text>Qalareya</Text>
                </Button>
                <Button 
                  as={NextLink} 
                  href="/e-muhazire" 
                  variant="ghost"
                  w="100%"
                  _hover={{ bg: "rgba(30, 73, 122, 0.9)", color: "white" }}
                  backgroundColor={pathname === '/e-muhazire' ? "rgba(30, 73, 122, 0.9)" : "transparent"}
                  color={pathname === '/e-muhazire' ? "white" : "inherit"}
                >
                  <Text>E-Mühazirə</Text>
                </Button>
              </Grid>
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={16}>
              {/* Struktur Section */}
              <GridItem rowSpan={{ base: 1, md: 2 }}>
                <Flex align="center" mb={5} gap={3}>
                  <BuildingSolid width={48} height={48} style={{ color: "#1E497A" }} />
                  <div>
                    <Text fontWeight="bold" color="#111827" fontSize="lg">Struktur</Text>
                  </div>
                </Flex>
                <Flex direction="column" gap={0}>
                  {/* Menu items with blurry hover effect */}
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/direktor" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Direktor </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/tedrisisleriuzredirektormuavini" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Tədris İşləri Üzrə Direktor Müavini </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/sosialvehumanitarmeseleleruzre" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Sosial və Humanitar Məsələlər Üzrə </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/tedrishissemudiri" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Tədris Hissə Müdiri </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/metodikikabinet" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Metodiki Kabinet </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/muhasibatliq" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Mühasibatlıq </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/huquqsunas" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Hüquqşünas </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/psixoloq" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Psixoloq </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/arxivmudiri" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Arxiv Müdiri </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/struktur/komendant" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Komendant </Text>
                  </ChakraLink>
                </Flex>
              </GridItem>

              {/* Şöbələr Section */}
              <GridItem>
                <Flex align="center" mb={5} gap={3}>
                  <GridSolid width={48} height={48} style={{ color: "#1E497A" }} />
                  <div>
                    <Text fontWeight="bold" color="#111827" fontSize="lg">Şöbələr</Text>
                  </div>
                </Flex>
                <Flex direction="column" gap={0}>
                  <ChakraLink 
                    as={NextLink} 
                    href="/sobeler/idareetme" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> İdarəetmə </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/sobeler/muhasibatucotu" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Mühasibat uçotu </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/sobeler/bankisi" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Bank işi </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/sobeler/qiyabisobe" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Qiyabi şöbə </Text>
                  </ChakraLink>
                </Flex>
              </GridItem>

              {/* Tədris Section */}
              <GridItem>
                <Flex align="center" mb={5} gap={3}>
                  <BookSolid width={48} height={48} style={{ color: "#1E497A" }} />
                  <div>
                    <Text fontWeight="bold" color="#111827" fontSize="lg">Tədris</Text>
                  </div>
                </Flex>
                <Flex direction="column" gap={0}>
                  <ChakraLink 
                    as={NextLink} 
                    href="/tedris/ixtisaslar" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> İxtisaslar </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/tedris/akademikteqvim" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Akademik təqvim </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/tedris/imtahaneticeleri" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> İmtahan nəticələri </Text>
                  </ChakraLink>
                  <ChakraLink 
                    as={NextLink} 
                    href="/tedris/qebulqaydalari" 
                    color="#17191C"
                    p={2}
                    rounded="md"
                    _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                  >
                    <Text> Qəbul qaydaları </Text>
                  </ChakraLink>
                </Flex>
              </GridItem>

              {/* Bottom Grid */}
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Grid 
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={{ base: 8, md: 16 }}
                >
                  {/* Sosial Fəaliyyətlər */}
                  <GridItem>
                    <Flex 
                      as={NextLink}
                      href="/sosialfealiyyetler"
                      align="center" 
                      gap={3}
                      p={2}
                      rounded="md"
                      _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                    >
                      <UserSolid width={48} height={48} style={{ color: "#1E497A" }} />
                      <div>
                        <Text fontWeight="bold" color="#111827" fontSize="lg">Sosial Fəaliyyətlər</Text>
                      </div>
                    </Flex>
                  </GridItem>

                  {/* Tyutor Xidməti */}
                  <GridItem>
                    <Flex 
                      as={NextLink}
                      href="/tyutorxidmeti"
                      align="center" 
                      gap={3}
                      p={2}
                      rounded="md"
                      _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                    >
                      <SupportSolid width={48} height={48} style={{ color: "#1E497A" }} />
                      <div>
                        <Text fontWeight="bold" color="#111827" fontSize="lg">Tyutor Xidməti</Text>
                      </div>
                    </Flex>
                  </GridItem>

                  {/* Video dərslər */}
                  <GridItem>
                    <Flex 
                      as={NextLink}
                      href="/videodersler"
                      align="center" 
                      gap={3}
                      p={2}
                      rounded="md"
                      _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                    >
                      <VideoSolid width={48} height={48} style={{ color: "#1E497A" }} />
                      <div>
                        <Text fontWeight="bold" color="#111827" fontSize="lg">Video dərslər</Text>
                      </div>
                    </Flex>
                  </GridItem>

                  {/* Dərs İmtahan Cədvəli */}
                  <GridItem>
                    <Flex 
                      as={NextLink}
                      href="/dersimtahancedveli"
                      align="center" 
                      gap={3}
                      p={2}
                      rounded="md"
                      _hover={{ bg: "rgba(230, 230, 230, 0.8)" }}
                    >
                      <TableSolid width={48} height={48} style={{ color: "#1E497A" }} />
                      <div>
                        <Text fontWeight="bold" color="#111827" fontSize="lg">Dərs İmtahan Cədvəli</Text>
                      </div>
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navigation;