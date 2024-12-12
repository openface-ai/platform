import { UserProfileData } from "../utils/type";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export const MockUserProfileData = (profile: UserProfile): UserProfileData => {
  // we can use this provider id to prepopulate account information
  const provider = profile.sub ? profile.sub.split("|")[0] : "";
  const stats = {
    following: [], // Initialize with an empty array or mock data
    followers: Math.floor(Math.random() * 1000), // Mock random follower count
  };

  return {
    sub_token_claim: profile.sub ? profile.sub : "",
    fullname: profile.name ? profile.name : "",
    username: profile.nickname ? profile.nickname : "",
    avatar: profile.picture ? profile.picture : undefined,
    email: profile.email ? profile.email : undefined,
    stats: stats,
    interests: ["Computer Vision", "NLP"],
    organizations: [],
    twitter: undefined,
    linkedin: undefined,
    github:
      provider == "github"
        ? profile.nickname
          ? profile.nickname
          : undefined
        : undefined,
    homepage: "https://www.google.com",
    agreedToTerms: true,
  };
};
// Accessing and modifying values
