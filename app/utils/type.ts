export type RepoTab = 'model-card' | 'files' | 'community' | 'settings';

export type RepositoryStats = {
  likes: number;
  followers: number;
};

export type RepositoryTag = {
  type: string;
  label: string;
};

export type Repository = {
  owner: string;
  name: string;
  stats: RepositoryStats;
  tags: RepositoryTag[];
};

export type RepoFile = {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size: number;
  content?: string; // Only for files
  sha: string;
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
};

export type Branch = {
  name: string;
  isDefault: boolean;
  protected: boolean;
  sha: string;
};

export type Model = {
  id: string;
  name: string;
  owner: string;
  avatar: string;
  description: string;
  isPrivate: boolean;
  updatedAt: string;
  downloads: number;
  likes: number;
  category: string;
  task: string;
};

export type Dataset = {
  id: string;
  name: string;
  owner: string;
  avatar: string;
  description: string;
  isPrivate: boolean;
  updatedAt: string;
  downloads: number;
  likes: number;
  category: string;
  numRows: number;
  isViewable: boolean;
  task: string;
};