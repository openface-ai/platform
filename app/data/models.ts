import { Model } from '@/app/utils/type';
export const mockModels: Model[] = [
    {
      id: '1',
      name: 'gpt-vision-pro-v1.0',
      owner: 'aimodels',
      avatar: '/placeholder-avatar.png',
      description: 'Advanced computer vision model for image recognition and scene understanding.',
      isPrivate: false,
      updatedAt: '2 days ago',
      downloads: 1200,
      likes: 328,
      category: 'Computer Vision',
      task: "Image Recognition"

    },
    {
      id: '2',
      name: 'textmaster-nlp-v2.1',
      owner: 'aimodels',
      avatar: '/placeholder-avatar.png',
      description: 'State-of-the-art natural language processing for text analysis and generation.',
      isPrivate: false,
      updatedAt: '5 days ago',
      downloads: 0,
      likes: 0,
      category: 'NLP',
      task: "Text Generation"
    },
    {
      id: '3',
      name: 'audiosense-v1.2',
      owner: 'aimodels',
      avatar: '/placeholder-avatar.png',
      description: 'Powerful audio processing model for speech recognition and sound classification.',
      isPrivate: false,
      updatedAt: '8 days ago',
      downloads: 800,
      likes: 69,
      category: 'Audio',
      task: "Speech Recognition"

    },
    {
      id: '4',
      name: 'multipeceiver-v1.0',
      owner: 'aimodels',
      avatar: '/placeholder-avatar.png',
      description: 'Unified model handling text, images, and audio simultaneously.',
      isPrivate: false,
      updatedAt: '12 days ago',
      downloads: 1500,
      likes: 42,
      category: 'Multimodal',
      task: "Multimodal Learning"

    }
  ]