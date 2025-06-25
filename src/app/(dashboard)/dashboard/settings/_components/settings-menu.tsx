"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface SettingsMenuProps {
  onSectionSelect: (section: string) => void;
}

export default function SettingsMenu({ onSectionSelect }: SettingsMenuProps) {
  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-[35px] lg:text-10 font-poppins font-semibold text-[#212121] leading-[120%] mb-2">
            Settings
          </h1>
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="hover:underline text-xl font-normal font-poppins leading-[120%] tracking-[0%] text-[#595959]"
            >
              Dashboard
            </Link>
            <span>
              <ChevronRight className="text-[#595959] w-6 h-6" />
            </span>
            <Link href="/dashboard/settings">
            <span className="text-xl font-normal font-poppins leading-[120%] tracking-[0%] text-[#595959]">
              Settings
            </span>
            </Link>
          </div>
        </div>

        {/* Settings Options */}
        <div className="space-y-5">
          <Card className="bg-white border border-[#BABABA]">
            <CardContent className="p-0">
              <Link href="/dashboard/settings/personal-info">
                <Button
                  variant="ghost"
                  className="w-full h-[61px] justify-between p-4"
                  onClick={() => onSectionSelect("personal")}
                >
                  <span className="text-2xl font-semibold font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                    Personal Information
                  </span>
                  <ChevronRight className="!h-6 !w-6 text-[#212121]" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white border border-[#BABABA]">
            <CardContent className="p-0">
              <Link href="/dashboard/settings/change-password">
                <Button
                  variant="ghost"
                  className="w-full h-[61px] justify-between p-4"
                  onClick={() => onSectionSelect("password")}
                >
                  <span className="text-2xl font-semibold font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                    Change Password
                  </span>
                  <ChevronRight className="!h-6 !w-6 text-[#212121]" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
