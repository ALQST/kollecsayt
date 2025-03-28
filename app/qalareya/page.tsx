'use client';

import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Image from 'next/image';
import { fetchGalleryImages } from '@/lib/wordpress';
import { Box, Container, Grid, Heading, Modal, ModalContent, ModalOverlay, Skeleton, VStack } from '@chakra-ui/react';

interface GalleryImage {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const galleryImages = await fetchGalleryImages();
        const mappedImages = galleryImages.map(image => ({
          id: image.id,
          source_url: image.source_url || '',
          alt_text: image.alt_text || '',
          title: { rendered: image.title.rendered }
        }));
        setImages(mappedImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <Container maxW="1200px" py={8}>
          <Skeleton height="2.5rem" width="200px" margin="0 auto 2rem" />
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" p={0}>
            {[...Array(6)].map((_, index) => (
              <Box
                key={index}
                position="relative"
                aspectRatio="1"
                overflow="hidden"
                boxShadow="sm"
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <Skeleton height="100%" width="100%" />
              </Box>
            ))}
          </Grid>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container maxW="1200px" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center" fontSize="2xl" color="gray.800">
            Foto Qalereya
          </Heading>
          
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4} p={0}>
            {images.map((image) => (
              <Box
                key={image.id}
                position="relative"
                aspectRatio="1"
                overflow="hidden"
                boxShadow="sm"
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.02)' }}
                cursor="pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.source_url}
                  alt={image.alt_text || image.title.rendered}
                  width={400}
                  height={400}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Grid>

          <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} size="xl">
            <ModalOverlay />
            <ModalContent bg="transparent" maxW="90vw" maxH="90vh">
              {selectedImage && (
                <Image
                  src={selectedImage.source_url}
                  alt={selectedImage.alt_text || selectedImage.title.rendered}
                  width={800}
                  height={600}
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px' }}
                />
              )}
            </ModalContent>
          </Modal>
        </VStack>
      </Container>
    </AppLayout>
  );
}