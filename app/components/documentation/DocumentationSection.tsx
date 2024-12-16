import React from 'react';

interface DocumentationSectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
  isActive: boolean;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ id, title, content, isActive }) => {
  if (!isActive) return null;

  return (
    <section id={id} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div>{content}</div>
    </section>
  );
};

export default DocumentationSection;