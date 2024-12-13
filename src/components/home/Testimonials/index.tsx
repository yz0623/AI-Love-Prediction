"use client";

import { useState, useEffect } from 'react';
import { testimonials } from './data';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [mounted]);

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            用户心得分享
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            听听他们怎么说
          </p>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </div>
            ))}
          </div>

          {mounted && (
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 