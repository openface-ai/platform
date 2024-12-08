// components/repository/FileBrowser/BranchSelector.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  GitBranchIcon, 
  CheckIcon, 
  SearchIcon,
  GitCommitIcon,
  TagIcon 
} from 'lucide-react';
import Button from '../../ui/Button';
import { RepoBranch, RepositoryTag, RepoCommit, RepoTag } from '@/app/utils/type';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

interface BranchSelectorProps {
  branches: RepoBranch[];
  tags: RepoTag[];
  currentBranch: string;
  currentCommit: RepoCommit;
  onBranchChange: (branch: string) => void;
  onCommitChange: (commit: string) => void;
}

export function BranchSelector({
  branches,
  tags,
  currentBranch,
  currentCommit,
  onBranchChange,
  onCommitChange,
}: BranchSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'branches' | 'tags'>('branches');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 min-w-[160px] justify-between"
        >
          <div className="flex items-center gap-2">
            <GitBranchIcon className="w-4 h-4" />
            <span className="truncate">{currentBranch}</span>
          </div>
          <span className="text-xs text-gray-500 truncate">
            {currentCommit.sha.substring(0, 7)}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className="w-[300px] max-h-[400px]"
        align="start"
      >
        {/* Search */}
        <div className="p-2 border-b border-gray-800">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Find a branch or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* View selector */}
        <div className="p-2 border-b border-gray-800">
          <div className="flex gap-2">
            <Button
              variant={view === 'branches' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setView('branches')}
            >
              <GitBranchIcon className="w-4 h-4 mr-2" />
              Branches
            </Button>
            <Button
              variant={view === 'tags' ? 'secondary' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setView('tags')}
            >
              <TagIcon className="w-4 h-4 mr-2" />
              Tags
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="py-1 overflow-y-auto max-h-[300px]">
          {view === 'branches' ? (
            filteredBranches.map((branch) => (
              <DropdownMenuItem
                key={branch.name}
                className="flex items-center gap-2 px-4 py-2"
                onClick={() => {
                  onBranchChange(branch.name);
                  setIsOpen(false);
                }}
              >
                <GitBranchIcon className="w-4 h-4 text-gray-400" />
                <span className="flex-1 truncate">{branch.name}</span>
                {branch.isDefault && (
                  <span className="text-xs text-gray-500">default</span>
                )}
                {currentBranch === branch.name && (
                  <CheckIcon className="w-4 h-4 text-green-500" />
                )}
              </DropdownMenuItem>
            ))
          ) : (
            filteredTags.map((tag) => (
              <DropdownMenuItem
                key={tag.name}
                className="flex items-center gap-2 px-4 py-2"
                onClick={() => {
                  onCommitChange(tag.commit);
                  setIsOpen(false);
                }}
              >
                <TagIcon className="w-4 h-4 text-gray-400" />
                <span className="flex-1 truncate">{tag.name}</span>
                <span className="text-xs text-gray-500">
                  {tag.commit.substring(0, 7)}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>

        {/* Recent commits */}
        <DropdownMenuSeparator />
        <div className="py-1">
          <div className="px-4 py-2 text-xs text-gray-500">Recent commits</div>
          {currentCommit && (
            <DropdownMenuItem
              className="flex items-center gap-2 px-4 py-2"
            >
              <GitCommitIcon className="w-4 h-4 text-gray-400" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{currentCommit.message}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{currentCommit.sha.substring(0, 7)}</span>
                  <span>•</span>
                  <span>{currentCommit.author.name}</span>
                </div>
              </div>
            </DropdownMenuItem>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}