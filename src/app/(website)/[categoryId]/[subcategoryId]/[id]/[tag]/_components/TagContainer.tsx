"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import Link from "next/link";
import SplurjjPagination from "@/components/ui/SplurjjPagination";

// Define the expected shape of a blog post from the API
interface BlogPost {
  id: number;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  tags: string[];
  category_name: string;
  sub_category_name: string;
  image1: string;
  advertising_image: string;
  advertisingLink: null | string;
  imageLink: null | string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface BlogResponse {
  success: boolean;
  data: {
    current_page: number;
    data: BlogPost[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
  };
}

// Define props for TagContainer
interface TagContainerProps {
  categoryId: string;
  subcategoryId: string;
  id: string;
  tag: string;
}

const TagContainer: React.FC<TagContainerProps> = ({
  categoryId,
  subcategoryId,
  tag,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  // Fetch tag-specific posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/show-tags/${tag}?page=${currentPage}&limit=${limit}`,
        { cache: "no-store" } // Prevent caching for fresh data
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch tag posts: ${response.statusText}`);
      }
      const data: BlogResponse = await response.json();
      if (!data.success) {
        throw new Error("API request unsuccessful");
      }
      setPosts(data.data.data);
      setTotalPages(data.data.last_page); // Use last_page for consistency
      setTotalPosts(data.data.total);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [tag, currentPage]);

  if (isLoading) {
    return <div className="container py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container py-10">
        Error: {error}
        <button
          onClick={() => {
            setError(null);
            fetchPosts();
          }}
          className="ml-4 py-2 px-4 bg-primary text-white rounded-[4px]"
          aria-label="Retry fetching posts"
        >
          Retry
        </button>
      </div>
    );
  }

  // Fallback for no data
  if (!posts || posts.length === 0) {
    return (
      <div className="container py-10">
        No posts found for tag: <strong>{tag}</strong>
      </div>
    );
  }

  console.log(posts);
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {posts.map((post) => (
          <div key={post.id} className="">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read 
                </button>
                {/* Add Video button if body1 contains video content */}

                <Link
                  href={`/${categoryId}/${subcategoryId}/${post.id}`}
                  aria-label={`Watch video: ${post.heading}`}
                >
                  <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                    {post.category_name}
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Share post"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.heading,
                        url: `/${categoryId}/${subcategoryId}/${post.id}`,
                      });
                    } else {
                      console.log("Share post:", post.id);
                    }
                  }}
                >
                  <RiShareForwardLine className="w-6 h-6 text-black" />
                </button>
                <button
                  aria-label="Save post"
                  onClick={() => {
                    const savedPosts = JSON.parse(
                      localStorage.getItem("savedPosts") || "[]"
                    );
                    if (!savedPosts.includes(post.id)) {
                      savedPosts.push(post.id);
                      localStorage.setItem(
                        "savedPosts",
                        JSON.stringify(savedPosts)
                      );
                    }
                  }}
                >
                  <TbTargetArrow className="w-6 h-6 text-black" />
                </button>
                <Link
                  href={`/${categoryId}/${subcategoryId}/${post.id}#comment`}
                  aria-label={`Comment on post: ${post.heading}`}
                >
                  <FaRegCommentDots className="w-6 h-6 text-black" />
                </Link>
              </div>
            </div>

            <Link href={`/${categoryId}/${subcategoryId}/${post.id}`}>
              <h2
                dangerouslySetInnerHTML={{ __html: post.heading ?? "" }}
                className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6"
              />
            </Link>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] mt-4 md:mt-5 lg:mt-6">
              Credits - {post.date}
            </p>
            <div className="mt-4 md:mt-5 lg:mt-6">
              <Image
                src={post.image1 || "/assets/videos/blog1.jpg"}
                alt={post.heading}
                width={458}
                height={346}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="w-full h-[346px] object-cover rounded-[8px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls (Styled like the example) */}
      {totalPages > 10 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {posts.length} of {totalPosts} posts
          </div>
          <div>
            <SplurjjPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagContainer;
