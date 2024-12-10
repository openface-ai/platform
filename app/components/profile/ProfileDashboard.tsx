import { UserData } from "@/app/utils/type";
import { mockModels } from "@/app/data/models";

interface ProfileDashboardProps {
  user: UserData;
}

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  return <div>Dashboard view</div>;
}
