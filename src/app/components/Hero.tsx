// Import ArrowRight icon from lucide-react for the booking button
import { ArrowRight } from 'lucide-react';

// Define the interface for the Hero component props
interface HeroProps {
  // Callback function to handle click on the booking button
  onBookingClick: () => void;
  // Close the interface definition
}

// Export the Hero component which receives onBookingClick prop
export function Hero({ onBookingClick }: HeroProps) {
  // Return the JSX representing the hero section
  return (
    // Main section container with relative positioning, full height, and centered flex layout
    <section className="relative min-h-screen flex items-center justify-center bg-[#F5F5F5] overflow-hidden">
      {/* Background image container with absolute positioning to cover the section */}
      <div className="absolute inset-0">
        {/* Render the background image using an external URL */}
        <img
          // Specify the image source URL for the studio interior
          src="https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          // Set alt text for accessibility
          alt="Studio interior"
          // Apply classes for full width/height and object cover
          className="w-full h-full object-cover"
        // Close the img tag
        />
        {/* Add a semi-transparent gradient overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#F5F5F5]"></div>
        {/* Close the background image container */}
      </div>

      {/* Main content container with absolute positioning and relative z-index */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        {/* Main heading for the page */}
        <h1
          // Apply typography styles for the heading text across different screen sizes
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-white leading-tight"
          // Use Playfair Display font family specifically for the heading
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {/* Hero subtitle text explaining the main benefit */}
          Rovnováha a úľava cez precízny Zen Piercing.
          {/* Close the hero subtitle element */}
        </h1>
        {/* Subtitle paragraph for additional context */}
        <p
          // Apply typography styles for the subtitle text across different screen sizes
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4 sm:px-0"
          // Use Inter font family specifically for the subtitle
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Output the subtitle paragraph text */}
          Odborný prístup, sterilné prostredie a pomoc pri migrénach či úzkosti.
          {/* Close the subtitle paragraph */}
        </p>
        {/* Call-to-action button for booking an appointment */}
        <button
          // Attach the provided onBookingClick callback to the onClick event
          onClick={onBookingClick}
          // Apply button structural and hover styling, adjust padding for smaller screens
          className="bg-[#4A5D4E] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full flex items-center gap-2 sm:gap-3 mx-auto hover:bg-[#3d4d41] transition-all hover:scale-105"
          // Use Inter font family specifically for the button
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Output the button text */}
          Rezervovať termín
          {/* Render the ArrowRight icon inside the button */}
          <ArrowRight className="w-5 h-5" />
          {/* Close the button tag */}
        </button>
        {/* Close the content container */}
      </div>

      {/* Container for the bouncing scroll indicator arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        {/* Outer border of the scroll indicator shape */}
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          {/* Inner animated part of the scroll indicator shape */}
          <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          {/* Close the outer scroll indicator border */}
        </div>
        {/* Close the container for the scroll indicator */}
      </div>
      {/* Close the main section container */}
    </section>
    // Close the return statement
  );
  // Close the Hero component definition
}
