"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import SplurjjPagination from "@/components/ui/SplurjjPagination";
import FirstContents from "../[categoryId]/[subcategoryId]/_components/FeaturedArticle";
import SecondContents from "../[categoryId]/[subcategoryId]/_components/ContentCard";
import Horizontal from "@/components/adds/horizontal";
import Vertical from "@/components/adds/vertical";

// Define the expected API response types
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
  category_id: number; // Added to match the expected Post type
  subcategory_id: number; // Added to match the expected Post type
}

interface ContentAllDataTypeResponse {
  data: {
    data: Post[];
    pagination?: {
      total: number;
      total_pages: number;
    };
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

  const { data, isLoading } = useQuery<ContentAllDataTypeResponse>({
    queryKey: ["all-content", categoryId, subcategoryId, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?paginate_count=9&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`);
      }
      return response.json();
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <TableSkeletonWrapper aria-label="Loading content" />
      </div>
    );
  }

  // Check for nested data structure
  if (!data?.data?.data || data.data.data.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-8" role="alert" aria-live="polite">
          <p className="text-lg text-muted-foreground">
            No content available for this category and subcategory.
          </p>
        </div>
      </div>
    );
  }

  const { data: posts, pagination } = data.data;
  const totalPages = pagination?.total_pages ?? 1;
  const totalItems = pagination?.total ?? 0;
  const firstContents = posts.slice(0, 5); // First 4 posts for FirstContents
  const secondContents = posts.slice(5, 8); // Next 4 posts for SecondContents

  return (
    <div className="">
      {/* Main Content Area */}
      <div className="">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 pt-16">
            {/* Main content */}
            <div className="col-span-1 md:col-span-6 pb-16">
              <FirstContents posts={firstContents} />
            </div>

            {/* Sticky sidebar */}
            <div className="col-span-1 md:col-span-2">
              <div className="sticky top-[120px] mb-2">
                <Horizontal />
              </div>
            </div>
          </div>
        </div>
        <div className="">
           <Vertical />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 pt-16">
          {/* Sticky sidebar */}
          <div className="col-span-1 md:col-span-2">
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
          {/* Main content */}
          <div className="col-span-1 md:col-span-6 pb-16">
            <SecondContents posts={secondContents} />
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <div className="text-sm text-muted-foreground" aria-live="polite">
              Showing {posts.length} of {totalItems} items
            </div>
            <SplurjjPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              aria-label="Content pagination"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContentContainer;
