  // components/Models.tsx
  'use client';
  
  import { useState, useMemo } from 'react';
  import Button from '../ui/Button';
import { mockModels } from '@/app/data/models';
import { ModelCard } from '../shared/ModelCard';
  
  const CATEGORIES = ['All', 'Computer Vision', 'NLP', 'Audio', 'Multimodal'];
  
  export default function Models() {
    const [activeCategory, setActiveCategory] = useState('All');
  
    const filteredModels = useMemo(() => {
      if (activeCategory === 'All') {
        return mockModels;
      }
      return mockModels.filter(model => model.category === activeCategory);
    }, [activeCategory]);
  
    return (
      <section className="py-20 px-4" id="models">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Models</h2>
          
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => (
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
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>
    );
  }