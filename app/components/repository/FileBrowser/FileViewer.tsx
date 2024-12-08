// components/repository/FileBrowser/FileViewer.tsx
'use client';

import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Import language support
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import Button from '../../ui/Button';
import { RepoFile } from '@/app/utils/type';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('yaml', yaml);

interface FileViewerProps {
  file: RepoFile;
  onBack: () => void;
}

const getLanguage = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescript',
    js: 'javascript',
    jsx: 'javascript',
    py: 'python',
    json: 'json',
    md: 'markdown',
    yml: 'yaml',
    yaml: 'yaml',
  };
  return languageMap[ext || ''] || 'text';
};

const isImage = (fileName: string): boolean => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || '');
};

const isBinary = (fileName: string): boolean => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  return ['pdf', 'doc', 'docx', 'zip', 'tar', 'gz', 'exe'].includes(ext || '');
};

export function FileViewer({ file, onBack }: FileViewerProps) {
  const content = useMemo(() => {
    if (!file.content) return null;
    
    if (file.encoding === 'base64') {
      return atob(file.content);
    }
    
    return file.content;
  }, [file.content, file.encoding]);

  return (
    <div>
      {/* File header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-200">{file.name}</h2>
          <p className="text-sm text-gray-400">{file.size} bytes</p>
        </div>
        <Button variant="outline" size="sm">Raw</Button>
        <Button variant="outline" size="sm">Download</Button>
      </div>

      {/* File content */}
      <div className="p-4">
        {isImage(file.name) ? (
          <img 
            src={file.downloadUrl} 
            alt={file.name}
            className="max-w-full rounded-lg"
          />
        ) : isBinary(file.name) ? (
          <div className="text-center py-8">
            <p className="text-gray-400">
              This is a binary file. Please download to view its contents.
            </p>
          </div>
        ) : (
          <SyntaxHighlighter
            language={getLanguage(file.name)}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              background: 'rgba(31, 41, 55, 0.5)',
            }}
          >
            {content || ''}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}