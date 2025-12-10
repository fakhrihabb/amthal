'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, FolderKanban } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/20">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">SIVANA</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/intelligence-planner"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/intelligence-planner')
                  ? 'bg-[var(--color-light-blue)] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="font-medium">Intelligence Planner</span>
            </Link>
            <Link
              href="/projects"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/projects')
                  ? 'bg-[var(--color-light-blue)] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span className="font-medium">Proyek</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
