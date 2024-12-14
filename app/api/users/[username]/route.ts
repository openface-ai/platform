import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  const { username } = context.params;
  console.log("getting: ", username);

  // do some work to get userProfile from a database
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