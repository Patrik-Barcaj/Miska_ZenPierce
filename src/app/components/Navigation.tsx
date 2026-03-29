// Import useState hook from React for menu state handling
import { useState } from 'react';
// Import icons from lucide-react for booking button and mobile menu toggles
import { Calendar, Menu, X } from 'lucide-react';
// Import framer-motion dependencies for smooth dropdown animations
import { motion, AnimatePresence } from 'framer-motion';

// Define the interface for the Navigation component props
interface NavigationProps {
  // Callback function for clicking the booking reservation button
  onBookingClick: () => void;
  // Close the interface definition
}

// Export the Navigation component which accepts the onBookingClick prop
export function Navigation({ onBookingClick }: NavigationProps) {
  // Initialize state variable isMobileMenuOpen to track hamburger dropdown status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Return the JSX representing the navigation structure
  return (
    // Render an HTML nav tag positioned at top left and applying transitions
    <nav
      // Apply base styles forcing permanent white background shadow visibility
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      {/* Container to restrict layout sizing and centered layout with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Left container block wrapper holding visual logo identification elements */}
        <div className="flex items-center gap-2">
          {/* Styled circle rendering logo marker elements */}
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center">
            {/* Text containing initials of Zen Piercing format */}
            <span className="text-white text-sm font-bold">ZenP</span>
            {/* Close styled logo component block */}
          </div>
          {/* Secondary span labeling explicit typographic identification, responsive text size */}
          <span className="text-sm sm:text-base md:text-lg font-medium tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            {/* Branding/Logo text dynamically taking values from local state or falling back to default */}
            Zen Piercing
            {/* Close brand name text wrapper */}
          </span>
          {/* End definition map closure tag boundaries layout wrapper instance */}
        </div>

        {/* Center navigation links container hidden on mobile and shown on desktop screens */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Link to the O zákroku section */}
          <a
            // Hyperlink reference to element ID
            href="#o-zakroku"
            // CSS text styling statically dark formatting
            className="transition-all text-sm font-medium hover:underline underline-offset-4 decoration-2 text-[#2D2D2D]"
            // Inline typography declaration
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Link readable text */}
            O zákroku
            {/* Close link tag */}
          </a>
          {/* Link to the Cenník section */}
          <a
            // Hyperlink reference to element ID
            href="#cennik"
            // CSS text styling statically dark formatting
            className="transition-all text-sm font-medium hover:underline underline-offset-4 decoration-2 text-[#2D2D2D]"
            // Inline typography declaration
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Link readable text */}
            Cenník
            {/* Close link tag */}
          </a>
          {/* Link to the Galéria section */}
          <a
            // Hyperlink reference to element ID
            href="#galeria"
            // CSS text styling statically dark formatting
            className="transition-all text-sm font-medium hover:underline underline-offset-4 decoration-2 text-[#2D2D2D]"
            // Inline typography declaration
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Link readable text */}
            Galéria
            {/* Close link tag */}
          </a>
          {/* Link to the Recenzie section */}
          <a
            // Hyperlink reference to element ID
            href="#recenzie"
            // CSS text styling statically dark formatting
            className="transition-all text-sm font-medium hover:underline underline-offset-4 decoration-2 text-[#2D2D2D]"
            // Inline typography declaration
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Link readable text */}
            Recenzie
            {/* Close link tag */}
          </a>
          {/* Link to the FAQ section */}
          <a
            // Hyperlink reference to element ID
            href="#faq"
            // CSS text styling statically dark formatting
            className="transition-all text-sm font-medium hover:underline underline-offset-4 decoration-2 text-[#2D2D2D]"
            // Inline typography declaration
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Link readable text */}
            FAQ
            {/* Close link tag */}
          </a>
          {/* Close middle links container */}
        </div>

        {/* Container for right-side action elements including desktop booking button and mobile hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop-only action button initiating booking modal process via callback action handler */}
          <button
            // Pass the reference mapped prop executing action trigger map
            onClick={onBookingClick}
            // Add hidden lg:flex to ensure it only renders on large desktop screens alongside core button styling
            className="hidden lg:flex bg-[#4A5D4E] text-white px-6 py-2.5 rounded-full items-center gap-2 hover:bg-[#3d4d41] transition-colors text-sm"
            // Limit font typographic styling constraint parameter
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Calendar visual icon instance */}
            <Calendar className="w-4 h-4" />
            {/* Button text string literal rendering boundary */}
            Rezervovať termín
            {/* Close interactive action button instance parameter limit component definitions */}
          </button>

          {/* Mobile-only hamburger toggle button hidden on desktop screens */}
          <button
            // Change boolean state flipping dropdown visibility
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            // Visible exclusively on smaller mobile screens, hidden lg
            className="lg:hidden p-2 text-[#2D2D2D] hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center focus:outline-none"
            // Aria label for screen readers
            aria-label="Toggle menu"
          >
            {/* Conditionally render X or Menu based on open state */}
            {isMobileMenuOpen ? (
              // X icon rendered when dropdown is currently open
              <X className="w-6 h-6" />
            ) : (
              // Menu icon rendered when dropdown is currently closed
              <Menu className="w-6 h-6" />
            )}
            {/* Close hamburger toggle button element */}
          </button>
          {/* Close right-side action container wrapper */}
        </div>
        {/* End definition map closure tag boundaries layout wrapper instance container tags */}
      </div>

      {/* Framer motion wrapper for entering/exiting dropdown animations */}
      <AnimatePresence>
        {/* Render dropdown conditionally based on mobile state flag */}
        {isMobileMenuOpen && (
          // Mobile dropdown container wrapping layout
          <motion.div
            // Base state when springing into existence
            initial={{ height: 0, opacity: 0 }}
            // Target animated state reaching full visibility
            animate={{ height: 'auto', opacity: 1 }}
            // Death state when collapsing interface back down
            exit={{ height: 0, opacity: 0 }}
            // Custom bouncy physics curve settings for smooth slide action
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            // Layout styling bounds, hidden strictly on desktop
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg"
          >
            {/* Flex container enforcing vertical stacking flow for inside hyperlinks */}
            <div className="flex flex-col px-6 py-6 space-y-4">
              {/* O zákroku link routing internal scroll action */}
              <a
                // Target section hash fragment mapping
                href="#o-zakroku"
                // On-click callback collapsing dropdown map immediately
                onClick={() => setIsMobileMenuOpen(false)}
                // Layout color stylization matching brand parameters
                className="text-[#2D2D2D] text-lg font-medium hover:text-[#4A5D4E] transition-colors"
                // Typography constraints
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Visual string representation text rendering literal */}
                O zákroku
                {/* Close anchor tag */}
              </a>
              {/* Cenník link routing internal scroll action */}
              <a
                // Target section hash fragment mapping
                href="#cennik"
                // On-click callback collapsing dropdown map immediately
                onClick={() => setIsMobileMenuOpen(false)}
                // Layout color stylization matching brand parameters
                className="text-[#2D2D2D] text-lg font-medium hover:text-[#4A5D4E] transition-colors"
                // Typography constraints
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Visual string representation text rendering literal */}
                Cenník
                {/* Close anchor tag */}
              </a>
              {/* Galéria link routing internal scroll action */}
              <a
                // Target section hash fragment mapping
                href="#galeria"
                // On-click callback collapsing dropdown map immediately
                onClick={() => setIsMobileMenuOpen(false)}
                // Layout color stylization matching brand parameters
                className="text-[#2D2D2D] text-lg font-medium hover:text-[#4A5D4E] transition-colors"
                // Typography constraints
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Visual string representation text rendering literal */}
                Galéria
                {/* Close anchor tag */}
              </a>
              {/* Recenzie link routing internal scroll action */}
              <a
                // Target section hash fragment mapping
                href="#recenzie"
                // On-click callback collapsing dropdown map immediately
                onClick={() => setIsMobileMenuOpen(false)}
                // Layout color stylization matching brand parameters
                className="text-[#2D2D2D] text-lg font-medium hover:text-[#4A5D4E] transition-colors"
                // Typography constraints
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Visual string representation text rendering literal */}
                Recenzie
                {/* Close anchor tag */}
              </a>
              {/* FAQ link routing internal scroll action */}
              <a
                // Target section hash fragment mapping
                href="#faq"
                // On-click callback collapsing dropdown map immediately
                onClick={() => setIsMobileMenuOpen(false)}
                // Layout color stylization matching brand parameters
                className="text-[#2D2D2D] text-lg font-medium hover:text-[#4A5D4E] transition-colors"
                // Typography constraints
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Visual string representation text rendering literal */}
                FAQ
                {/* Close anchor tag */}
              </a>

              {/* Separator div simulating horizontal line rule divider visual element */}
              <div className="h-px bg-gray-200 my-2 w-full"></div>

              {/* Mobile instance of booking button contained entirely within dynamic dropdown bounds */}
              <button
                // Executing sequential closures binding booking logic AND menu collapse concurrently
                onClick={() => {
                  // Execute base parent prop callback first firing generic system
                  onBookingClick();
                  // Secondarily collapse menu preventing visual stacking blockage overlays
                  setIsMobileMenuOpen(false);
                  // Close execution map block
                }}
                // Custom bounds setting width to 100% generating large tactile target area specifically for touch interfaces matching primary colored themes
                className="w-full bg-[#4A5D4E] text-white py-3 rounded-full flex justify-center items-center gap-2 hover:bg-[#3d4d41] transition-colors font-medium mt-2"
                // Restrict generic text typography mapping rules bounds
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Calendar identifier mapping explicit context visual layout element */}
                <Calendar className="w-5 h-5" />
                {/* Text identifier bounds tag strings literal rendering literal element */}
                Rezervovať termín
                {/* End generic button boundaries bounds limit map component parameters */}
              </button>

              {/* End flex column wrapper limit layout tag */}
            </div>
            {/* End framer motion conditional rendering layout element tags */}
          </motion.div>
          // End condition wrapper bounds variable evaluation tags
        )}
        {/* End Framer Animatepresence mapping limit tags */}
      </AnimatePresence>
    </nav>
    // Ends component object mapping boundaries rules mappings variables context definitions limits components context
  );
  // Close structure mapping boundaries mapping tags mapping reference tags boundary tags limit contexts limits variables context mappings definitions mappings boundary context tags limit mapping context mappings tags
}
