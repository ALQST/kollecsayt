'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import { Box, Text, useColorMode, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import { getPostBySlug } from '../../../lib/wordpress';
import { useParams } from 'next/navigation';

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function NewsDetail({ params, searchParams }: NewsDetailProps) {
  const resolvedParams = React.use(params);
  const resolvedSearchParams = searchParams ? React.use(searchParams) : undefined;
  const slug = resolvedParams.slug;
  
  // Hooks must be at the top level and in the same order
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Define grid layout properties
  const mainGridColumns = useBreakpointValue({
    base: '1fr',               // Mobile: single column
    md: '1fr 1fr',             // Medium screens: two equal columns
    lg: '1fr 1fr'              // Large screens: two equal columns
  });
  
  const galleryColumns = useBreakpointValue({
    base: 1,                   // Mobile: 1 column
    sm: 2,                     // Small screens: 2 columns
    md: 2,                     // Medium screens: 2 columns
    lg: 3                      // Large screens: 3 columns
  });

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Non-hook functions and calculations
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // Handle loading state
  if (loading) {
    return (
      <AppLayout>
        <Box maxW="container.xl" mx="auto" p={6} textAlign="center">
          <Text fontSize="xl">Loading...</Text>
        </Box>
      </AppLayout>
    );
  }

  // Handle error state
  if (error || !post) {
    return (
      <AppLayout>
        <Box maxW="container.xl" mx="auto" p={6} textAlign="center">
          <Text fontSize="xl" color="red.500">{error || "Post not found"}</Text>
          <Button mt={4} onClick={() => window.history.back()}>Go Back</Button>
        </Box>
      </AppLayout>
    );
  }

  // Extract additional images from content
  const additionalImages = post.content?.rendered 
    ? (post.content.rendered.match(/<img[^>]+src="([^"]+)"/g) || [])
    : [];
  
  // Remove images from content HTML
  const contentWithoutImages = post.content?.rendered 
    ? post.content.rendered.replace(/<img[^>]+>/g, '')
    : '';

  return (
    <AppLayout>
      <Box maxW="container.xl" mx="auto" p={6} rounded="24px">
        <Box
          borderRadius="24px"
          overflow="hidden"
          mb={8}
        >
          {/* Main Grid Layout - Two columns side by side */}
          <Grid 
            templateColumns={mainGridColumns}
            gap={8}
            p={8}
            maxWidth="100%"
            mx="auto"
          >
            {/* Main Featured Image */}
            <GridItem>
              <Box
                h={isMobile ? '350px' : '500px'}
                w="full"
                position="relative"
                borderWidth="1px"
                borderColor="#C1CAD6"
                borderRadius="24px"
              >
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post.title.rendered}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '24px'
                    }}
                    priority
                  />
                )}
              </Box>
            </GridItem>

            {/* Additional Images Grid */}
            <GridItem>
              <Grid
                templateColumns={`repeat(${galleryColumns}, 1fr)`}
                gap={4}
                h={isMobile ? '350px' : '500px'}
                w="full"
                overflowY="auto"
              >
                {additionalImages.map((imgSrc: string, index: number) => {
                  const src = imgSrc.match(/src="([^"]+)"/)?.[1];
                  if (!src) return null;
                  
                  return (
                    <GridItem key={index}>
                      <Box
                        h="200px"
                        w="full"
                        position="relative"
                        borderWidth="1px"
                        borderColor="#C1CAD6"
                        borderRadius="24px"
                        cursor="pointer"
                        onClick={() => handleImageClick(src)}
                        mb={4}
                      >
                        <Image
                          src={src}
                          alt={`Additional image ${index + 1}`}
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '24px'
                          }}
                          priority={index < 2}
                        />
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
            </GridItem>
          </Grid>

          {/* Content Section */}
          <Box p={8}>
            <Text
              color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}
              fontSize="sm"
              mb={4}
            >
              {post.date && new Date(post.date).toLocaleDateString('az-AZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={colorMode === 'dark' ? 'white' : 'gray.900'}
              mb={4}
            >
              {post.title?.rendered}
            </Text>
            <Text
              color={colorMode === 'dark' ? 'white' : 'gray.700'}
              fontSize="md"
              dangerouslySetInnerHTML={{ __html: contentWithoutImages }}
            />
          </Box>
        </Box>
      </Box>

      {/* Image Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={isMobile ? 'full' : 'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Baxış</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedImage && (
              <Box
                position="relative"
                h={isMobile ? '80vh' : '800px'}
                w="full"
              >
                <Image
                  src={selectedImage}
                  alt="Preview"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </AppLayout>
  );
}