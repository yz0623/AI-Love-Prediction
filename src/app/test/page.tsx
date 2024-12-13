'use client';

import dynamic from 'next/dynamic';

const TestPage = dynamic(
  () => import('@/components/test-analysis/page'),
  { ssr: false }
);

export default function Page() {
  return <TestPage />;
} 