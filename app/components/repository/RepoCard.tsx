// components/repository/RepoCard.tsx
"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";

const MOCK_REPOS: RepoCardProps[] = [
  {
    name: "awesome-project",
    isPrivate: false,
    updatedAt: new Date("2024-12-01T10:30:00Z"),
    stats: {
      downloads: 1500,
      views: 3200,
      likes: 450,
    },
    metadata: {
      description: "A project that does awesome things.",
      tags: ["typescript", "open-source", "library"],
    },
  },
  {
    name: "hidden-repo",
    isPrivate: true,
    updatedAt: new Date("2024-11-15T14:45:00Z"),
    stats: {
      downloads: 100,
      views: 200,
    },
    metadata: {
      owner: "john_doe",
      version: "1.2.3",
    },
  },
  {
    name: "public-toolkit",
    isPrivate: false,
    updatedAt: new Date("2024-12-05T08:15:00Z"),
    stats: {
      downloads: 5000,
      views: 10000,
      likes: 750,
    },
    metadata: {
      repositoryUrl: "https://github.com/example/public-toolkit",
    },
  },
  {
    name: "experimental-project",
    isPrivate: false,
    updatedAt: new Date("2024-11-30T18:00:00Z"),
    metadata: {
      notes: "This project is still in beta.",
    },
  },
];

interface RepoCardProps {
  name: string;
  owner: string;
  isPrivate: boolean;
  updatedAt: Date;
  stats?: {
    downloads?: number;
    views?: number;
    likes?: number;
  };
  metadata?: Record<string, unknown>;
}

export function RepoCard(props: RepoCardProps) {
  const [content, setRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate API call to fetch README
  //   setTimeout(() => {
  //
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }
  return <div></div>;
}
