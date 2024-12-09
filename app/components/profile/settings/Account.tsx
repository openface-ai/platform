import { UserData } from "@/app/utils/type";
import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "../../ui/Button";

interface AccountSettingsProps {
  user: UserData;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = () => {};

  const handleUsernameEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold text-lg mb-4">Account Settings</h1>
      <form onSubmit={handleUsernameEmailSubmit} className="space-y-4 mb-7">
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
            value={user.username ? user.username : ""}
            onChange={(e) => (user.username = e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm text-gray-400 mb-1 gap-2">
              <Mail className="w-4 h-4" />
              Email <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value={user.email ? user.email : ""}
              onChange={(e) => (user.email = e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-7">
        <div>
          <label
            htmlFor="password"
            className="block text-sm text-gray-400 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="text"
            required
            className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="confirmpassword"
            className="block text-sm text-gray-400 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            type="text"
            required
            className="block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <div>
        <h1 className="text-md font-bold">Delete My Account</h1>
        <p className="text-gray-400 mb-4">
          Delete your Openface account permanently, this action is irreversible.
          All your repositories (models, datasets, & Spaces) will be deleted.
        </p>
        <Button
          onClick={handleDeleteAccount}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
        >
          Delete my account
        </Button>
      </div>
    </div>
  );
}
