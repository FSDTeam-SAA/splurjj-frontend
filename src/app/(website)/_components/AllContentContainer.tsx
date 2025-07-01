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




// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useState, useRef, useEffect, useCallback } from "react";
// import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
// import FirstContents from "../[categoryId]/[subcategoryId]/_components/FeaturedArticle";
// import SecondContents from "../[categoryId]/[subcategoryId]/_components/ContentCard";
// import Horizontal from "@/components/adds/horizontal";
// import Vertical from "@/components/adds/vertical";
// import { Loader2 } from "lucide-react";

// // Define the expected Post type
// interface Post {
//   id: number;
//   heading: string;
//   sub_heading: string;
//   author: string;
//   date: string;
//   body1: string;
//   category_name: string;
//   sub_category_name: string;
//   image1: string | null;
//   imageLink: string | null;
//   advertising_image: string | null;
//   advertisingLink: string | null;
//   status: string;
//   tags: string[];
//   category_id: number;
//   subcategory_id: number;
// }

// // Define the expected API response type
// interface ContentAllDataTypeResponse {
//   success: boolean;
//   data: {
//     current_page: number;
//     data: Post[];
//     last_page: number;
//     total: number;
//     per_page: number;
//   };
// }

// const AllContentContainer = ({
//   categoryId,
//   subcategoryId,
// }: {
//   categoryId: string;
//   subcategoryId: string;
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [totalItems, setTotalItems] = useState(0);
//   const observerRef = useRef<HTMLDivElement>(null);
//   const limit = 2;

//   // Fetch data using useQuery with useCallback to memoize the fetch function
//   const fetchData = useCallback(
//     async (page: number, isLoadMore = false) => {
//       try {
//         if (isLoadMore) {
//           setLoadingMore(true);
//         }

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?page=1&limit=1`
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch content: ${response.statusText}`);
//         }

//         const data: ContentAllDataTypeResponse = await response.json();

//         if (isLoadMore) {
//           setPosts((prev) => [...prev, ...data.data.data]);
//         } else {
//           setPosts(data.data.data);
//         }

//         // Update pagination metadata
//         setTotalItems(data.data.total);
//         setHasMore(page < data.data.last_page);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       } finally {
//         setLoadingMore(false);
//       }
//     },
//     [categoryId, subcategoryId, limit]
//   );

//   // Initial data fetch
//   const { isLoading } = useQuery<ContentAllDataTypeResponse>({
//     queryKey: ["all-content", categoryId, subcategoryId, currentPage],
//     queryFn: () => fetchData(currentPage),
//     retry: 2,
//     staleTime: 5 * 60 * 1000,
//   });

//   // Set up Intersection Observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting && hasMore && !loadingMore && !isLoading) {
//           const nextPage = currentPage + 1;
//           setCurrentPage(nextPage);
//           fetchData(nextPage, true);
//         }
//       },
//       {
//         root: null,
//         rootMargin: "100px",
//         threshold: 0.1,
//       }
//     );

//     const currentObserverRef = observerRef.current;
//     if (currentObserverRef) {
//       observer.observe(currentObserverRef);
//     }

//     return () => {
//       if (currentObserverRef) {
//         observer.unobserve(currentObserverRef);
//       }
//     };
//   }, [currentPage, hasMore, loadingMore, isLoading, fetchData]);

//   if (isLoading && posts.length === 0) {
//     return (
//       <div className="container mx-auto px-4">
//         <TableSkeletonWrapper aria-label="Loading content" />
//       </div>
//     );
//   }

//   if (!posts.length) {
//     return (
//       <div className="container mx-auto px-4">
//         <div className="text-center py-8" role="alert" aria-live="polite">
//           <p className="text-lg text-muted-foreground">
//             No content available for this category and subcategory.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Split posts for FirstContents and SecondContents
//   const firstContents = posts.slice(0, 5);
//   const secondContents = posts.slice(5, 8);

//   return (
//     <div className="">
//       {/* Main Content Area */}
//       <div className="">
//         <div className="container">
//           <div className="grid grid-cols-1 md:grid-cols-8 gap-4 pt-16 pb-2">
//             {/* Main content */}
//             <div className="col-span-1 md:col-span-6 pb-16">
//               <FirstContents posts={firstContents} />
//             </div>

//             {/* Sticky sidebar */}
//             <div className="col-span-1 md:col-span-2">
//               <div className="sticky top-[120px] mb-2">
//                 <Vertical />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="">
//           <Horizontal />
//         </div>
//         <div className="container grid grid-cols-1 md:grid-cols-8 gap-4 pt-16 pb-2">
//           {/* Sticky sidebar */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="sticky top-[120px] mb-2">
//               <Vertical />
//             </div>
//           </div>
//           {/* Main content */}
//           <div className="col-span-1 md:col-span-6 pb-16">
//             <SecondContents posts={secondContents} />
//           </div>
//         </div>

//         {/* Loading indicator for infinite scroll */}
//         {loadingMore && (
//           <div className="flex justify-center items-center py-8">
//             <Loader2 className="w-8 h-8 animate-spin" />
//             <span className="ml-2 text-muted-foreground">Loading more content...</span>
//           </div>
//         )}

//         {/* Intersection observer target */}
//         <div ref={observerRef} className="h-10" />
//       </div>
//     </div>
//   );
// };

// export default AllContentContainer;

