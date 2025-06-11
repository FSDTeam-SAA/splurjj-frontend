import Image from "next/image";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

const RalatedBlog = () => {
  return (
    <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
        <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold tracking-[0%] text-[#131313] uppercase leading-[120%] foit-manrope pb-2">RELATED</h2>
        <div className="w-1/2 h-[2px] bg-secondary"/>
        <p className="text-lg md:text-xl font-semibold font-manrope leading[120%] tracking-[0%] text-[#929292] pb-[25px] md:pb-[32px] lg:pb-[40px] pt-3 md:pt-4">More like this one</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px] md:gap-[30px] lg:gap-[36px] capitalize">
        <div className="md:col-span-1">
          <div>
            <Image
              src="/assets/videos/blogSide1.jpg"
              alt="blogSide1"
              width={328}
              height={529}
              className="w-full h-[529px] object-cover rounded-[8px]"
            />
          </div>
        </div>
        <div className="md:col-span-3 w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-full md:w-1/2">
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
          <div className="w-full md:w-1/2">
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
        </div>
      </div>
    </div>
  );
};

export default RalatedBlog;
