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
    samples: number;
    size: string;
    category: string;
    lastUpdated: string;
};