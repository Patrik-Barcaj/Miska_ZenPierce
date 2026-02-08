import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { PriceGallery } from './components/PriceGallery';
import { BookingSystem } from './components/BookingSystem';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClick = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onBookingClick={handleBookingClick} />
      <Hero onBookingClick={handleBookingClick} />
      <BentoGrid />
      <PriceGallery />
      <Reviews />
      <Footer />
      <BookingSystem isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
