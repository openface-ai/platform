// app/[owner]/[repo]/page.tsx
'use client';

import Layout from "@/app/components/layout/Layout";
import { FilesAndVersions } from "@/app/components/repository/FilesAndVersions";
import { ModelCard } from "@/app/components/repository/ModelCard";
import { RepoHeader } from "@/app/components/repository/RepoHeader";
import { Settings } from "@/app/components/repository/Settings";
import { MOCK_REPO_DATA } from "@/app/data/repos";
import { RepositoryTag, RepoTab } from "@/app/utils/type";
import { useState } from "react";



export default function RepositoryPage() {
    const [activeTab, setActiveTab] = useState<RepoTab>('model-card');
  
    const renderTabContent = () => {
      switch (activeTab) {
        case 'model-card':
          return <ModelCard />;
        case 'files':
            return (
              <FilesAndVersions
                owner={MOCK_REPO_DATA.owner}
                repo={MOCK_REPO_DATA.name}
                defaultBranch="main"
              />
            );
        case 'community':
          return <div className="p-4 text-gray-400">Community view coming soon...</div>;
        case 'settings':
            return <Settings owner={""} repo={""} isPrivate={false} hasDiscussions={false} />;
        }
    };
  
    return (
      <Layout>
        <div className="min-h-screen flex flex-col">
        <div className="pt-16"> {/* Added padding container */}

          <RepoHeader {...MOCK_REPO_DATA} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex-1 bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  