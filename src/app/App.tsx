import { useState, useEffect } from 'react'; // Importing hooks from React
import { Navigation } from './components/Navigation'; // Importing Navigation component
import { Hero } from './components/Hero'; // Importing Hero component
import { BentoGrid } from './components/BentoGrid'; // Importing BentoGrid component
import { Gallery } from './components/Gallery'; // Importing Gallery component
import { Contact } from './components/Contact'; // Importing Contact component
import { PriceGallery } from './components/PriceGallery'; // Importing PriceGallery component
import { FAQ } from './components/FAQ'; // Importing FAQ component
import { BookingSystem } from './components/BookingSystem'; // Importing BookingSystem component
import { StickyBooking } from './components/StickyBooking'; // Importing StickyBooking component
import { Reviews } from './components/Reviews'; // Importing Reviews component
import { Footer } from './components/Footer'; // Importing Footer component
import { ThemeProvider } from 'next-themes'; // Importing ThemeProvider for next-themes
import { Toaster } from './components/ui/sonner'; // Importing Toaster component
import 'slick-carousel/slick/slick.css'; // Importing base CSS for slick carousel
import 'slick-carousel/slick/slick-theme.css'; // Importing theme CSS for slick carousel
//
export default function App() { // Exporting the main App functional component
  if ((window as any).log) {
    (window as any).log("App render function entered");
    (window as any).log("Diagnostics: " + JSON.stringify({
      Navigation: typeof Navigation,
      Hero: typeof Hero,
      BentoGrid: typeof BentoGrid,
      PriceGallery: typeof PriceGallery,
      Gallery: typeof Gallery,
      FAQ: typeof FAQ,
      Reviews: typeof Reviews,
      Contact: typeof Contact,
      Footer: typeof Footer,
      BookingSystem: typeof BookingSystem,
      StickyBooking: typeof StickyBooking,
      ThemeProvider: typeof ThemeProvider,
      Toaster: typeof Toaster
    }));
  }

  const [isBookingOpen, setIsBookingOpen] = useState(false); // Initializing state
//
  const handleBookingClick = () => { // Function to handle clicks that trigger the booking system
    setIsBookingOpen(true); // Updating state to open the booking system
  }; // Closing the handleBookingClick function
//
  if ((window as any).log) (window as any).log("App render function - Testing ThemeProvider");
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-white">
        <Navigation onBookingClick={handleBookingClick} />
        <Hero onBookingClick={handleBookingClick} />
        <BentoGrid />
        <PriceGallery />
        <FAQ />
        <Contact />
        <Footer />
        <div style={{ padding: '50px', color: 'black', background: '#ccc' }}>
          LEVEL 2 BATCH - IF YOU SEE THIS, THE ISSUE IS IN (Gallery, Reviews, BookingSystem, StickyBooking, or Toaster).
        </div>
      </div>
    </ThemeProvider>
  );
}
//
