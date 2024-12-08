
import NavBar from './components/layout/NavBar';
import Models from './components/home/Models';
import Datasets from './components/home/Datasets';
import Footer from './components/layout/Footer';
import { mockModels } from './data/models';

export default function Home() {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Models models={mockModels} />
        <Datasets/>
      </main>
      <Footer />
    </div>
  );
}