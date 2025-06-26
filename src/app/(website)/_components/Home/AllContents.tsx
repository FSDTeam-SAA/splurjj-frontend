"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaRegCommentDots,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

// Interface for ContentItem
interface ContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  category_name?: string;
  sub_category_name?: string;
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
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data: ApiResponse = await response.json();
        setContents(data.data);
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

  console.log(loading);

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/fallback-image.jpg"; // Fallback image
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  const getShareUrl = (
    categoryId: number,
    subcategoryId: number,
    postId: number
  ): string => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/blogs/${categoryId}/${subcategoryId}/${postId}`;
  };

  const handleShare = async (post: ContentItem) => {
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

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contents.length) return <div>No content found</div>;

  const firstPost = contents[0];
  console.log(firstPost);
  const secondPost = contents[1];
  const thirdPost = contents[2];
  const fourthPost = contents[3];

  return (
    <div className="">
      {firstPost && (
        <div className="mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs/${firstPost.category_name}`}
                  className="bg-primary py-2 px-4 rounded text-base font-extrabold  uppercase text-white"
                >
                  {firstPost.category_name || "Category"}
                </Link>
                <Link
                  href={`/${firstPost.category_id}/${firstPost.subcategory_id}`}
                  className="bg-primary py-2 px-4 rounded text-base font-extrabold  uppercase text-white"
                >
                  {firstPost.sub_category_name || "Subcategory"}
                </Link>
              </div>
              <div className="flex items-center gap-3 relative">
                <RiShareForwardLine
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShare(firstPost)}
                />
                {showShareMenu === firstPost.id && (
                  <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
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
                <TbTargetArrow className="w-6 h-6" />
                <Link
                  href={`/${firstPost.category_id}/${firstPost.subcategory_id}/${firstPost.id}#comment`}
                  className="cursor-pointer"
                >
                  <FaRegCommentDots className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <Link
                href={`/${firstPost.category_id}/${firstPost.subcategory_id}/${firstPost.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: firstPost.heading }}
                  className="text-[60px] font-[800]  text-[#131313]"
                />
              </Link>
              <p
                dangerouslySetInnerHTML={{ __html: firstPost.sub_heading }}
                className="text-base font-normal  text-[#424242] line-clamp-3"
              />
              <p className="text-base font-semibold  uppercase text-[#424242]">
                {firstPost.author} - {firstPost.date}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Image
              src={getImageUrl(firstPost.image1)}
              alt={firstPost.heading}
              width={1200}
              height={600}
              className="w-full h-[680px] object-cover rounded-lg  border-image"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {secondPost && (
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/blogs/${secondPost.category_name}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {secondPost.category_name || "Category"}
              </Link>
              <Link
                href={`/${secondPost.category_id}/${secondPost.subcategory_id}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {secondPost.sub_category_name || "Subcategory"}
              </Link>
            </div>
            <Image
              src={getImageUrl(secondPost.image1)}
              alt={secondPost.heading}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-lg"
              priority
            />
            <div className="p-4">
              <Link
                href={`/${secondPost.category_id}/${secondPost.subcategory_id}/${secondPost.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: secondPost.heading }}
                  className="text-2xl font-medium"
                />
              </Link>
              <p className="text-sm font-semibold  uppercase text-[#424242] mt-2">
                {secondPost.author} - {secondPost.date}
              </p>
              <div className="flex items-center gap-3 mt-2 relative">
                <RiShareForwardLine
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShare(secondPost)}
                />
                {showShareMenu === secondPost.id && (
                  <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
                    <FaTwitter
                      className="w-6 h-6 cursor-pointer text-blue-500"
                      onClick={() =>
                        shareToTwitter(
                          getShareUrl(
                            secondPost.category_id,
                            secondPost.subcategory_id,
                            secondPost.id
                          ),
                          secondPost.heading
                        )
                      }
                    />
                    <FaFacebook
                      className="w-6 h-6 cursor-pointer text-blue-700"
                      onClick={() =>
                        shareToFacebook(
                          getShareUrl(
                            secondPost.category_id,
                            secondPost.subcategory_id,
                            secondPost.id
                          )
                        )
                      }
                    />
                    <FaLinkedin
                      className="w-6 h-6 cursor-pointer text-blue-600"
                      onClick={() =>
                        shareToLinkedIn(
                          getShareUrl(
                            secondPost.category_id,
                            secondPost.subcategory_id,
                            secondPost.id
                          ),
                          secondPost.heading
                        )
                      }
                    />
                  </div>
                )}
                <TbTargetArrow className="w-6 h-6" />
                <Link
                  href={`/${secondPost.category_id}/${secondPost.subcategory_id}/${secondPost.id}#comment`}
                  className="cursor-pointer"
                >
                  <FaRegCommentDots className="w-6 h-6" />
                </Link>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: secondPost.body1 }}
                className="text-sm font-normal  text-[#424242] line-clamp-3 mt-2"
              />
            </div>
          </div>
        )}

        {thirdPost && (
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/blogs/${thirdPost.category_name}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {thirdPost.category_name || "Category"}
              </Link>
              <Link
                href={`/${thirdPost.category_id}/${thirdPost.subcategory_id}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {thirdPost.sub_category_name || "Subcategory"}
              </Link>
            </div>
            <Image
              src={getImageUrl(thirdPost.image1)}
              alt={thirdPost.heading}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-lg"
              priority
            />
            <div className="p-4">
              <Link
                href={`/${thirdPost.category_id}/${thirdPost.subcategory_id}/${thirdPost.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: thirdPost.heading }}
                  className="text-2xl font-medium"
                />
              </Link>

              <p className="text-sm font-semibold  uppercase text-[#424242] mt-2">
                {thirdPost.author} - {thirdPost.date}
              </p>
              <div className="flex items-center gap-3 mt-2 relative">
                <RiShareForwardLine
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShare(thirdPost)}
                />
                {showShareMenu === thirdPost.id && (
                  <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
                    <FaTwitter
                      className="w-6 h-6 cursor-pointer text-blue-500"
                      onClick={() =>
                        shareToTwitter(
                          getShareUrl(
                            thirdPost.category_id,
                            thirdPost.subcategory_id,
                            thirdPost.id
                          ),
                          thirdPost.heading
                        )
                      }
                    />
                    <FaFacebook
                      className="w-6 h-6 cursor-pointer text-blue-700"
                      onClick={() =>
                        shareToFacebook(
                          getShareUrl(
                            thirdPost.category_id,
                            thirdPost.subcategory_id,
                            thirdPost.id
                          )
                        )
                      }
                    />
                    <FaLinkedin
                      className="w-6 h-6 cursor-pointer text-blue-600"
                      onClick={() =>
                        shareToLinkedIn(
                          getShareUrl(
                            thirdPost.category_id,
                            thirdPost.subcategory_id,
                            thirdPost.id
                          ),
                          thirdPost.heading
                        )
                      }
                    />
                  </div>
                )}
                <TbTargetArrow className="w-6 h-6" />
                <Link
                  href={`/${thirdPost.category_id}/${thirdPost.subcategory_id}/${thirdPost.id}#comment`}
                  className="cursor-pointer"
                >
                  <FaRegCommentDots className="w-6 h-6" />
                </Link>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: thirdPost.body1 }}
                className="text-sm font-normal  text-[#424242] line-clamp-3 mt-2"
              />
            </div>
          </div>
        )}

        {fourthPost && (
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/blogs/${fourthPost.category_name}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {fourthPost.category_name || "Category"}
              </Link>
              <Link
                href={`/${fourthPost.category_id}/${fourthPost.subcategory_id}`}
                className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
              >
                {fourthPost.sub_category_name || "Subcategory"}
              </Link>
            </div>
            <Image
              src={getImageUrl(fourthPost.image1)}
              alt={fourthPost.heading}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-lg"
              priority
            />
            <div className="p-4">
              <Link
                href={`/${fourthPost.category_id}/${fourthPost.subcategory_id}/${fourthPost.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: fourthPost.heading }}
                  className="text-2xl font-medium"
                />
              </Link>
              <p className="text-sm font-semibold  uppercase text-[#424242] mt-2">
                {fourthPost.author} - {fourthPost.date}
              </p>
              <div className="flex items-center gap-3 mt-2 relative">
                <RiShareForwardLine
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleShare(fourthPost)}
                />
                {showShareMenu === fourthPost.id && (
                  <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
                    <FaTwitter
                      className="w-6 h-6 cursor-pointer text-blue-500"
                      onClick={() =>
                        shareToTwitter(
                          getShareUrl(
                            fourthPost.category_id,
                            fourthPost.subcategory_id,
                            fourthPost.id
                          ),
                          fourthPost.heading
                        )
                      }
                    />
                    <FaFacebook
                      className="w-6 h-6 cursor-pointer text-blue-700"
                      onClick={() =>
                        shareToFacebook(
                          getShareUrl(
                            fourthPost.category_id,
                            fourthPost.subcategory_id,
                            fourthPost.id
                          )
                        )
                      }
                    />
                    <FaLinkedin
                      className="w-6 h-6 cursor-pointer text-blue-600"
                      onClick={() =>
                        shareToLinkedIn(
                          getShareUrl(
                            fourthPost.category_id,
                            fourthPost.subcategory_id,
                            fourthPost.id
                          ),
                          fourthPost.heading
                        )
                      }
                    />
                  </div>
                )}
                <TbTargetArrow className="w-6 h-6" />
                <Link
                  href={`/${fourthPost.category_id}/${fourthPost.subcategory_id}/${fourthPost.id}#comment`}
                  className="cursor-pointer"
                >
                  <FaRegCommentDots className="w-6 h-6" />
                </Link>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: fourthPost.body1 }}
                className="text-sm font-normal  text-[#424242] line-clamp-3 mt-2"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          href="/homeAllContent"
          className="bg-primary py-2 px-4 rounded text-sm font-extrabold  uppercase text-white flex items-center gap-2"
        >
          EXPLORE MORE <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default AllContents;
