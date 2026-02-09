import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { PriceGallery } from './components/PriceGallery';
import { FAQ } from './components/FAQ';
import { BookingSystem } from './components/BookingSystem';
import { StickyBooking } from './components/StickyBooking';
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
      <Gallery />
      <FAQ />
      <Reviews />
      <Contact />
      <Footer />
      <BookingSystem isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <StickyBooking onClick={handleBookingClick} />
    </div>
  );
}
