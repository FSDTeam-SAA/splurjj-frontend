"use client"
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect, useRef, useCallback } from "react"
import { Loader2 } from "lucide-react"
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper"
import FirstContents from "../[categoryId]/[subcategoryId]/_components/FeaturedArticle"
import SecondContents from "../[categoryId]/[subcategoryId]/_components/ContentCard"
import Horizontal from "@/components/adds/horizontal"
import Vertical from "@/components/adds/vertical"

// Define the expected API response types
interface Post {
  id: number
  heading: string
  sub_heading: string
  author: string
  date: string
  body1: string
  category_name: string
  sub_category_name: string
  image1: string | null
  imageLink: string | null
  advertising_image: string | null
  advertisingLink: string | null
  status: string
  tags: string[]
  category_id: number
  subcategory_id: number
}

interface ContentAllDataTypeResponse {
  success: boolean
  data: {
    current_page: number
    data: Post[]
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: Array<{
      url: string | null
      label: string
      active: boolean
    }>
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
  }
  current_page: number
  total_pages: number
  per_page: number
  total: number
}

const AllContentContainer = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string
  subcategoryId: string
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showAllPosts, setShowAllPosts] = useState(false) // New state to control display mode
  const observerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, refetch } = useQuery<ContentAllDataTypeResponse>({
    queryKey: ["all-content", categoryId, subcategoryId, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?page=${currentPage}`,
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`)
      }
      return response.json()
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    enabled: false, // We'll manually trigger this
  })

  // Function to fetch data for infinite scroll
  const fetchData = useCallback(
    async (page: number, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMore(true)
      }

      try {
        console.log(`Fetching page ${page} for categoryId: ${categoryId}, subcategoryId: ${subcategoryId}`)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?page=${page}`,
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`)
        }

        const result: ContentAllDataTypeResponse = await response.json()
        console.log(`API Response for page ${page}:`, result)

        // Check if the API call was successful
        if (!result.success) {
          throw new Error("API returned unsuccessful response")
        }

        const newPosts = result.data.data || []
        console.log(
          `New posts from page ${page}:`,
          newPosts.length,
          newPosts.map((p) => p.id),
        )

        if (isLoadMore) {
          // Append new posts to existing ones
          setAllPosts((prev) => {
            const updated = [...prev, ...newPosts]
            console.log(`After appending page ${page}, total posts:`, updated.length)
            return updated
          })
        } else {
          // Initial load - replace all posts
          setAllPosts(newPosts)
          console.log(`Initial load - set ${newPosts.length} posts`)
        }

        // Check if there are more pages using the nested pagination info
        const hasMorePages = page < result.data.last_page
        console.log(`Page ${page} of ${result.data.last_page}, hasMore: ${hasMorePages}`)
        setHasMore(hasMorePages)
      } catch (error) {
        console.error("Error fetching data:", error)
        // Set hasMore to false on error to prevent infinite retry
        setHasMore(false)
      } finally {
        if (isLoadMore) {
          setLoadingMore(false)
        }
      }
    },
    [categoryId, subcategoryId],
  )

  // Initial data load
  useEffect(() => {
    console.log(`Initial load triggered for categoryId: ${categoryId}, subcategoryId: ${subcategoryId}`)
    setCurrentPage(1)
    setAllPosts([])
    setHasMore(true)
    setShowAllPosts(false) // Reset to split view
    fetchData(1, false)
  }, [categoryId, subcategoryId, fetchData])

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loadingMore && !isLoading) {
          if (!showAllPosts) {
            // Switch to showing all posts when user scrolls
            setShowAllPosts(true)
          }
          const nextPage = currentPage + 1
          console.log(`Intersection Observer triggered - loading page ${nextPage}`)
          setCurrentPage(nextPage)
          fetchData(nextPage, true)
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [currentPage, hasMore, loadingMore, isLoading, fetchData, showAllPosts])

  // Initial loading state
  if (isLoading && allPosts.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <TableSkeletonWrapper aria-label="Loading content" />
      </div>
    )
  }

  // No content state - check after initial load attempt
  if (!isLoading && allPosts.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-8" role="alert" aria-live="polite">
          <p className="text-lg text-muted-foreground">No content available for this category and subcategory.</p>
        </div>
      </div>
    )
  }

  // Add debugging logs
  // console.log("=== RENDER DEBUG ===")
  // console.log("Total allPosts:", allPosts.length)
  // console.log("showAllPosts:", showAllPosts)
  // console.log(
  //   "allPosts IDs:",
  //   allPosts.map((p) => p.id),
  // )

  // Logic for splitting posts
  const firstContents = allPosts.slice(5) // Posts from index 5 onwards for FirstContents
  const secondContents = showAllPosts ? allPosts : allPosts.slice(0, 5) // All posts if showAllPosts, otherwise first 5

  // console.log(
  //   "firstContents (index 5 onwards):",
  //   firstContents.length,
  //   "IDs:",
  //   firstContents.map((p) => p.id),
  // )
  // console.log(
  //   `secondContents (${showAllPosts ? "ALL POSTS" : "first 5"}):`,
  //   secondContents.length,
  //   "IDs:",
  //   secondContents.map((p) => p.id),
  // )
  // console.log("=== END RENDER DEBUG ===")

  return (
    <div className="">

      {/* Main Content Area */}
      <div className="">
        {/* Show FirstContents only when not in showAllPosts mode */}
        {!showAllPosts && (
          <div className="container">
            <div className="grid grid-cols-8 gap-4 pt-16 pb-2">
              {/* Main content */}
              <div className="col-span-8 md:col-span-5 lg:col-span-6 pb-16">
                <FirstContents posts={firstContents} />
              </div>
              {/* Sticky sidebar */}
              <div className="col-span-8 md:col-span-3 lg:col-span-2">
                <div className="sticky top-[120px] mb-2">
                  <Vertical />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="">
          <Horizontal />
        </div>

        <div className="container grid grid-cols-8 gap-4 pt-16 pb-2">
          {/* Sticky sidebar */}
          <div className="col-span-8 md:col-span-3 lg:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Vertical />
            </div>
          </div>
          {/* Main content */}
          <div className="col-span-8 md:col-span-5 lg:col-span-6 pb-16">
            <SecondContents posts={secondContents} />

            {/* Intersection Observer Target */}
            <div ref={observerRef} className="h-10 bg-red-200">
              Observer Target
            </div>

            {/* Loading indicator for infinite scroll */}
            {loadingMore && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading more content...</span>
              </div>
            )}

            {/* End of content indicator */}
            {!hasMore && allPosts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You&apos;ve reached the end of the content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllContentContainer
