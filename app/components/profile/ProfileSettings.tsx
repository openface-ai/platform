import { UserData } from "@/app/utils/type";
import { ProfileSettingsTab, ProfileSettingsTabs } from "./ProfileSettingsTabs";

interface ProfileSettingsProps {
  user: UserData;
  activeTab: ProfileSettingsTab;
  onTabChange: (tab: ProfileSettingsTab) => void;
}

export function ProfileSettings({
  user,
  activeTab,
  onTabChange,
}: ProfileSettingsProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ProfileDashboard user={userData} />;
      case "":
        return (
          <ProfileSettings
            user={userData}
            activeTab={activeSettingsTab}
            onTabChange={setActiveSettingsTab}
          />
        );
    }
  };

  return (
    <div className="flex flex-row">
      <ProfileSettingsTabs activeTab={activeTab} onTabChange={onTabChange} />
      <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
    </div>
  );
}
