"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileTab, UserData } from "@/app/utils/type";
import {
  Activity,
  Building,
  GithubIcon,
  Home,
  LinkedinIcon,
  Microscope,
  TwitterIcon,
} from "lucide-react";

interface ProfileProps {
  user: UserData;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export function ProfileHeader({ user, activeTab, onTabChange }: ProfileProps) {
  const renderSocials = () => {
    const socials = [
      { id: "homepage" as const, label: "Homepage", icon: Home },
      { id: "linkedin" as const, label: "LinkedIn", icon: LinkedinIcon },
      { id: "github" as const, label: "GitHub", icon: GithubIcon },
      { id: "twitter" as const, label: "Twitter", icon: TwitterIcon },
    ];
    return (
      <div className="flex flex-row">
        {socials.map(({ id, label, icon: Icon }) => {
          const social: string | undefined = (() => {
            switch (id) {
              case "homepage":
                return user.homepage;
              case "linkedin":
                return user.linkedin;
              case "github":
                return user.github;
              case "twitter":
                return user.twitter;
              default:
                return undefined; // In case no matching case is found
            }
          })();
          if (social) {
            return (
              <Link
                className="flex text-gray-600 items-center gap-2 px-4 py-2 text-xs hover:text-gray-50"
                key={id}
                href={
                  id == "homepage" ? social : `https://www.${id}.com/${social}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const renderStringList = (list: string[]) => {
    if (list.length === 0) {
      return <div className="text-gray-500 text-xs px-5">None yet</div>;
    }

    return (
      <div className="flex flex-col gap-2 px-5">
        {list.map((str, index) => (
          <div key={index} className="flex items-center text-gray-500 text-xs">
            <span>{str}</span>
          </div>
        ))}
      </div>
    );
  };

  const userImgSrc =
    user.avatar ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  return (
    <div className="border-b border-gray-800 mx-7">
      <div className="flex flex-row justify-between max-w-7xl mx-auto p-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-2 p-2">
            <Image
              src={userImgSrc}
              alt="User Profile"
              className="rounded-3xl align-text-bottom"
              width={100}
              height={100}
            />

            <hr className="h-full border-none bg-gray-600 w-1/2" />
            <div className="flex flex-col">
              <Link
                href={`/${user.username}`}
                className="text-gray-400 hover:text-gray-300 hover:underline"
              >
                {user.username}
              </Link>
              {user.email && (
                <span className="text-xs text-gray-500">{user.email}</span>
              )}
            </div>
          </div>
          {renderSocials()}
        </div>
        <div className="flex flex-row justify-around">
          <div className="m-2">
            <span className="flex flex-row m-2">
              <Microscope size={20} className="mr-2" />
              Ai & ML Interests
            </span>
            {renderStringList(user.interests)}
          </div>
          <div className="m-2">
            <span className="flex flex-row m-2">
              <Building size={20} className="mr-2" />
              Organizations
            </span>
            {renderStringList(user.organizations)}
          </div>
          <div className="m-2">
            <span className="flex flex-row m-2">
              <Activity size={20} className="mr-2" />
              Recent Activity
            </span>
          </div>
        </div>
      </div>
      <ProfileTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
