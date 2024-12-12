"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";

interface UserMenuProps {
  user: {
    name: string;
    avatar: string;
  };
  onSignOut: () => void;
}

export default function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    router.push(`/${user.name}`);
    setIsOpen(false);
  };

  const handleSettingsClick = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  const handleSignOutClick = () => {
    onSignOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Image
          src={user.avatar}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full object-cover border border-gray-700 hover:border-gray-500 transition-colors"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-800">
          <div className="py-1">
            <button
              onClick={handleDashboardClick}
              className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={handleSettingsClick}
              className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleSignOutClick}
              className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
