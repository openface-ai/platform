// components/auth/ForgotPassword.tsx
'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthCard } from './AuthCard';
import { MailIcon, ArrowLeftIcon } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthCard>
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="text-3xl mb-2">😮</div>
              <h2 className="text-xl font-semibold text-gray-200">Check your email</h2>
              <p className="text-gray-400 text-sm mt-1 text-center">
                We sent recovery instructions to<br />
                <span className="text-gray-200">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              >
                Back to reset password
              </button>
              
              <Link 
                href="/signin"
                className="block w-full py-2 px-4 border border-gray-700 text-center rounded-md text-gray-400 hover:bg-gray-800 transition-colors"
              >
                Back to login
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="text-3xl mb-2">😮</div>
            <h2 className="text-xl font-semibold text-gray-200">Reset your password</h2>
            <p className="text-gray-400 text-sm mt-1">
              Enter your email to receive recovery instructions
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send recovery instructions'}
            </button>
          </form>

          <div className="mt-4">
            <Link 
              href="/signin"
              className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
