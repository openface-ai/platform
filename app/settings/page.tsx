"use client";
import { ProfileSettings } from "../components/profile/settings/Profile";
import { AccountSettings } from "../components/profile/settings/Account";
import {
  SettingsTab,
  SettingsTabs,
} from "../components/profile/settings/SettingsTabs";
import { OrganizationsSettings } from "../components/profile/settings/Organizations";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Layout from "../components/layout/Layout";
import Image from "next/image";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const router = useRouter();
  const { user, isLoading } = useAuth();

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings user={user} />;
      case "account":
        return <AccountSettings user={user} />;
      case "organizations":
        return <OrganizationsSettings user={user} />;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col pt-16">
        <div className="flex flex-row m-8">
          <Image
            src={user.avatar}
            alt="User avatar"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col justify-center m-2">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            {user.fullname && (
              <p className="inline-flex font-light bg-gray-800 text-gray-300 justify-center rounded-full">
                {user.fullname}
              </p>
            )}
          </div>
        </div>
        <div className="flex lg:flex-row flex-col justify-center">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex flex-grow m-7 max-w-7xl ">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
