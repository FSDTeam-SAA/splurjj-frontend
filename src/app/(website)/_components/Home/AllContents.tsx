"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import AllContentsCarousel from "./AllContentsCarousel";
import Link from "next/link";

// Interface for ContentItem
interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  category_name?: string; // Added property to fix the error
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string | null;
  advertising_image: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status: string;
}

// Interface for API Response
interface ApiResponse {
  success: boolean;
  message: string;
  data: ContentItem[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

const AllContents: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]); // Changed to store all content
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shows`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setContents(data.data); // Store all content items
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contents.length) return <div>No content found</div>;

  // Get the first content item for display
  const content = contents[0];


  // Helper function to remove HTML tags

  // Function to get complete image URL
  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg"; // Fallback image
    if (path.startsWith("http")) return path; // Already full URL
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`; // Construct full URL
  };

  return (
    <div>
      <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px] md:gap-[50px] lg:gap-[72px]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read
                </button>
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  {content.category_name || ""}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <RiShareForwardLine className="w-6 h-6 icon" />
                </span>
                <span>
                  <TbTargetArrow className="w-6 h-6 icon" />
                </span>
                <span>
                  <FaRegCommentDots className="w-6 h-6 icon" />
                </span>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: content.heading ?? "" }}
              className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6"
            />
            <p
              dangerouslySetInnerHTML={{ __html: content.body1 ?? "" }}
              className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6"
            />

            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {content.author} - {content.date}
            </p>
            <div className="mt-[30px] md:mt-[50px] lg:mt-[72px]">
              <Image
                src={getImageUrl(content.image1)}
                alt={(content.heading) || "blog image"}
                width={888}
                height={552}
                className="w-full h-[529px] object-cover rounded-[8px]"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-[30px] md:gap-[50px] lg:gap-[72px]">
            <div>
              <Image
                src={getImageUrl(content.advertising_image)}
                alt="advertising image"
                width={336}
                height={529}
                className="w-full h-[500px] object-cover rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Pass all contents or specific content to the carousel */}
        <AllContentsCarousel contents={contents} selectedIndex={1} />
      </div>
      <div>
        <Link href="/">More</Link>
      </div>
    </div>
  );
};

export default AllContents;