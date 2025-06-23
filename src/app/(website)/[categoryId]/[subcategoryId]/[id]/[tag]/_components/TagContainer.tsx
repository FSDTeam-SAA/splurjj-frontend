"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaRegCommentDots,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import Link from "next/link";
import SplurjjPagination from "@/components/ui/SplurjjPagination";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper"; // Assuming you have this component

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
  image1: string | null; // Allow null for consistency
  advertising_image: string | null;
  advertisingLink: string | null;
  imageLink: string | null;
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
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

// Define props for TagContainer
interface TagContainerProps {
  categoryId: string;
  subcategoryId: string;
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
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);
  const limit = 10;

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/fallback-image.jpg"; // Fallback image
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  const getShareUrl = (
    categoryName: string,
    subCategoryName: string,
    postId: number
  ): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const normalizedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    const normalizedSubCategory = subCategoryName
      .toLowerCase()
      .replace(/\s+/g, "-");
    return `${baseUrl}/blogs/${normalizedCategory}/${normalizedSubCategory}/${postId}`;
  };

  const handleShare = async (post: BlogPost) => {
    const shareUrl = getShareUrl(
      post.category_name,
      post.sub_category_name,
      post.id
    );
    const shareData = {
      title: post.heading.replace(/<[^>]+>/g, ""), // Strip HTML
      text:
        post.sub_heading?.replace(/<[^>]+>/g, "") ||
        "Check out this blog post!",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowShareMenu(showShareMenu === post.id ? null : post.id);
    }
  };

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

  // const isVideoContent = (body: string): boolean => {
  //   // Simple check for video content (e.g., <video> tag or video URL)
  //   return /<video|(\.mp4|\.webm|\.ogg)/i.test(body);
  // };

  // Fetch tag-specific posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/show-tags/${tag}?page=${currentPage}&limit=${limit}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch tag posts: ${response.statusText}`);
      }
      const data: BlogResponse = await response.json();
      if (!data.success) {
        throw new Error("API request unsuccessful");
      }
      setPosts(data.data.data);
      setTotalPages(data.data.last_page);
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
    return (
      <div className="container py-10">
        <TableSkeletonWrapper aria-label="Loading tag posts" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="text-center" role="alert" aria-live="polite">
          Error: {error}
          <button
            onClick={() => {
              setError(null);
              setCurrentPage(1); // Reset to page 1 on retry
              fetchPosts();
            }}
            className="ml-4 py-2 px-4 bg-primary text-white rounded-[4px]"
            aria-label="Retry fetching posts"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="container py-10">
        <div className="text-center" role="alert" aria-live="polite">
          No posts found for tag: <strong>{tag}</strong>
        </div>
      </div>
    );
  }

  console.log("Posts received in TagContainer:", posts);

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article
            key={post.id}
            className=""
            aria-labelledby={`post-heading-${post.id}`}
          >
            <div className="space-y-2">
              <div>
                <Image
                  src={getImageUrl(post.image1)}
                  alt={post.heading.replace(/<[^>]+>/g, "")} // Strip HTML
                  width={458}
                  height={346}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-[346px] object-cover rounded-t-lg"
                />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs/${post.category_name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${post.sub_category_name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${post.id}`}
                  className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white"
                  aria-label={`Watch video: ${post.heading.replace(
                    /<[^>]+>/g,
                    ""
                  )}`}
                >
                  {post.category_name || "Category"}
                </Link>
                <Link
                  href={`/${categoryId}/${subcategoryId}`}
                  className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white"
                  aria-label={`Watch video: ${post.heading.replace(
                    /<[^>]+>/g,
                    ""
                  )}`}
                >
                  {post.sub_category_name || "Subcategory"}
                </Link>
              </div>
              <Link
                href={`/${categoryId}/${subcategoryId}/${post.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: post.heading }}
                  className="text-2xl font-medium line-clamp-2"
                />
              </Link>
              <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] mt-4 md:mt-5 lg:mt-6">
                {post.author} - {post.date}
              </p>

              <div className="flex items-center gap-2 relative">
                <button
                  aria-label={`Share post: ${post.heading.replace(
                    /<[^>]+>/g,
                    ""
                  )}`}
                  onClick={() => handleShare(post)}
                >
                  <RiShareForwardLine className="w-6 h-6 text-black" />
                </button>
                {showShareMenu === post.id && (
                  <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
                    <FaTwitter
                      className="w-6 h-6 cursor-pointer text-blue-500"
                      onClick={() =>
                        shareToTwitter(
                          getShareUrl(
                            post.category_name,
                            post.sub_category_name,
                            post.id
                          ),
                          post.heading.replace(/<[^>]+>/g, "")
                        )
                      }
                      aria-label="Share on Twitter"
                    />
                    <FaFacebook
                      className="w-6 h-6 cursor-pointer text-blue-700"
                      onClick={() =>
                        shareToFacebook(
                          getShareUrl(
                            post.category_name,
                            post.sub_category_name,
                            post.id
                          )
                        )
                      }
                      aria-label="Share on Facebook"
                    />
                    <FaLinkedin
                      className="w-6 h-6 cursor-pointer text-blue-600"
                      onClick={() =>
                        shareToLinkedIn(
                          getShareUrl(
                            post.category_name,
                            post.sub_category_name,
                            post.id
                          ),
                          post.heading.replace(/<[^>]+>/g, "")
                        )
                      }
                      aria-label="Share on LinkedIn"
                    />
                  </div>
                )}
                <button
                  aria-label={`Save post: ${post.heading.replace(
                    /<[^>]+>/g,
                    ""
                  )}`}
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
                      alert("Post saved!"); // Simple feedback
                    } else {
                      alert("Post already saved!");
                    }
                  }}
                >
                  <TbTargetArrow className="w-6 h-6 text-black" />
                </button>
                <Link
                  href={`/blogs/${post.category_name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${post.sub_category_name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${post.id}#comment`}
                  aria-label={`Comment on post: ${post.heading.replace(
                    /<[^>]+>/g,
                    ""
                  )}`}
                >
                  <FaRegCommentDots className="w-6 h-6 text-black" />
                </Link>
              </div>

              <p
                dangerouslySetInnerHTML={{ __html: post.body1 }}
                className="text-sm font-normal font-manrope text-[#424242] line-clamp-3 mt-2"
              />
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          <div className="text-sm text-muted-foreground" aria-live="polite">
            Showing {posts.length} of {totalPosts} posts
          </div>
          <SplurjjPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            aria-label="Tag posts pagination"
          />
        </div>
      )}
    </div>
  );
};

export default TagContainer;
