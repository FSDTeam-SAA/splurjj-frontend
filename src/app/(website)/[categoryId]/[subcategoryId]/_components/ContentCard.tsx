import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiShareForwardLine } from "react-icons/ri";
import { FaFacebook, FaLinkedin, FaRegCommentDots, FaTwitter } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";

// Define the Post interface to match the data structure from AllContentContainer
interface Post {
  id: number;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  category_name: string;
  sub_category_name: string;
  image1: string | null;
  imageLink: string | null;
  advertising_image: string | null;
  advertisingLink: string | null;
  status: string;
  tags: string[];
}

// Define the props for SecondContents to accept an array of Post objects
interface SecondContentsProps {
  posts: Post[];
}

const SecondContents: React.FC<SecondContentsProps> = ({ posts }) => {
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null);

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
    // Normalize category and subcategory names for URL
    const normalizedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    const normalizedSubCategory = subCategoryName.toLowerCase().replace(/\s+/g, "-");
    return `${baseUrl}/blogs/${normalizedCategory}/${normalizedSubCategory}/${postId}`;
  };

  const handleShare = async (post: Post) => {
    const shareUrl = getShareUrl(
      post.category_name,
      post.sub_category_name,
      post.id
    );
    const shareData = {
      title: post.heading.replace(/<[^>]+>/g, ""), // Strip HTML for sharing
      text: post.sub_heading?.replace(/<[^>]+>/g, "") || "Check out this blog post!",
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

  console.log("Posts received in SecondContents:", posts);

  return (
    <div className="container mx-auto px-4">
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No content available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="space-y-2 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              aria-labelledby={`card-heading-${post.id}`}
            >
              <Image
                src={getImageUrl(post.image1)}
                alt={post.heading.replace(/<[^>]+>/g, "")} // Strip HTML for alt text
                width={400}
                height={300}
                className="w-full h-[300px] object-cover rounded-t-lg"
                priority
              />
              <div className="p-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blogs/${post.category_name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {post.category_name || "Category"}
                    </Link>
                    <Link
                      href={`/blogs/${post.category_name.toLowerCase().replace(/\s+/g, "-")}/${post.sub_category_name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {post.sub_category_name || "Subcategory"}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 relative">
                    <RiShareForwardLine
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleShare(post)}
                    />
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
                        />
                      </div>
                    )}
                    <TbTargetArrow className="w-6 h-6" />
                    <FaRegCommentDots className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <Link
                    href={`/blogs/${post.category_name.toLowerCase().replace(/\s+/g, "-")}/${post.sub_category_name.toLowerCase().replace(/\s+/g, "-")}/${post.id}`}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: post.heading }}
                      className="text-2xl font-medium line-clamp-2"
                    />
                  </Link>
                  <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
                    {post.author} - {post.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondContents;