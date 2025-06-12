"use client";
import Advertising from "@/app/(website)/videos/_components/Advertising";
import { LeaveAComment } from "@/app/(website)/videos/_components/LeaveAComment";
import {
  ContentAllDataTypeResponse,
  ContentDataTypeResponse,
} from "@/components/types/ContentDataType";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { PiYoutubeLogoLight } from "react-icons/pi";
import RalatedBlog from "../../../_components/RalatedBlog/RalatedBlog";

const ContentBlogDetails = ({
  params,
}: {
  params: { id: number; categoryId: string; subcategoryId: string };
}) => {
  console.log("params", params);

  const categoryId = params?.categoryId;
  const subcategoryId = params?.subcategoryId;

  console.log(categoryId, subcategoryId);

  const { data, isLoading, error, isError } =
    useQuery<ContentAllDataTypeResponse>({
      queryKey: ["all-content"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}`
        ).then((res) => res.json()),
    });

  console.log("all content data", data?.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error instanceof Error ? error.message : String(error)}</div>;
  }

  const blog = data?.data?.find(
    (item: ContentDataTypeResponse) => item?.id === Number(params.id)
  );
  console.log(blog);

  return (
    <div>
      <div className="bg-secondary-50">
        <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
          {/* first part  */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px] md:gap-[50px] lg:gap-[72px]">
            <div className="md:col-span-2 flex flex-col gap-[25px] md:gap-[32px] lg:gap-[40px]">
              <div>
                <h2
                  dangerouslySetInnerHTML={{ __html: blog?.heading ?? "" }}
                  className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold leading-[120%] text-[#131313] font-manrope tracking-[0%]"
                />
                <p
                  dangerouslySetInnerHTML={{ __html: blog?.sub_heading ?? "" }}
                  className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] py-4 md:py-5 lg:py-6"
                />
                <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] text-[#424242]">
                  Credits - {blog?.date}
                </p>
                <div className="mt-3 md:mt-4">
                  <button className="w-full bg-primary py-[12px] px-[24px] rounded-[4px] text-xl font-bold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                    Leave A comment
                  </button>
                </div>
              </div>
              <div>
                <Image
                  // src="/assets/videos/blogSide1.jpg"
                  src={blog?.advertising_image || blog?.advertisingLink || ""}
                  alt="blogSide1"
                  width={336}
                  height={700}
                  className="w-full h-[505px] object-cover rounded-[8px]"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="pb-[25px] md:pb-[32px] lg:pb-[40px]">
                <Image
                  src={blog?.image1 || blog?.imageLink || ""}
                  alt="blog1"
                  width={888}
                  height={552}
                  className="w-full h-[443px] object-cover rounded-[8px]"
                />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: blog?.body1 ?? "" }}
                className="text-base font-normal font-manrope leading-[150%] tracking-[0%] text-[#424242] pb-5 md:pb-7 lg:pb-8"
              />
              <div className="w-full flex items-center justify-center">
                <span className="w-2/3 h-[2px] bg-secondary" />
              </div>
            </div>
          </div>
          {/* second part  */}
          <div className="mt-[25px] md:mt-[37px] lg:mt-[51px] w-full flex flex-col items-center ">
            {/* first  */}
            <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 gap-2">
              <h4 className="md:col-span-2 text-lg md:text-xl text-secondary font-bold font-manrope leading-[120%] tracking-[0%] upercase">
                Posted in
              </h4>
              <div className="md:col-span-5 flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read
                </button>
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Video
                </button>
              </div>
            </div>
            {/* second  */}
            <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 gap-2 mt-4 md:mt-5 lg:mt-6">
              <h4 className="md:col-span-2 text-lg md:text-xl text-secondary font-bold font-manrope leading-[120%] tracking-[0%] uppercase">
                Tags
              </h4>
              <div className="md:col-span-5 flex flex-col items-start gap-3 md:gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  {blog?.tags?.map((tag, index) => (
                    <button
                      key={index}
                      className="bg-secondary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* third  */}
            <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-7 mt-[25px] md:mt-[37px] lg:mt-[51px]">
              <div className="md:col-span-2">
                <div className="">
                  <Image
                    src="/assets/videos/author.png"
                    alt="author"
                    width={180}
                    height={180}
                    className="w-[180px] h-[180px] object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="md:col-span-5 h-full flex flex-col justify-center mt-2 md:mt-0">
                <h4 className="text-lg font-semibold leading-[120%] tracking-[0%] uppercase font-manrope text-secondary">
                  {blog?.author}
                </h4>
                <p className="mt-4 text-base font-manrope font-normal leading-[150%] tracking-[0%] text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
                <div className="flex items-center justify-between">
                  <div className="mt-4 flex items-center gap-2">
                    <span>
                      <FaInstagram className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                    </span>
                    <span>
                      <LuFacebook className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                    </span>
                    <span>
                      <PiYoutubeLogoLight className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                    </span>
                    <span>
                      <FiTwitter className="w-[48px] h-[48px] text-[#B6B6B6] hover:text-primary cursor-pointer" />
                    </span>
                  </div>
                  <p className="text-lg font-extrabold font-manrope leadig-[120%] tracking-[0%] text-secondary">
                    view posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* advertising  */}
        <Advertising />

        {/* leave a comment  */}
        <section className="py-10">
          <LeaveAComment />
        </section>

        {/* related blogs  */}
        <section>
          <RalatedBlog />
        </section>
      </div>
    </div>
  );
};

export default ContentBlogDetails;
