"use client";

import ThemeToggle from "@/app/theme-toggle";
import Image from "next/image";
import type React from "react";

export default function DashboardHeader() {
  return (
    <header className=" px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 font-medium">
            LOGO
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* theme toggle  */}
          <ThemeToggle />

          {/* Right Section - Notifications and User Profile */}
          <div className="flex items-center gap-3">
            <div>
              <Image
                src="/assets/images/Avatar.png"
                alt="avata image"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h4 className="text-base font-normal text-[#131313] leading-[120%] tracking-[0%] font-poppins">
                Splurjj
              </h4>
              <p className="text-xs font-normal text-[#424242] leading-[120%] tracking-[0%] font-poppins pt-[2px]">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
