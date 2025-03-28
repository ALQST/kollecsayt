"use client"

import { useState, useEffect } from "react"
import { Box, Flex, Text, IconButton, Button, useBreakpointValue, Skeleton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { ArrowUpRightSquareSolid } from "@mynaui/icons-react"
import NextLink from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { getPosts, type WordPressPost } from "../../lib/wordpress"

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data, error } = useSWR<{ posts: WordPressPost[]; total: number }>(
    `/wp/v2/posts?categories_slug=xeberler&_embed=true&per_page=5`,
    () => getPosts("/wp/v2/posts?categories_slug=xeberler&_embed=true&per_page=5")
  )
  const posts = data?.posts
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!posts && !error) {
    return (
      <Box w="100%" px="10%" py="8">
        <Box
          w="100%"
          position="relative"
          h={{ base: "400px", md: "500px" }}
          bg="#143151"
          overflow="hidden"
          borderRadius="2xl"
        >
          <Flex h="100%" direction={{ base: "column-reverse", md: "row" }}>
            <Box
              w={{ base: "100%", md: "50%" }}
              bg="#1E497A"
              p={8}
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
            >
              <Skeleton height="20px" width="100px" mb={3} />
              <Skeleton height="24px" width="200px" mb={4} />
              <Skeleton height="16px" width="150px" />
            </Box>
            <Box
              w={{ base: "100%", md: "50%" }}
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton
                height="100%"
                width="100%"
                borderRadius="lg"
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    )
  }

  if (error) {
    console.error("Error loading news:", error);
    return (
      <Box w="100%" px="10%" py="8" textAlign="center">
        <Text color="red.500" fontSize="xl" mb={4}>
          Error loading news
        </Text>
        <Text color="gray.500">
          Please check if:
          <br />
          1. Your WordPress server is running at http://localhost:8000
          <br />
          2. The news category exists in your WordPress installation
          <br />
          3. There are posts in the news category
        </Text>
      </Box>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Box w="100%" px="10%" py="8" textAlign="center">
        <Text color="gray.500" fontSize="xl" mb={4}>
          No news posts found
        </Text>
        <Text color="gray.500">
          Please check if there are any posts in the news category
        </Text>
      </Box>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : posts.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < posts.length - 1 ? prev + 1 : 0))
  }

  const currentPost = posts[currentIndex]
  const imageUrl = currentPost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg"

  return (
    <Box w="100%" px="10%">
      <Box
        w="100%"
        position="relative"
        h={{ base: "400px", md: "500px" }}
        bg="#143151"
        overflow="hidden"
        borderRadius="2xl"
      >
        <NextLink href={`/xeberler/${currentPost?.slug || ''}`} legacyBehavior passHref>
          <Box as="a" display="block" h="100%" _hover={{ textDecoration: "none" }}>
            <Flex h="100%" direction={{ base: "column-reverse", md: "row" }}>
              {/* Left side - Content */}
              <Box
                w={{ base: "100%", md: "50%" }}
                bg="#1E497A"
                p={8}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                position="relative"
                zIndex={2}
              >
                <Text color="white" fontSize="sm" mb={3} opacity={0.9}>
                  {currentPost?.date ? new Date(currentPost.date).toLocaleDateString("az-AZ") : ''}
                </Text>
                <Text
                  color="white"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="semibold"
                  lineHeight="1.2"
                  mb={4}
                  dangerouslySetInnerHTML={{ __html: currentPost?.title?.rendered || '' }}
                />
                <Button
                  bg="white"
                  color="#111827"
                  px={6}
                  py={6}
                  h="auto"
                  fontSize="md"
                  fontWeight="medium"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  borderRadius="xl"
                  _hover={{
                    bg: "gray.50",
                  }}
                  boxShadow="sm"
                  alignSelf="flex-start"
                >
                  Ətraflı
                  <ArrowUpRightSquareSolid width={20} height={20} style={{ color: "#111827" }} />
                </Button>
              </Box>

              {/* Right side - Image */}
              <Box 
                w={{ base: "100%", md: "50%" }} 
                position="relative" 
                h={{ base: "50%", md: "100%" }}
                borderTopRightRadius="15px"
                borderBottomRightRadius="15px"
                overflow="hidden"
                bg="#143151"
              >
                {imageUrl && imageUrl !== "/placeholder.jpg" ? (
                  <Image
                    src={imageUrl}
                    alt={currentPost?.title?.rendered || 'News image'}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Flex 
                    width="100%" 
                    height="100%" 
                    justifyContent="center" 
                    alignItems="center"
                    bg="#143151"
                  >
                    <Text color="white" opacity={0.6}>No image available</Text>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Box>
        </NextLink>

        {/* Navigation Arrows */}
        <Flex
          position="absolute"
          top={{ base: "25%", md: "50%" }}
          right={{ base: 0, md: "0" }}
          left={{ base: 0, md: "75%" }}
          transform={{
            base: "translateY(-50%)",
            md: "translate(-50%, -50%)",
          }}
          w={{ base: "100%", md: "50%" }}
          px={4}
          justify="space-between"
          zIndex={3}
          pointerEvents="none"
        >
          <IconButton
            aria-label="Previous slide"
            icon={<ChevronLeftIcon boxSize={8} />}
            onClick={handlePrevious}
            variant="unstyled"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            opacity={0.7}
            _hover={{ opacity: 1 }}
            pointerEvents="auto"
          />
          <IconButton
            aria-label="Next slide"
            icon={<ChevronRightIcon boxSize={8} />}
            onClick={handleNext}
            variant="unstyled"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            opacity={0.7}
            _hover={{ opacity: 1 }}
            pointerEvents="auto"
          />
        </Flex>

        {/* Slide Indicators */}
        <Flex
          position="absolute"
          bottom={{ base: "65%", md: 6 }}
          left="50%"
          transform={{
            base: "translate(-50%, 0)",
            md: "translateX(-50%)",
          }}
          gap={3}
          zIndex={3}
        >
          {posts.map((_, index) => (
            <Box
              key={index}
              w="6px"
              h="6px"
              borderRadius="full"
              bg="white"
              opacity={currentIndex === index ? 1 : 0.5}
              transition="opacity 0.3s"
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default HeroSection