import { Feature } from './data';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
    </div>
  );
} 