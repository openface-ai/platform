import Hero from '@/app/components/home/Hero';
import Models from '@/app/components/home/Models';
import Layout from '@/app/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Models />
    </Layout>
  );
}

