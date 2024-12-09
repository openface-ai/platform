// components/auth/ProfileSetup.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "./AuthCard";
import { GithubIcon, TwitterIcon, LinkedinIcon, ImageIcon } from "lucide-react";

type ProfileData = {
  username: string;
  fullName: string;
  avatar?: File;
  x: string;
  github: string;
  linkedin: string;
  homepage: string;
  interests: string;
  agreedToTerms: boolean;
};

export default function ProfileSetup() {
  const router = useRouter();

  useEffect(() => {
    // Check if user came from signup
    const signupEmail = sessionStorage.getItem("signupEmail");
    if (!signupEmail) {
      // If no signup email found, redirect to signup
      router.push("/signup");
    }
  }, [router]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    fullName: "",
    twitter: "",
    github: "",
    linkedin: "",
    homepage: "",
    interests: "",
    agreedToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Creating profile with:", formData);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-gray-800 rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-gray-200">
              Complete your profile
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              One last step to join the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Required Fields */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Avatar <span className="text-gray-500">(optional)</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 px-3 py-2 border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition-colors text-sm"
                >
                  Upload file
                </button>
                <button
                  type="button"
                  className="px-3 py-2 border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
                  <TwitterIcon className="w-4 h-4" />
                  Twitter username{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.twitter}
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
                  <GithubIcon className="w-4 h-4" />
                  GitHub username{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
                  <LinkedinIcon className="w-4 h-4" />
                  LinkedIn profile{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Homepage <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="url"
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={formData.homepage}
                  onChange={(e) =>
                    setFormData({ ...formData, homepage: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  AI & ML interests{" "}
                  <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({ ...formData, interests: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
                checked={formData.agreedToTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreedToTerms: e.target.checked })
                }
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I have read and agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Terms of Service
                </Link>{" "}
                and the{" "}
                <Link
                  href="/code-of-conduct"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Code of Conduct
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.agreedToTerms}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </AuthCard>
    </div>
  );
}

