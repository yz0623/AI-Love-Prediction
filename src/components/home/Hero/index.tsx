import ValueProposition from './ValueProposition';
import HeroImage from './HeroImage';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-800">
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <ValueProposition />
        <HeroImage />
      </div>
    </section>
  );
} 