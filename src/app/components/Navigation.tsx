import { useState, useEffect } from 'react'; // Importing React hooks for state and lifecycle management
import { Calendar, Menu, X } from 'lucide-react'; // Importing icons for UI controls
//
interface NavigationProps { // TypeScript interface for component props
  onBookingClick: () => void; // Prop for triggering the booking system
} // Closing interface definition
//
export function Navigation({ onBookingClick }: NavigationProps) { // Exporting Navigation component receiving props
  const [isScrolled, setIsScrolled] = useState(false); // State for tracking window scroll position
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
//
  useEffect(() => { // Hook for handling scroll event listeners
    const handleScroll = () => { // Function to determine if user has scrolled past 20px
      setIsScrolled(window.scrollY > 20); // Setting scroll state boolean
    }; // Closing handleScroll function
//
    handleScroll(); // Initial check on component mount
    window.addEventListener('scroll', handleScroll); // Adding scroll listener to the window
    return () => window.removeEventListener('scroll', handleScroll); // Cleaning up listener on unmount
  }, []); // Run only once on mount
//
  const scrollToSection = (id: string) => { // Helper function for smooth scrolling to specific sections
    const element = document.getElementById(id); // Fetching target element by ID
    if (element) { // Proceed if element exists in the DOM
      const navHeight = 80; // Height of the fixed navigation bar
      const elementPosition = element.getBoundingClientRect().top; // Top coordinate relative to viewport
      const offsetPosition = elementPosition + window.pageYOffset - navHeight; // Calculated position including current scroll and offset
//
      window.scrollTo({ // Invoking window scroll with options
        top: offsetPosition, // Target vertical position
        behavior: 'smooth' // Enabling smooth transition effect
      }); // Closing scrollTo call
    } // Closing check block
    setIsMobileMenuOpen(false); // Closing mobile menu after clicking a link
  }; // Closing scrollToSection function
//
  const navLinks = [ // List of navigation items with names and target anchors
    { name: 'O zákroku', id: 'about' }, // About section link
    { name: 'Cenník', id: 'pricing' }, // Pricing section link
    { name: 'Galéria', id: 'gallery' }, // Gallery section link
    { name: 'Časté otázky', id: 'faq' }, // FAQ section link
    { name: 'Recenzie', id: 'reviews' }, // Reviews section link
    { name: 'Kontakt', id: 'contact' }, // Contact section link
  ]; // Closing navLinks array
//
  return ( // Returning the JSX for the navigation bar
    <nav // Main navigation container
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${ // Global styles for positioning and z-index
        isScrolled || isMobileMenuOpen ? 'shadow-md' : 'shadow-sm' // Applying different shadow based on state
      }`} // Closing class logic
    > // Closing opening nav tag
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"> // Inner container with sizing and alignment
        <div // Logo/Brand container
          className="flex items-center gap-2 cursor-pointer" // Flex layout and clickable pointer style
          onClick={() => scrollToSection('hero')} // Scrolling back to top on click
        > // Closing logo container opening tag
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center"> // Circular logo mark
            <span className="text-white text-sm font-bold">AP</span> // Initials text for brand
          </div> // Closing logo mark div
          <span className="text-lg font-medium" style={{ fontFamily: 'Playfair Display, serif' }}> // Brand name text with specific header font
            Akupunktúrny Piercing // Brand name in Slovak
          </span> // Closing brand name span
        </div> // Closing logo container div
//
        {/* Desktop Links */} // Comment for organizers: details of links shown on desktop
        <div className="hidden md:flex items-center gap-8"> // Horizontal container visible only on larger screens
          {navLinks.map((link) => ( // Iterating over links list
            <button // Individual navigation link as button
              key={link.id} // Identity key for React rendering
              onClick={() => scrollToSection(link.id)} // Triggering scroll on click
              className="relative py-1 text-gray-600 hover:text-[#4A5D4E] transition-colors font-medium group" // Specific styling for interactability
              style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
            > // Closing button opening tag
              {link.name} // Displaying link label
              <span // Decorative underline for hover effect
                className="absolute bottom-0 left-0 h-0.5 bg-[#4A5D4E] w-0 group-hover:w-full transition-all duration-300" // Styled zero-width span that fills on hover
              /> // Closing span tag
            </button> // Closing navigation button tag
          ))} // Closing map loop
          <button // Dedicated booking button for desktop
            onClick={onBookingClick} // Parent handler to open booking UI
            className="bg-[#4A5D4E] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#3d4d41] transition-colors" // High-contrast styles for CTA
            style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
          > // Closing button opening tag
            <Calendar className="w-4 h-4" /> // Calendar icon for Visual context
            Rezervovať termín // CTA text labels Slovak "Book term"
          </button> // Closing booking button tag
        </div> // Closing desktop links container
//
        {/* Mobile Toggle */} // Comment for organizers: details for the hamburger/close menu toggle
        <button // Mobile toggle button
          className="md:hidden p-2 text-gray-600" // Visible only on small screens
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Inverting menu state on click
        > // Closing button opening tag
          {isMobileMenuOpen ? <X /> : <Menu />} // Conditional rendering of X icon if open, else Hamburger Menu icon
        </button> // Closing mobile toggle tag
      </div> // Closing main flex container div
//
      {/* Mobile Menu */} // Comment for organizers: details of the expanded mobile menu
      {isMobileMenuOpen && ( // Conditional block for rendering expanded menu
        <div className="md:hidden bg-white border-t border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300"> // Expanded menu container with entry animation and vertical layout
          {navLinks.map((link) => ( // Mapping links list for mobile UI
            <button // Individual list item button
              key={link.id} // Identity key for React rendering
              onClick={() => scrollToSection(link.id)} // Triggering scroll and close logic
              className="text-left text-gray-600 hover:text-[#4A5D4E] transition-colors font-medium text-lg" // specific mobile sizing and styling
              style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
            > // Closing button opening tag
              {link.name} // Displaying label
            </button> // Closing button tag
          ))} // Closing map loop
          <button // Dedicated booking button for mobile menu
            onClick={() => { // Inline handler for mobile action
              onBookingClick(); // Open booking UI
              setIsMobileMenuOpen(false); // Close the mobile menu simultaneously
            }} // Closing action logic
            className="bg-[#4A5D4E] text-white px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#3d4d41] transition-colors w-full" // High-visibility mobile CTA styles
            style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
          > // Closing button opening tag
            <Calendar className="w-5 h-5" /> // icon for visual context
            Rezervovať termín // CTA text labels Slovak "Book terminal"
          </button> // Closing mobile booking button tag
        </div> // Closing mobile menu expanded container div
      )} // Closing conditional check
    </nav> // Closing the fixed navigation component main tag
  ); // Closing return statement
} // Closing Navigation functional component block
//
