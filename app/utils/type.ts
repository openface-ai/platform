export type Model = {
    id: string;
    name: string;
    description: string;
    owner: string;
    avatar: string;
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