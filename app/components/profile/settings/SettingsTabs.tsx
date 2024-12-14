// components/repository/SettingsTabs.tsx
"use client";

import { User, BadgeInfo, Building } from "lucide-react";

export type SettingsTab = "profile" | "account" | "organizations";
interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "account" as const, label: "Account", icon: BadgeInfo },
    { id: "organizations" as const, label: "Organizations", icon: Building },
  ];

  return (
    <div className="flex flex-col items-center gap-1 -mb-px py-2">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center w-full gap-2 px-4 py-2 text-xs min-w-[400px]${
            activeTab === id
              ? "border-blue-500 text-blue-500 "
              : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
          }`}
        >
          <Icon className="w-4 h-5" />
          {label}
        </button>
      ))}
    </div>
  );
}
