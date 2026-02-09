import { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';

interface NavigationProps {
  onBookingClick: () => void;
}

export function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'O zákroku', id: 'about' },
    { name: 'Cenník', id: 'pricing' },
    { name: 'Galéria', id: 'gallery' },
    { name: 'Časté otázky', id: 'faq' },
    { name: 'Recenzie', id: 'reviews' },
    { name: 'Kontakt', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled || isMobileMenuOpen ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AP</span>
          </div>
          <span className="text-lg font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
            Akupunktúrny Piercing
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative py-1 text-gray-600 hover:text-[#4A5D4E] transition-colors font-medium group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.name}
              <span 
                className="absolute bottom-0 left-0 h-0.5 bg-[#4A5D4E] w-0 group-hover:w-full transition-all duration-300"
              />
            </button>
          ))}
          <button
            onClick={onBookingClick}
            className="bg-[#4A5D4E] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#3d4d41] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Calendar className="w-4 h-4" />
            Rezervovať termín
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-gray-600 hover:text-[#4A5D4E] transition-colors font-medium text-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              onBookingClick();
              setIsMobileMenuOpen(false);
            }}
            className="bg-[#4A5D4E] text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#3d4d41] transition-colors w-full"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Calendar className="w-5 h-5" />
            Rezervovať termín
          </button>
        </div>
      )}
    </nav>
  );
}
