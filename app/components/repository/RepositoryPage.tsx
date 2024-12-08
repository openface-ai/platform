 'use client';

import Layout from "@/app/components/layout/Layout";
import { FilesAndVersions } from "@/app/components/repository/FilesAndVersions";
import { ModelCard } from "@/app/components/repository/ModelCard";
import { RepoHeader } from "@/app/components/repository/RepoHeader";
import { Settings } from "@/app/components/repository/Settings";
import { MOCK_REPOS } from "@/app/data/repos";
import { RepoTab, Repository } from "@/app/utils/type";
import { useState } from "react";

type Props = {
  type: "models" | "datasets";
  owner: string;
  repo: string;
};

export default function RepositoryPage({ type, owner, repo }: Props) {
  const [activeTab, setActiveTab] = useState<RepoTab>('model-card');

  // Find the model data based on the repo name
  const currentRepo = MOCK_REPOS.find(r => r.owner === owner && r.name === repo);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'model-card':
        return <ModelCard modelName={currentRepo?.name} />;
      case 'files':
        return (
          <FilesAndVersions
            owner={owner}
            repo={repo}
            defaultBranch="main"
          />
        );
      case 'community':
        return <div className="p-4 text-gray-400">Community view coming soon...</div>;
      case 'settings':
        return <Settings owner={owner} repo={repo} isPrivate={false} hasDiscussions={false} />;
    }
  };

  if (!currentRepo) {
    return <div className="p-4 text-gray-400">Repository not found.</div>;
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="pt-16">
          <RepoHeader {...currentRepo} activeTab={activeTab} onTabChange={setActiveTab} />
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