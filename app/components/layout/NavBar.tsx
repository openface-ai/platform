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
    setIsMenuOpen(false);
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
          <div className="hidden md:flex items-center space-x-4">
           
            <Link href="/models" className="hover:text-primary transition-colors">
              Models
            </Link>
            <Link href="/datasets" className="hover:text-primary transition-colors">
              Datasets
            </Link>
            <Link href="#community" className="hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
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
          <div className="flex flex-col space-y-4">
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
            <Link href="#community" className="hover:text-primary transition-colors py-2 text-center">
              Community
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors py-2 text-center">
              Dashboard
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