// components/Hero.tsx
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">  
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <span className="text-6xl md:text-8xl">😮</span>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Open Source AI Hub
          </h1>
        </div>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
          Discover, share, and deploy AI models & datasets in a community-driven ecosystem
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button size="lg">Explore Models</Button>
          <Button variant="outline" size="lg">Join Community</Button>
        </div>
      </div>
    </section>
  );
}