"use client";

import SplurjjPagination from "@/components/ui/SplurjjPagination";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaRegCommentDots,
  FaTwitter,
} from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import DOMPurify from "dompurify";

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
  advertising_image: string | null;
  tags: string | string[];
  created_at: string;
  updated_at: string;
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status: string;
  image1_url: string;
  advertising_image_url: string | null;
}

interface ViewAuthorPostProps {
  userId: number;
}

function ViewAuthorPost({ userId }: ViewAuthorPostProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  console.log(loading, error);

  // Fetch posts by user ID
  useEffect(() => {
    const fetchPostsByUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/view-posts/${userId}?page=${currentPage}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        console.log("Fetched posts:", data.data);
        
        if (data.success) {
          setPosts(data.data);
          setTotalPages(data.meta.last_page);
          setTotalItems(data.meta.total);
        } else {
          throw new Error(data.message || "Failed to fetch posts");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByUser();
  }, [userId, currentPage]);



  // Sanitize HTML content
  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  };

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target as Node)
      ) {
        setShowShareMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  const getShareUrl = (
    categoryId: number,
    subcategoryId: number,
    postId: number
  ): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/${categoryId}/${subcategoryId}/${postId}`;
  };

  const handleShare = async (post: BlogPost) => {
    const shareUrl = getShareUrl(post.category_id, post.subcategory_id, post.id);
    const shareData = {
      title: sanitizeHTML(post.heading),
      text: sanitizeHTML(post.sub_heading || "Check out this blog post!"),
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
      )}&text=${encodeURIComponent(sanitizeHTML(text))}`,
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
      )}&title=${encodeURIComponent(sanitizeHTML(title))}`,
      "_blank"
    );
  };

 
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <Image
              src={getImageUrl(post.image1)}
              alt={sanitizeHTML(post.heading)}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-lg"
              priority
            />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs/${encodeURIComponent(post.category_name)}`}
                  className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                >
                  {post.category_name || "Category"}
                </Link>
                <Link
                  href={`/${post.category_id}/${post.subcategory_id}`}
                  className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                >
                  {post.sub_category_name || "Subcategory"}
                </Link>
              </div>
              <Link
                href={`/${post.category_id}/${post.subcategory_id}/${post.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.heading) }}
                  className="text-2xl font-medium hover:text-primary"
                />
              </Link>
              <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
                {post.author} - {post.date}
              </p>
              <div className="flex items-center gap-3 mt-2 relative">
                <RiShareForwardLine
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShare(post)}
                />
                {showShareMenu === post.id && (
                  <div
                    ref={shareMenuRef}
                    className="absolute top-8 right-0 bg-white shadow-md p-2 rounded-md flex gap-2 z-10"
                  >
                    <FaTwitter
                      className="w-6 h-6 cursor-pointer text-blue-500"
                      onClick={() =>
                        shareToTwitter(
                          getShareUrl(
                            post.category_id,
                            post.subcategory_id,
                            post.id
                          ),
                          post.heading
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
                <TbTargetArrow className="w-6 h-6" />
                <Link
                  href={`/${post.category_id}/${post.subcategory_id}/${post.id}#comment`}
                >
                  <FaRegCommentDots className="w-6 h-6" />
                </Link>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body1) }}
                className="text-sm font-normal font-manrope text-[#424242] line-clamp-3 mt-2"
              />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 10 && (
        <div className="flex justify-between items-center mt-4 px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Showing {posts.length} of {totalItems} items
          </div>
          <SplurjjPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default ViewAuthorPost;