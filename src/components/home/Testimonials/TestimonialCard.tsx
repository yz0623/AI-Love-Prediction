import Image from 'next/image';
import { Testimonial } from './data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold">{testimonial.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.content}</p>
      <div className="flex text-yellow-400">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </div>
  );
} 