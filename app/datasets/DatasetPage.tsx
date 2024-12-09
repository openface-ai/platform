"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { Card } from "../components/shared/Card";
import type { DatasetSortOption, DatasetFilterState } from "../utils/type";
import { mockDatasets } from "../data/datasets";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import Layout from "../components/layout/Layout";
import { DatasetFilters } from "../components/search/Filters";

const SORT_OPTIONS: DatasetSortOption[] = [
  "Trending",
  "Most likes",
  "Most downloads",
  "Recently updated",
];

interface DatasetsPageProps {
  updateUrl: (updates: Record<string, string>) => void;
  getParam: (key: string) => string | null;
}

export default function DatasetsPage({
  updateUrl,
  getParam,
}: DatasetsPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [datasets] = useState(mockDatasets);
  const isInitialMount = useRef(true);

  // State management with initial values from URL
  const [searchQuery, setSearchQuery] = useState(getParam("q") || "");
  const [sortBy, setSortBy] = useState<DatasetSortOption>(
    (getParam("sort") as DatasetSortOption) || "Trending",
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<DatasetFilterState>({
    modalities: getParam("modalities")?.split(",") || [],
    formats: getParam("formats")?.split(",") || [],
    size: getParam("size")?.split(",").map(Number) || [],
  });

  // URL updates
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();

    if (searchQuery) newParams.set("q", searchQuery);
    if (sortBy) newParams.set("sort", sortBy);
    if (filters.modalities.length)
      newParams.set("modalities", filters.modalities.join(","));
    if (filters.formats.length)
      newParams.set("formats", filters.formats.join(","));
    if (filters.size.length) newParams.set("size", filters.size.join(","));

    const newSearch = newParams.toString();
    if (newSearch !== currentParams.toString()) {
      updateUrl(Object.fromEntries(newParams.entries()));
    }
  }, [searchQuery, sortBy, filters, updateUrl]);

  // Sort function
  const sortDatasets = useCallback(
    (datasetsToSort: typeof datasets) => {
      switch (sortBy) {
        case "Most likes":
          return [...datasetsToSort].sort(
            (a, b) => (b.likes || 0) - (a.likes || 0),
          );
        case "Most downloads":
          return [...datasetsToSort].sort((a, b) => b.downloads - a.downloads);
        case "Recently updated":
          return [...datasetsToSort].sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );
        default:
          return datasetsToSort;
      }
    },
    [sortBy],
  );

  // Filter and sort datasets
  const filteredDatasets = useMemo(() => {
    let filtered = [...datasets];

    if (searchQuery) {
      filtered = filtered.filter(
        (dataset) =>
          dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dataset.owner.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filters.modalities.length) {
      filtered = filtered.filter((dataset) => {
        // First check if dataset.modalities exists
        if (!dataset.modalities) return false;
        // Then check if any of the filter modalities match
        return dataset.modalities.some((datasetModality) =>
          filters.modalities.includes(datasetModality),
        );
      });
    }

    if (filters.formats.length) {
      filtered = filtered.filter((dataset) => {
        // Check if format exists and is included in the filters
        return dataset.format
          ? filters.formats.includes(dataset.format)
          : false;
      });
    }

    if (filters.size.length === 2) {
      filtered = filtered.filter((dataset) => {
        // Check if numRows exists and is within range
        return dataset.numRows
          ? dataset.numRows >= filters.size[0] &&
              dataset.numRows <= filters.size[1]
          : false;
      });
    }

    return sortDatasets(filtered);
  }, [datasets, searchQuery, filters, sortDatasets]);

  // Loading state
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
    setSortBy(value as DatasetSortOption);
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
                <h1 className="text-xl font-semibold text-gray-200">
                  Datasets
                </h1>
                <span className="text-gray-400 text-sm">
                  {filteredDatasets.length.toLocaleString()}
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
                  onChange={(e) => handleSort(e.target.value)}
                  className="appearance-none bg-gray-900/50 border border-gray-700 rounded-md px-4 py-2 text-sm text-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-[73px]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-8">
              {/* Sidebar */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-40">
                  <DatasetFilters filters={filters} onChange={setFilters} />
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
                    {filteredDatasets.map((dataset) => (
                      <div
                        key={dataset.id}
                        className="bg-gray-950 rounded-lg border border-gray-800"
                      >
                        <Card item={dataset} type="dataset" />
                      </div>
                    ))}
                  </div>
                )}

                {!isLoading && filteredDatasets.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      No datasets found matching your criteria
                    </p>
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
            <DatasetFilters filters={filters} onChange={setFilters} />
          </div>
        )}
      </div>
    </Layout>
  );
}

