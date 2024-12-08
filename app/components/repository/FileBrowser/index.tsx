// components/repository/FileBrowser/index.tsx
'use client';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  ChevronRight, 
  FolderIcon, 
  FileIcon, 
  GitBranchIcon,
  HistoryIcon,
  DownloadIcon, 
  ChevronRightIcon
} from 'lucide-react';
import Button from '../../ui/Button';
import { RepoFile, RepoBranch, RepoCommit, RepoPath } from '@/app/utils/type';
import { FileViewer } from './FileViewer';
import { FileList } from './FileList';
import { BranchSelector } from './BranchSelector';
import {  mockRepoData } from '@/app/data/mockFiles';
import { formatBytes, formatCommitDate } from '@/app/utils/utils';
export interface FileBrowserProps {
  owner: string;
  repo: string;
  defaultBranch: string;
  onFileSelect: Dispatch<SetStateAction<RepoFile | null>>;
  currentPath: string[];
  onPathChange: Dispatch<SetStateAction<string[]>>;
}

export function FileBrowser({
  owner,
  repo,
  defaultBranch,
  onFileSelect,
  currentPath,
  onPathChange
}: FileBrowserProps) {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<RepoFile[]>([]);
  const [selectedBranch, setSelectedBranch] = useState(defaultBranch);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const pathKey = ('/' + currentPath.join('/')) as RepoPath;
        const mockData = mockRepoData.files[selectedBranch]?.[pathKey] || [];
        await new Promise(resolve => setTimeout(resolve, 500));
        setFiles(mockData);
      } catch (error) {
        console.error('Failed to load files:', error);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [currentPath, selectedBranch]);

  const handleFileClick = (file: RepoFile) => {
    if (file.type === 'directory') {
      const newPath = [...currentPath, file.name];
      onPathChange(newPath);
    } else {
      onFileSelect(file);
    }
  };

  const handlePathClick = (index: number) => {
    onPathChange(currentPath.slice(0, index));
  };

  return (
    <div className="flex flex-col">
      {/* Branch and path navigation */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
          >
            {mockRepoData.branches.map(branch => (
              <option key={branch.name} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <button
            onClick={() => onPathChange([])}
            className="hover:text-gray-300"
          >
            {repo}
          </button>
          {currentPath.map((segment, index) => (
            <div key={index} className="flex items-center">
              <ChevronRightIcon className="w-4 h-4" />
              <button
                onClick={() => handlePathClick(index + 1)}
                className="hover:text-gray-300"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <span className="text-gray-400">Loading...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Last commit</th>
                <th className="text-left py-2 px-4">Last updated</th>
                <th className="text-left py-2 px-4">Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.path}
                  className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => handleFileClick(file)}
                >
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      {file.type === 'directory' ? (
                        <FolderIcon className="w-4 h-4 text-blue-400" />
                      ) : (
                        <FileIcon className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-gray-300">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-400">
                    {file.lastCommit.message}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-400">
                    {formatCommitDate(file.lastModified)}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-400">
                    {file.type === 'directory' ? '-' : formatBytes(file.size)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}