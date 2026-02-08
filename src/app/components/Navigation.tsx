import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AP</span>
          </div>
          <span className="text-lg font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Akupunktúrny Piercing
          </span>
        </div>

        <button
          onClick={onBookingClick}
          className="bg-[#4A5D4E] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#3d4d41] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <Calendar className="w-4 h-4" />
          Rezervovať termín
        </button>
      </div>
    </nav>
  );
}
