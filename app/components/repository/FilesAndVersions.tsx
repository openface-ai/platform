// components/repository/FilesAndVersions/index.tsx
'use client';

import { useState } from 'react';
import { FileBrowser } from './FileBrowser';
import type { RepoFile } from '@/app/utils/type';
import { FileViewer } from './FileBrowser/FileViewer';

interface FilesAndVersionsProps {
  owner: string;
  repo: string;
  defaultBranch: string;
}

export function FilesAndVersions({ owner, repo, defaultBranch }: FilesAndVersionsProps) {
  const [selectedFile, setSelectedFile] = useState<RepoFile | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  return (
    <div className="min-h-[calc(100vh-16rem)]">
      {selectedFile ? (
        <FileViewer
          file={selectedFile}
          onBack={() => setSelectedFile(null)}
        />
      ) : (
        <FileBrowser
          owner={owner}
          repo={repo}
          defaultBranch={defaultBranch}
          onFileSelect={setSelectedFile}
          currentPath={currentPath}
          onPathChange={setCurrentPath}
        />
      )}
    </div>
  );
}