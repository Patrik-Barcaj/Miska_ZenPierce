import { ArrowRight } from 'lucide-react'; // Importing ArrowRight icon from lucide-react library
//
interface HeroProps { // Defining TypeScript interface for Hero component props
  onBookingClick: () => void; // Prop for a callback function when the booking button is clicked
} // Closing interface definition
//
export function Hero({ onBookingClick }: HeroProps) { // Exporting the Hero functional component receiving props
  return ( // Returning JSX for the hero section
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#F5F5F5] overflow-hidden"> // Hero section container with full screen height and centered content
      {/* Background image with overlay */} // Comment for organizers: details of the background image setup
      <div className="absolute inset-0"> // Full-screen absolute container for the background
        <img // Background image element
          src="https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080" // Source URL for the background image
          alt="Studio interior" // Descriptive alternative text for the image
          className="w-full h-full object-cover" // Styling image to fill parent while maintaining aspect ratio
        /> // Closing img tag
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#F5F5F5]"></div> // Gradient overlay to darken background for better text readability
      </div> // Closing background container div
//
      {/* Content */} // Comment for organizers: details for the main text/button content
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20"> // Content wrapper with z-index and centering
        <h1 // Main page heading
          className="text-5xl md:text-7xl mb-6 text-white leading-tight" // Responsive text size, margin, and color
          style={{ fontFamily: 'Playfair Display, serif' }} // Specific font family style
        > // Closing h1 opening tag
          Rovnováha a úľava cez precízny akupunktúrny piercing. // Heading text in Slovak
        </h1> // Closing h1 tag
        <p // Supporting paragraph text
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto" // Styling for size, opacity, and centered max width
          style={{ fontFamily: 'Inter, sans-serif' }} // Specific font family style
        > // Closing p opening tag
          Odborný prístup, sterilné prostredie a pomoc pri migrénach či úzkosti. // Description text in Slovak
        </p> // Closing p tag
        <button // Main call-to-action button
          onClick={onBookingClick} // Click handler linked to parent prop
          className="bg-[#4A5D4E] text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto hover:bg-[#3d4d41] transition-all hover:scale-105" // Styling for looks, layout, and hover animation
          style={{ fontFamily: 'Inter, sans-serif' }} // Specific font family style
        > // Closing button opening tag
          Rezervovať termín // Button label in Slovak "Book an appointment"
          <ArrowRight className="w-5 h-5" /> // Rendering arrow icon next to text
        </button> // Closing button tag
      </div> // Closing content wrapper div
//
      {/* Scroll indicator */} // Comment for organizers: details of the animated scroll down guide
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"> // Centered absolute container with bounce animation
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"> // Outer frame for scroll mouse visual
          <div className="w-1.5 h-3 bg-white/60 rounded-full"></div> // Animated 'dot' representing the mouse wheel
        </div> // Closing outer frame div
      </div> // Closing scroll indicator container div
    </section> // Closing hero section tag
  ); // Closing return statement
} // Closing Hero component function
//
