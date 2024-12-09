// components/repository/ProfileTabs.tsx
"use client";

import { ProfileTab } from "@/app/utils/type";
import { LayoutGrid, Users, Settings } from "lucide-react";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutGrid },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex items-center gap-1 -mb-px">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 ${
            activeTab === id
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

