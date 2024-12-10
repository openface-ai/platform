import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params;

  // Mock activities data
  const activities = [
    { type: "push", repo: "nextjs/next.js", timestamp: "2024-12-08T10:00:00Z" },
    {
      type: "fork",
      repo: "vercel/commerce",
      timestamp: "2024-12-07T15:30:00Z",
    },
  ];

  return NextResponse.json({ username, activities });
}
