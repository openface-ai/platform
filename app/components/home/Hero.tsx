import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="pt-28 md:pt-32 px-4 text-center">
    {/*
      <pre className="text-green-500 text-[0.6rem] md:text-xs mb-6 whitespace-pre overflow-x-auto">
        {`____ ______   ____   _____/ ____\\____    ____  ____
/  _ \\\\____ \\_/ __ \\/    \\   __\\ / __ \\ _/ ___\\/ __ \\
(  <_> )  |_> >  ___/|   |  \\  |  / __ \\ \\  \\__\\  ___/
\\____/|   __/ \\___  >___|  /__|  (____  /\\___  >___  >
    |__|        \\/     \\/           \\/     \\/    \\/`}
      </pre> */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Open Source AI Hub
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
        Discover, share, and deploy AI models & datasets in a community-driven ecosystem
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg">Explore Models</Button>
        <Button variant="outline" size="lg">Join Community</Button>
      </div>
    </section>
  );
}
