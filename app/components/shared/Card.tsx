import { Model, Dataset } from '@/app/utils/type';
import { DownloadIcon, HeartIcon, TableIcon } from 'lucide-react';
import { useWindowSize } from '@/app/hooks/useWindowSize';

type CardProps = {
  item: Model | Dataset;
  type: 'model' | 'dataset';
};

export function Card({ item, type }: CardProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isDataset = type === 'dataset';
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800 hover:bg-gray-900/50 hover:border-blue-500 transition-all cursor-pointer px-4">
      <div className="flex items-center gap-3 w-full">
        {/* Owner avatar - hidden on mobile */}
        <img 
          src={item.avatar}
          alt={`${item.owner}'s avatar`}
          className="w-6 h-6 rounded-full object-cover hidden md:block"
        />
        
        <div className="w-full">
          {/* Name row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-300 text-sm md:text-base">
              <span className="text-gray-500">{!isMobile && `${item.owner}/`}</span>
              {item.name}
            </span>
            {item.isPrivate && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                private
              </span>
            )}
          </div>
          
          {/* Description - show only on desktop */}
          <p className="text-gray-400 text-sm mt-1 hidden md:block">
            {item.description}
          </p>
          
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mt-1 flex-wrap">
            {/* Show minimal info on mobile */}
            {!isMobile && (
              <>
                {isDataset && (item as Dataset).isViewable && (
                  <>
                    <span>Viewer</span>
                    <span>•</span>
                  </>
                )}
                <span>Updated {item.updatedAt}</span>
              </>
            )}

            {/* Always show essential stats */}
            <div className="flex items-center gap-2">
              {isDataset && (item as Dataset).numRows != null && (
                <span className="flex items-center gap-1">
                  <TableIcon className="w-3 h-3" />
                  {(item as Dataset).numRows?.toLocaleString()}
                </span>
              )}
              
              {item.likes > 0 && (
                <span className="flex items-center gap-1">
                  <HeartIcon className="w-3 h-3" />
                  {item.likes}
                </span>
              )}
              
              {item.downloads > 0 && (
                <span className="flex items-center gap-1">
                  <DownloadIcon className="w-3 h-3" />
                  {item.downloads}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}