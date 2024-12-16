import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';

// Register only the languages you need
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-invert max-w-none px-4 py-6"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="pre" // Changed from "div" to "pre"
              className="rounded-lg overflow-x-auto my-4"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800/50 rounded px-1.5 py-0.5 text-sm font-mono text-gray-200" {...props}>
              {children}
            </code>
          );
        },
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-200" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-200" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
        a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 no-underline" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold text-gray-200" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-8 border-gray-800" {...props} />,
        img: ({ node, ...props }) => <img className="rounded-lg max-w-full my-4" {...props} alt="" />,
        // Add more custom components as needed
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;