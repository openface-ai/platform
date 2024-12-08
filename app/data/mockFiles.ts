// app/data/mockFiles.ts
import type { RepoFileStructure, RepoPath, RepoBranch, MockDataStructure } from '@/app/utils/type';

// data/mockFiles.ts
export const mockRepoData: MockDataStructure = {
    files: {
      'main': {
        '/': [
          {
            name: 'README.md',
            path: 'README.md',
            type: 'file',
            size: 1234,
            sha: 'abc123',
            lastModified: '2024-03-15T10:30:00Z',
            content: '# Project Title\n\nThis is a sample README file.',
            lastCommit: {
              message: 'Update README.md',
              sha: 'def456',
              author: {
                name: 'John Doe',
                avatar: '/placeholder-avatar.png',
                date: '2024-03-15T10:30:00Z',
              },
            },
          },
          {
            name: 'src',
            path: 'src',
            type: 'directory',
            size: 0,
            sha: 'ghi789',
            lastModified: '2024-03-14T15:45:00Z',
            lastCommit: {
              message: 'Add source files',
              sha: 'jkl012',
              author: {
                name: 'Jane Smith',
                avatar: '/placeholder-avatar.png',
                date: '2024-03-14T15:45:00Z',
              },
            },
          }
        ],
        '/src': [
          {
            name: 'index.ts',
            path: 'src/index.ts',
            type: 'file',
            size: 567,
            sha: 'mno345',
            content: 'export const hello = () => "Hello World!";',
            lastModified: '2024-03-14T15:45:00Z',
            lastCommit: {
              message: 'Initial commit',
              sha: 'pqr678',
              author: {
                name: 'Jane Smith',
                avatar: '/placeholder-avatar.png',
                date: '2024-03-14T15:45:00Z',
              },
            },
          }
        ]
      }
    },
    branches: [
      {
        name: 'main',
        isDefault: true,
        protected: true,
        sha: 'main-sha-123'
      },
      {
        name: 'development',
        isDefault: false,
        protected: false,
        sha: 'dev-sha-456'
      }
    ]
  };
  // Mock file content
  export const mockFileContents = {
    'README.md': `# Project Title\n\nProject description goes here.`,
    'src/index.ts': `export function hello() {\n  console.log('Hello, world!');\n}`,
  };