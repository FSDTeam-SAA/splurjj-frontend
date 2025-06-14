import React from "react";
import Image from "next/image";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

const FourthBlog = () => {
  return (
    <div className="container py-[30px] md:py-[50px] lg:py-[72px]">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-[25px] md:gap-[35px] lg:gap-[44px]">
        <div className="md:col-span-5 h-full flex flex-col  justify-center">
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-6">
            <div className="w-full md:w-3/7">
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
              <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] uppercase text-[#424242] my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </p>
              <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] uppercase text-[#424242] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore m
              </p>
            </div>
            <div className="w-full md:w-4/7">
              <Image
                src="/assets/videos/blog1.jpg"
                alt="blog1"
                width={444}
                height={315}
                className="w-full h-[310px] object-cover rounded-[8px]"
              />
            </div>
          </div>

          <div className="mt-4">
            <Image
              src="/assets/videos/blog1.jpg"
              alt="blog1"
              width={794}
              height={443}
              className="w-full h-[443px] object-cover rounded-[8px]"
            />
          </div>
          <p className="text-base font-semibold font-manrope leading-[120%] tracking-[0%] uppercase text-[#424242] text-right mt-2">
            Credits - 24/08/2025
          </p>

          <div className="flex items-center gap-4 mb-2 mt-4">
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
          <p className="text-base font-normal font-manrope leading-[150%] tracking-[0%] uppercase text-[#424242] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labo Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad mi
          </p>
        </div>
        <div className="md:col-span-3">
          {/* first part  */}
          <div>
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
          {/* second part  */}
          <div className="pt-4">
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

export default FourthBlog;
