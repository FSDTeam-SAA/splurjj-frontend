import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiShareForwardLine } from "react-icons/ri";
import {
  FaFacebook,
  FaLinkedin,
  FaRegCommentDots,
  FaTwitter,
} from "react-icons/fa";
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
  category_id: number;
  subcategory_id: number;
  image1: string | null;
  imageLink: string | null;
  advertising_image: string | null;
  advertisingLink: string | null;
  status: string;
  tags: string[];
}

// Define the props for FirstContents to accept an array of Post objects
interface FirstContentsProps {
  posts: Post[];
}

const FirstContents: React.FC<FirstContentsProps> = ({ posts }) => {
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
    // Normalize category and subcategory names for URL (e.g., replace spaces with hyphens)
    const normalizedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    const normalizedSubCategory = subCategoryName
      .toLowerCase()
      .replace(/\s+/g, "-");
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

  console.log("Posts received in FirstContents:", posts);

  const firstPost = posts[0];
  console.log(firstPost);
  const secondPost = posts[1];
  const thirdPost = posts[2];
  const fourthPost = posts[3];
  const fivethPost = posts[4];

  return (
    <div className="">
      {firstPost ? (
        <div className="mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Link
                  href={`/blogs/${firstPost.category_name}`}
                  className="bg-primary py-2 px-4 rounded text-base font-extrabold font-manrope uppercase text-white"
                >
                  {firstPost.category_name || "Category"}
                </Link>
                <Link
                  href={`/${firstPost.category_id}/${firstPost.subcategory_id}`}
                  className="bg-primary py-2 px-4 rounded text-base font-extrabold font-manrope uppercase text-white"
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
                            firstPost.category_name,
                            firstPost.sub_category_name,
                            firstPost.id
                          ),
                          firstPost.heading.replace(/<[^>]+>/g, "")
                        )
                      }
                    />
                    <FaFacebook
                      className="w-6 h-6 cursor-pointer text-blue-700"
                      onClick={() =>
                        shareToFacebook(
                          getShareUrl(
                            firstPost.category_name,
                            firstPost.sub_category_name,
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
                            firstPost.category_name,
                            firstPost.sub_category_name,
                            firstPost.id
                          ),
                          firstPost.heading.replace(/<[^>]+>/g, "")
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
                href={`/blogs/${firstPost.category_name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${firstPost.sub_category_name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${firstPost.id}`}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: firstPost.heading }}
                  className="text-5xl font-bold font-manrope text-[#131313]"
                />
              </Link>
              <p
                dangerouslySetInnerHTML={{ __html: firstPost.body1 }}
                className="text-base font-normal font-manrope text-[#424242] line-clamp-3"
              />
              <p className="text-base font-semibold font-manrope uppercase text-[#424242]">
                {firstPost.author} - {firstPost.date}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Image
              src={getImageUrl(firstPost.image1)}
              alt={firstPost.heading.replace(/<[^>]+>/g, "")} // Strip HTML for alt text
              width={1200}
              height={600}
              className="w-full object-cover rounded-lg h-[680px]"
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No featured article available.
        </p>
      )}
      <div className="">
        <div>
          {secondPost && (
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-5 lg:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={`/blogs/${secondPost.category_name}`}
                    className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                  >
                    {secondPost.category_name || "Category"}
                  </Link>
                  <Link
                    href={`/${secondPost.category_id}/${secondPost.subcategory_id}`}
                    className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                  >
                    {secondPost.sub_category_name || "Subcategory"}
                  </Link>
                </div>

                <div className="">
                  <Link
                    href={`/${secondPost.category_id}/${secondPost.subcategory_id}/${secondPost.id}`}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: secondPost.heading }}
                      className="text-2xl font-medium"
                    />
                  </Link>
                  <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
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
                                secondPost.category_name,
                                secondPost.sub_category_name,
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
                                secondPost.category_name,
                                secondPost.sub_category_name,
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
                                secondPost.category_name,
                                secondPost.sub_category_name,
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
                    className="text-sm font-normal font-manrope text-[#424242] line-clamp-3 mt-2"
                  />
                </div>
              </div>
              <div className="col-span-5 lg:col-span-3">
                <Image
                  src={getImageUrl(secondPost.image1)}
                  alt={secondPost.heading}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          {thirdPost && (
            <div className="relative">
              <Image
                src={getImageUrl(thirdPost.image1)}
                alt={thirdPost.heading}
                width={400}
                height={300}
                className="w-full h-[443px] object-cover rounded-t-lg"
                priority
              />
              <div className="py-4">
                <div className="md:flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blogs/${thirdPost.category_name}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {thirdPost.category_name || "Category"}
                    </Link>
                    <Link
                      href={`/${thirdPost.category_id}/${thirdPost.subcategory_id}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {thirdPost.sub_category_name || "Subcategory"}
                    </Link>
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
                      {thirdPost.author} - {thirdPost.date}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${thirdPost.category_id}/${thirdPost.subcategory_id}/${thirdPost.id}`}
                >
                  <p
                    dangerouslySetInnerHTML={{ __html: thirdPost.heading }}
                    className="text-2xl font-medium"
                  />
                </Link>

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
                              thirdPost.category_name,
                              thirdPost.sub_category_name,
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
                              thirdPost.category_name,
                              thirdPost.sub_category_name,
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
                              thirdPost.category_name,
                              thirdPost.sub_category_name,
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
                  className="text-sm font-normal font-manrope text-[#424242] line-clamp-3 mt-2"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            {fourthPost && (
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 ">
                    <Link
                      href={`/blogs/${fourthPost.category_name}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {fourthPost.category_name || "Category"}
                    </Link>
                    <Link
                      href={`/${fourthPost.category_id}/${fourthPost.subcategory_id}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {fourthPost.sub_category_name || "Subcategory"}
                    </Link>
                  </div>
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
                                fourthPost.category_name,
                                fourthPost.sub_category_name,
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
                                fourthPost.category_name,
                                fourthPost.sub_category_name,
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
                                fourthPost.category_name,
                                fourthPost.sub_category_name,
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
                </div>

                <div className="">
                  <Link
                    href={`/${fourthPost.category_id}/${fourthPost.subcategory_id}/${fourthPost.id}`}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: fourthPost.heading }}
                      className="text-2xl font-medium"
                    />
                  </Link>
                  <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
                    {fourthPost.author} - {fourthPost.date}
                  </p>
                </div>
                <Image
                  src={getImageUrl(fourthPost.image1)}
                  alt={fourthPost.heading}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                  priority
                />
              </div>
            )}
          </div>
          <div>
            {fivethPost && (
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blogs/${fivethPost.category_name}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {fivethPost.category_name || "Category"}
                    </Link>
                    <Link
                      href={`/${fivethPost.category_id}/${fivethPost.subcategory_id}`}
                      className="bg-primary py-1 px-3 rounded text-sm font-extrabold font-manrope uppercase text-white"
                    >
                      {fivethPost.sub_category_name || "Subcategory"}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 mt-2 relative">
                    <RiShareForwardLine
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleShare(fivethPost)}
                    />
                    {showShareMenu === fivethPost.id && (
                      <div className="absolute top-8 right-0 bg-white shadow-md p-2 rounded flex gap-2 z-10">
                        <FaTwitter
                          className="w-6 h-6 cursor-pointer text-blue-500"
                          onClick={() =>
                            shareToTwitter(
                              getShareUrl(
                                fivethPost.category_name,
                                fivethPost.sub_category_name,
                                fivethPost.id
                              ),
                              fivethPost.heading
                            )
                          }
                        />
                        <FaFacebook
                          className="w-6 h-6 cursor-pointer text-blue-700"
                          onClick={() =>
                            shareToFacebook(
                              getShareUrl(
                                fivethPost.category_name,
                                fivethPost.sub_category_name,
                                fivethPost.id
                              )
                            )
                          }
                        />
                        <FaLinkedin
                          className="w-6 h-6 cursor-pointer text-blue-600"
                          onClick={() =>
                            shareToLinkedIn(
                              getShareUrl(
                                fivethPost.category_name,
                                fivethPost.sub_category_name,
                                fivethPost.id
                              ),
                              fivethPost.heading
                            )
                          }
                        />
                      </div>
                    )}
                    <TbTargetArrow className="w-6 h-6" />
                    <Link
                      href={`/${fivethPost.category_id}/${fivethPost.subcategory_id}/${fivethPost.id}#comment`}
                      className="cursor-pointer"
                    >
                      <FaRegCommentDots className="w-6 h-6" />
                    </Link>
                  </div>
                </div>

                <div className="">
                  <Link
                    href={`/${fivethPost.category_id}/${fivethPost.subcategory_id}/${fivethPost.id}`}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: fourthPost.heading }}
                      className="text-2xl font-medium"
                    />
                  </Link>
                  <p className="text-sm font-semibold font-manrope uppercase text-[#424242] mt-2">
                    {fivethPost.author} - {fivethPost.date}
                  </p>
                </div>
                <Image
                  src={getImageUrl(fivethPost.image1)}
                  alt={fivethPost.heading}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstContents;
