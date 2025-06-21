"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

// Interface for ContentItem
interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  category_name?: string; // Added property to fix the error
  sub_category_name?: string; // Added property to fix the error
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
  

  const firstPost = contents[0]; // Get the first post
  const secondPost = contents[1]; // Get the first post
  const thardPost = contents[2]; // Get the first post
  const forthPost = contents[3]; // Get the first post

  // Helper function to remove HTML tags

  // Function to get complete image URL
  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg"; // Fallback image
    if (path.startsWith("http")) return path; // Already full URL
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`; // Construct full URL
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-[1.5px]">
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {firstPost.category_name || ""}
              </button>
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {firstPost.sub_category_name || ""}
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
          <div className="space-y-4">
            <p
              dangerouslySetInnerHTML={{ __html: firstPost.heading ?? "" }}
              className="text-[60px] font-bold font-manrope leading-[120%] tracking-[0%] text-[#131313]"
            />
            <p
              dangerouslySetInnerHTML={{ __html: firstPost.body1 ?? "" }}
              className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242]"
            />

            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {firstPost.author} - {firstPost.date}
            </p>
          </div>
        </div>
        <div className="mt-16">
          <div>
            <Image
              src={getImageUrl(firstPost.advertising_image)}
              alt="advertising image"
              width={336}
              height={529}
              className="w-full h-[500px] object-cover rounded-[8px]"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-24 pb-8">
        <div>
          <div className="flex items-center gap-[1.5px] pb-2">
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {secondPost.category_name || ""}
            </button>
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {secondPost.sub_category_name || ""}
            </button>
          </div>
          <div className="">
            <Image
              src={getImageUrl(secondPost.image1)}
              alt={secondPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: secondPost.heading ?? "" }}
            className="text-[24px] font-medium"
          />
          <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
            {secondPost.author} - {secondPost.date}
          </p>

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
          <p
            dangerouslySetInnerHTML={{ __html: secondPost.body1 ?? "" }}
            className="text-sm font-normal font-manrope leading-[120%] tracking-[0%] text-[#424242] line-clamp-3 overflow-hidden"
          />
        </div>
        <div>
          <div className="flex items-center gap-[1.5px] pb-2">
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {thardPost.category_name || ""}
            </button>
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {thardPost.sub_category_name || ""}
            </button>
          </div>
          <div className="">
            <Image
              src={getImageUrl(thardPost.image1)}
              alt={thardPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: thardPost.heading ?? "" }}
            className="text-[24px] font-medium"
          />
          <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
            {thardPost.author} - {thardPost.date}
          </p>

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
          <p
            dangerouslySetInnerHTML={{ __html: thardPost.body1 ?? "" }}
            className="text-sm font-normal font-manrope leading-[120%] tracking-[0%] text-[#424242] line-clamp-3 overflow-hidden"
          />
        </div>
        <div>
          <div className="flex items-center gap-[1.5px] pb-2">
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {forthPost.category_name || ""}
            </button>
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {forthPost.sub_category_name || ""}
            </button>
          </div>
          <div className="">
            <Image
              src={getImageUrl(forthPost.image1)}
              alt={forthPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: forthPost.heading ?? "" }}
            className="text-[24px] font-medium"
          />
          <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
            {forthPost.author} - {forthPost.date}
          </p>

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
          <p
            dangerouslySetInnerHTML={{ __html: forthPost.body1 ?? "" }}
            className="text-sm font-normal font-manrope leading-[120%] tracking-[0%] text-[#424242] line-clamp-3 overflow-hidden"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Link
          href="/all-contents"
          className="bg-primary py-[10px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white"
        >
          EXPLORE MORE
        </Link>
      </div>
    </div>
  );
};

export default AllContents;
