"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

interface BlogPost {
  id: number;
  category_id: number;
  subcategory_id: number;
  category_name: string;
  sub_category_name: string;
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string;
  advertising_image: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  imageLink: string;
  advertisingLink: string;
  user_id: number;
  status: string;
}

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: BlogPost[];
// }

function ArtCulture() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dynamic-splurjj.scaleupdevagency.com/api/home/Art%20&%20Culture"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data.data); // Adjust according to your API response structure
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (posts.length === 0) return <div className="error">No posts found</div>;

  const firstPost = posts[0]; // Get the first post
  const secondPost = posts[1]; // Get the first post
  const thardPost = posts[2]; // Get the first post
  const forthPost = posts[3]; // Get the first post
  const fivePost = posts[4]; // Get the first post
  console.log(thardPost);

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg"; // Fallback image
    if (path.startsWith("http")) return path; // Already full URL
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`; // Construct full URL
  };

  return (
    <div className="container">
      <div className="py-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-[1.5px]">
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              Read
            </button>
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {firstPost.category_name || ""}
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
        <div className="grid grid-cols-1 md:grid-cols-2 rounded py-4">
          <div className="bg-[#DDD618] max-h-[455px] flex items-center justify-center rounded-l-md">
            <p
              dangerouslySetInnerHTML={{ __html: firstPost.heading ?? "" }}
              className="text-[40px] font-bold "
            />
          </div>

          <div>
            <div className="">
              <Image
                src={getImageUrl(firstPost.image1)}
                alt={firstPost.heading || "blog image"}
                width={888}
                height={552}
                className="w-full h-[455px] object-cover rounded-r-md"
                priority
              />
            </div>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] pt-4 text-end">
              {firstPost.author} - {firstPost.date}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="">
              <Image
                src={getImageUrl(firstPost.image1)}
                alt={secondPost.heading || "blog image"}
                width={888}
                height={552}
                className="w-full h-[455px] object-cover rounded-r-md"
                priority
              />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read
                </button>
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  {secondPost.category_name || ""}
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
          </div>
          <div>
            <div className="flex items-center gap-[1.5px]">
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                Read
              </button>
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {thardPost.category_name || ""}
              </button>
            </div>
            <div className="">
              <Image
                src={getImageUrl(firstPost.image1)}
                alt={thardPost.heading || "blog image"}
                width={888}
                height={552}
                className="w-full h-[455px] object-cover rounded-r-md"
                priority
              />
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: firstPost.heading ?? "" }}
              className=""
            />
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {firstPost.author} - {firstPost.date}
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
          </div>
          <div>{forthPost.heading}</div>
          <div>{fivePost.heading}</div>
        </div>
      </div>
    </div>
  );
}

export default ArtCulture;
