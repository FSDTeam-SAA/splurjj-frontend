"use client";

import ThemeToggle from "@/app/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModal from "@/components/shared/modals/LogoutModal";
import { useState } from "react";
import { toast } from "react-toastify";

interface UserProfileData {
  first_name: string;
  last_name: string;
  profile_pic: string;
}

interface UserSettingsResponse {
  success: boolean;
  message: string;
  data: UserProfileData;
}

export type HeaderResponse = {
  success: boolean;
  message: string;
  data: {
    logo: string | null;
    border_color: string | null;
    bg_color: string | null;
    menu_item_color: string | null;
    menu_item_active_color: string | null;
  };
};

export default function DashboardHeader() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const session = useSession();
  const role = session?.data?.user?.role || "Admin";

  const token = (session?.data?.user as { token?: string })?.token;

  const handLogout = async () => {
    try {
      toast.success("Logout successful!");
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // user info data
  const { data } = useQuery<UserSettingsResponse>({
    queryKey: ["user-info"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  // header api integration

  const { data: headerData } = useQuery<HeaderResponse>({
    queryKey: ["header"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/header`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  // console.log(headerData?.data);

  return (
    <header className=" px-6 py-5 bg-white border-b border-[#B6B6B6]/50">
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="">
            <Link href="/">
              {headerData?.data?.logo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${headerData.data.logo}`}
                  alt="logo"
                  width={90}
                  height={55}
                  className="w-[90px] h-[55px] object-contain"
                />
              ) : (
                <h2 className="text-2xl text-black font-bold leading-normal">
                  LOGO
                </h2>
              )}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* theme toggle  */}
          <ThemeToggle />

          {/* Right Section - Notifications and User Profile */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-3">
                  <div>
                    <Avatar>
                      <AvatarImage
                        src={
                          data?.data?.profile_pic ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback className="text-base font-bold leading-normal text-black">
                        {data?.data?.first_name?.charAt(0) || ""}
                        {data?.data?.last_name?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-[#131313] dark:text-black leading-[120%] tracking-[0%] ">
                      {data?.data?.first_name}
                    </h4>
                    <p className="text-xs font-normal text-[#424242] text-left dark:text-black leading-[120%] tracking-[0%]  pt-[2px]">
                      {role}
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-[150px]">
                <Link href="/dashboard/settings">
                  <DropdownMenuLabel className="text-[#131313] text-sm font-semibold leading-normal hover:bg-blue-100/50">
                    Settings
                  </DropdownMenuLabel>
                </Link>
                <DropdownMenuLabel
                  onClick={() => setLogoutModalOpen(true)}
                  className="text-red-500 text-sm font-semibold leading-normal cursor-pointer"
                >
                  Log Out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {logoutModalOpen && (
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handLogout}
        />
      )}
    </header>
  );
}
