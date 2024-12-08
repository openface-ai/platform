import { MOCK_REPOS } from '@/app/data/repos';
import RepositoryPage from '@/app/components/repository/RepositoryPage';
type Props = {
  params: {
    owner: string;
    repo: string;
  };
};

export default function DatasetPage({ params }: Props) {
  return <RepositoryPage type="datasets" owner={params.owner} repo={params.repo} />;
} 