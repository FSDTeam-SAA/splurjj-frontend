// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import HeroSection from "../../_components/Hero/HeroSection";
// import FourthBlog from "@/app/(website)/videos/_components/FourthBlog";

// interface Category {
//   id: number;
//   category_name: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Subcategory {
//   id: number;
//   category_id: number;
//   name: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Content {
//   id: number;
//   category_id: number;
//   subcategory_id: number;
//   heading: string;
//   author: string;
//   date: string;
//   sub_heading: string;
//   body1: string;
//   image1: string;
//   advertising_image: string;
//   tags: string[] | null;
//   created_at: string;
//   updated_at: string;
//   image1_url: string;
//   advertising_image_url: string;
//   category_name: string;
//   subcategory_name: string;
//   category: Category;
//   subcategory: Subcategory;
// }

// interface ApiResponse {
//   status: boolean;
//   data: Content[];
//   meta?: {
//     current_page: number;
//     per_page: number;
//     total_items: number;
//     total_pages: number;
//   };
// }

// function Page() {
//   const params = useParams();
//   const categoryId = params?.categoryId;
//   const subcategoryId = params?.subcategoryId;

//   const [contents, setContents] = useState<Content[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (categoryId && subcategoryId) {
//       fetchContents();
//     }
//   }, [categoryId, subcategoryId]);

//   const fetchContents = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}`
//       );

//       if (!response.ok) {
//         throw new Error(`API responded with status: ${response.status}`);
//       }

//       const data: ApiResponse = await response.json();
//       console.log("API Response:", data);

//       if (data.status) {
//         setContents(data.data || []);
//       } else {
//         throw new Error("API returned status false");
//       }
//     } catch (error) {
//       console.error("Error fetching contents:", error);
//       setError("Failed to load content. Please try again later.");
//       setContents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error! </strong>
//         <span className="block sm:inline">{error}</span>
//       </div>
//     );
//   }

//   if (!contents.length) {
//     return (
//       <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">No content found</strong>
//         <span className="block sm:inline">There are no articles available for this category.</span>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <HeroSection />
//       <FourthBlog />

//     </div>
//   );
// }

// export default Page;

import React from "react";
import AllContentContainer from "../../_components/AllContentContainer";

const AllContent = ({params}: {params: {categoryId: string, subcategoryId: string}}) => {
  return (
    <div>
      <AllContentContainer categoryId={params.categoryId} subcategoryId={params.subcategoryId}/>
    </div>
  );
};

export default AllContent;
