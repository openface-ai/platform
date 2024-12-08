'use client';

import Button from '../ui/Button';

type DatasetCardProps = {
  dataset: Dataset;
};

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <div className="border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-colors">
      <h3 className="text-xl font-semibold mb-2">{dataset.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{dataset.description}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Samples: {dataset.samples.toLocaleString()}</span>
          <span className="text-gray-400">Size: {dataset.size}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-blue-500 text-sm">Updated: {dataset.lastUpdated}</span>
          <Button variant="outline" size="sm">Download</Button>
        </div>
      </div>
    </div>
  );
}
