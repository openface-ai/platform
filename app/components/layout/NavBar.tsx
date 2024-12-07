import Link from 'next/link';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-green-500 font-bold">
            OpenFace
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#models" className="hover:text-green-500 transition-colors">
              Models
            </Link>
            <Link href="#datasets" className="hover:text-green-500 transition-colors">
              Datasets
            </Link>
            <Link href="#community" className="hover:text-green-500 transition-colors">
              Community
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
