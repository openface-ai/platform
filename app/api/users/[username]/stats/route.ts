// app/api/users/[username]/stats/route.ts
import { UserStats } from "@/app/utils/type";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  const { username } = context.params;

  const stats: UserStats = {
    followers: 150,
    following: [],
  };

  return NextResponse.json(stats);
}