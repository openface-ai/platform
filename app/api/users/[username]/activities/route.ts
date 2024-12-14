// app/api/users/[username]/activities/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any  // Using 'any' temporarily to debug the typing issue
) {
  const { username } = context.params;

  const activities = [
    { type: "push", repo: "nextjs/next.js", timestamp: "2024-12-08T10:00:00Z" },
    { type: "fork", repo: "vercel/commerce", timestamp: "2024-12-07T15:30:00Z" },
  ];

  return NextResponse.json({ username, activities });
}