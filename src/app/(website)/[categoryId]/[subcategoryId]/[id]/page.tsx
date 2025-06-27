"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { PiYoutubeLogoLight } from "react-icons/pi";
import Link from "next/link";
import { LeaveAComment } from "@/app/(website)/_components/LeaveAComment/LeaveAComment";
import { useSession } from "next-auth/react";
import ContentComments from "./_components/upvoteDownvoteAllComments";
import Vertical from "@/components/adds/vertical";
import Horizontal from "@/components/adds/horizontal";
import RelatedContent from "@/app/(website)/_components/RalatedBlog/RalatedBlog";

interface BlogData {
  status: boolean;
  message: string;
  data: {
    id: number;
    category_id: number;
    subcategory_id: number;
    category_name: string;
    subcategory_name?: string;
    heading: string; // HTML content
    author: string;
    date: string; // ISO date format
    sub_heading: string; // HTML content
    body1: string; // HTML content
    image1: string | null;
    advertising_image: string | null;
    tags: string[]; // Array of strings (though the format seems inconsistent)
    created_at: string; // ISO datetime format
    updated_at: string; // ISO datetime format
    imageLink: string | null;
    advertisingLink: string | null;
    user_id: number;
    status: string; // Could be enum: "active" | "inactive" etc.
    image1_url: string | null;
    advertising_image_url: string | null;
    user: {
      id: number;
      description: string | null;
      first_name: string | null;
      facebook_link: string | null;
      instagram_link: string | null;
      youtube_link: string | null;
      twitter_link: string | null;
      profilePic: string;
    };
  };
}

