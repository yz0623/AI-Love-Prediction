"use client";

import { useState, useEffect } from 'react';
import { navigateToTest } from '../utils/navigation';

export default function CTAButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过视口高度的50%时显示按钮
      const shouldShow = window.scrollY > window.innerHeight * 0.5;
      setShowButton(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 transform">
      <button 
        className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all hover:scale-105"
        onClick={navigateToTest}
      >
        开始测试
      </button>
    </div>
  );
} 