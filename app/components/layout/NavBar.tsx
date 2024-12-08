"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import { MenuIcon, XIcon } from 'lucide-react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              😮 OpenFace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/models')}
            >
              Models
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/datasets')}
            >
              Datasets
            </Button>
            <Link href="#community" className="hover:text-primary transition-colors">
              Community
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/signin')}
            >
              Sign In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-4 items-center"> {/* Added items-center */}
            <Button
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => handleNavigation('/models')}
            >
              Models
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => handleNavigation('/datasets')}
            >
              Datasets
            </Button>
            <Link href="#community" className="hover:text-primary transition-colors py-2 w-full text-center"> {/* Added w-full and text-center */}
              Community
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button 
                variant="outline"
                onClick={() => handleNavigation('/signin')}
              >
                Sign In
              </Button>
              <Button 
                variant="primary"
                onClick={() => handleNavigation('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}