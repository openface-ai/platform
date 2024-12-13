// components/repository/ModelCard.tsx
'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from 'lucide-react';
import { Model, Dataset } from '@/app/utils/type';
import { mockReadme } from '@/app/data/mockReadme';

interface ModelCardProps {
  item: Model | Dataset;
}

export function ModelCard({ item }: ModelCardProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readmeKey = `${item.owner}/${item.name}`;
    const readmeContent = mockReadme[readmeKey as keyof typeof mockReadme] || mockReadme.default;

    setTimeout(() => {
      setContent(readmeContent);
      setLoading(false);
    }, 500);
  }, [item]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none px-4 py-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <div className="relative">
                <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="bg-gray-800 rounded px-1.5 py-0.5" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-8 mb-4">{children}</h2>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-gray-300">{children}</li>
          )
        }}
      >
        {content || ''}
      </ReactMarkdown>
    </article>
  );
}