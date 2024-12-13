export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: '张小明',
    avatar: '/images/testimonials/avatar1.jpg',
    role: '恋爱一年的情侣',
    content: '通过AI测试，我们发现了彼此很多以前没注意到的特质，让我们的感情更进一步。',
    rating: 5
  },
  {
    id: '2',
    name: '李婷婷',
    avatar: '/images/testimonials/avatar2.jpg',
    role: '准备结婚的情侣',
    content: '测试报告给了我们很多有价值的建议，帮助我们更好地规划未来。',
    rating: 5
  },
  {
    id: '3',
    name: '王教授',
    avatar: '/images/testimonials/avatar3.jpg',
    role: '心理学专家',
    content: '这个测试系统融合了先进的AI技术和专业的心理学理论，非常科学可靠。',
    rating: 5
  }
]; 