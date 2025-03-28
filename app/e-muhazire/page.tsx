'use client'

import { useState, useEffect } from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Text, useColorMode, useToast, Icon } from '@chakra-ui/react'
import PageTemplate from '../components/PageTemplate'
import Image from 'next/image'
import Link from 'next/link'
import { getPosts, type WordPressPost } from '../../lib/wordpress'
import { getFileUrlFromPost, downloadFile } from '../../lib/fileUtils'
import { FiDownload } from 'react-icons/fi'

// Define the lecture post type
interface LecturePost extends WordPressPost {}

// Define the category IDs
const CATEGORIES = {
  '1-kurs': 14,
  '2-kurs': 15,
  '1-semestr': 12,
  '2-semestr': 13
}

// Format date helper function
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export default function EMuhazirePage() {
  const [lectures, setLectures] = useState<LecturePost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null)
  const toast = useToast()
  const { colorMode } = useColorMode()

  // Fetch lectures based on selected filters
  useEffect(() => {
    const fetchLectures = async () => {
      setLoading(true)
      setError(null)
      
      // Only fetch if at least one filter is selected
      if (!selectedCourse && !selectedSemester) {
        setLectures([])
        setLoading(false)
        return
      }
      
      try {
        let endpoint = '/wp/v2/posts?_embed&per_page=100'
        
        // Build categories array for filtering
        const categoryFilters = [];
        if (selectedCourse) categoryFilters.push(selectedCourse);
        if (selectedSemester) categoryFilters.push(selectedSemester);
        
        // Apply category filters
        if (categoryFilters.length > 0) {
          // When both filters are selected, we need posts that have BOTH categories
          if (categoryFilters.length > 1) {
            // For posts that must have ALL specified categories, we need to use a custom approach
            // First, get posts with the first category
            endpoint += `&categories_slug=${categoryFilters[0]}`;
            
            // Then we'll filter the results client-side to ensure they have all categories
          } else {
            // When only one filter is selected, simple filtering works
            endpoint += `&categories_slug=${categoryFilters[0]}`;
          }
        }

        // Exclude posts with category slugs
        endpoint += '&categories_exclude_slug=elanlar,xeberler,tedbirler'
        
        const response = await getPosts(endpoint)
        let filteredPosts = response.posts as LecturePost[];
        
        // If both filters are selected, we need to filter client-side to ensure posts have both categories
        if (selectedCourse && selectedSemester) {
          // Filter posts that have both categories
          filteredPosts = filteredPosts.filter(post => {
            // Check if post has category data
            if (!post._embedded || !post._embedded['wp:term']) {
              return false;
            }
            
            // Get all category IDs for this post
            const postCategories = post._embedded['wp:term']
              .flat()
              .filter(term => term.taxonomy === 'category')
              .map(term => term.id);
            
            // Check if post has both selected categories
            return postCategories.includes(selectedCourse) && 
                   postCategories.includes(selectedSemester);
          });
        }
        
        setLectures(filteredPosts)
      } catch (err) {
        console.error('Error fetching lectures:', err)
        setError('Mühazirələri yükləyərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.')
        toast({
          title: 'Xəta',
          description: 'Mühazirələri yükləyərkən xəta baş verdi',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLectures()
  }, [selectedCourse, selectedSemester, toast])

  // Handle course button click
  const handleCourseClick = (courseId: number) => {
    setSelectedCourse(selectedCourse === courseId ? null : courseId)
  }

  // Handle semester button click
  const handleSemesterClick = (semesterId: number) => {
    setSelectedSemester(selectedSemester === semesterId ? null : semesterId)
  }

  return (
    <PageTemplate title="E-Mühazirələr">
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Filtrlər
        </Heading>
        
        <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
          <Box>
            <Text fontWeight="semibold" mb={2}>Kurs:</Text>
            <Flex gap={2}>
              <Button 
                colorScheme="gray" 
                variant={selectedCourse === CATEGORIES['1-kurs'] ? 'solid' : 'outline'}
                onClick={() => handleCourseClick(CATEGORIES['1-kurs'])}
              >
                1-ci Kurs
              </Button>
              <Button 
                colorScheme="gray" 
                variant={selectedCourse === CATEGORIES['2-kurs'] ? 'solid' : 'outline'}
                onClick={() => handleCourseClick(CATEGORIES['2-kurs'])}
              >
                2-ci Kurs
              </Button>
            </Flex>
          </Box>
          
          <Box>
            <Text fontWeight="semibold" mb={2}>Semestr:</Text>
            <Flex gap={2}>
              <Button 
                colorScheme="gray" 
                variant={selectedSemester === CATEGORIES['1-semestr'] ? 'solid' : 'outline'}
                onClick={() => handleSemesterClick(CATEGORIES['1-semestr'])}
              >
                1-ci Semestr
              </Button>
              <Button 
                colorScheme="gray" 
                variant={selectedSemester === CATEGORIES['2-semestr'] ? 'solid' : 'outline'}
                onClick={() => handleSemesterClick(CATEGORIES['2-semestr'])}
              >
                2-ci Semestr
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Text>Mühazirələr yüklənir...</Text>
        </Flex>
      ) : error ? (
        <Box p={4} bg="red.100" color="red.800" borderRadius="md">
          <Text>{error}</Text>
        </Box>
      ) : !selectedCourse && !selectedSemester ? (
        <Box p={4} bg="gray.100" color="gray.800" borderRadius="md">
          <Text>Zəhmət olmasa, mühazirələri görmək üçün kurs və ya semestr seçin.</Text>
        </Box>
      ) : lectures.length === 0 ? (
        <Box p={4} bg="gray.100" color="gray.800" borderRadius="md">
          <Text>Seçilmiş filtrlərə uyğun mühazirə tapılmadı.</Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6} justifyItems="left">
          {lectures.map((lecture) => (
              <Box 
                borderRadius="lg"
                overflow="hidden"
                bg={colorMode === 'dark' ? 'gray.700' : 'white'}
                height="100%"
                display="flex"
                flexDirection="column"
                maxWidth="300px"
                textAlign="left"
              >
                <Box position="relative" height="280px" width="100%" bg="gray.600" borderRadius="lg" overflow="hidden">
                  {lecture._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Box 
                      position="relative" 
                      height="100%" 
                      width="100%"
                      cursor="pointer"
                      onClick={() => {
                        const fileUrl = getFileUrlFromPost(lecture);
                        if (fileUrl) {
                          // Extract filename from URL or use post title
                          const filename = fileUrl.split('/').pop() || `${lecture.title.rendered.replace(/<[^>]+>/g, '')}.pdf`;
                          downloadFile(fileUrl, filename);
                          toast({
                            title: 'Fayl yüklənir',
                            description: 'Fayl yüklənməyə başladı',
                            status: 'info',
                            duration: 3000,
                            isClosable: true,
                          });
                        } else {
                          toast({
                            title: 'Fayl tapılmadı',
                            description: 'Bu mühazirə üçün yükləniləcək fayl tapılmadı',
                            status: 'warning',
                            duration: 3000,
                            isClosable: true,
                          });
                        }
                      }}
                      _hover={{ opacity: 0.9 }}
                    >
                      <Image
                        src={lecture._embedded['wp:featuredmedia'][0].source_url}
                        alt={lecture.title.rendered}
                        fill
                        style={{ objectFit: 'cover', minWidth: '280px', minHeight: '280px', borderWidth: '1px' }}
                      />
                      {getFileUrlFromPost(lecture) && (
                        <Box 
                          position="absolute" 
                          bottom="10px" 
                          right="10px" 
                          bg="rgba(0,0,0,0.7)" 
                          color="white" 
                          p={2} 
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Icon as={FiDownload} />
                          <Text fontSize="sm">Yüklə</Text>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Flex 
                      height="100%" 
                      align="flex-start" 
                      justify="flex-start"
                      flexDirection="column"
                      color="white"
                      textAlign="left"
                      p={4}
                    >
                      <Text fontSize="xl" fontWeight="medium">image pulled</Text>
                      <Text fontSize="xl" fontWeight="medium">from wordpress</Text>
                      <Text fontSize="xl" fontWeight="medium">should be</Text>
                      <Text fontSize="xl" fontWeight="medium">here</Text>
                    </Flex>
                  )}
                </Box>

                <Box p={0} pt={3} bg="transparent" textAlign="left">
                  <Heading as="h3" size="md" mb={1} color={colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="semibold" noOfLines={1} bg="transparent" >
                    <span dangerouslySetInnerHTML={{ __html: lecture.title.rendered }} />
                  </Heading>
                  
                  {lecture._embedded && lecture._embedded['wp:term'] && (
                    <Text fontSize="md" color={colorMode === 'dark' ? 'gray.300' : 'gray.500'} fontWeight="normal" bg="transparent">
                      {lecture._embedded['wp:term']
                        .flat()
                        .filter(term => term.taxonomy === 'category' && 
                          (term.id === CATEGORIES['1-kurs'] || 
                           term.id === CATEGORIES['2-kurs'] || 
                           term.id === CATEGORIES['1-semestr'] || 
                           term.id === CATEGORIES['2-semestr']))
                        .map(term => term.name)
                        .join(' - ')}
                    </Text>
                  )}
                </Box>
              </Box>

          ))}
        </Grid>
      )}
    </PageTemplate>
  )
}