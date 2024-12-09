"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileTab, UserData } from "@/app/utils/type";

interface ProfileProps {
  user: UserData;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export function ProfileHeader({ user, activeTab, onTabChange }: ProfileProps) {
  const userImgSrc =
    user.auth_profile.picture ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  return (
    <div className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-start justify-between mb-4">
          <div className="flex items-center gap-2 p-2">
            <Image
              src={userImgSrc}
              alt="User Profile"
              className="rounded-3xl align-text-bottom"
              width={100}
              height={100}
            />

            <hr className="h-full border-none bg-gray-600 w-1" />
            <div className="flex flex-col">
              <Link
                href={`/${user.auth_profile.sub}`}
                className="text-gray-400 hover:text-gray-300 hover:underline"
              >
                {user.auth_profile.name}
              </Link>
              {user.auth_profile.email && (
                <span className="text-xs text-gray-500">
                  {user.auth_profile.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}

        {/* Navigation Tabs */}
        <ProfileTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}