const ContentBlogDetails = ({
  params,
}: {
  params: { id: number; categoryId: string; subcategoryId: string };
}) => {
  const { id, categoryId, subcategoryId } = params;

  // console.log(id, categoryId, subcategoryId);

  const session = useSession();
  const commentAccess = session?.data?.user?.role;
  console.log(commentAccess);
  const userId = session?.data?.user?.id;
  console.log("UserId", userId);
  const userEmail = session?.data?.user?.email;

  // Improved cleanTags function to handle malformed JSON strings
  const cleanTags = (tags: string[]): string[] => {
    if (!tags || !Array.isArray(tags)) return [];

    // First try to parse as JSON if it looks like a JSON string
    if (tags.length === 1 && tags[0].startsWith("[")) {
      try {
        const parsedTags = JSON.parse(tags[0].replace(/\\"/g, '"'));
        return Array.isArray(parsedTags) ? parsedTags : [];
      } catch {
        // If parsing fails, fall back to string cleaning
      }
    }

    // Handle individual string cleaning
    return tags
      .map((tag) => {
        // Remove escaped quotes and brackets
        const cleaned = tag
          .replace(/^\[|\]$/g, "")
          .replace(/^"|"$/g, "")
          .replace(/\\"/g, "")
          .trim();
        return cleaned;
      })
      .filter((tag) => tag.length > 0); // Filter out empty tags
  };

  const sanitizeHTML = (html: string): string => {
    return html; // Replace with actual sanitization in production
  };

  const { data, isLoading, error, isError } = useQuery<BlogData>({
    queryKey: ["all-content", categoryId, subcategoryId, id],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}/${id}`
      ).then((res) => res.json()),
  });

  console.log(data?.data?.heading);
  const blogData = data?.data || null;

  // const blogData = data?.data || null;
  console.log(blogData?.heading);

  // const getImageUrl = (path: string | null): string => {
  //   if (!path) return "";
  //   if (path.startsWith("http")) return path;
  //   return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  // };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (!blogData) {
    return <div className="text-center py-10">Blog not found</div>;
  }

  // Get cleaned tags
  const cleanedTags = cleanTags(blogData.tags || []);

  return (
    <div className="">
      <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        {/* First part */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px] md:gap-[50px] lg:gap-[72px]">
          <div className="md:col-span-2 flex flex-col gap-[25px] md:gap-[32px] lg:gap-[40px]">
            <div>
              <h2
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(blogData.heading ?? ""),
                }}
                className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[120%] text-[#131313]  tracking-[0%]"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(blogData.sub_heading ?? ""),
                }}
                className="text-base font-normal  leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6 line-clamp-3 mb-2"
              />
              <p className="text-base font-semibold  leading-[120%] tracking-[0%] text-[#424242]">
                Credits - {blogData.date}
              </p>
              <div className="mt-3 md:mt-4">
                <button
                  onClick={() =>
                    document
                      ?.getElementById("comment")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full bg-primary py-[12px] px-[24px] rounded-[4px] text-xl font-bold  leading-[120%] tracking-[0%] uppercase text-white"
                >
                  Leave A Comment
                </button>
              </div>
            </div>
            <div className="sticky top-[120px] mb-2">
              <Horizontal />
            </div>
          </div>
          <div className="md:col-span-5">
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(blogData.sub_heading ?? ""),
                }}
                className="text-base font-normal  leading-[150%] tracking-[0%] text-[#424242] pb-5 md:pb-7 lg:pb-8"
              />
              <div className="pb-[25px] md:pb-[32px] lg:pb-[40px]">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${blogData.image1}` ||
                    ""
                  }
                  alt={blogData.heading || "Blog image"}
                  width={888}
                  height={552}
                  className="w-full h-[443px] object-cover rounded-[8px] border-image"
                />
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(blogData.body1 ?? ""),
                }}
                className="text-base font-normal  leading-[150%] tracking-[0%] text-[#424242] pb-5 md:pb-7 lg:pb-8"
              />
              <div className="w-full flex items-center justify-center">
                <span className="w-2/3 h-[2px] bg-secondary" />
              </div>
            </div>
            {/* Second part */}
            <div className="mt-[25px] md:mt-[37px] lg:mt-[51px]">
              {/* Posted in */}
              <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 gap-2">
                <h4 className="md:col-span-2 text-lg md:text-xl text-secondary font-bold  leading-[120%] tracking-[0%] uppercase">
                  Posted in
                </h4>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blogs/${blogData.category_name}`}
                    className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
                  >
                    {blogData.category_name || "Category"}
                  </Link>
                  <Link
                    href={`/${blogData.category_id}/${blogData.subcategory_id}`}
                    className="bg-primary py-1 px-3 rounded text-sm font-extrabold  uppercase text-white"
                  >
                    {blogData.subcategory_name || "Subcategory"}
                  </Link>
                </div>
              </div>
              {/* Tags */}
              {cleanedTags.length > 0 && (
                <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 gap-2 mt-4 md:mt-5 lg:mt-6">
                  <h4 className="md:col-span-2 text-lg md:text-xl text-secondary font-bold  leading-[120%] tracking-[0%] uppercase">
                    Tags
                  </h4>
                  <div className="md:col-span-5 flex flex-col items-start gap-3 md:gap-4">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      {cleanedTags.map((tag, index) => (
                        <Link
                          href={`/${categoryId}/${subcategoryId}/${id}/${encodeURIComponent(
                            tag
                          )}`}
                          key={index}
                        >
                          <button className="bg-secondary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold  leading-[120%] tracking-[0%] uppercase text-white">
                            {tag}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Author */}
              <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 mt-[25px] md:mt-[37px] lg:mt-[51px]">
                <div className="md:col-span-2">
                  <Image
                    src={
                      blogData.user?.profilePic
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${blogData.user.profilePic}`
                        : "/assets/images/no-images.jpg"
                    }
                    alt={blogData.user?.first_name || "Author"}
                    width={180}
                    height={180}
                    className="w-[180px] h-[180px] object-cover rounded-full"
                  />
                </div>
                <div className="md:col-span-5 h-full flex flex-col justify-center mt-2 md:mt-0">
                  <h4 className="text-lg font-semibold leading-[120%] tracking-[0%] uppercase  text-secondary">
                    {blogData.user?.first_name || blogData.author}
                  </h4>
                  <p className="mt-4 text-base  font-normal leading-[150%] tracking-[0%] text-secondary">
                    {blogData.user?.description || "No description available."}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="mt-4 flex items-center gap-2">
                      {blogData.user?.instagram_link && (
                        <a
                          href={blogData.user.instagram_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                        </a>
                      )}
                      {blogData.user?.facebook_link && (
                        <a
                          href={blogData.user.facebook_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LuFacebook className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                        </a>
                      )}
                      {blogData.user?.youtube_link && (
                        <a
                          href={blogData.user.youtube_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PiYoutubeLogoLight className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                        </a>
                      )}
                      {blogData.user?.twitter_link && (
                        <a
                          href={blogData.user.twitter_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiTwitter className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/viewpost/${blogData.user?.id}`}
                      className="text-lg font-extrabold  leading-[120%] tracking-[0%] text-secondary dark:text-white"
                    >
                      View posts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Leave a comment */}
            {commentAccess && (
              <div>
                <section id="comment" className="py-10">
                  <LeaveAComment UserEmail={userEmail} blogId={id} />
                </section>
              </div>
            )}
            <div>
              <ContentComments blogId={id} />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky mb-2">
        <Vertical />
      </div>
      {/* Related blogs (uncomment when ready) */}
      <section>
        <RelatedContent categoryId={categoryId} subcategoryId={subcategoryId} />
      </section>
    </div>
  );
};

export default ContentBlogDetails;
