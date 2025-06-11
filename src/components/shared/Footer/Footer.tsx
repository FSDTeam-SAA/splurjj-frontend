import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import NewsLetterForm from "./NewsLetterForm";
import Image from "next/image";
import { Linkedin, Tally1, Twitter } from "lucide-react";

const Footer = () => {
  const categoryData = [
    {
      id: 1,
      category: "Latest",
    },
    {
      id: 2,
      category: "Art & Culture",
    },
    {
      id: 3,
      category: "Gear",
    },
    {
      id: 4,
      category: "Music",
    },
    {
      id: 5,
      category: "Quiet Calm",
    },
    {
      id: 6,
      category: "Ride",
    },
    {
      id: 7,
      category: "Videos",
    },
  ];
  const shopData = [
    {
      id: 1,
      shop: "Latest",
    },
    {
      id: 2,
      shop: "Men",
    },
    {
      id: 3,
      shop: "Women",
    },
    {
      id: 4,
      shop: "Lifestyle",
    },
    {
      id: 5,
      shop: "Tech",
    },
    {
      id: 6,
      shop: "Sale",
    },
  ];
  const otherData = [
    {
      id: 1,
      other: "Brand Directory",
    },
    {
      id: 2,
      other: "Brand Recognition",
    },
  ];

  const aboutData = [
    {
      id: 1,
      about: "Splurjj Nation",
    },
    {
      id: 2,
      about: "Newsroom",
    },
    {
      id: 3,
      about: "Leadership",
    },
    {
      id: 4,
      about: "Career Opportunities",
    },
    {
      id: 5,
      about: "Investor Relations",
    },
    {
      id: 6,
      about: "Advertising",
    },
    {
      id: 7,
      about: "Legal",
    },
    {
      id: 8,
      about: "Contact Us",
    },
  ];

  return (
    <div
      className={`h-full lg:h-[533px] w-full bg-[linear-gradient(to_top,_#FFFFFF,_#B5B5B5,_#B0B0B0,_#747474)] py-6 md:py-[30px] lg:py-10 px-6 md:px-0`}
    >
      <div className="container">
        {/* small and large devices  */}
        <div className="block md:hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 pb-3 md:pb-4">
            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold font-manrope text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                CATEGORIES
              </h4>
              <ul>
                {categoryData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-xl font-bold font-manrope text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                SHOP
              </h4>
              <ul>
                {shopData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.shop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold font-manrope text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                OTHER
              </h4>
              <ul>
                {otherData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.other}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold font-manrope text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                ABOUT US
              </h4>
              <ul>
                {aboutData?.map((item, index) => (
                  <li
                    key={index}
                    className=" text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.about}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xl font-bold font-manrope text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                <span className="bg-[#E6EEFE] p-3 rounded-full">
                  <Twitter className="text-primary w-8 h-8 cursor-pointer" />
                </span>
                <span className="bg-[#E6EEFE] p-3 rounded-full">
                  <IoLogoInstagram className="text-primary w-8 h-8 cursor-pointer" />
                </span>
                <span className="bg-[#E6EEFE] p-3 rounded-full">
                  <Linkedin className="text-primary w-8 h-8 cursor-pointer" />
                </span>
                <span className="bg-[#E6EEFE] p-3 rounded-full">
                  <FaFacebookF className="text-primary w-8 h-8 cursor-pointer" />
                </span>
              </div>
              <p className="py-3 md:py-4 text-sm font-semibold font-manrope text-black tracking-[0%] leading-[150%]">
                Don&apos;t miss out on the latest news by signing up <br /> for our
                newsletters.
              </p>

              <div className="">
                <NewsLetterForm />
              </div>

              <p className="pt-2 text-base font-medium font-manrope text-black tracking-[0%] leading-[150%]">
                By subscribing, you agree to our <br />
                <span className="text-primary hover:underline">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline">
                  {" "}
                  Privacy <br className="hidden md:block" /> Policy.
                </span>
              </p>
              <h5 className="text-lg md:text-xl font-manrope font-semibold text-[#2A2A2A] leading-[120%] tracking-[0%] pt-3 md:pt-4">
                Download our App
              </h5>
              <div className="flex items-center gap-4 mt-3 md:mt-4">
                <Image
                  src="/assets/images/app_store.png"
                  alt="app store"
                  width={165}
                  height={56}
                />
                <Image
                  src="/assets/images/google_play.png"
                  alt="app store"
                  width={165}
                  height={56}
                />
              </div>
            </div>
          </div>

          {/* footer bottom  */}
          <div className="w-full h-[1px]" />
          <p className="w-full flex flex-col md:flex-row items-center justify-center pt-3 md:pt-4 text-base font-medium leading-[120%] tracking-[0%] text-black  font-manrope">
            @ 2025 Splurjj Limited .All Rights Reserve. Splurjj is a registered
            tradmark of Splurjj Nation LLC. Terms & Conditions{" "}
            <Tally1 className="text-black w-[5px] h-auto" />
            <span className="px-2" />
            Privecy Policy {/* <Tally1 className="text-white " /> */}
            <span className="px-2" />
            Cookie Policy {/* <Tally1 className="text-white" />  */}
            <span className="px-2" />
            Investment Disclaimer {/* <Tally1 className="text-white" /> */}
          </p>
        </div>

        {/* only medium device  */}
        <div className="hidden md:block lg:hidden">
          <div className=" grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="">
                <h4 className="text-xl font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                  CATEGORIES
                </h4>
                <ul>
                  {categoryData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                    >
                      {item?.category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                  SHOP
                </h4>
                <ul>
                  {shopData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                    >
                      {item?.shop}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                  OTHER
                </h4>
                <ul>
                  {otherData?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                    >
                      {item?.other}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <div className="">
                <h4 className="text-xl font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                  ABOUT US
                </h4>
                <ul>
                  {aboutData?.map((item, index) => (
                    <li
                      key={index}
                      className=" text-sm font-semibold font-manrope text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                    >
                      {item?.about}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h4 className="text-xl font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                  FOLLOW US
                </h4>
                <div className="flex items-center gap-3">
                  <span className="bg-[#E6EEFE] p-3 rounded-full">
                    <Twitter className="text-primary w-8 h-8 cursor-pointer" />
                  </span>
                  <span className="bg-[#E6EEFE] p-3 rounded-full">
                    <IoLogoInstagram className="text-primary w-8 h-8 cursor-pointer" />
                  </span>
                  <span className="bg-[#E6EEFE] p-3 rounded-full">
                    <Linkedin className="text-primary w-8 h-8 cursor-pointer" />
                  </span>
                  <span className="bg-[#E6EEFE] p-3 rounded-full">
                    <FaFacebookF className="text-primary w-8 h-8 cursor-pointer" />
                  </span>
                </div>
                <p className="py-3 md:py-4 text-sm font-semibold font-manrope text-[#2A2A2A] tracking-[0%] leading-[150%]">
                  Don&apos;t miss out on the latest news by signing up for our
                  newsletters.
                </p>

                <div className="">
                  <NewsLetterForm />
                </div>

                <p className="pt-2 text-base font-medium font-manrope text-black tracking-[0%] leading-[150%]">
                  By subscribing, you agree to our <br />
                  <span className="text-primary hover:underline">
                    Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className="text-primary hover:underline">
                    {" "}
                    Privacy <br className="hidden md:block" /> Policy.
                  </span>
                </p>
                <h5 className="text-lg md:text-xl font-manrope font-semibold text-[#2A2A2A] leading-[120%] tracking-[0%] pt-3 md:pt-4">
                  Download our App
                </h5>
                <div className="flex items-center gap-4 mt-3 md:mt-4">
                  <Image
                    src="/assets/images/app_store.png"
                    alt="app store"
                    width={165}
                    height={56}
                  />
                  <Image
                    src="/assets/images/google_play.png"
                    alt="app store"
                    width={165}
                    height={56}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* footer bottom  */}
          <div className="w-full h-[1px] bg-white mt-4" />
          <p className="w-full flex flex-col md:flex-row items-center justify-center pt-3 md:pt-4 text-base font-medium leading-[120%] tracking-[0%] text-white  font-manrope">
            @ 2025 Splurjj Limited .All Rights Reserve. Splurjj is a registered
            tradmark of Splurjj Nation LLC. Terms & Conditions{" "}
          </p>
          <p className="w-full flex flex-col md:flex-row items-center justify-center pt-3 md:pt-4 text-base font-medium leading-[120%] tracking-[0%] text-white  font-manrope">
            <span className="px-2" />
            Terms & Conditions
            <span className="px-2" />
            Privecy Policy
            <span className="px-2" />
            Cookie Policy
            <span className="px-2" />
            Investment Disclaimer{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
