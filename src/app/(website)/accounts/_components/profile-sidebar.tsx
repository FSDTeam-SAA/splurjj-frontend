"use client";

import { User, Lock, LogOut } from "lucide-react";
import ProfileAvatar from "./profile-avatar";

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
}

interface ProfileSidebarProps {
  userProfile?: UserProfile;
  profileImage: string;
  setProfileImage: (image: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  token: string;
}

export default function ProfileSidebar({
  userProfile,
  profileImage,
  setProfileImage,
  activeTab,
  setActiveTab,
  token,
}: ProfileSidebarProps) {
  return (
    <div className="w-80 bg-white rounded-lg h-fit">
      <div className="text-center mb-8">
        <ProfileAvatar
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          userName={`${userProfile?.first_name || ""} ${userProfile?.last_name || ""}`}
          token={token}
        />
        <h2 className="text-lg md:text-xl font-semibold leading-[120%] text-[#424242] tracking-[0%] font-poppins pt-3">
          {userProfile?.first_name || ""} {userProfile?.last_name || ""}
        </h2>
        <p className="text-base font-normal text-[#BFBFBF] font-poppins leading-[120%] tracking-[0%] ">
          {userProfile?.email || ""}
        </p>
      </div>

      <nav className="space-y-[7px]">
        <button
          onClick={() => setActiveTab("personal")}
          className={`w-full md:w-[307px] h-[62px] flex items-center gap-[10px] text-lg font-normal font-poppins leading-[120%] tracking-[0%] px-4 py-3 rounded-[8px] text-left transition-colors ${
            activeTab === "personal"
              ? "bg-[#595959] text-white"
              : "text-[#131313]"
          }`}
        >
          <User className="w-[30px] h-[30px]" />
          Personal Information
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`w-full md:w-[307px] h-[62px] flex items-center gap-[10px] text-lg font-normal font-poppins leading-[120%] tracking-[0%] px-4 py-3 rounded-[8px] text-left transition-colors ${
            activeTab === "password"
              ? "bg-[#595959] text-white"
              : "text-[#131313]"
          }`}
        >
          <Lock className="w-[30px] h-[30px]" />
          Change Password
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-red-50 transition-colors text-lg md:text-xl font-medium leading-[120%] font-poppins text-[#FF0000]">
          <LogOut className="w-[30px] h-[30px]" />
          Log out
        </button>
      </nav>
    </div>
  );
}
