import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-green-500 font-bold mb-4">😮OpenFace</h3>
            <p className="text-sm text-gray-400">
              A community-driven platform for sharing AI models and datasets.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/docs" className="hover:text-green-500">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-green-500">API</Link></li>
              <li><Link href="/blog" className="hover:text-green-500">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="https://discord.gg/3swfECPMcr" className="hover:text-green-500">Discord</Link></li>
              <li><Link href="https://github.com/openface-ai/" className="hover:text-green-500">GitHub</Link></li>
              <li><Link href="https://twitter.com/openface_ai" className="hover:text-green-500">Twitter</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-green-500">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-500">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
