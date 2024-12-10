import { UserProfileData } from "@/app/utils/type";
import { useEffect, useState } from "react";
import { ActivityView } from "./activity/Activity";

interface ProfileDashboardProps {
  user: UserProfileData;
}

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRepos = async () => {
      try {
        const response = await fetch(
          `/api/users/${user.username}/repositories`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user repos");
        }

        const json = await response.json();
      } catch (err) {
        console.log("error: ", err);
        setError("Failed to fetch user repos");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserActivities = async () => {
      try {
        const response = await fetch(`/api/users/${user.username}/activies`);

        if (!response.ok) {
          throw new Error("Failed to fetch user activities");
        }

        const json = await response.json();
      } catch (err) {
        console.log("error: ", err);
        setError("Failed to fetch user activities");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRepos();
    fetchUserActivities();
  }, []);

  return (
    <div>
      dashboard
      <ActivityView />
    </div>
  );
}
