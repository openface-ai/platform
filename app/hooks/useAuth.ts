import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfileData } from "../utils/type";

async function fetchUserProfile(
  userSub: string,
): Promise<UserProfileData | null> {
  const response = await fetch(`/api/users/${userSub}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const json = await response.json();
  return json.data;
}

async function createUserProfile(
  authProfile: UserProfile,
): Promise<UserProfileData | null> {
  const body = JSON.stringify(authProfile);
  const response = await fetch(`/api/users/create`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!response.ok) {
    throw new Error("Failed to create user profile");
  }
  return response.json();
}

export function useAuth() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const { user: userState, isLoading: userLoading } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const tryGetUser = async () => {
      setIsLoading(true);

      try {
        // Check session storage first
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoading(false);
          return;
        }

        // Fetch from database or create a new profile
        if (userState?.sub) {
          const fetchedUser = await fetchUserProfile(userState.sub);
          if (fetchedUser) {
            setUser(fetchedUser);
            sessionStorage.setItem("user", JSON.stringify(fetchedUser));
          } else {
            const createdUser = await createUserProfile(userState);
            if (createdUser) {
              setUser(createdUser);
              sessionStorage.setItem("user", JSON.stringify(createdUser));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching/creating user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userLoading && !user) {
      tryGetUser();
    }
  }, [userState, userLoading, user]);

  const signOut = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/api/auth/logout");
  };

  const signIn = () => {
    router.push("/api/auth/login");
  };

  return { user, isLoading, signOut, signIn };
}
