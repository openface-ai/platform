// components/auth/SignUp.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "./AuthCard";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     console.log('Signing up with:', formData);
  //     router.push('/dashboard');
  //   };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signing up with:", formData);

      // Store the email/initial signup data if needed
      // You might want to use a state management solution like Context or Redux here
      // For now, we can use sessionStorage
      sessionStorage.setItem("signupEmail", formData.email);

      // Redirect to profile setup instead of dashboard
      router.push("/profile-setup");
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
            <h2 className="text-xl font-semibold text-gray-200">
              Join OpenFace
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-500 hover:text-blue-400"
              >
                Log In
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                Email Address
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
              <p className="mt-1 text-sm text-gray-500">
                Use your organization email to easily find and join your
                company/team org.
              </p>
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
              {isLoading ? "Creating account..." : "Next"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            By clicking (&ldquo;Next&rdquo;) you agree to our{" "}
            <Link href="/terms" className="text-blue-500 hover:text-blue-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
