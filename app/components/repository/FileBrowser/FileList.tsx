// components/repository/FileBrowser/FileList.tsx
"use client";

import { useMemo, useState } from "react";
import {
  FileIcon,
  FolderIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon,
  FileCodeIcon,
  ImageIcon,
  FileJsonIcon,
  PackageIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { RepoFile } from "@/app/utils/type";
import { formatBytes } from "@/app/utils/utils";

type SortField = "name" | "size" | "lastModified";
type SortDirection = "asc" | "desc";

interface FileListProps {
  files: RepoFile[];
  loading: boolean;
  onFileSelect: (file: RepoFile) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "md":
      return <FileTextIcon className="w-4 h-4" />;
    case "json":
      return <FileJsonIcon className="w-4 h-4" />;
    case "py":
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
      return <FileCodeIcon className="w-4 h-4" />;
    case "jpg":
    case "png":
    case "gif":
    case "svg":
      return <ImageIcon className="w-4 h-4" />;
    case "zip":
    case "tar":
    case "gz":
      return <PackageIcon className="w-4 h-4" />;
    default:
      return <FileIcon className="w-4 h-4" />;
  }
};

export function FileList({ files, loading, onFileSelect }: FileListProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedFiles = useMemo(() => {
    const sorted = [...files].sort((a, b) => {
      // Directories always come first
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }

      switch (sortField) {
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return a.size - b.size;
        case "lastModified":
          return (
            new Date(a.lastModified).getTime() -
            new Date(b.lastModified).getTime()
          );
        default:
          return 0;
      }
    });

    return sortDirection === "desc" ? sorted.reverse() : sorted;
  }, [files, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return <div className="p-4 animate-pulse">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-800/50"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-1">
                Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  ))}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-800/50"
              onClick={() => handleSort("lastModified")}
            >
              <div className="flex items-center gap-1">
                Last commit
                {sortField === "lastModified" &&
                  (sortDirection === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  ))}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer hover:bg-gray-800/50"
              onClick={() => handleSort("size")}
            >
              <div className="flex items-center gap-1">
                Size
                {sortField === "size" &&
                  (sortDirection === "asc" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  ))}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => (
            <tr
              key={file.path}
              className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
              onClick={() => onFileSelect(file)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {file.type === "directory" ? (
                    <FolderIcon className="w-4 h-4 text-blue-400" />
                  ) : (
                    getFileIcon(file.name)
                  )}
                  <span className="text-gray-300">{file.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img
                    src={file.lastCommit.author.avatar}
                    alt={file.lastCommit.author.name}
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-sm text-gray-400">
                    {file.lastCommit.message}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(file.lastModified), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-400">
                {file.type === "directory" ? "-" : formatBytes(file.size)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

