import { UserProfileData } from "@/app/utils/type";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { NextRequest, NextResponse } from "next/server";

// Mock function to simulate saving to a database
const saveProfileToDatabase = async (
  profile: UserProfile,
): Promise<UserProfileData> => {
  console.log("Saving user profile:", profile);

  // we can use this provider id to prepopulate account information
  const provider = profile.sub ? profile.sub.split("|")[0] : "";
  // user.sub is auth0's id for users
  // https://community.auth0.com/t/how-to-get-user-id-of-a-user-after-login-in-react-hook-useauth0/53309
  const githubUsername =
    provider == "github"
      ? profile.nickname
        ? profile.nickname
        : undefined
      : undefined;

  const defaultAvatar =
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  return {
    sub_token_claim: profile.sub ? profile.sub : "",
    fullname: profile.name ? profile.name : "",
    username: profile.nickname ? profile.nickname : "",
    avatar: profile.picture ? profile.picture : defaultAvatar,
    email: profile.email ? profile.email : undefined,
    interests: ["Computer Vision", "NLP"],
    joinedAt: profile.updated_at
      ? profile.updated_at
      : new Date().toISOString(),
    organizations: [],
    twitter: undefined,
    linkedin: undefined,
    github: githubUsername,
    homepage: "https://www.google.com",
    agreedToTerms: true,
  };
};

export async function PUT(request: NextRequest) {
  try {
    const payload: UserProfile = await request.json();

    // Validate payload (you can customize this validation based on your needs)
    // if (!payload.fullname || !payload.email) {
    //   return NextResponse.json(
    //     { error: "Fullname and email are required" },
    //     { status: 400 },
    //   );
    // }

    const updatedProfile: UserProfileData =
      await saveProfileToDatabase(payload);

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 },
    );
  }
}
