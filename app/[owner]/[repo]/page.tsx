"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/components/layout/Layout";
import { ModelCard } from "@/app/components/repository/ModelCard";
import { RepoHeader } from "@/app/components/repository/RepoHeader";
import { Settings } from "@/app/components/repository/Settings";
import { FilesAndVersions } from "@/app/components/repository/FilesAndVersions";
import { mockModels } from "@/app/data/models";
import { mockDatasets } from "@/app/data/datasets";
import { RepoTab, Model, Dataset } from "@/app/utils/type";
import { useParams } from "next/navigation";

export default function RepositoryPage() {
  const [activeTab, setActiveTab] = useState<RepoTab>("model-card");
  const [repoData, setRepoData] = useState<Model | Dataset | null>(null);
  const params = useParams();
  const { owner, repo } = params;

  useEffect(() => {
    // Find the repository in both models and datasets
    const model = mockModels.find(
      m => m.owner === owner && m.name === repo
    );
    const dataset = mockDatasets.find(
      d => d.owner === owner && d.name === repo
    );
    
    setRepoData(model || dataset || null);
  }, [owner, repo]);

  if (!repoData) {
    return <div>Repository not found</div>;
  }

  const stats = {
    likes: repoData.likes,
    followers: 0,
    downloads: repoData.downloads
  };

  const tags = [
    { type: "category", label: repoData.category },
    { type: "task", label: repoData.task },
    { type: "privacy", label: repoData.isPrivate ? "Private" : "Public" }
  ];

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="pt-16">
          <RepoHeader
            owner={repoData.owner}
            name={repoData.name}
            stats={stats}
            tags={[]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        <div className="flex-1 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {activeTab === "model-card" && <ModelCard item={repoData} />}
            {activeTab === "files" && (
              <FilesAndVersions
                owner={repoData.owner}
                repo={repoData.name}
                defaultBranch="main"
              />
            )}
            {activeTab === "settings" && (
              <Settings
                owner={repoData.owner}
                repo={repoData.name}
                isPrivate={repoData.isPrivate}
                hasDiscussions={false}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
