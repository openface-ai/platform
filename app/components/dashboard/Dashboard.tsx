'use client';

import { useState } from 'react';
import { Card } from '../shared/Card';
import Button from '../ui/Button';
import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';
import { mockModels } from '@/app/data/models';
import { mockDatasets } from '@/app/data/datasets';


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('models');
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const handleCreate = () => {
    router.push(`/create/${activeTab.slice(0, -1)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    router.push('/signin');
    return null;
  }

  const data = activeTab === 'models' ? mockModels : mockDatasets;
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* User Stats */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar}
                alt="User avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-gray-400">Member since {user.joinedAt}</p>
              </div>
            </div>
            <div className="flex gap-8 ml-auto">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-400">Models</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-400">Datasets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-gray-400">Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Models/Datasets */}
          <div className="lg:col-span-2">
            {/* Action Button */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4 border-b border-gray-800">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'models'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('models')}
                >
                  My Models
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'datasets'
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('datasets')}
                >
                  My Datasets
                </button>
              </div>
              <Button
                onClick={handleCreate}
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Create {activeTab === 'models' ? 'Model' : 'Dataset'}
              </Button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((item) => (
                <div key={item.id} className="group relative bg-gray-950 rounded-lg border border-gray-800">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => {/*handleEdit(item)*/}}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 text-red-500 hover:text-red-400"
                      onClick={() => {/*handleDelete(item)*/}}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <Card item={item} type={activeTab === 'models' ? 'model' : 'dataset'} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Recent Activity & Recommendations */}
          <div className="lg:col-span-1 space-y-8">
            {/* Recent Activity */}
            <div className="bg-gray-950 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <ul className="space-y-4">
                {/* Replace with actual recent activity data */}
                <li className="text-gray-400">
                  You liked <span className="font-medium text-gray-300">GPT-Vision Pro</span> 2 hours ago
                </li>
                <li className="text-gray-400">
                  You downloaded <span className="font-medium text-gray-300">Urban Sounds</span> dataset 5 hours ago
                </li>
                <li className="text-gray-400">
                  You updated <span className="font-medium text-gray-300">TextMaster NLP</span> yesterday
                </li>
              </ul>
            </div>

            {/* Recommended for you */}
            <div className="bg-gray-950 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
              <ul className="space-y-4">
                {/* Replace with actual recommendation data */}
                <li className="text-gray-400">
                  <span className="font-medium text-gray-300">AudioSense v1.2</span> - Speech recognition model
                </li>
                <li className="text-gray-400">
                  <span className="font-medium text-gray-300">Multilingual Sentiment</span> dataset - 50 languages
                </li>
                <li className="text-gray-400">
                  <span className="font-medium text-gray-300">Video-Text Pairs</span> dataset - Multimodal learning
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}