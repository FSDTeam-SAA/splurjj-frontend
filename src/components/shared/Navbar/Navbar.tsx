"use client";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-[#E0E0E0]">
      <div className=" container py-[15px] md:py-[25px] lg:py-[38px]">
        {/* large device  */}
        <div className="hidden md:block">
          <div className=" w-full flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
              <span>
                <Menu />
              </span>
              {/* menu  */}
              <ul className="flex items-center gap-4 md:gap-5 lg:gap-6">
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  LATEST
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  ART & CULTURE
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  GEAR
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  Music
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  QUIET CALM
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  <Link href="/videos">VIDEOS</Link>
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  SHOP
                </li>
              </ul>
            </div>

            {/* icon  */}
            <div className="flex items-center gap-4">
              <span>
                <Search className="cursor-pointer" />
              </span>
              <span>
                <ShoppingCart />
              </span>
            </div>
          </div>
        </div>
        {/* small device  */}
        <div className="block md:hidden">
          <div className="w-full flex items-center justify-between">
            {/* logo  */}
            <div className="text-3xl font-bold text-black">logo</div>
            <div>
              {isOpen ? (
                <span onClick={() => setIsOpen(!isOpen)}>
                  <X />
                </span>
              ) : (
                <span onClick={() => setIsOpen(!isOpen)}>
                  <Menu />
                </span>
              )}
            </div>
          </div>
          {/* menu  items  */}
          <div>
            {isOpen && (
              <ul className="flex flex-col items-center gap-5 lg:gap-6">
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  LATEST
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  ART & CULTURE
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  GEAR
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  Music
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  QUIET CALM
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  <Link href="/videos">VIDEOS</Link>
                </li>
                <li className="text-base md:text-[17px] lg:text-lg font-medium leading-[100%] tracking-[0%] text-black cursor-pointer">
                  SHOP
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
