'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2 } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);

const MODEL_README_MAP: Record<string, string> = {
  'gpt-vision-pro-v1.0': `# GPT Vision Pro v1.0

This is an advanced computer vision model for image recognition and scene understanding.

## Model Details

- **Base Model:** GPT-4
- **Training Data:** ImageNet, COCO, and other vision datasets
- **Use Cases:** Image classification, object detection, scene understanding

## Usage

\`\`\`python
from transformers import AutoModelForVision

model = AutoModelForVision.from_pretrained("aimodels/gpt-vision-pro-v1.0")
\`\`\`
`,
  'textmaster-nlp-v2.1': `# TextMaster NLP v2.1

This is a state-of-the-art natural language processing model for text analysis and generation.

## Model Details

- **Base Model:** BERT Large
- **Training Data:** BookCorpus, Wikipedia, and other text datasets
- **Use Cases:** Text classification, sentiment analysis, text generation

## Usage

\`\`\`python
from transformers import AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("aimodels/textmaster-nlp-v2.1")
\`\`\`
`,
  'audiosense-v1.2': `# AudioSense v1.2

This is a powerful audio processing model for speech recognition and sound classification.

## Model Details

- **Base Model:** Wav2Vec 2.0
- **Training Data:** LibriSpeech, Common Voice, and other audio datasets
- **Use Cases:** Speech recognition, speaker identification, sound classification

## Usage

\`\`\`python
from transformers import AutoModelForAudioClassification

model = AutoModelForAudioClassification.from_pretrained("aimodels/audiosense-v1.2")
\`\`\`
`,
  'multipeceiver-v1.0': `# MultiReceiver v1.0

This is a unified model handling text, images, and audio simultaneously.

## Model Details

- **Base Model:** Custom multimodal architecture
- **Training Data:** Combination of text, image, and audio datasets
- **Use Cases:** Multimodal understanding, cross-modal retrieval, multimodal generation

## Usage

\`\`\`python
from transformers import AutoModel

model = AutoModel.from_pretrained("aimodels/multipeceiver-v1.0")
\`\`\`
`,
};

const markdownComponents: Record<string, React.ComponentType<any>> = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-8 pb-2 mb-4 border-b border-gray-800 text-gray-200" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-200" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-200" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-gray-300 leading-relaxed" {...props} />
  ),
  a: (props) => (
    <a className="text-blue-400 hover:text-blue-300 no-underline" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 text-gray-300" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 text-gray-300" {...props} />
  ),
  li: (props) => (
    <li className="mb-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-600 pl-4 mb-4 italic text-gray-400" {...props} />
  ),
  table: (props) => (
    <table className="table-auto w-full mb-4" {...props} />
  ),
  thead: (props) => (
    <thead className="bg-gray-800 text-gray-200" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-2 text-left" {...props} />
  ),
  tbody: (props) => (
    <tbody className="text-gray-300" {...props} />
  ),
  tr: (props) => (
    <tr className="border-b border-gray-800" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-2 border-b border-gray-800 text-gray-300" {...props} />
  ),
  code: ({ inline, className, children, ...props }) => {
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
  strong: (props) => (
    <strong className="font-semibold text-gray-200" {...props} />
  ),
  hr: (props) => (
    <hr className="my-8 border-gray-800" {...props} />
  ),
  img: (props) => (
    <img className="rounded-lg max-w-full my-4" {...props} alt={''} />
  ),
};

interface ModelCardProps {
  modelName?: string;
}

export function ModelCard({ modelName }: ModelCardProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modelName) {
      const readmeContent = MODEL_README_MAP[modelName];
      setTimeout(() => {
        setContent(readmeContent || 'README content not found.');
        setLoading(false);
      }, 1000);
    }
  }, [modelName]);

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