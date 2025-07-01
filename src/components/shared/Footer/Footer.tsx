"use client";

import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import NewsLetterForm from "./NewsLetterForm";
import Image from "next/image";
import { Linkedin, Tally1, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FooterData } from "../Navbar/Navbar";

interface Category {
  category_id: number;
  category_name: string;
}
interface ApiResponse {
  success: boolean;
  data: Category[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface Footer  {
  app_store_link: string;
  bg_color: string;
  text_color: string;
  copyright: string;
  facebook_link: string; // Currently an empty array in your data
  google_play_link: string;
  instagram_link: string;
  linkedin_link: string;
  twitter_link: string;
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const result: ApiResponse = await response.json();
  return result.data;
};


const Footer = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

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


    const { data } = useQuery<FooterData>({
      queryKey: ["footerData"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer`).then((res) =>
          res.json()
        ),
    });

    const footer = data?.data;

  return (
    <div
      className={`h-full lg:h-[533px] w-full pt-24`}
      style={{ backgroundColor: footer?.bg_color }}
    >
      <div className="container">
        {/* small and large devices  */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 pb-3 md:pb-4">
            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold  text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                CATEGORIES
              </h4>
              <ul>
                {categories?.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={`/blogs/${item?.category_name}`}
                      key={index}
                      className="text-sm font-semibold  text-black dark:text-white cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2 "
                    >
                      {item?.category_name}
                    </Link>
                  </div>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-xl font-bold  text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                SHOP
              </h4>
              <ul>
                {shopData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm font-semibold  text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.shop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold  text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                OTHER
              </h4>
              <ul>
                {otherData?.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm font-semibold  text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.other}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xl font-bold  text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                ABOUT US
              </h4>
              <ul>
                {aboutData?.map((item, index) => (
                  <li
                    key={index}
                    className=" text-sm font-semibold  text-black cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item?.about}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xl font-bold  text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                <Link
                  href={footer?.twitter_link || "#"}
                  className="bg-[#E6EEFE] p-3 rounded-full"
                >
                  <Twitter className="text-primary w-8 h-8 cursor-pointer" />
                </Link>
                <Link
                  href={footer?.instagram_link || "#"}
                  className="bg-[#E6EEFE] p-3 rounded-full"
                >
                  <IoLogoInstagram className="text-primary w-8 h-8 cursor-pointer" />
                </Link>
                <Link
                  href={footer?.linkedin_link || "#"}
                  className="bg-[#E6EEFE] p-3 rounded-full"
                >
                  <Linkedin className="text-primary w-8 h-8 cursor-pointer" />
                </Link>
                <Link
                  href={footer?.facebook_link || "#"}
                  className="bg-[#E6EEFE] p-3 rounded-full"
                >
                  <FaFacebookF className="text-primary w-8 h-8 cursor-pointer" />
                </Link>
              </div>
              <p className="py-3 md:py-4 text-sm font-semibold  text-black tracking-[0%] leading-[150%]">
                Don&apos;t miss out on the latest news by signing up <br /> for
                our newsletters.
              </p>

              <div className="">
                <NewsLetterForm />
              </div>

              {/* <p className="pt-2 text-base font-medium  text-black tracking-[0%] leading-[150%]">
                By subscribing, you agree to our <br />
                <span className="text-primary hover:underline">
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-primary dark:text-white hover:underline">
                  {" "}
                  Privacy <br className="hidden md:block" /> Policy.
                </span>
              </p> */}
              <h5 className="text-lg md:text-xl  font-semibold text-[#2A2A2A] leading-[120%] tracking-[0%] pt-3 md:pt-4">
                Download our App
              </h5>
              <div className="flex items-center gap-4 mt-3 md:mt-4">
                <Link href={footer?.app_store_link || "#"}>
                  <Image
                    src="/assets/images/app_store.png"
                    alt="app store"
                    width={165}
                    height={56}
                  />
                </Link>
                <Link href={footer?.google_play_link || "#"}>
                  <Image
                    src="/assets/images/google_play.png"
                    alt="app store"
                    width={165}
                    height={56}
                  />
                </Link>
              </div>
            </div>
          </div>

                <div className="border-b border-[#D9D9D9] mt-4"  />
          {/* footer bottom  */}
          <div className="w-full h-[1px]" />
          <p className="w-full flex flex-col md:flex-row items-center justify-center pt-4 text-base font-medium leading-[120%] tracking-[0%] text-black  ">
            {footer?.copyright}
            <Tally1 className="text-black w-[5px] h-auto" />
            Terms & Conditions
            <span className="px-2" />
            Privecy Policy 
            <span className="px-2" />
            Cookie Policy {/* <Tally1 className="text-white" />  */}
            <span className="px-2" />
            Investment Disclaimer {/* <Tally1 className="text-white" /> */}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
