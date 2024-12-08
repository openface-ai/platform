
// app/privacy/page.tsx
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-200 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert">
          <p className="text-gray-400 mb-6">
            Last updated: December 8, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">1. Information We Collect</h2>
            <p className="text-gray-400 mb-4">
              We collect information that you provide directly to us when using OpenFace:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">Account information (email, username, password)</li>
              <li className="mb-2">Profile information (name, avatar, bio)</li>
              <li className="mb-2">Content you upload (models, datasets, comments)</li>
              <li className="mb-2">Usage information and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-400 mb-4">
              <li className="mb-2">Provide and maintain the Platform</li>
              <li className="mb-2">Improve our services</li>
              <li className="mb-2">Communicate with you</li>
              <li className="mb-2">Ensure security and prevent abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">3. Data Security</h2>
            <p className="text-gray-400 mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Add more sections as needed */}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            For privacy-related questions, please contact{' '}
            <Link href="mailto:privacy@openface.ai" className="text-blue-500 hover:text-blue-400">
              privacy@openface.co
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}