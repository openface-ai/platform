// components/search/Filters.tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { FilterState } from '@/app/utils/type';



interface FiltersType {
    modalities: string[];
    formats: string[];
    size: number[];
  }
  
  interface DatasetFiltersProps {
    filters: FiltersType;
    onChange: (filters: FiltersType) => void;
  }
  
const MODALITIES = [
  { id: '3d', label: '3D' },
  { id: 'audio', label: 'Audio' },
  { id: 'image', label: 'Image' },
  { id: 'tabular', label: 'Tabular' },
  { id: 'text', label: 'Text' },
  { id: 'video', label: 'Video' }
];

const FORMATS = [
  { id: 'json', label: 'JSON' },
  { id: 'csv', label: 'CSV' },
  { id: 'parquet', label: 'Parquet' },
  { id: 'arrow', label: 'Arrow' },
  { id: 'imagefolder', label: 'Image Folder' },
  { id: 'soundfolder', label: 'Sound Folder' }
];

// const SIZE_MARKS = {
//   0: '0',
//   25: '1K',
//   50: '10K',
//   75: '100K',
//   100: '1M+'
// };

// const sizeToValue = (size: number): number => {
//   if (size === 0) return 0;
//   return Math.log10(size) * 10;
// };

// const valueToSize = (value: number): number => {
//   if (value === 0) return 0;
//   return Math.pow(10, value / 10);
// };

export function DatasetFilters({ filters, onChange }: DatasetFiltersProps) {
  const [filterSearch, setFilterSearch] = useState('');

  const handleModalityChange = (modality: string) => {
    const newModalities = filters.modalities.includes(modality)
      ? filters.modalities.filter(m => m !== modality)
      : [...filters.modalities, modality];
    
    onChange({ ...filters, modalities: newModalities });
  };

  const handleFormatChange = (format: string) => {
    const newFormats = filters.formats.includes(format)
      ? filters.formats.filter(f => f !== format)
      : [...filters.formats, format];
    
    onChange({ ...filters, formats: newFormats });
  };

//   const handleSizeChange = (value: number[]) => {
//     onChange({
//       ...filters,
//       size: [valueToSize(value[0]), valueToSize(value[1])]
//     });
//   };

  const filteredModalities = MODALITIES.filter(modality =>
    modality.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const filteredFormats = FORMATS.filter(format =>
    format.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Filter */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search filters"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-900/50 border border-gray-700 rounded-md text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>

      {/* Modalities */}
      <div>
        <h3 className="text-sm font-medium text-gray-200 mb-3">Modalities</h3>
        <div className="space-y-2">
          {filteredModalities.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.modalities.includes(id)}
                onChange={() => handleModalityChange(id)}
                className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Formats */}
      <div>
        <h3 className="text-sm font-medium text-gray-200 mb-3">Formats</h3>
        <div className="space-y-2">
          {filteredFormats.map(({ id, label }) => (
            <label key={id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.formats.includes(id)}
                onChange={() => handleFormatChange(id)}
                className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      {(filters.modalities.length > 0 || filters.formats.length > 0 || filters.size.length > 0) && (
        <button
          onClick={() => onChange({ modalities: [], formats: [], size: [] })}
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
// interface FilterGroupProps {
//   title: string;
//   children: React.ReactNode;
// }

// function FilterGroup({ title, children }: FilterGroupProps) {
//   return (
//     <div className="mb-6">
//       <h3 className="text-sm font-medium text-gray-200 mb-3">{title}</h3>
//       {children}
//     </div>
//   );
// }

// interface FilterOptionProps {
//   label: string;
//   count?: number;
//   checked: boolean;
//   onChange: (checked: boolean) => void;
// }

// function FilterOption({ label, count, checked, onChange }: FilterOptionProps) {
//   return (
//     <label className="flex items-center gap-2 py-1 cursor-pointer group">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//         className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
//       />
//       <span className="text-sm text-gray-400 group-hover:text-gray-300">{label}</span>
//       {count !== undefined && (
//         <span className="text-xs text-gray-500">{count}</span>
//       )}
//     </label>
//   );
// }

// components/search/ModelFilters.tsx
interface ModelFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
  }
  
  export function ModelFilters({ filters, onChange }: ModelFiltersProps) {
    const toggleTask = (task: string) => {
      const newTasks = filters.tasks.includes(task)
        ? filters.tasks.filter(t => t !== task)
        : [...filters.tasks, task];
      
      onChange({
        ...filters,
        tasks: newTasks
      });
    };
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-200 mb-3">Tasks</h3>
          {TASK_OPTIONS.map(task => (
            <label key={task} className="flex items-center gap-2 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tasks.includes(task)}
                onChange={() => toggleTask(task)}
                className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400">{task}</span>
            </label>
          ))}
        </div>
        {/* Add more filter sections as needed */}
      </div>
    );
  }
  
  const TASK_OPTIONS = [
    "Text Generation",
    "Image Generation",
    "Audio Processing",
    "Video Processing",
    // Add more tasks...
  ];
