import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { useState, useRef, useEffect } from "react";
import { UserProfileData } from "@/app/utils/type";
import LoadingSpinner from "../ui/LoadingSpinner";

interface AuthButtonProps {
  user?: UserProfile;
}

export default function AuthButton({ user }: AuthButtonProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`/api/users/${user.name}`);

          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }

          const json = await response.json();

          if (json.data == null) {
            const body = JSON.stringify(user);
            const putResponse = await fetch(`/api/users/create`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: body,
            });
            const data: UserProfileData = await putResponse.json();
            setUserProfile(data);
          }
        } catch (err) {
          console.log("error: ", err);
          setError("Failed to fetch user profile");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(event.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const logout = () => {
    setShowDropdown(false);
    sessionStorage.removeItem("userData");
    // should add returnTo to clear session
    router.push("/api/auth/logout");
  };

  const userImgSrc =
    user?.picture ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (userProfile) {
    sessionStorage.setItem("userData", JSON.stringify(userProfile));
  }

  return (
    <div className="relative">
      {userProfile ? (
        <div className="relative">
          <Image
            src={userImgSrc}
            alt="User Profile"
            className="rounded-full ring-2 cursor-pointer ring-green-400 hover:ring-offset-1 focus:ring-offset-1 focus:outline-none dark:ring-offset-gray-950"
            width={35}
            height={35}
            ref={dropdownTriggerRef}
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div
              ref={dropdownMenuRef}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <div className="py-1 text-gray-700">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => router.push(`/${userProfile.username}`)}
                >
                  Profile
                </button>
                <hr className="my-1 border-gray-200" />
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => router.push("/api/auth/login")}
        >
          Login
        </Button>
      )}
    </div>
  );
}
