// ModelsPageWrapper.tsx
'use client';

import { Suspense } from 'react';
import { useUrlState } from '../utils/urlState';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ModelsPage from './ModelPage';

function ModelsPageWrapper() {
  const { updateUrl, getParam } = useUrlState();

  return <ModelsPage updateUrl={updateUrl} getParam={getParam} />;
}

export default function ModelsPageWithSuspense() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ModelsPageWrapper />
    </Suspense>
  );
}