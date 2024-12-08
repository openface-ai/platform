import Link from 'next/link';
import { Dataset, Model } from '@/app/utils/type';
import { HeartIcon } from 'lucide-react';
import Image from 'next/image';

type CardProps = {
  item: Model | Dataset;
  type: 'model' | 'dataset';
};

export function Card({ item, type }: CardProps) {
  const isModel = type === 'model';
  const href = isModel ? `/models/${item.owner}/${item.name}` : `/datasets/${item.owner}/${item.name}`;

  return (
    <Link href={href} className="block p-4">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={item.avatar}
          alt={`${item.owner}/${item.name} avatar`}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-400 text-sm">{item.owner}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{item.description}</p>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-1 text-gray-400">
          <HeartIcon className="w-4 h-4" />
          <span>{item.likes}</span>
        </div>
        <span className="text-gray-400">{item.downloads} downloads</span>
      </div>
    </Link>
  );
}