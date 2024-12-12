// app/api/users/[username]/repositories/route.ts
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: any
) {
  const { username } = context.params;
  
  const repositories = [
    { name: "nextjs-project", stars: 123, forks: 45 },
    { name: "my-awesome-app", stars: 76, forks: 12 },
  ];
  
  return NextResponse.json({ username, repositories });
}

