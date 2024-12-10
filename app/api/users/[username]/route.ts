import { UserProfileData } from "@/app/utils/type";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params;
  console.log("getting: ", username);

  // do some work to get userProfile from a databse
  const userProfile = null;

  if (userProfile) {
    return NextResponse.json({
      status: "ok",
      data: userProfile,
    });
  } else {
    return NextResponse.json({
      status: "ok",
      data: null,
    });
  }
}
