// app/terms/page.tsx
import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-200 mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert">
            <p className="text-gray-400 mb-6">
              Last updated: December 8, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 mb-4">
                By accessing and using OpenFace (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">2. Use of Service</h2>
              <p className="text-gray-400 mb-4">
                Our service is designed to provide a platform for sharing and discovering AI models and datasets. Users must:
              </p>
              <ul className="list-disc pl-6 text-gray-400 mb-4">
                <li className="mb-2">Be at least 13 years of age</li>
                <li className="mb-2">Provide accurate and complete information</li>
                <li className="mb-2">Maintain the security of their account</li>
                <li className="mb-2">Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">3. Content Guidelines</h2>
              <p className="text-gray-400 mb-4">
                Users are responsible for any content they upload to the Platform. Content must:
              </p>
              <ul className="list-disc pl-6 text-gray-400 mb-4">
                <li className="mb-2">Not violate any laws or regulations</li>
                <li className="mb-2">Not infringe on intellectual property rights</li>
                <li className="mb-2">Not contain malicious code or harmful components</li>
                <li className="mb-2">Be accurately labeled and described</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              For questions about these terms, please contact{' '}
              <Link href="mailto:legal@openface.ai" className="text-blue-500 hover:text-blue-400">
                legal@openface.co
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}