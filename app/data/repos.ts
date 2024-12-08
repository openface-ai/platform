import { RepositoryTag, Repository } from "../utils/type";


export const MOCK_REPOS: Repository[] = [
  {
    owner: 'aimodels',
    name: 'gpt-vision-pro-v1.0',
    stats: {
      likes: 328,
      followers: 42, // Customize as needed
    },
    tags: [
      { type: 'task', label: 'Image Recognition' },
      { type: 'category', label: 'Computer Vision' },
      { type: 'language', label: 'English' }, // Customize as needed
      { type: 'model', label: 'GPT' }, // Customize as needed
      { type: 'license', label: 'apache-2.0' } // Customize as needed
    ]
  },
  {
    owner: 'aimodels',
    name: 'textmaster-nlp-v2.1',
    stats: {
      likes: 0,
      followers: 42, // Customize as needed
    },
    tags: [
      { type: 'task', label: 'Text Generation' },
      { type: 'category', label: 'NLP' },
      { type: 'language', label: 'English' }, // Customize as needed
      { type: 'model', label: 'BERT' }, // Customize as needed
      { type: 'license', label: 'apache-2.0' } // Customize as needed
    ]
  },
  {
    owner: 'aimodels',
    name: 'audiosense-v1.2',
    stats: {
      likes: 69,
      followers: 42, // Customize as needed
    },
    tags: [
      { type: 'task', label: 'Speech Recognition' },
      { type: 'category', label: 'Audio' },
      { type: 'language', label: 'English' }, // Customize as needed
      { type: 'model', label: 'Wav2Vec' }, // Customize as needed
      { type: 'license', label: 'apache-2.0' } // Customize as needed
    ]
  },
  {
    owner: 'aimodels',
    name: 'multipeceiver-v1.0',
    stats: {
      likes: 42,
      followers: 42, // Customize as needed
    },
    tags: [
      { type: 'task', label: 'Multimodal Learning' },
      { type: 'category', label: 'Multimodal' },
      { type: 'language', label: 'English' }, // Customize as needed
      { type: 'model', label: 'Custom' }, // Customize as needed
      { type: 'license', label: 'apache-2.0' } // Customize as needed
    ]
  },
];

// Default to the first model for now
export const MOCK_REPO_DATA = MOCK_REPOS[0];