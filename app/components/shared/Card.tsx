import { Model, Dataset } from '@/app/utils/type';
import { DownloadIcon, HeartIcon, TableIcon } from 'lucide-react';

type CardProps = {
  item: Model | Dataset;
  type: 'model' | 'dataset';
};

export function Card({ item, type }: CardProps) {
  const isDataset = type === 'dataset';
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 hover:bg-gray-900/50 hover:border-blue-500 transition-all cursor-pointer px-4">
      <div className="flex items-center gap-3">
        {/* Owner avatar */}
        <img 
          src={item.avatar}
          alt={`${item.owner}'s avatar`}
          className="w-6 h-6 rounded-full object-cover"
        />
        
        <div>
          {/* Name row */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300">
              <span className="text-gray-500">{item.owner}/</span>
              {item.name}
            </span>
            {item.isPrivate && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                private
              </span>
            )}
          </div>
          
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            {/* Viewer label for viewable datasets */}
            {isDataset && (item as Dataset).isViewable && (
              <>
                <span>Viewer</span>
                <span>•</span>
              </>
            )}
            
            <span>Updated {item.updatedAt}</span>

            {/* Table rows for datasets */}
            {isDataset && (item as Dataset).numRows != null && (
            <>
                <span>•</span>
                <span className="flex items-center gap-1">
                <TableIcon className="w-3 h-3" />
                {(item as Dataset).numRows?.toLocaleString()}
                </span>
            </>
            )}
            
            {/* Likes */}
            {item.likes > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HeartIcon className="w-3 h-3" />
                  {item.likes}
                </span>
              </>
            )}
            
            {/* Downloads */}
            {item.downloads > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DownloadIcon className="w-3 h-3" />
                  {item.downloads}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}