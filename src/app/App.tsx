// Import the useState hook from React for managing component state
import { useState } from 'react';
// Import the Navigation component for the top navigation bar
import { Navigation } from './components/Navigation';
// Import the Hero component for the main landing area
import { Hero } from './components/Hero';
// Import the BentoGrid component for displaying features
import { BentoGrid } from './components/BentoGrid';
// Import the PriceGallery component for the pricing section
import { PriceGallery } from './components/PriceGallery';
// Import the FAQ component to display frequently asked questions
import { FAQ } from './components/FAQ';
// Import the BookingSystem component for handling user bookings
import { BookingSystem } from './components/BookingSystem';
// Import the Reviews component to display customer feedback
import { Reviews } from './components/Reviews';
// Import the Footer component for the bottom of the page
import { Footer } from './components/Footer';
// Import the core Slick carousel CSS for sliders to work properly
import 'slick-carousel/slick/slick.css';
// Import the theme Slick carousel CSS for default styling
import 'slick-carousel/slick/slick-theme.css';

// Export the main App component as default
export default function App() {
  // Initialize state variable isBookingOpen to track if the booking modal is active
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Define a handler function to open the booking modal when called
  const handleBookingClick = () => {
    // Set the booking modal state to true to make it visible
    setIsBookingOpen(true);
    // Close the handleBookingClick function
  };

  // Return the JSX representing the main application layout
  return (
    // Wrap the entire app in a div with minimum screen height and white background
    <div className="min-h-screen bg-white">
      {/* Render the Navigation component and pass the booking click handler */}
      <Navigation onBookingClick={handleBookingClick} />
      {/* Render the Hero component and pass the booking click handler */}
      <Hero onBookingClick={handleBookingClick} />
      {/* Render the BentoGrid component to show grid layout features */}
      <BentoGrid />
      {/* Render the PriceGallery component to display piercing prices */}
      <PriceGallery />
      {/* Render the Reviews component to show user testimonials */}
      <Reviews />
      {/* Render the FAQ component below reviews and above the footer */}
      <FAQ />
      {/* Render the Footer component for the page footer */}
      <Footer />
      {/* Render the BookingSystem component, passing its open state and a close handler */}
      <BookingSystem isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      {/* Close the main application div container */}
    </div>
    // Close the return statement
  );
  // Close the App component function
}
