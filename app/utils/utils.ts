import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }
  
  export function formatCommitDate(date: string): string {
    const now = new Date();
    const commitDate = new Date(date);
    const diff = now.getTime() - commitDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 365) {
      return commitDate.toLocaleDateString();
    } else if (days > 30) {
      return `${Math.floor(days / 30)} months ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return 'just now';
    }
  }
  
  export function getFileIcon(fileName: string) {
    // Expanded version of our previous getFileIcon function
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, { icon: string; color: string }> = {
      // Programming Languages
      ts: { icon: 'typescript', color: 'text-blue-400' },
      tsx: { icon: 'typescript', color: 'text-blue-400' },
      js: { icon: 'javascript', color: 'text-yellow-400' },
      jsx: { icon: 'javascript', color: 'text-yellow-400' },
      py: { icon: 'python', color: 'text-green-400' },
      rb: { icon: 'ruby', color: 'text-red-400' },
      // Documents
      md: { icon: 'markdown', color: 'text-blue-300' },
      json: { icon: 'json', color: 'text-yellow-300' },
      yml: { icon: 'yaml', color: 'text-purple-400' },
      yaml: { icon: 'yaml', color: 'text-purple-400' },
      // Images
      png: { icon: 'image', color: 'text-pink-400' },
      jpg: { icon: 'image', color: 'text-pink-400' },
      jpeg: { icon: 'image', color: 'text-pink-400' },
      gif: { icon: 'image', color: 'text-pink-400' },
      svg: { icon: 'image', color: 'text-pink-400' },
      // Archives
      zip: { icon: 'archive', color: 'text-gray-400' },
      tar: { icon: 'archive', color: 'text-gray-400' },
      gz: { icon: 'archive', color: 'text-gray-400' },
      // Default
      default: { icon: 'file', color: 'text-gray-400' },
    };
  
    return iconMap[ext || 'default'] || iconMap.default;
  }


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}