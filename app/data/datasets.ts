import { Dataset } from '@/app/utils/type';
export const mockDatasets: Dataset[] = [
    {
      id: '1',
      name: 'medical-imaging-v2.0',
      owner: 'healthai',
      description: 'Comprehensive medical imaging dataset for diagnostic AI training',
      avatar: '/placeholder-avatar.png',
      likes: 389,
      isPrivate: false,
      updatedAt: '3 days ago',
      downloads: 15300,
      category: 'Computer Vision',
      numRows: 50000,
      isViewable: true
    },
    {
      id: '2',
      name: 'multilingual-sentiment-v3.1',
      owner: 'opendata',
      description: 'Multilingual sentiment analysis dataset covering 50 languages',
      avatar: '/placeholder-avatar.png',
      likes: 245,
      isPrivate: false,
      updatedAt: '5 days ago',
      downloads: 8900,
      category: 'NLP',
      numRows: 2500000,
      isViewable: true
    },
    {
      id: '3',
      name: 'urban-sounds-classified',
      owner: 'audiolab',
      description: 'Urban environmental sounds with professional classifications',
      avatar: '/placeholder-avatar.png',
      likes: 167,
      isPrivate: false,
      updatedAt: '8 days ago',
      downloads: 4200,
      category: 'Audio',
      numRows: 8000,
      isViewable: true
    },
    {
      id: '4',
      name: 'video-text-pairs-v2.0',
      owner: 'multimodal',
      description: 'Aligned video-text pairs for multimodal learning',
      avatar: '/placeholder-avatar.png',
      likes: 423,
      isPrivate: false,
      updatedAt: '12 days ago',
      downloads: 12500,
      category: 'Multimodal',
      numRows: 180000,
      isViewable: true
    },
    {
      id: '5',
      name: 'autonomous-driving-scenes',
      owner: 'mobilevision',
      description: 'Annotated driving scenes from multiple countries and conditions',
      avatar: '/placeholder-avatar.png',
      likes: 534,
      isPrivate: false,
      updatedAt: '15 days ago',
      downloads: 9800,
      category: 'Computer Vision',
      numRows: 125000,
      isViewable: true
    }
  ];