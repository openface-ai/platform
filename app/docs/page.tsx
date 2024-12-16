"use client";

import { useState, useEffect } from 'react';
import Layout from '@/app/components/layout/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DocumentationSidebar from '@/app/components/documentation/DocumentationSidebar';
import { getDocumentationContent } from '@/app/utils/documentation';
import MarkdownRenderer from '@/app/components/shared/MarkdownRenderer';
import { Loader2 } from 'lucide-react';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDocumentationContent(activeSection);
        setContent(data.content);
      } catch (err: any) {
        setError(err.message);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [activeSection]);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'authentication-pages', title: 'Authentication Pages' },
    { id: 'profile-pages', title: 'Profile Pages' },
    { id: 'repository-pages', title: 'Repository Pages' },
    { id: 'search-interface', title: 'Search Interface' },
  ];

  return (
    <Layout>
      <div className="flex flex-wrap justify-center pt-16">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
          <DocumentationSidebar
            sections={sections}
            activeSection={activeSection}
            onChange={(section) => setActiveSection(section)}
          />
        </div>
        {/* Main Content */}
        <div className="w-full lg:w-3/4 xl:w-4/5">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentationPage;
