import { UserStats } from "@/app/utils/type";
import { NextResponse } from "next/server";

export async function GET() {
// request: Request,
// { params }: { params: { username: string } },
  // const { _username } = params;

  // Mock stats data
  const stats: UserStats = {
    followers: 150,
    following: [],
  };

  return NextResponse.json(stats);
}
