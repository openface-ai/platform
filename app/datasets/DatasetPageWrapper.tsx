// DatasetsPageWrapper.tsx
'use client';

import { Suspense } from 'react';
import { useUrlState } from '../utils/urlState';
import DatasetsPage from './DatasetPage';
import LoadingSpinner from '../components/shared/LoadingSpinner';

function DatasetsPageWrapper() {
  const { updateUrl, getParam } = useUrlState();

  return <DatasetsPage updateUrl={updateUrl} getParam={getParam} />;
}

export default function DatasetsPageWithSuspense() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DatasetsPageWrapper />
    </Suspense>
  );
}