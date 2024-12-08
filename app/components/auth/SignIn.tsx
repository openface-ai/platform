// components/auth/SignIn.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "./AuthCard";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create mock user data
      const mockUser = {
        id: "1",
        name: "SayMyName",
        email: formData.email,
        avatar: "/placeholder-avatar.png",
        joinedAt: "Dec 2024",
      };

      // Store user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(mockUser));

      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="text-3xl mb-2">😮</div>
            <h2 className="text-xl font-semibold text-gray-200">Log In</h2>
            <p className="text-gray-400 text-sm mt-1">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 hover:text-blue-400"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                Username or Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-400 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-green-500 hover:text-green-400"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
