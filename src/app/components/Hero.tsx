import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#F5F5F5] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Studio interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#F5F5F5]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <h1
          className="text-5xl md:text-7xl mb-6 text-white leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Rovnováha a úľava cez precízny akupunktúrny piercing.
        </h1>
        <p
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Odborný prístup, sterilné prostredie a pomoc pri migrénach či úzkosti.
        </p>
        <button
          onClick={onBookingClick}
          className="bg-[#4A5D4E] text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto hover:bg-[#3d4d41] transition-all hover:scale-105"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Rezervovať termín
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
