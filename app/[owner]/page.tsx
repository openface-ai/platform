// app/[owner]/repo/[repo].tsx
"use client";

import Layout from "@/app/components/layout/Layout";
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import { ProfileDashboard } from "../components/profile/ProfileDashboard";
import { Settings } from "../components/profile/settings/Settings";
import { useRouter } from "next/navigation";
import { ProfileTab, UserData } from "../utils/type";
import { SettingsTab } from "../components/profile/settings/SettingsTabs";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] =
    useState<SettingsTab>("profile");
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const cachedUserData = sessionStorage.getItem("userData");
    if (cachedUserData) {
      const data: UserData = JSON.parse(cachedUserData);
      setUserData(data);
    } else {
      router.push("/"); // Redirect to login page or another route
    }
  }, [router]);

  if (userData == null) {
    return; // should never happen, just appeasing TS
  }

  const onFollowingClick = () => {
    //
  };

  const onFollowersClick = () => {
    //
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ProfileDashboard user={userData} />;
      case "settings":
        return (
          <Settings
            user={userData}
            activeTab={activeSettingsTab}
            onTabChange={setActiveSettingsTab}
          />
        );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="pt-16">
          <ProfileHeader
            user={userData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onFollowingClick={onFollowingClick}
            onFollowersClick={onFollowersClick}
          />
        </div>
        <div className="flex-1 bg-gray-900 ">
          <div className="m-7">{renderTabContent()}</div>
        </div>
      </div>
    </Layout>
  );
}
