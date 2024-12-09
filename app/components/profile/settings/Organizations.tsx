import { UserData } from "@/app/utils/type";

interface OrganizationsSettingsProps {
  user: UserData;
}

export function OrganizationsSettings({ user }: OrganizationsSettingsProps) {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-lg mb-4">Organization Settings</h1>
    </div>
  );
}
