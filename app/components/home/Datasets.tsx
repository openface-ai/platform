'use client';

import { useState, useMemo } from 'react';
import Button from '../ui/Button';
import { mockDatasets } from '@/app/data/datasets';
import { DatasetCard } from '../shared/DatasetCard';


const DATASET_CATEGORIES = ['All', 'Computer Vision', 'NLP', 'Audio', 'Multimodal'];

export default function Datasets() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDatasets = useMemo(() => {
    if (activeCategory === 'All') {
      return mockDatasets;
    }
    return mockDatasets.filter(dataset => dataset.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-20 px-4 bg-gray-900" id="datasets">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Datasets</h2>
        
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DATASET_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </div>
    </section>
  );
}