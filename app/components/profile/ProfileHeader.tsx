"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileTab, UserData, UserStats } from "@/app/utils/type";
import {
  Activity,
  Building,
  GithubIcon,
  Home,
  LinkedinIcon,
  Microscope,
  TwitterIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface ProfileProps {
  user: UserData;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

export function ProfileHeader({
  user,
  activeTab,
  onTabChange,
  onFollowersClick,
  onFollowingClick,
}: ProfileProps) {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);

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
                className="flex text-gray-600 items-center gap-2 p-2 text-xs hover:text-gray-50"
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

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch(`/api/users/${user.name}/stats`);

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data: UserStats = await response.json();
        console.log(data);
        setUserStats(data);
      } catch (err) {
        console.log("error: ", err);
        setError("Failed to fetch user stats");
      }
    };
    if (userStats) {
      return;
    }
    fetchUserStats();
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userImgSrc =
    user.avatar ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  return (
    <div className="border-b border-gray-800 mx-7">
      <div className="flex lg:flex-row flex-col justify-between max-w-7xl mx-auto p-4">
        <div className="flex flex-col items-start justify-between">
          {/* User Image + Name + Email */}
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

          {/* Followers/Following */}
          {userStats ? (
            <div className="flex flex-row text-xs gap-x-2 px-2">
              <button onClick={onFollowersClick}>
                <span className="font-bold text-gray-200">
                  {userStats.followers}
                </span>
                <span className="text-gray-500 ml-1">Followers</span>
              </button>
              <button onClick={onFollowingClick}>
                <span className="font-bold text-gray-200">
                  {userStats.following.length}
                </span>
                <span className="text-gray-500 ml-1">Following</span>
              </button>
            </div>
          ) : (
            <LoadingSpinner />
          )}

          {/* Socials */}
          {renderSocials()}
        </div>

        {/* Interests/Orgs/Activity */}
        <div className="flex lg:flex-row flex-col justify-around ">
          <div className="m-2">
            <span className="flex flex-row">
              <Microscope size={20} className="mr-2" />
              Ai & ML Interests
            </span>
            {renderStringList(user.interests)}
          </div>
          <div className="m-2 align-top">
            <span className="flex flex-row">
              <Building size={20} className="mr-2" />
              Organizations
            </span>
            {renderStringList(user.organizations)}
          </div>
          <div className="m-2">
            <span className="flex flex-row">
              <Activity size={20} className="mr-2" />
              Recent Activity
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
