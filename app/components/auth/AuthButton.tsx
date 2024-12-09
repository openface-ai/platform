import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function AuthButton() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const logout = () => {
    setShowDropdown(false);
    router.push("/api/auth/logout");
  };

  const userImgSrc =
    user?.picture ||
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : user ? (
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
                  onClick={() => router.push(`/${user.sub}`)}
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
          // className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => router.push("/api/auth/login")}
        >
          Login
        </Button>
      )}
    </div>
  );
}
