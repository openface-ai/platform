import { UserProfile } from "@auth0/nextjs-auth0/client";

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
  task: string;
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
  numRows?: number; // Optional for table icon
  isViewable?: boolean; // Optional for "Viewer" label
  task: string;
  modalities?: string[];
  format?: string;
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

export type SortOption =
  | "Trending"
  | "Most likes"
  | "Most downloads"
  | "Recently updated";
export type DatasetSortOption =
  | "Trending"
  | "Most likes"
  | "Most downloads"
  | "Recently updated"
  | "Largest"
  | "Smallest";

export interface SearchState {
  query: string;
  sort: SortOption;
  filters: FilterState;
}

export interface RepositoryTag {
  type: "task" | "framework" | "language" | "model" | "license";
  label: string;
  color?: string;
}
// types/repository.ts
export interface RepoTag {
  name: string;
  commit: string;
  message?: string;
  date: string;
}

export interface RepoCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
    avatar: string;
  };
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
}

export interface RepositoryStats {
  likes: number;
  followers: number;
}

export type RepoTab = "model-card" | "files" | "community" | "settings";

// types/repository.ts
export type FileType = "file" | "directory" | "symlink";
export type FileViewMode = "preview" | "edit" | "raw";

export interface RepoFile {
  name: string;
  path: string;
  type: "file" | "directory";
  size: number;
  sha: string;
  content?: string;
  encoding?: "base64" | "utf-8";
  downloadUrl?: string;
  lastModified: string;
  lastCommit: {
    message: string;
    sha: string;
    author: {
      name: string;
      avatar: string;
      date: string;
    };
  };
}

export interface RepoBranch {
  name: string;
  isDefault: boolean;
  protected: boolean;
  sha: string;
}

export type RepoPath = "/" | "/src"; // Add all possible paths

export interface RepoFileStructure {
  [branchName: string]: {
    [path in RepoPath]: RepoFile[];
  };
}

export interface MockDataStructure {
  files: RepoFileStructure;
  branches: RepoBranch[];
}

//types/profile.tsx
export type ProfileTab = "settings" | "dashboard";
/*
   0AUTH provides the following interface: 
interface UserProfile {
  email?: string | null;
  email_verified?: boolean | null;
  name?: string | null;
  nickname?: string | null;
  picture?: string | null;
  sub?: string | null;
  updated_at?: string | null;
  org_id?: string | null;
  [key: string]: unknown; // Any custom claim which could be in the profile
} 

  We can use the sub field to index our own user information on our backend
*/

export interface UserProfileData {
  sub_token_claim: string;
  // stats: UserStats;
  username: string;
  avatar?: string;
  fullname?: string;
  email?: string;
  interests: string[];
  organizations: string[];
  twitter?: string;
  github?: string;
  linkedin?: string;
  homepage?: string;
  agreedToTerms: boolean;
}

export interface UserStats {
  following: string[];
  followers: number;
}
