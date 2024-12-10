"use client";
import Link from "next/link";
import Image from "next/image";
import { UserProfileData, UserStats } from "@/app/utils/type";
import {
  GithubIcon,
  Home,
  LinkedinIcon,
  Settings,
  TwitterIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  user: UserProfileData;
  // onFollowersClick: () => void;
  // onFollowingClick: () => void;
}

export function ProfileHeader({
  user,
  // onFollowersClick,
  // onFollowingClick,
}: ProfileHeaderProps) {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const onFollowersClick = () => {};
  const onFollowingClick = () => {};

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

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch(
          `/api/users/${user.sub_token_claim}/stats`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data: UserStats = await response.json();
        setUserStats(data);
      } catch (err) {
        console.log("error fetching stats: ", err);
        setError("Failed to fetch user stats");
      }
    };

    if (userStats) {
      return;
    } else {
      fetchUserStats();
    }
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-4">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4">
          <Image
            src={user.avatar}
            alt="User avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user.username}!
            </h1>
            <p className="text-gray-400">Member since {user.joinedAt}</p>
          </div>
        </div>
        <div className="flex gap-8 ml-auto">
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-400">Models</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-400">Datasets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">1.2k</p>
            <p className="text-sm text-gray-400">Likes</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full mt-4">
        <button
          onClick={handleSettingsClick}
          className="p-2 rounded-full text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
        </button>
        {/* Followers/Following */}
        <div className="flex w-full flex-row justify-between ">
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

          {renderSocials()}
        </div>
      </div>
    </div>
  );
}
