"use client";

import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import NewsLetterForm from "./NewsLetterForm";
import Image from "next/image";
import { Linkedin, Tally1, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
// import page from "@/app/(website)/homeAllContent/page";

interface Category {
  id: number;
  category_id: number;
  category_name: string;
}

interface Page {
  id: number;
  name: string;
  body: string;
  status: string;
  created_at: string;
  updated_at: string;
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

interface Footer {
  app_store_link: string;
  bg_color: string;
  text_color: string;
  copyright: string;
  facebook_link: string;
  google_play_link: string;
  instagram_link: string;
  linkedin_link: string;
  twitter_link: string;
  footer_links: string;
}

interface FooterResponse {
  data: Footer;
}

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
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const fetchPages = async (): Promise<Page[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pages");
    }
    const result = await response.json();
    console.log(result);
    return result;
  };

  const { data: pages = [] } = useQuery<Page[]>({
    queryKey: ["pages"],
    queryFn: fetchPages,
  });

  console.log("PPPPPPPPPPPPPPPPP", pages);

  const shopData = [
    { id: 1, shop: "Latest" },
    { id: 2, shop: "Men" },
    { id: 3, shop: "Women" },
    { id: 4, shop: "Lifestyle" },
    { id: 5, shop: "Tech" },
    { id: 6, shop: "Sale" },
  ];

  const otherData = [
    { id: 1, other: "Brand Directory" },
    { id: 2, other: "Brand Recognition" },
  ];

  const aboutData = [
    { id: 1, about: "Splurjj Nation" },
    { id: 2, about: "Newsroom" },
    { id: 3, about: "Leadership" },
    { id: 4, about: "Career Opportunities" },
    { id: 5, about: "Investor Relations" },
    { id: 6, about: "Advertising" },
    { id: 7, about: "Legal" },
    { id: 8, about: "Contact Us" },
  ];

  const { data } = useQuery<FooterResponse>({
    queryKey: ["footerData"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer`).then((res) =>
        res.json()
      ),
  });

  const footer = data?.data;

  return (
    <div
      className="h-full lg:h-[533px] w-full pt-24"
      style={{ backgroundColor: footer?.bg_color || "" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 pb-3 md:pb-4">
          <div className="lg:col-span-2">
            <div
              className="text-xl font-bold text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6"
              style={{ color: footer?.text_color || "" }}
            >
              CATEGORIES
            </div>
            <ul>
              {categories?.map((item) => (
                <li key={`category-${item.id}`}>
                  <Link
                    href={`/blogs/${item.category_name}`}
                    style={{ color: footer?.text_color || "" }}
                    className="text-sm font-semibold cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  >
                    {item.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div
              className="text-xl font-bold text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6"
              style={{ color: footer?.text_color || "" }}
            >
              SHOP
            </div>
            <ul>
              {shopData.map((item) => (
                <li
                  key={`shop-${item.id}`}
                  className="text-sm font-semibold cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  style={{ color: footer?.text_color || "" }}
                >
                  {item.shop}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div
              className="text-xl font-bold text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6"
              style={{ color: footer?.text_color || "" }}
            >
              OTHER
            </div>
            <ul>
              {otherData.map((item) => (
                <li
                  key={`other-${item.id}`}
                  className="text-sm font-semibold cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  style={{ color: footer?.text_color || "" }}
                >
                  {item.other}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div
              className="text-xl font-bold text-black tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6"
              style={{ color: footer?.text_color || "" }}
            >
              ABOUT US
            </div>
            <ul>
              {aboutData.map((item) => (
                <li
                  key={`about-${item.id}`}
                  className="text-sm font-semibold cursor-pointer hover:underline tracking-[0%] leading-[120%] py-2"
                  style={{ color: footer?.text_color || "" }}
                >
                  {item.about}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div
              className="text-xl font-bold tracking-[0%] leading-[120%] pb-4 md:pb-5 lg:pb-6"
              style={{ color: footer?.text_color || "" }}
            >
              FOLLOW US
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={
                  footer?.twitter_link || "https://x.com/splurjj?lang=ar-x-fm"
                }
                className="bg-[#E6EEFE] p-3 rounded-full"
              >
                <Twitter className="text-primary w-8 h-8 cursor-pointer" />
              </Link>
              <Link
                href={
                  footer?.instagram_link ||
                  "https://www.instagram.com/accounts/login/?next=%2Fsplurjj%2F&source=omni_redirect"
                }
                className="bg-[#E6EEFE] p-3 rounded-full"
              >
                <IoLogoInstagram className="text-primary w-8 h-8 cursor-pointer" />
              </Link>
              <Link
                href={
                  footer?.linkedin_link ||
                  "https://www.linkedin.com/in/sharif-dyson-795b62132"
                }
                className="bg-[#E6EEFE] p-3 rounded-full"
              >
                <Linkedin className="text-primary w-8 h-8 cursor-pointer" />
              </Link>
              <Link
                href={
                  footer?.facebook_link || "https://www.facebook.com/splurjj/"
                }
                className="bg-[#E6EEFE] p-3 rounded-full"
              >
                <FaFacebookF className="text-primary w-8 h-8 cursor-pointer" />
              </Link>
            </div>
            <div
              className="py-3 md:py-4 text-sm font-semibold tracking-[0%] leading-[150%]"
              style={{ color: footer?.text_color || "" }}
            >
              Don&apos;t miss out on the latest news by signing up <br /> for
              our newsletters.
            </div>

            <div>
              <NewsLetterForm />
            </div>

            <div
              className="text-lg md:text-xl font-semibold leading-[120%] tracking-[0%] pt-3 md:pt-4"
              style={{ color: footer?.text_color || "" }}
            >
              Download our App
            </div>
            <div className="flex items-center gap-4 mt-3 md:mt-4">
              <Link
                href={
                  footer?.app_store_link ||
                  "https://apps.apple.com/us/app/doppl-google/id6741596720"
                }
              >
                <Image
                  src="/assets/images/app_store.png"
                  alt="app store"
                  width={165}
                  height={56}
                />
              </Link>
              <Link
                href={
                  footer?.google_play_link ||
                  "https://play.google.com/store/games?hl=en&pli=1"
                }
              >
                <Image
                  src="/assets/images/google_play.png"
                  alt="google play"
                  width={165}
                  height={56}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-[#D9D9D9] mt-4" />
        <div className="w-full h-[1px]" />
        <div
          className="w-full flex flex-col md:flex-row items-center justify-center pt-4 pb-3 md:pb-1 text-base font-medium leading-[120%] tracking-[0%] text-black"
          style={{ color: footer?.text_color || "" }}
        >
          {footer?.copyright ||
            "Copyright © 2025 SPLURJJ. All Rights Reserved."}
          <Tally1 className="text-black w-[5px] h-auto" />

          <div className="flex items-center gap-4">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/pages/${page.name}`}
                className=""
                style={{ color: footer?.text_color || "" }}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
