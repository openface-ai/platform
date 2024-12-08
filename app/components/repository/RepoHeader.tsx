'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Copy, Check, Users } from 'lucide-react';
import { RepositoryStats, RepositoryTag, RepoTab } from '@/app/utils/type';
import Button from '../ui/Button';
import { RepoTabs } from './RepoTabs';

interface RepoHeaderProps {
    owner: string;
    name: string;
    stats: RepositoryStats;
    tags: RepositoryTag[];
    isLiked?: boolean;
    isFollowing?: boolean;
    activeTab: RepoTab;
    onTabChange: (tab: RepoTab) => void;
  }

  function getTagStyles(type: string) {
    switch (type) {
      case 'task':
        return 'bg-blue-500 text-white';
      case 'category':
        return 'bg-green-500 text-white';
      case 'language':
        return 'bg-yellow-500 text-white';
      case 'model':
        return 'bg-purple-500 text-white';
      case 'license':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  export function RepoHeader({ 
    owner, 
    name, 
    stats, 
    tags, 
    isLiked = false, 
    isFollowing = false,
    activeTab,
    onTabChange
  }: RepoHeaderProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(stats.likes);
  const [following, setFollowing] = useState(isFollowing);
  const [followCount, setFollowCount] = useState(stats.followers);
  const [copied, setCopied] = useState(false);

  const handleLike = async () => {
    // TODO: Add API call
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleFollow = async () => {
    // TODO: Add API call
    setFollowing(!following);
    setFollowCount(prev => following ? prev - 1 : prev + 1);
  };

  const copyRepoPath = () => {
    navigator.clipboard.writeText(`${owner}/${name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Repository Title and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link 
              href={`/${owner}`}
              className="text-gray-400 hover:text-gray-300 hover:underline"
            >
              {owner}
            </Link>
            <span className="text-gray-600">/</span>
            <h1 className="text-xl font-semibold text-gray-200">{name}</h1>
            <button
              onClick={copyRepoPath}
              className="ml-2 p-1 hover:bg-gray-800 rounded"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-800"
            >
              <Heart
                className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
              <span className="text-sm text-gray-400">{likeCount}</span>
            </button>

            <Button
              onClick={handleFollow}
            //   variant={following ? "secondary" : "default"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              {following ? 'Following' : 'Follow'} 
              <span className="text-sm">({followCount})</span>
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={`${tag.type}-${tag.label}`}
              className={`px-2 py-1 rounded-full text-xs ${
                getTagStyles(tag.type)
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Navigation Tabs */}
        <RepoTabs activeTab={activeTab} onTabChange={onTabChange} />

      </div>
    </div>
  );
}