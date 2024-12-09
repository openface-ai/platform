import { UserData } from "@/app/utils/type";
import Link from "next/link";
import { GithubIcon, TwitterIcon, LinkedinIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import Button from "../../ui/Button";

interface ProfileSettingsProps {
  user: UserData;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // console.log("Creating profile with:", formData);
    // router.push("/dashboard");
  };
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-lg mb-4">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Avatar <span className="text-gray-500">(optional)</span>
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              className="flex-1 px-3 py-2 border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition-colors text-sm"
            >
              Upload file
            </Button>
            <Button
              type="button"
              className="px-3 py-2 border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
              <TwitterIcon className="w-4 h-4" />
              Twitter username <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={user.twitter ? user.twitter : ""}
              onChange={(e) => (user.twitter = e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
              <GithubIcon className="w-4 h-4" />
              GitHub username <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={user.github ? user.github : ""}
              onChange={(e) => (user.github = e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn profile <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={user.linkedin ? user.linkedin : ""}
              onChange={(e) => (user.linkedin = e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Homepage <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="url"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={user.homepage ? user.homepage : ""}
              onChange={(e) => (user.homepage = e.target.value)}
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
              value={user.interests ? user.interests.join(", ") : ""}
              onChange={(e) => {
                // Split the input string by commas, trim spaces, and update user.interests as an array
                user.interests = e.target.value
                  .split(",")
                  .map((interest) => interest.trim());
              }}
            />
          </div>
        </div>

        {/* Terms Agreement */}
        {!user.agreedToTerms && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="rounded border-gray-700 bg-gray-900/50 text-blue-500 focus:ring-blue-500"
              checked={user.agreedToTerms}
              onChange={(e) => (user.agreedToTerms = e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              Please read and agree to our{" "}
              <Link href="/terms" className="text-blue-500 hover:text-blue-400">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/code-of-conduct"
                className="text-blue-500 hover:text-blue-400"
              >
                Code of Conduct
              </Link>
            </label>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || !user.agreedToTerms}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
