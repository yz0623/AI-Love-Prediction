import { features } from './data';
import FeatureCard from './FeatureCard';

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            为什么选择我们的测试
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            科学的方法，专业的分析，让你更了解你们的关系
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 