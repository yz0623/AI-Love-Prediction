"use client";

import { navigateToTest } from '../utils/navigation';

export default function ValueProposition() {
  return (
    <div className="flex-1 text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
        探索你们的感情契合度
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-8">
        基于AI技术的科学分析，帮助你更好地了解彼此
      </p>
      <button 
        className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105"
        onClick={navigateToTest}
      >
        开始测试
      </button>
    </div>
  );
} 