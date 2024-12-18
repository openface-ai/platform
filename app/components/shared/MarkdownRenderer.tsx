import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-invert max-w-none px-4 py-6"
      components={{
        code({ className, children, ...props }) {
          // Render code block or inline code
          return className ? (
            <pre className="rounded-lg overflow-x-auto my-4 bg-gray-900 p-4 text-gray-200">
              <code className={`language-${className.replace('language-', '')}`} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="bg-gray-800/50 rounded px-1.5 py-0.5 text-sm font-mono text-gray-200" {...props}>
              {children}
            </code>
          );
        },
        h1: ({ ...props }) => (
          <h1
            className="text-3xl font-bold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-2xl font-semibold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-200" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-200" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="mb-4 text-gray-300 leading-relaxed" {...props} />
        ),
        a: ({ ...props }) => (
          <a className="text-blue-400 hover:text-blue-300 no-underline" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300" {...props} />
        ),
        strong: ({ ...props }) => (
          <strong className="font-semibold text-gray-200" {...props} />
        ),
        hr: ({ ...props }) => <hr className="my-8 border-gray-800" {...props} />,
        img: ({ ...props }) => (
          <img className="rounded-lg max-w-full my-4" {...props} alt="" />
        ),
        // Add more custom components as needed
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
