import Image from "next/image";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

const TagContainer = () => {
  const tagData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: `Headline Title Shown Here in Big Bold Font #${index + 1}`,
    date: "24/08/2025",
    image: "/assets/videos/blog1.jpg",
  }));

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {tagData?.map((tag) => {
        return (
          <div key={tag.id} className="">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-[1.5px]">
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Read
                </button>
                <button className="bg-primary py-[6px] px-[12px] rounded-[4px] text-base font-extrabold font-manrope leading-[120%] tracking-[0%] uppercase text-white">
                  Video
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <RiShareForwardLine className="w-6 h-6 text-black" />
                </span>
                <span>
                  <TbTargetArrow className="w-6 h-6 text-black" />
                </span>
                <span>
                  <FaRegCommentDots className="w-6 h-6 text-black" />
                </span>
              </div>
            </div>

            <h1 className="text-2xl md:text-[28px] lg:text-[32px] font-manrope font-bold leading-[120%] tracking-[0%] text-[#131313]">
              Headline Title Shown <br /> Here in Big Bold Font
            </h1>
            <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] mt-4 md:mt-5 lg:mt-6">
              Credits - 24/08/2025
            </p>
            <div className="mt-4 md:mt-5 lg:mt-6">
              <Image
                src="/assets/videos/blog1.jpg"
                alt="blog1"
                width={458}
                height={346}
                className="w-full h-[346px] object-cover rounded-[8px]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagContainer;
