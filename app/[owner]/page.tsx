// app/[owner]/repo/[repo].tsx
"use client";

import Layout from "@/app/components/layout/Layout";
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "@/app/components/ui/LoadingSpinner";
import { ProfileDashboard } from "../components/profile/ProfileDashboard";
import { Settings } from "../components/profile/settings/Settings";
import { MockUserData } from "../data/users";
import { useRouter } from "next/navigation";
import { ProfileTab, UserData } from "../utils/type";
import { SettingsTab } from "../components/profile/settings/SettingsTabs";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] =
    useState<SettingsTab>("profile");
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/"); // Redirect to login page or another route
    }
  }, [isLoading, user, router]);

  if (!user) {
    return null; // This line is just to satisfy TypeScript; it will never execute because of the redirect
  }

  // if we needed to fetch data associated with the user on our backend, we can fetch it like this
  // const userData = user?.sub ? SOME_HASHMAP[user.sub] : null;
  // user.sub is auth0's id for users
  // https://community.auth0.com/t/how-to-get-user-id-of-a-user-after-login-in-react-hook-useauth0/53309
  const userData: UserData = MockUserData(user);

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="pt-16">
            <ProfileHeader
              user={userData}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="flex-1 bg-gray-900 ">
            <div className="m-7">{renderTabContent()}</div>
          </div>
        </div>
      )}
    </Layout>
  );
}
