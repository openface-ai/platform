export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  downloads: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  samples: number;
  size: string;
  lastUpdated: string;
}