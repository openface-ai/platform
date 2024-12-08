import { RepositoryTag } from "../utils/type";

export const MOCK_REPO_DATA = {
    owner: 'ruliad',
    name: 'deepthought-8b-llama-v0.01-alpha',
    stats: {
      likes: 79,
      followers: 42
    },
    tags: [
      { type: 'task', label: 'Text Generation' },
      { type: 'framework', label: 'Safetensors' },
      { type: 'language', label: 'English' },
      { type: 'model', label: 'llama' },
      { type: 'license', label: 'llama2.1' }
    ] satisfies RepositoryTag[]
  };
  
  // Alternatively, you can explicitly type the mock data
  export const MOCK_REPO_DATA_EXPLICIT: {
    owner: string;
    name: string;
    stats: {
      likes: number;
      followers: number;
    };
    tags: RepositoryTag[];
  } = {
    owner: 'ruliad',
    name: 'deepthought-8b-llama-v0.01-alpha',
    stats: {
      likes: 79,
      followers: 42
    },
    tags: [
      { type: 'task', label: 'Text Generation' },
      { type: 'framework', label: 'Safetensors' },
      { type: 'language', label: 'English' },
      { type: 'model', label: 'llama' },
      { type: 'license', label: 'llama2.1' }
    ]
  };
  
