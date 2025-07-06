import Link from 'next/link';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Smart Resume Analyzer
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6">
          Upload your resume, match it with job descriptions, and get personalized insights, job listings, and course recommendations!
        </p>
        <Link href="/analyzer">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}