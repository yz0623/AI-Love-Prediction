import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="flex-1 relative h-[400px] lg:h-[600px] bg-purple-800/50 rounded-2xl backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl">💑</div>
      </div>
    </div>
  );
} 