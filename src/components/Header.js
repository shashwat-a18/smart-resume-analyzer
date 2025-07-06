import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Text-based logo; uncomment Image for logo.png */}
          <h1 className="text-2xl font-bold tracking-tight">Smart Resume Analyzer</h1>
          {/* <Image src="/logo.png" alt="Logo" width={150} height={40} /> */}
        </div>
        <nav className="flex space-x-6">
          <Link href="/" className="text-lg hover:underline hover:text-secondary transition">
            Home
          </Link>
          <Link href="/analyzer" className="text-lg hover:underline hover:text-secondary transition">
            Analyze
          </Link>
        </nav>
      </div>
    </header>
  );
}