
  // components/ModelCard.tsx
  'use client';
  
  import Button from '../ui/Button';
  
  type ModelCardProps = {
    model: Model;
  };
  
  export function ModelCard({ model }: ModelCardProps) {
    return (
      <div className="border border-gray-800 rounded-lg p-6 hover:border-green-500 transition-colors">
        <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{model.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-green-500">Downloads: {model.downloads.toLocaleString()}</span>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      </div>
    );
  }
  
