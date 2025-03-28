// WordPress API helper functions

export interface WordPressPost {
  id: number
  date: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  featured_media: number
  source_url?: string
  alt_text?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text?: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        slug: string
        taxonomy: string
      }>
    >
  }
  content?: {
    rendered: string
  }
  acf?: Record<string, any>
}

export interface WordPressResponse {
  posts: WordPressPost[]
  total: number
  totalPages?: number
}

// WordPress API base URL - replace with your WordPress site URL
const API_URL = process.env.WORDPRESS_API_URL ? `${process.env.WORDPRESS_API_URL}/wp-json` : "http://localhost:8000/wp-json"

/**
 * Fetch posts from WordPress API
 * @param endpoint - API endpoint (e.g., '/wp/v2/posts')
 * @returns Promise with posts and total pages
 */
export async function getPosts(endpoint: string): Promise<WordPressResponse> {
  try {
    // Make sure endpoint starts with a slash
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint
    }

    // Add wp/v2/posts if not already in the endpoint and it's not a media request
    if (!endpoint.includes("wp/v2/posts") && !endpoint.includes("wp/v2/media")) {
      endpoint = "/wp/v2/posts" + endpoint
    }

    const apiUrl = `${API_URL}${endpoint}`
    console.log("Fetching from WordPress API:", apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but received ${contentType}`)
    }

    if (!response.ok) {
      const errorText = await response.text()
      const statusCode = response.status
      const errorDetails = {
        status: statusCode,
        statusText: response.statusText,
        url: apiUrl,
        response: errorText
      }
      
      console.error('WordPress API Error:', JSON.stringify(errorDetails, null, 2))
      
      let errorMessage = `WordPress API Error (${statusCode})`
      if (statusCode === 404) {
        errorMessage = 'The requested content was not found'
      } else if (statusCode === 401) {
        errorMessage = 'Authentication failed - please check your credentials'
      } else if (statusCode === 403) {
        errorMessage = 'Access forbidden - you do not have permission to access this content'
      } else if (statusCode >= 500) {
        errorMessage = 'WordPress server error - please try again later'
      }
      
      throw new Error(`${errorMessage} - ${errorText}`)
    }

    const postsArray = await response.json()
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "1", 10)
    const total = Number.parseInt(response.headers.get("X-WP-Total") || "0", 10)

    // If the response is an array, wrap it in the expected format
    const result = {
      posts: Array.isArray(postsArray) ? postsArray : [],
      total: total || (Array.isArray(postsArray) ? postsArray.length : 0),
      totalPages: totalPages || 1
    }

    console.log(`Successfully fetched ${result.posts.length} posts from WordPress`)

    return result
  } catch (error) {
    console.error("Error fetching from WordPress:", error)
    return {
      posts: [],
      total: 0,
      totalPages: 1
    }
  }
}

/**
 * Get a single post by slug
 * @param slug - Post slug
 * @returns Promise with post data
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const { posts } = await getPosts(`/wp/v2/posts?slug=${slug}&_embed=true`)
    return posts[0] || null
  } catch (error) {
    console.error("Error fetching post by slug:", error)
    return null
  }
}

/**
 * Get categories from WordPress
 * @returns Promise with categories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/wp/v2/categories?per_page=100`)

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

/**
 * Get events from WordPress
 * @returns Promise with events posts
 */
export async function getEvents(): Promise<WordPressPost[]> {
  try {
    const { posts } = await getPosts("/wp/v2/posts?categories=3&_embed=true&per_page=5")
    return posts
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

/**
 * Get announcements from WordPress
 * @returns Promise with announcements posts
 */
export async function getAnnouncements(): Promise<WordPressPost[]> {
  try {
    const { posts } = await getPosts("/wp/v2/posts?categories=4&_embed=true&per_page=5")
    return posts
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return []
  }
}

/**
 * Get gallery images from WordPress
 * @returns Promise with gallery images
 */
export async function fetchGalleryImages(): Promise<WordPressPost[]> {
  try {
    const { posts } = await getPosts("/wp/v2/media?per_page=100&media_type=image&_embed=true")
    return posts
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }
}

