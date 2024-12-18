import React from 'react';

interface DocumentationSidebarProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  onChange: (section: string) => void;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({ sections, activeSection, onChange }) => {
  return (
    <nav className="sticky top-20">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onChange(section.id)}
              className={`text-left w-full px-4 py-2 rounded-md ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DocumentationSidebar;