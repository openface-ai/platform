import { UserData } from "../utils/type";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export const MockUserData = (profile: UserProfile): UserData => {
  // we can use this provider id to prepopulate account information
  const provider = profile.sub ? profile.sub.split("|")[0] : "";

  return {
    sub_token_claim: profile.sub ? profile.sub : "",
    fullname: profile.name ? profile.name : "",
    username: profile.nickname ? profile.nickname : "",
    avatar: profile.picture ? profile.picture : undefined,
    email: profile.email ? profile.email : undefined,
    following: [], // Initialize with an empty array or mock data
    followers: Math.floor(Math.random() * 1000), // Mock random follower count
    interests: ["Computer Vision", "NLP"],
    organizations: [],
    x: undefined,
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
