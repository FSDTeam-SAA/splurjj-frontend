"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa"; // Social media icons

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

function Video() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<BlogPost[]>([]);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null); // Track which post's share menu is open

  console.log(category)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/Video`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategory(data);
        setPosts(data.data);
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

  // Function to generate full shareable URL
  const getShareUrl = (
    categoryId: number,
    subcategoryId: number,
    postId: number
  ): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/${categoryId}/${subcategoryId}/${postId}`;
  };

  // Handle share button click
  const handleShare = async (post: BlogPost) => {
    const shareUrl = getShareUrl(
      post.category_id,
      post.subcategory_id,
      post.id
    );
    const shareData = {
      title: post.heading,
      text: post.sub_heading || "Check out this blog post!",
      url: shareUrl,
    };

    // Try Web Share API (mobile devices, modern browsers)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Toggle custom share menu for this post
      setShowShareMenu(showShareMenu === post.id ? null : post.id);
    }
  };

  // Social media share links
  const shareToTwitter = (url: string, text: string) => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareToFacebook = (url: string) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = (url: string, title: string) => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (posts.length === 0) return <div className="error">No posts found</div>;

  const firstPost = posts[0];
//   const secondPost = posts[1];
  const thardPost = posts[2];
  const thardPostCategoryId = thardPost?.category_id;
  const thardPostSubcategoryId = thardPost?.subcategory_id;
  const forthPost = posts[3];
  const fivePost = posts[4];
  const categoryId = fivePost?.category_id;
  const subcategoryId = fivePost?.subcategory_id;

  return (
    <div className="container">
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded py-4">
          <div className="bg-[#DDD618] max-h-[455px] flex items-center justify-center rounded-l-md">
            <p
              dangerouslySetInnerHTML={{ __html: firstPost.heading ?? "" }}
              className="text-[40px] font-bold"
            />
          </div>
          <div>
            <Image
              src={getImageUrl(firstPost.image1)}
              alt={firstPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-r-md"
              priority
            />
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-[1.5px]">
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {firstPost.category_name || ""}
            </button>
            <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
              {firstPost.sub_category_name || ""}
            </button>
          </div>
          <div className="flex items-center gap-2 relative">
            <span
              onClick={() => handleShare(firstPost)}
              className="cursor-pointer"
            >
              <RiShareForwardLine className="w-6 h-6 icon" />
            </span>
            {showShareMenu === firstPost.id && (
              <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                <FaTwitter
                  className="w-6 h-6 cursor-pointer text-blue-500"
                  onClick={() =>
                    shareToTwitter(
                      getShareUrl(
                        firstPost.category_id,
                        firstPost.subcategory_id,
                        firstPost.id
                      ),
                      firstPost.heading
                    )
                  }
                />
                <FaFacebook
                  className="w-6 h-6 cursor-pointer text-blue-700"
                  onClick={() =>
                    shareToFacebook(
                      getShareUrl(
                        firstPost.category_id,
                        firstPost.subcategory_id,
                        firstPost.id
                      )
                    )
                  }
                />
                <FaLinkedin
                  className="w-6 h-6 cursor-pointer text-blue-600"
                  onClick={() =>
                    shareToLinkedIn(
                      getShareUrl(
                        firstPost.category_id,
                        firstPost.subcategory_id,
                        firstPost.id
                      ),
                      firstPost.heading
                    )
                  }
                />
              </div>
            )}
            <span>
              <TbTargetArrow className="w-6 h-6 icon" />
            </span>
            <span>
              <FaRegCommentDots className="w-6 h-6 icon" />
            </span>
          </div>
          <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] pt-4">
            {firstPost.author} - {firstPost.date}
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: firstPost.body1 ?? "" }}
            className="text-sm font-normal font-manrope leading-[120%] tracking-[0%] text-[#424242] line-clamp-3 overflow-hidden"
          />
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Third Post */}
          <div className="max-h-[600px]">
            <div className="flex items-center gap-[1.5px] pb-2">
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {thardPost.category_name || ""}
              </button>
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {thardPost.sub_category_name || ""}
              </button>
            </div>
            <Image
              src={getImageUrl(thardPost.image1)}
              alt={thardPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
            <Link
              href={`/${thardPostCategoryId}/${thardPostSubcategoryId}/${thardPost?.id}`}
            >
              <p
                dangerouslySetInnerHTML={{ __html: thardPost.heading ?? "" }}
                className="text-[24px] font-medium"
              />
            </Link>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {thardPost.author} - {thardPost.date}
            </p>
            <div className="flex items-center gap-2 relative">
              <span
                onClick={() => handleShare(thardPost)}
                className="cursor-pointer"
              >
                <RiShareForwardLine className="w-6 h-6 icon" />
              </span>
              {showShareMenu === thardPost.id && (
                <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                  <FaTwitter
                    className="w-6 h-6 cursor-pointer text-blue-500"
                    onClick={() =>
                      shareToTwitter(
                        getShareUrl(
                          thardPost.category_id,
                          thardPost.subcategory_id,
                          thardPost.id
                        ),
                        thardPost.heading
                      )
                    }
                  />
                  <FaFacebook
                    className="w-6 h-6 cursor-pointer text-blue-700"
                    onClick={() =>
                      shareToFacebook(
                        getShareUrl(
                          thardPost.category_id,
                          thardPost.subcategory_id,
                          thardPost.id
                        )
                      )
                    }
                  />
                  <FaLinkedin
                    className="w-6 h-6 cursor-pointer text-blue-600"
                    onClick={() =>
                      shareToLinkedIn(
                        getShareUrl(
                          thardPost.category_id,
                          thardPost.subcategory_id,
                          thardPost.id
                        ),
                        thardPost.heading
                      )
                    }
                  />
                </div>
              )}
              <span>
                <TbTargetArrow className="w-6 h-6 icon" />
              </span>
              <span>
                <FaRegCommentDots className="w-6 h-6 icon" />
              </span>
            </div>
          </div>

          {/* Fourth Post */}
          <div className="max-h-[600px]">
            <div className="flex items-center gap-[1.5px] pb-2">
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {forthPost.category_name || ""}
              </button>
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {forthPost.sub_category_name || ""}
              </button>
            </div>
            <Image
              src={getImageUrl(forthPost.image1)}
              alt={forthPost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
            <Link
              href={`/${thardPostCategoryId}/${thardPostSubcategoryId}/${forthPost?.id}`}
            >
              <p
                dangerouslySetInnerHTML={{ __html: forthPost.heading ?? "" }}
                className="text-[24px] font-medium"
              />
            </Link>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {forthPost.author} - {forthPost.date}
            </p>
            <div className="flex items-center gap-2 relative">
              <span
                onClick={() => handleShare(forthPost)}
                className="cursor-pointer"
              >
                <RiShareForwardLine className="w-6 h-6 icon" />
              </span>
              {showShareMenu === forthPost.id && (
                <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                  <FaTwitter
                    className="w-6 h-6 cursor-pointer text-blue-500"
                    onClick={() =>
                      shareToTwitter(
                        getShareUrl(
                          forthPost.category_id,
                          forthPost.subcategory_id,
                          forthPost.id
                        ),
                        forthPost.heading
                      )
                    }
                  />
                  <FaFacebook
                    className="w-6 h-6 cursor-pointer text-blue-700"
                    onClick={() =>
                      shareToFacebook(
                        getShareUrl(
                          forthPost.category_id,
                          forthPost.subcategory_id,
                          forthPost.id
                        )
                      )
                    }
                  />
                  <FaLinkedin
                    className="w-6 h-6 cursor-pointer text-blue-600"
                    onClick={() =>
                      shareToLinkedIn(
                        getShareUrl(
                          forthPost.category_id,
                          forthPost.subcategory_id,
                          forthPost.id
                        ),
                        forthPost.heading
                      )
                    }
                  />
                </div>
              )}
              <span>
                <TbTargetArrow className="w-6 h-6 icon" />
              </span>
              <span>
                <FaRegCommentDots className="w-6 h-6 icon" />
              </span>
            </div>
          </div>

          {/* Fifth Post */}
          <div>
            <div className="flex items-center gap-[1.5px] pb-2">
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {fivePost.category_name || ""}
              </button>
              <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                {fivePost.sub_category_name || ""}
              </button>
            </div>
            <Image
              src={getImageUrl(fivePost.image1)}
              alt={fivePost.heading || "blog image"}
              width={888}
              height={552}
              className="w-full h-[455px] object-cover rounded-t-md"
              priority
            />
            <Link href={`/${categoryId}/${subcategoryId}/${fivePost?.id}`}>
              <p
                dangerouslySetInnerHTML={{ __html: fivePost.heading ?? "" }}
                className="text-[24px] font-medium"
              />
            </Link>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242]">
              {fivePost.author} - {fivePost.date}
            </p>
            <div className="flex items-center gap-2 relative">
              <span
                onClick={() => handleShare(fivePost)}
                className="cursor-pointer"
              >
                <RiShareForwardLine className="w-6 h-6 icon" />
              </span>
              {showShareMenu === fivePost.id && (
                <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                  <FaTwitter
                    className="w-6 h-6 cursor-pointer text-blue-500"
                    onClick={() =>
                      shareToTwitter(
                        getShareUrl(
                          fivePost.category_id,
                          fivePost.subcategory_id,
                          fivePost.id
                        ),
                        fivePost.heading
                      )
                    }
                  />
                  <FaFacebook
                    className="w-6 h-6 cursor-pointer text-blue-700"
                    onClick={() =>
                      shareToFacebook(
                        getShareUrl(
                          fivePost.category_id,
                          fivePost.subcategory_id,
                          fivePost.id
                        )
                      )
                    }
                  />
                  <FaLinkedin
                    className="w-6 h-6 cursor-pointer text-blue-600"
                    onClick={() =>
                      shareToLinkedIn(
                        getShareUrl(
                          fivePost.category_id,
                          fivePost.subcategory_id,
                          fivePost.id
                        ),
                        fivePost.heading
                      )
                    }
                  />
                </div>
              )}
              <span>
                <TbTargetArrow className="w-6 h-6 icon" />
              </span>
              <span>
                <FaRegCommentDots className="w-6 h-6 icon" />
              </span>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: fivePost.body1 ?? "" }}
              className="text-sm font-normal font-manrope leading-[120%] tracking-[0%] text-[#424242] line-clamp-3 overflow-hidden"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 relative">
            <span
              onClick={() => handleShare(fivePost)}
              className="cursor-pointer"
            >
              <RiShareForwardLine className="w-6 h-6 icon" />
            </span>
            {showShareMenu === fivePost.id && (
              <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                <FaTwitter
                  className="w-6 h-6 cursor-pointer text-blue-500"
                  onClick={() =>
                    shareToTwitter(
                      getShareUrl(
                        fivePost.category_id,
                        fivePost.subcategory_id,
                        fivePost.id
                      ),
                      fivePost.heading
                    )
                  }
                />
                <FaFacebook
                  className="w-6 h-6 cursor-pointer text-blue-700"
                  onClick={() =>
                    shareToFacebook(
                      getShareUrl(
                        fivePost.category_id,
                        fivePost.subcategory_id,
                        fivePost.id
                      )
                    )
                  }
                />
                <FaLinkedin
                  className="w-6 h-6 cursor-pointer text-blue-600"
                  onClick={() =>
                    shareToLinkedIn(
                      getShareUrl(
                        fivePost.category_id,
                        fivePost.subcategory_id,
                        fivePost.id
                      ),
                      fivePost.heading
                    )
                  }
                />
              </div>
            )}
            <span>
              <TbTargetArrow className="w-6 h-6 icon" />
            </span>
            <span>
              <FaRegCommentDots className="w-6 h-6 icon" />
            </span>
          </div>
          <div>
            <Link
              href={`/blogs/${firstPost.category_name}`}
              className="bg-primary py-[10px] px-[12px] rounded-[4px] text-sm font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white"
            >
              EXPLORE MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
