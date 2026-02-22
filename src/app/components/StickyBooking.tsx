import { Calendar } from 'lucide-react'; // Importing calendar icon from library
//
interface StickyBookingProps { // Initializing TS interface for props
  onClick: () => void; // Click event handler function pointer
} // Closing interface definition
//
export function StickyBooking({ onClick }: StickyBookingProps) { // Exporting component for a persistent floating booking trigger
  return ( // returning JSX for the floating UI element
    <div className="fixed bottom-8 right-8 z-[40] md:hidden"> // positioning container as absolute bottom-right on mobile only
      <button // Main rounded CTA floating button
        onClick={onClick} // linking handler for interaction
        className="w-14 h-14 bg-[#4A5D4E] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce" // styling button as circular with bounce animation and scaling effects
        aria-label="Rezervovať termín" // accessibility label in Slovak "Book term"
      > // Closing button opening tag
        <Calendar className="w-6 h-6" /> // rendering the calendar icon inside the button
      </button> // closing button element
    </div> // closing absolute container fixed div
  ); // closing return statement
} // closing component block
//
