// components/repository/Settings/index.tsx
'use client';

import { useState } from 'react';
import { LockIcon, GitForkIcon, UsersIcon, WebhookIcon, HashIcon, TrashIcon, DownloadIcon } from 'lucide-react';
import Button from '../../ui/Button';

interface SettingsProps {
  owner: string;
  repo: string;
  isPrivate: boolean;
  hasDiscussions: boolean;
}

export function Settings({ owner, repo, isPrivate: initialIsPrivate, hasDiscussions: initialHasDiscussions }: SettingsProps) {
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const [hasDiscussions, setHasDiscussions] = useState(initialHasDiscussions);
  const [newName, setNewName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleVisibilityChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTransfer = () => {
    // Implement transfer logic
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Visibility Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LockIcon className="w-5 h-5" />
              Change model visibility
            </h3>
            <p className="text-gray-400 mt-1">
              This model is currently <span className="font-semibold">{isPrivate ? 'private' : 'public'}</span>. 
              {isPrivate 
                ? ' Only you (personal model) or members of your organization (organization model) can commit.'
                : ' Anyone on the internet can see this model.'}
            </p>
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Access Control:</label>
              <div className="flex items-center gap-2">
                <span className="text-sm">Everyone</span>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={handleVisibilityChange}>
            {isPrivate ? 'Make public' : 'Make private'}
          </Button>
        </div>
      </section>

      {/* Transfer Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <GitForkIcon className="w-5 h-5" />
          Rename or transfer this model
        </h3>
        <p className="text-gray-400 mt-1">
          All links to this model will automatically redirect to the new location, including git operations. However, to avoid confusion, we recommend updating any existing local clones to point to the new repository URL. To do so, you can use the following command:
        </p>
        <pre className="bg-gray-900 p-4 rounded-md mt-4 text-sm">
          git remote set-url origin [NEW URL]
        </pre>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">New owner</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2">
              <option value={owner}>{owner}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">New name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New model name"
              className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <Button 
          variant="outline" 
          className="mt-4"
          disabled={!newName}
        >
          I understand, move this model
        </Button>
      </section>

      {/* Gated Access Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Gated user access
            </h3>
            <p className="text-gray-400 mt-1">
              Access requests are currently <span className="font-semibold">disabled</span> for this model.
            </p>
            <p className="text-gray-400 mt-2">
              When enabled, users must share their contact information (email and username) and agree to your terms and conditions (if any) in order to access this model. You can download the list of users who have accepted and had access at any time.
            </p>
          </div>
          <Button variant="outline">Enable Access requests</Button>
        </div>
      </section>

      {/* Community Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Community contributions
            </h3>
            <p className="text-gray-400 mt-1">
              Discussions and Pull Requests are currently <span className="font-semibold">enabled</span> for this model. Members of the community can propose changes to this repository.
            </p>
          </div>
          <Button variant="outline">Disable Discussions and PRs</Button>
        </div>
      </section>

      {/* Webhooks Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <WebhookIcon className="w-5 h-5" />
          Webhooks
        </h3>
        <p className="text-gray-400 mt-1">
          0 defined in user settings
        </p>
      </section>

      {/* DOI Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <HashIcon className="w-5 h-5" />
              Digital Object Identifier (DOI)
            </h3>
            <p className="text-gray-400 mt-1">
              Generate a Digital Object Identifier for this model. This action <span className="font-semibold">cannot</span> be undone. It will no longer be possible to delete, rename, transfer, or change the visibility to private.
            </p>
          </div>
          <Button variant="outline">Generate DOI</Button>
        </div>
      </section>

      {/* Delete Section */}
      <section className="border border-gray-800 rounded-lg p-6 border-red-900">
        <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
          <TrashIcon className="w-5 h-5" />
          Delete this model
        </h3>
        <p className="text-gray-400 mt-1">
          This action <span className="font-semibold">cannot</span> be undone. This will permanently delete the {owner}/{repo} model repository and all its files, including weights.
        </p>
        <div className="mt-4">
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder={`Please type ${owner}/${repo} to confirm`}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2"
          />
          <Button 
            className="mt-4"
            disabled={deleteConfirmation !== `${owner}/${repo}`}
          >
            I understand, delete this model
          </Button>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DownloadIcon className="w-5 h-5" />
          Total downloads
        </h3>
        <p className="text-gray-400 mt-1">
          34,239 (all time)
        </p>
      </section>
    </div>
  );
}