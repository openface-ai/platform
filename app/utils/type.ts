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
  };