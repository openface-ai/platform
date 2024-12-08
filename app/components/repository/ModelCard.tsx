// components/repository/ModelCard.tsx
'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

// If you want to optimize bundle size, you can also import only the languages you need:
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';

// Register only the languages you need
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);

const MOCK_README = `# DeepThought 8B Llama

This is a fine-tuned version of Llama-2 focused on deep reasoning and analysis.

## Model Details

- **Base Model:** Llama-2 8B
- **Training Data:** Specialized reasoning datasets
- **Use Cases:** Complex analysis, reasoning tasks

## Usage

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("ruliad/deepthought-8b-llama")
tokenizer = AutoTokenizer.from_pretrained("ruliad/deepthought-8b-llama")
\`\`\`
`;

type MarkdownComponentProps = {
    node?: any;
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
  } & React.HTMLAttributes<HTMLElement>;

  const markdownComponents: Record<string, React.ComponentType<MarkdownComponentProps>> = {
    h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-semibold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-200" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-200" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mb-4 text-gray-300 leading-relaxed" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-blue-400 hover:text-blue-300 no-underline" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="text-gray-300" {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-gray-700 pl-4 my-4 text-gray-400 italic" {...props} />
  ),
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-800 text-gray-300" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th className="px-4 py-2 bg-gray-800/50 text-left text-sm font-semibold text-gray-200" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-4 py-2 border-b border-gray-800 text-gray-300" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="my-4">
        <SyntaxHighlighter
          language={match[1]}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.5rem',
            background: 'rgba(31, 41, 55, 0.5)',
          } as React.CSSProperties}
          PreTag="div"
          wrapLongLines
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-800/50 rounded px-1.5 py-0.5 text-sm font-mono text-gray-200" {...props}>
        {children}
      </code>
    );
  },
  
    strong: ({ node, ...props }) => (
    <strong className="font-semibold text-gray-200" {...props} />
  ),
  hr: ({ node, ...props }) => (
    <hr className="my-8 border-gray-800" {...props} />
  ),
  img: ({ node, ...props }) => (
    <img className="rounded-lg max-w-full my-4" {...props} />
  ),
};

export function ModelCard() {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch README
    setTimeout(() => {
      setContent(MOCK_README);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <article className="px-4 py-6 max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content || ''}
      </ReactMarkdown>
    </article>
  );
}