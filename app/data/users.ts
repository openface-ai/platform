import { UserData } from "../utils/type";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export const MockUserData = (profile: UserProfile): UserData => {
  return {
    auth_profile: profile,
    following: [], // Initialize with an empty array or mock data
    followers: Math.floor(Math.random() * 1000), // Mock random follower count
    interests: ["Computer Vision", "NLP"],
    twitter: undefined,
    linkedin: undefined,
    github: undefined,
    full_name: "John Doe",
    homepage: "www.google.com",
    agreedToTerms: true,
  };
};
// Accessing and modifying values
