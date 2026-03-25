'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || isOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-aqua-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0C19 10 12 2 12 2zm0 18a5 5 0 01-5-5c0-3.5 5-9.5 5-9.5s5 6 5 9.5a5 5 0 01-5 5z" />
                <path d="M12 18a3 3 0 01-3-3c0-1 .5-2 1-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={cn(
              'transition-colors',
              scrolled ? 'text-aqua-800' : 'text-aqua-800'
            )}>
              <span className="font-heading text-lg font-bold leading-tight block">BANT</span>
              <span className="text-[10px] tracking-wider uppercase leading-tight block">Colon Hydrotherapy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-aqua-600',
                  pathname === link.href ? 'text-aqua-700' : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-aqua-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-aqua-800 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground/70"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium',
                  pathname === link.href ? 'text-aqua-700' : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block bg-aqua-700 text-white text-center px-5 py-3 rounded-full text-sm font-semibold"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
