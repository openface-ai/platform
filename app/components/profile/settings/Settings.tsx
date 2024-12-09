import { UserData } from "@/app/utils/type";
import { SettingsTab, SettingsTabs } from "./SettingsTabs";
import { ProfileSettings } from "./Profile";
import { AccountSettings } from "./Account";
import { OrganizationsSettings } from "./Organizations";

interface SettingsProps {
  user: UserData;
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function Settings({ user, activeTab, onTabChange }: SettingsProps) {
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
    <div className="flex flex-row">
      <SettingsTabs activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex flex-grow m-7">{renderTabContent()}</div>
    </div>
  );
}
