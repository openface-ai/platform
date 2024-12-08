// utils/urlState.ts
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear empty params
    for (const [key, value] of params.entries()) {
      if (!value) params.delete(key);
    }

    // Add new params
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Only update if params have changed
    const newSearch = params.toString();
    if (newSearch !== searchParams.toString()) {
      router.push(`${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`);
    }
  }, [router, searchParams]);

  const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

  return { updateUrl, getParam };
}