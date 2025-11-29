'use client'
import Navbar from '@/components/Navbar';
import Problems from '@/components/Problems'
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProblemsContent() {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty');
  const language = searchParams.get('language');
  
  return <Problems difficulty={difficulty} language={language} />;
}

export default function ProblemTable() {
  return (
    <>
    <Navbar/>
    <main className="flex min-h-screen flex-col items-center justify-between pt-1 px-4 sm:pt-5 sm:px-12 md:pt-7 md:px-24 lg:pt-12 bg-[#0d1117]">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ProblemsContent />
        </Suspense>
    </main>
    </>
  )
}