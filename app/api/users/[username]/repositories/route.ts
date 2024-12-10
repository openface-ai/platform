import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params;

  // Mock repository data
  const repositories = [
    { name: "nextjs-project", stars: 123, forks: 45 },
    { name: "my-awesome-app", stars: 76, forks: 12 },
  ];

  return NextResponse.json({ username, repositories });
}
