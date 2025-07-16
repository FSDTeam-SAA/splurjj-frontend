"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import FirstContents from "../[categoryId]/[subcategoryId]/_components/FeaturedArticle";
import SecondContents from "../[categoryId]/[subcategoryId]/_components/ContentCard";
import Horizontal from "@/components/adds/horizontal";
import Vertical from "@/components/adds/vertical";

interface Post {
  id: number;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  category_name: string;
  sub_category_name: string;
  image1: string | null;
  imageLink: string | null;
  advertising_image: string | null;
  advertisingLink: string | null;
  status: string;
  tags: string[];
  category_id: number;
  subcategory_id: number;
}

interface ContentAllDataTypeResponse {
  success: boolean;
  data: Post[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

const AllContentContainer = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string;
  subcategoryId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(
    async (page: number, isLoadMore = false) => {
      if (isLoadMore) setLoadingMore(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?page=${page}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const result: ContentAllDataTypeResponse = await response.json();
        if (!result.success) {
          throw new Error("API returned unsuccessful response");
        }

        const newPosts = result.data || [];
        const filteredPosts = newPosts.map((post) => ({
          ...post,
          tags: post.tags.filter((tag) => tag.trim() !== ""),
        }));

        setAllPosts((prev) => (isLoadMore ? [...prev, ...filteredPosts] : filteredPosts));
        setHasMore(page < result.meta.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false);
        setError("Failed to load more content. Please try again later.");
      } finally {
        if (isLoadMore) setLoadingMore(false);
      }
    },
    [categoryId, subcategoryId],
  );

  useEffect(() => {
    setCurrentPage(1);
    setAllPosts([]);
    setHasMore(true);
    setShowAllPosts(false);
    fetchData(1, false);
  }, [categoryId, subcategoryId, fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingMore) {
          setShowAllPosts(true);
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchData(nextPage, true);
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 },
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) observer.observe(currentObserverRef);
    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [currentPage, hasMore, loadingMore, fetchData]);

  if (!allPosts.length && !loadingMore) {
    return (
      <div className="container mx-auto px-4">
        <TableSkeletonWrapper aria-label="Loading content" />
      </div>
    );
  }

  if (!allPosts.length && !loadingMore) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-8" role="alert" aria-live="polite">
          <p className="text-lg text-gray-700">No content available for this category and subcategory.</p>
        </div>
      </div>
    );
  }

  const firstContents = allPosts.length > 5 ? allPosts.slice(5) : [];
  const secondContents = showAllPosts ? allPosts : allPosts.slice(0, 5);

  return (
    <div>
      <div className="container grid grid-cols-8 gap-4 pt-16 pb-2">
        <div className="col-span-8 md:col-span-3 lg:col-span-2">
          <div className="sticky top-[120px] mb-2">
            <Vertical />
          </div>
        </div>
        <div className="col-span-8 md:col-span-5 lg:col-span-6 pb-16">
          {!showAllPosts && <FirstContents posts={firstContents} />}
          <SecondContents posts={secondContents} />
          <div ref={observerRef} className="h-10" />
          {loadingMore && (
            <div className="flex justify-center items-center py-8" role="status" aria-live="polite">
              <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
              <span className="ml-2 text-gray-700">Loading more content...</span>
            </div>
          )}
          {error && (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          )}
          {!hasMore && allPosts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-700">You&apos;ve reached the end of the content.</p>
            </div>
          )}
        </div>
      </div>
      <Horizontal />
    </div>
  );
};

export default AllContentContainer;