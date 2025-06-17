"use client";

import ThemeToggle from "@/app/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type React from "react";

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

export default function DashboardHeader() {
  const session = useSession();
  const role = session?.data?.user?.role || "Admin";

  const token = (session?.data?.user as { token?: string })?.token;

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
  console.log(data?.data?.first_name);
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
              <Avatar>
                <AvatarImage src={data?.data?.profile_pic} />
                <AvatarFallback className="text-base font-bold leading-normal text-black">
                  {data?.data?.first_name.charAt(0)}{" "}
                  {data?.data?.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h4 className="text-base font-medium text-[#131313] leading-[120%] tracking-[0%] font-poppins">
                {data?.data?.first_name}
              </h4>
              <p className="text-xs font-normal text-[#424242] leading-[120%] tracking-[0%] font-poppins pt-[2px]">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
