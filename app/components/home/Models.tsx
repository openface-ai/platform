'use client';

import { useState } from 'react';
import Button from '../ui/Button';

const CATEGORIES = ['All', 'Computer Vision', 'NLP', 'Audio', 'Multimodal'];

export default function Models() {
  const [activeCategory, setActiveCategory] = useState('All');

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
          {/* Model cards would go here */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-gray-800 rounded-lg p-6 hover:border-green-500 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Model Name {i}</h3>
              <p className="text-gray-400 text-sm mb-4">
                Short description of the model and its capabilities.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-green-500">Downloads: 1.2k</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 