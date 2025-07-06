export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Smart Resume Analyzer. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="https://github.com/your-username/smart-resume-analyzer" className="text-secondary hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:support@example.com" className="text-secondary hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}