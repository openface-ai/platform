// components/repository/RepoTabs.tsx
'use client';

import { FileText, GitFork, Users, Settings } from 'lucide-react';
import { RepoTab } from '@/app/utils/type';

interface RepoTabsProps {
  activeTab: RepoTab;
  onTabChange: (tab: RepoTab) => void;
}

export function RepoTabs({ activeTab, onTabChange }: RepoTabsProps) {
  const tabs = [
    { id: 'model-card' as const, label: 'Model card', icon: FileText },
    { id: 'files' as const, label: 'Files and versions', icon: GitFork },
    { id: 'community' as const, label: 'Community', icon: Users },
    { id: 'settings' as const, label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex items-center gap-1 -mb-px">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 ${
            activeTab === id
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}