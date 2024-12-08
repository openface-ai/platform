export type Model = {
    id: string;
    name: string;
    description: string;
    owner: string;
    avatar: string;
    likes: number;
    isPrivate: boolean;
    updatedAt: string;
    downloads: number;
    category: string;
    task: string
};

export type Dataset = {
    id: string;
    name: string;
    description: string;
    owner: string;
    avatar: string;
    likes: number;
    isPrivate: boolean;
    updatedAt: string;
    downloads: number;
    category: string;
    // Dataset-specific fields
    numRows?: number;  // Optional for table icon
    isViewable?: boolean;  // Optional for "Viewer" label
    task: string;
    modalities?: string[];
    format?: string,


  };

  export interface FilterState {
    tasks: string[];
    modalities: string[];
    formats: string[];  
  }
  export interface DatasetFilterState {
    modalities: string[];
    formats: string[];
    size: number[];
  
  }
  
  export type SortOption = 'Trending' | 'Most likes' | 'Most downloads' | 'Recently updated' ;
  export type DatasetSortOption = 'Trending' | 'Most likes' | 'Most downloads' | 'Recently updated'  | 'Largest' | 'Smallest';
  
  export interface SearchState {
    query: string;
    sort: SortOption;
    filters: FilterState;
  }