import { DownloadIcon, HeartIcon } from 'lucide-react';

type ModelCardProps = {
  model: Model;
};

export function ModelCard({ model }: ModelCardProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 hover:bg-gray-900/50 hover:border-blue-500 transition-all cursor-pointer px-4">
      <div className="flex items-center gap-3">
        {/* Owner avatar */}
        <img 
          src={model.avatar}
          alt={`${model.owner}'s avatar`}
          className="w-6 h-6 rounded-full object-cover"
        />
        
        <div>
          {/* Model name row */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300">
              <span className="text-gray-500">{model.owner}/</span>
              {model.name}
            </span>
            {model.isPrivate && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                private
              </span>
            )}
          </div>
          
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>Updated {model.updatedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HeartIcon className="w-3 h-3" />
              {model.likes}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <DownloadIcon className="w-3 h-3" />
              {model.downloads}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}