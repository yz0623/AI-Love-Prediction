import { ReactNode } from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export const features: Feature[] = [
  {
    id: 'ai-analysis',
    title: 'AI深度分析',
    description: '采用先进的自然语言处理技术，从多个维度分析你们的关系特点',
    icon: '🧠'
  },
  {
    id: 'scientific-method',
    title: '科学评估体系',
    description: '基于心理学理论和大数据分析，建立科学的评估标准',
    icon: '📊'
  },
  {
    id: 'personalized-report',
    title: '个性化报告',
    description: '生成详细的分析报告，并提供针对性的关系建议',
    icon: '📝'
  },
  {
    id: 'privacy-protection',
    title: '隐私保护',
    description: '采用加密技术，确保你的个人信息和测试数据安全',
    icon: '🔒'
  },
  {
    id: 'real-time-analysis',
    title: '实时分析',
    description: '即时生成分析结果，快速获得专业的关系洞察',
    icon: '⚡'
  },
  {
    id: 'continuous-learning',
    title: '持续优化',
    description: '系统不断学习和进化，提供更准确的分析结果',
    icon: '📈'
  },
  {
    id: 'expert-support',
    title: '专家支持',
    description: '由心理学专家团队提供专业的理论支持和指导',
    icon: '👨‍⚕️'
  },
  {
    id: 'easy-to-use',
    title: '简单易用',
    description: '友好的界面设计，让你轻松完成测试过程',
    icon: '✨'
  }
]; 