// components/search/SearchLayout.tsx
'use client';

import { useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';

interface SearchLayoutProps {
  type: 'models' | 'datasets';
  totalCount: number;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function SearchLayout({ type, totalCount, sidebar, children }: SearchLayoutProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Trending');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Title and count */}
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-gray-200">
                {type === 'models' ? 'Models' : 'Datasets'}
              </h1>
              <span className="text-gray-400 text-sm">
                {totalCount.toLocaleString()}
              </span>
            </div>

            {/* Search bar */}
            <div className="flex-1 max-w-3xl relative">
              <input
                type="text"
                placeholder="Filter by name"
                className="w-full px-4 py-2 pl-10 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            {/* Actions */}
            <button className="text-sm text-gray-400 hover:text-gray-300">
              Full-text search
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option>Trending</option>
                <option>Most likes</option>
                <option>Most downloads</option>
                <option>Recently created</option>
                <option>Recently updated</option>
              </select>
            </div>
          </div>

          {/* Mobile filters button */}
          <button
            className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 flex gap-6">
        {/* Sidebar */}
        <div className={`${showMobileFilters ? 'fixed inset-0 z-30 bg-background p-4' : 'hidden'} md:block md:w-64 md:flex-shrink-0`}>
          {sidebar}
        </div>

        {/* Main content */}
        <div className="flex-1 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}