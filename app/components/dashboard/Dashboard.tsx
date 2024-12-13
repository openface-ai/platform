"use client";

import { useState } from "react";
import { Card } from "../shared/Card";
import Button from "../ui/Button";
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  Building,
  Microscope,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ProfileHeader } from "../profile/ProfileHeader";
import { mockModels } from "@/app/data/models";
import { mockDatasets } from "@/app/data/datasets";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("models");
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
    router.push("/");
    return null;
  }

  const renderStringList = (list: string[]) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col gap-2 px-5 place-items-center">
          <div className="flex items-center text-gray-500 text-xs">
            <span>None yet</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 px-5 place-items-center">
        {list.map((str, index) => (
          <div key={index} className="flex items-center text-gray-500 text-xs">
            <span>{str}</span>
          </div>
        ))}
      </div>
    );
  };

  const userModels = mockModels.filter(model => model.owner === user.username);
  const userDatasets = mockDatasets.filter(dataset => dataset.owner === user.username);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader user={user} />

        {/* Interests/Orgs/Activity */}
        <div className="flex sm:flex-row flex-col justify-around m-5 place-items-center sm:place-items-start">
          <div className="m-2">
            <span className="flex flex-row">
              <Microscope size={20} className="mr-2" />
              AI & ML Interests
            </span>
            {renderStringList(user.interests)}
          </div>
          <div className="m-2">
            <span className="flex flex-row place-items-center">
              <Building size={20} className="mr-2" />
              Organizations
            </span>
            {renderStringList(user.organizations)}
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
                  activeTab === "models"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("models")}
              >
                My Models
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "datasets"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("datasets")}
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
              Create {activeTab === "models" ? "Model" : "Dataset"}
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeTab === "models" ? userModels : userDatasets).map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-950 rounded-lg border border-gray-800"
              >
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1"
                    onClick={() => {
                      /*handleEdit(item)*/
                    }}
                  >
                    <EditIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-500 hover:text-red-400"
                    onClick={() => {
                      /*handleDelete(item)*/
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Card
                  item={{
                    ...item,
                    avatar: user.avatar
                  }}
                  type={activeTab === "models" ? "model" : "dataset"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Activity Feed & Recommendations */}
        <div className="space-y-8">
          {/* Activity Feed */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div>
                    <p className="text-gray-300">
                      Your model &quot;GPT-4 Fine-tuned&quot; reached 1k
                      downloads
                    </p>
                    <p className="text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="p-4 bg-gray-950 rounded-lg border border-gray-800"
                >
                  <h3 className="font-medium mb-2">Stable Diffusion v2</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Latest version of the popular image generation model
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">10k downloads</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
