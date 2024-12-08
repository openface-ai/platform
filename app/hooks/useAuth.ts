import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth state
    const checkAuth = async () => {
      // Check if we have a user in sessionStorage
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signOut = () => {
    // Clear all auth-related storage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('signupEmail');
    setUser(null);
  };

  return { user, isLoading, signOut };
} 