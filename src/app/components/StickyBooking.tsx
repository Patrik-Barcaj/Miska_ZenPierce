import { Calendar } from 'lucide-react';

interface StickyBookingProps {
  onClick: () => void;
}

export function StickyBooking({ onClick }: StickyBookingProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[40] md:hidden">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-[#4A5D4E] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce"
        aria-label="Rezervovať termín"
      >
        <Calendar className="w-6 h-6" />
      </button>
    </div>
  );
}
