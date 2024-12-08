import { MOCK_REPOS } from '@/app/data/repos';
import RepositoryPage from '@/app/components/repository/RepositoryPage';

type Props = {
  params: {
    owner: string;
    repo: string;
  };
};

export function generateStaticParams() {
  return MOCK_REPOS.map((repo) => ({
    owner: repo.owner,
    repo: repo.name,
  }));
}

export default function ModelPage({ params }: Props) {
  return <RepositoryPage type="models" owner={params.owner} repo={params.repo} />;
}