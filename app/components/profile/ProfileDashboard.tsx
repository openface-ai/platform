import { UserData } from "@/app/utils/type";

interface ProfileDashboardProps {
  user: UserData;
}

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  return <div>Dashboard view</div>;
}
