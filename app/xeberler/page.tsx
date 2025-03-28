"use client"

// Client components cannot be statically generated

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import AppLayout from "../components/AppLayout"
import { Box, Flex, Text, Input, Select, Button, useColorMode, useTheme } from "@chakra-ui/react"
import Image from "next/image"
import { getPosts, type WordPressPost } from "../../lib/wordpress"
import { ArrowUpRightSquareSolid } from "@mynaui/icons-react"
import { useRouter, useSearchParams } from "next/navigation"

// Types
interface NewsPost extends WordPressPost {}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// Component for rendering a single news post card
const NewsPostCard = ({ post, index }: { post: NewsPost; index: number }) => {
  const { colorMode } = useColorMode()
  const theme = useTheme()
  const router = useRouter()

  const handleDetailsClick = () => {
    // Use the full URL path to ensure proper routing
    router.push(`/xeberler/${post.slug}`)
  }

  return (
    <Box
      key={post.id}
      bg={colorMode === "dark" ? "blue.800" : "#1E497A"}
      rounded="2xl"
      overflow="hidden"
      w="full"
      h="400px"
      position="relative"
      border="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      display="flex"
      flexDirection="column"
      cursor="pointer"
      _hover={{
        transform: "translateY(-2px)",
        transition: "transform 0.2s ease-in-out",
      }}
      onClick={handleDetailsClick}
    >
      <Box position="relative" aspectRatio="1" h="auto" bg="gray.100" borderRadius="2xl" overflow="hidden">
        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <Image
            src={post._embedded["wp:featuredmedia"][0].source_url || "/placeholder.svg"}
            alt={post.title.rendered}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            loading={index < 4 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </Box>
      <Box p={6} display="flex" flexDirection="column" justifyContent="space-between" flex="1">
        <Box>
          <Text fontSize="lg" fontWeight="semibold" color="white" mb={3} noOfLines={2} lineHeight="1.4">
            {post.title.rendered}
          </Text>
          <Text color="white" fontSize="sm" mb={3} display="block">
            {formatDate(post.date)}
          </Text>
          <Text
            color="white"
            noOfLines={3}
            lineHeight="1.5"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </Box>
        <Box mt="6">
          <a
            href={`/xeberler/${post.slug}`}
            rel="noopener noreferrer"
            aria-label={`Read more about ${post.title.rendered}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
              color: "#1E497A",
              fontWeight: "medium",
              transition: "all 0.2s ease",
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid rgba(30, 73, 122, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#143151"
              e.currentTarget.style.transform = "translateX(2px)"
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
              e.currentTarget.style.borderColor = "#1E497A"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1E497A"
              e.currentTarget.style.transform = "translateX(0)"
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.borderColor = "rgba(30, 73, 122, 0.1)"
            }}
          >
            Daha ətraflı
            <ArrowUpRightSquareSolid width={16} height={16} style={{ color: "#1E497A" }} />
          </a>
        </Box>
      </Box>
    </Box>
  )
}

// Component for skeleton placeholder
const NewsPostSkeleton = () => {
  return (
    <Box
      bg="#1E497A"
      rounded="2xl"
      overflow="hidden"
      w="full"
      h="400px"
      position="relative"
      border="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" aspectRatio="1" h="auto" bg="#F3F4F6" borderRadius="2xl" overflow="hidden" />
      <Box p={6} display="flex" flexDirection="column" justifyContent="space-between" flex="1">
        <Box>
          <Box h="32px" w="70%" bg="#F3F4F6" borderRadius="md" mb={3} />
          <Box h="24px" w="40%" bg="#F3F4F6" borderRadius="md" mb={3} />
          <Box h="48px" w="100%" bg="#F3F4F6" borderRadius="md" />
        </Box>
        <Box mt="auto">
          <Box h="32px" w="120px" bg="#F3F4F6" borderRadius="md" />
        </Box>
      </Box>
    </Box>
  )
}

// Component for pagination controls
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => (
  <Flex justify="center" align="center" gap={4} mt={8} position="relative" zIndex={1}>
    <Button
      onClick={() => onPageChange(currentPage - 1)}
      isDisabled={currentPage === 1}
      size="sm"
      bg="white"
      _hover={{ bg: "gray.100" }}
      aria-label="Previous page"
    >
      Əvvəlki
    </Button>
    <Text color="gray.600" fontSize="sm" bg="white" px={2} py={1} borderRadius="md">
      {currentPage} / {totalPages}
    </Text>
    <Button
      onClick={() => onPageChange(currentPage + 1)}
      isDisabled={currentPage >= totalPages}
      size="sm"
      bg="white"
      _hover={{ bg: "gray.100" }}
      aria-label="Next page"
    >
      Növbəti
    </Button>
  </Flex>
)

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
}

const buildPostsQueryParams = (page: number, itemsPerPage: number, searchTerm: string, selectedYear: string) => {
  const params = new URLSearchParams()
  params.set("per_page", itemsPerPage.toString())
  params.set("page", page.toString())
  params.set("categories", "1")
  params.set("_embed", "true")
  params.set("status", "publish")

  if (searchTerm) {
    // URL encode the search term and replace special characters
    const encodedSearch = encodeURIComponent(searchTerm)
      .replace(/%20/g, "+") // Replace spaces with +
      .replace(/%26/g, "&") // Replace %26 with &
      .replace(/%23/g, "#") // Replace %23 with #
    params.set("search", encodedSearch)
  }

  if (selectedYear !== "All") {
    params.set("year", selectedYear)
  }

  return params
}

// Main component
const NewsPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State management
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "")
  const debouncedSearch = useDebounce(searchInput, 500)
  const [selectedYear, setSelectedYear] = useState(searchParams.get("year") || "All")
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 20 // We want 20 items per page
  const page = Number.parseInt(searchParams.get("page") || "1")
  const totalPages = Math.max(1, Math.ceil(totalPosts / itemsPerPage))

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    // Don't update URL immediately, let the debounce handle it
  }

  // Handle year selection changes
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    // Use debouncedSearch here to ensure we're using the final search value
    router.push(`/xeberler?page=1&search=${debouncedSearch}&year=${year}`)
  }

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    // Use debouncedSearch here to ensure we're using the final search value
    router.push(`/xeberler?page=${newPage}&search=${debouncedSearch}&year=${selectedYear}`)
  }

  // Update URL when debounced search changes
  useEffect(() => {
    // Only update URL if there's actually a search term
    if (debouncedSearch) {
      router.push(`/xeberler?page=1&search=${debouncedSearch}&year=${selectedYear}`)
    }
  }, [debouncedSearch, router, selectedYear])

  // Fetch posts with WordPress REST API headers
  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Build params for the current page
      const params = buildPostsQueryParams(page, itemsPerPage, debouncedSearch, selectedYear)
      const wpEndpoint = `?${params.toString()}`
      
      console.log("Fetching with params:", params.toString())

      // Get posts and total count
      const { posts, total, totalPages } = await getPosts(wpEndpoint)
      
      console.log("Total posts from API:", posts.length)
      console.log("Total pages:", totalPages)

      setNewsPosts(posts)
      setTotalPosts(total)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load news posts. Please try again later.")
      setNewsPosts([])
      setTotalPosts(0)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch posts when filters or page changes
  useEffect(() => {
    // Only fetch if we have a valid page number
    if (page > 0) {
      fetchPosts()
    }
  }, [debouncedSearch, selectedYear, page])

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      {/* Header with search and year filter */}
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={8}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Text fontSize="3xl" fontWeight="bold" color="gray.900">
          Xəbərlər
        </Text>
        <Flex gap={4} flexDirection={{ base: "column", sm: "row" }} width={{ base: "100%", md: "auto" }}>
          <Box position="relative">
            <Input
              placeholder="Axtarış..."
              value={searchInput}
              onChange={handleSearchChange}
              w={{ base: "full", sm: "256px" }}
              aria-label="Search news posts"
            />
          </Box>
          <Select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            aria-label="Filter by year"
            width={{ base: "full", sm: "auto" }}
          >
            <option value="All">Bütün illər</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)
              .filter((year) => year >= 2014)
              .map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
          </Select>
        </Flex>
      </Flex>

      {/* Loading state */}
      {isLoading ? (
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}
          mb={8}
          minH="600px"
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <NewsPostSkeleton key={index} />
            ))}
        </Box>
      ) : (
        <>
          {/* Error state */}
          {error && (
            <Box textAlign="center" p={8} color="red.500" bg="red.50" borderRadius="md">
              <Text fontSize="lg">{error}</Text>
            </Box>
          )}

          {/* Empty state */}
          {!error && newsPosts.length === 0 && (
            <Box textAlign="center" p={8} bg="gray.50" borderRadius="md">
              <Text fontSize="lg" color="gray.500">
                Xəbər tapılmadı. Zəhmət olmasa, başqa axtarış meyarları sınayın.
              </Text>
            </Box>
          )}

          {/* News posts grid */}
          {!error && newsPosts.length > 0 && (
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={6}
              mb={8}
              minH="600px"
            >
              {newsPosts.map((post, index) => (
                <NewsPostCard key={post.id} post={post} index={index} />
              ))}
            </Box>
          )}

          {/* Pagination controls */}
          {!error && totalPosts > itemsPerPage && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </Box>
  )
}

const NewsPage = () => {
  return (
    <AppLayout>
      <Suspense fallback={<Box p={6}>Loading...</Box>}>
        <NewsPageContent />
      </Suspense>
    </AppLayout>
  )
}

export default NewsPage