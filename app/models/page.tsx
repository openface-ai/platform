// app/models/page.tsx
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { ModelFilters } from '../components/search/Filters';
import { Card } from '../components/shared/Card';
import { useUrlState } from '../utils/urlState';
import type { SortOption, FilterState } from '../utils/type';
import { mockModels } from '@/app/data/models';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import Layout from '../components/layout/Layout';

const SORT_OPTIONS: SortOption[] = [
  'Trending',
  'Most likes',
  'Most downloads',
  'Recently updated'
];


export default function ModelsPage() {
    const { updateUrl, getParam } = useUrlState();
    const [isLoading, setIsLoading] = useState(true);
    const [models] = useState(mockModels);
    
    // Use refs to track if this is the initial mount
    const isInitialMount = useRef(true);
    
    // State management with initial values from URL
    const [searchQuery, setSearchQuery] = useState(getParam('q') || '');
    const [sortBy, setSortBy] = useState<SortOption>((getParam('sort') as SortOption) || 'Trending');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
      tasks: getParam('tasks')?.split(',') || [],
      modalities: [],
      formats: []
    });
  
    // Only update URL after initial mount
    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
  
      const currentParams = new URLSearchParams(window.location.search);
      const newParams = new URLSearchParams();
  
      // Only add params if they're different from current
      if (searchQuery && currentParams.get('q') !== searchQuery) {
        newParams.set('q', searchQuery);
      }
      if (sortBy && currentParams.get('sort') !== sortBy) {
        newParams.set('sort', sortBy);
      }
      if (filters.tasks.length && currentParams.get('tasks') !== filters.tasks.join(',')) {
        newParams.set('tasks', filters.tasks.join(','));
      }
  
      // Only update URL if params have changed
      const newSearch = newParams.toString();
      if (newSearch !== currentParams.toString()) {
        updateUrl(Object.fromEntries(newParams.entries()));
      }
    }, [searchQuery, sortBy, filters.tasks, updateUrl]);
  
    // Memoized sort function
    const sortModels = useCallback((modelsToSort: typeof models) => {
      switch (sortBy) {
        case 'Most likes':
          return [...modelsToSort].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        case 'Most downloads':
          return [...modelsToSort].sort((a, b) => b.downloads - a.downloads);
        case 'Recently updated':
          return [...modelsToSort].sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return modelsToSort;
      }
    }, [sortBy]);
  
    // Memoized filtered models
    const filteredModels = useMemo(() => {
      let filtered = [...models];
  
      if (searchQuery) {
        filtered = filtered.filter(model => 
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.owner.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      if (filters.tasks.length > 0) {
        filtered = filtered.filter(model => 
          filters.tasks.includes(model.task)
        );
      }
  
      return sortModels(filtered);
    }, [models, searchQuery, filters.tasks, sortModels]);
  
    // Debounced loading state
    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }, [searchQuery, filters, sortBy]);
  
    // Handlers
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    }, []);
  
    const handleSort = useCallback((value: string) => {
      setSortBy(value as SortOption);
    }, []);
  return (
    <Layout>
      <div className="flex min-h-screen flex-col">
        {/* Search Header */}
        <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-4 flex flex-col md:flex-row items-center gap-4">
              {/* Search and Count */}
              <div className="flex-1 flex items-center gap-4 w-full">
                <h1 className="text-xl font-semibold text-gray-200">Models</h1>
                <span className="text-gray-400 text-sm">
                  {filteredModels.length.toLocaleString()}
                </span>
                <div className="relative flex-1 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 pl-10 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-gray-900/50 border border-gray-700 rounded-md px-4 py-2 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-[73px]"> {/* Add padding-top for search header height */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-40">
                  <ModelFilters
                    filters={filters}
                    onChange={setFilters}
                  />
                </div>
              </div>

              {/* Results Grid */}
              <div className="flex-1">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredModels.map((model) => (
                      <div key={model.id} className="bg-gray-950 rounded-lg border border-gray-800">
                        <Card item={model} type="model" />
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && filteredModels.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No models found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <button
          className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <SlidersHorizontalIcon className="w-5 h-5" />
        </button>

        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-background p-4 md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <ModelFilters
              filters={filters}
              onChange={setFilters}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}