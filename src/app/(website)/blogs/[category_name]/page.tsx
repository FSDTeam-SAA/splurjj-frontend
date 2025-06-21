"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaRegCommentDots,
  FaTwitter,
} from "react-icons/fa";
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

function Page({ params }: { params: { category_name: string } }) {
  console.log("Category Name:", params.category_name);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null); // Track which post's share menu is open

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use params.category_name in the API URL
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/${params.category_name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data.data || []); // Assuming data.data contains the posts array
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.category_name]); // Add params.category_name as a dependency

  console.log("PPPPPPPPPPPPPPPP", posts);

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

  // const getImageUrl = (path: string | null): string => {
  //   if (!path) return "/assets/videos/blog1.jpg";
  //   if (path.startsWith("http")) return path;
  //   return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  // };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (posts.length === 0) return <div className="error">No posts found</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 relative">
            <span
              onClick={() => handleShare(post)} // Use handleShare with the current post
              className="cursor-pointer"
            >
              <RiShareForwardLine className="w-6 h-6 icon" />
            </span>
            {showShareMenu === post.id && (
              <div className="absolute top-8 left-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10">
                <FaTwitter
                  className="w-6 h-6 cursor-pointer text-blue-500"
                  onClick={() =>
                    shareToTwitter(
                      getShareUrl(
                        post.category_id,
                        post.subcategory_id,
                        post.id
                      ),
                      post.heading // Use post.heading instead of fivePost
                    )
                  }
                />
                <FaFacebook
                  className="w-6 h-6 cursor-pointer text-blue-700"
                  onClick={() =>
                    shareToFacebook(
                      getShareUrl(
                        post.category_id,
                        post.subcategory_id,
                        post.id
                      )
                    )
                  }
                />
                <FaLinkedin
                  className="w-6 h-6 cursor-pointer text-blue-600"
                  onClick={() =>
                    shareToLinkedIn(
                      getShareUrl(
                        post.category_id,
                        post.subcategory_id,
                        post.id
                      ),
                      post.heading
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
              href=""
            >
              <p
                dangerouslySetInnerHTML={{ __html: post.heading ?? "" }}
                className="text-[24px] font-medium"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
