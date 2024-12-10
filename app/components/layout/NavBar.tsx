"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";
import UserMenu from "./UserMenu";
import Button from "../ui/Button";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, signOut, signIn } = useAuth();

  const renderUserMenu = () => {
    if (!isLoading && user) {
      return (
        <UserMenu
          user={{ name: user.username, avatar: user.avatar }}
          onSignOut={signOut}
        />
      );
    } else if (!isLoading && !user) {
      return (
        <Button variant="primary" onClick={signIn}>
          Login
        </Button>
      );
    } else {
      return <LoadingSpinner />;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              😮 OpenFace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/models"
              className="hover:text-primary transition-colors"
            >
              Models
            </Link>
            <Link
              href="/datasets"
              className="hover:text-primary transition-colors"
            >
              Datasets
            </Link>
            <Link
              href="#community"
              className="hover:text-primary transition-colors"
            >
              Community
            </Link>
            {renderUserMenu()}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden ">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-end">
              <Link
                href="/models"
                className="hover:text-primary transition-colors"
              >
                Models
              </Link>
              <Link
                href="/datasets"
                className="hover:text-primary transition-colors"
              >
                Datasets
              </Link>
              <Link
                href="#community"
                className="hover:text-primary transition-colors"
              >
                Community
              </Link>
              <div className="pt-2">{renderUserMenu()}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
