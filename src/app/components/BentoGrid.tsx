// Import useState from React for managing selected accordion item state
import { useState } from 'react';
// Import necessary icons from lucide-react package including Plus and Minus
import { Brain, Users, Clipboard, Heart, Plus, Minus } from 'lucide-react';
// Import framer-motion components for smooth expansion animations
import { motion, AnimatePresence } from 'framer-motion';

// Export the BentoGrid functional component layout
export function BentoGrid() {
  // Initialize state to track which mobile accordion item is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  // Define an array of objects representing the features grid
  const cards = [
    // First feature card definition
    {
      // Icon assigned to this feature card
      icon: Brain,
      // Title text for this feature
      title: 'Čo je Zen piercing?',
      // Detailed description text for this feature
      description:
        // Description paragraph text
        'Zen Piercing je špeciálny druh piercingu aplikovaný do presne určených reflexných bodov na uchu. Tieto body sú podľa princípov aurikuloterapie prepojené s nervovým systémom a energetickými dráhami tela. Spojením tradičných princípov akupunktúry a moderného piercingového umenia vzniká služba, ktorá má estetický aj funkčný význam.',
      // CSS classes for responsive grid placement adjusting spans across mobile, tablet, and desktop
      className: 'sm:col-span-2 lg:col-span-3',
      // End first feature card
    },
    // Second feature card definition
    {
      // Icon assigned to this feature card
      icon: Users,
      // Title text for this feature
      title: 'Pre koho je Zen piercing určený?',
      // Detailed description text for this feature
      description:
        // Description paragraph text
        'Je určený pre ľudí, ktorí hľadajú prirodzenú podporu pri strese, migrenách a pri symptómoch menopauzy. Zen Piercing pracuje s reakciami tela jemným a dlhodobým spôsobom. Každá aplikácia prebieha individuálne na základe konzultácie, zdravotného stavu a potrieb klienta. Zen Piercing nie je liečba, ale môže byť účinným doplnkom k starostlivosti o fyzické a psychické zdravie.',
      // CSS classes for responsive grid placement adjusting spans across mobile, tablet, and desktop
      className: 'sm:col-span-1 lg:col-span-1',
      // End second feature card
    },
    // Third feature card definition
    {
      // Icon assigned to this feature card
      icon: Clipboard,
      // Title text for this feature
      title: 'AKO PREBIEHA APLIKÁCIA',
      // Detailed description text for this feature
      description:
        // Description paragraph text
        '1. Konzultácia a zhodnotenie stavu 2. Výber vhodného bodu 3. Výber šperku podľa preferencií a veľkosti 4. Dezinfekcia a príprava 5. Aplikácia piercingu 6. Inštrukcie k starostlivosti 🕒 Trvanie: 20–30 minút',
      // CSS classes for responsive grid placement adjusting spans across mobile, tablet, and desktop
      className: 'sm:col-span-1 lg:col-span-1',
      // End third feature card
    },
    // Fourth feature card definition
    {
      // Icon assigned to this feature card
      icon: Heart,
      // Title text for this feature
      title: 'STAROSTLIVOSŤ PO APLIKÁCII',
      // Detailed description text for this feature
      description:
        // Description paragraph text
        '* pravidelné čistenie * vyhýbanie sa tlaku  * dodržiavanie hygieny * kontrola pri potrebe *Správna starostlivosť podporuje účinok aj hojenie.',
      // CSS classes for responsive grid placement adjusting spans across mobile, tablet, and desktop
      className: 'sm:col-span-2 lg:col-span-1',
      // End fourth feature card
    },
    // End cards array
  ];

  // Return the JSX layout structure
  return (
    // Top level section element with padding and white background
    <section id="o-zakroku" className="py-20 px-6 bg-white">
      {/* Maximum width container, horizontally centered */}
      <div className="max-w-6xl mx-auto">
        {/* Main section heading with specific font styling */}
        <h2
          // CSS classes for text sizing, alignment, and color
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          // Inline style enforcing Playfair Display font family
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {/* Main heading text */}
          O zákroku
          {/* Close main heading */}
        </h2>
        {/* Subtitle paragraph adding more context */}
        <p
          // CSS classes for text alignment, color, marginal spacing, and max width
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          // Inline style enforcing Inter font family
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Subtitle paragraph text */}
          Všetko, čo potrebujete vedieť o Zen Piercingu a jeho prospešných účinkoch.
          {/* Close subtitle paragraph */}
        </p>

        {/* Desktop Grid container: visible only on tablet (sm) and larger screens */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map iteration over the cards array to render elements dynamically */}
          {cards.map((card, index) => {
            // Assign the icon component to a variable with capitalized name for rendering
            const Icon = card.icon;
            // Return the individual card element layout
            return (
              // Individual card container div
              <div
                // Unique key assignment required by React mapping
                key={index}
                // Dynamic class composition setting background, padding, rounding, and hover effects
                className={`${card.className} bg-[#F5F5F5] p-8 rounded-2xl hover:shadow-lg transition-shadow group`}
              >
                {/* Circular container holding the respective card icon */}
                <div className="bg-[#4A5D4E] w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {/* Render the icon assigned previously with defined sizing and color */}
                  <Icon className="w-6 h-6 text-white" />
                  {/* Close the icon container */}
                </div>
                {/* Card specific subtitle rendering element */}
                <h3
                  // Text styling, coloring, and margin definitions
                  className="text-2xl mb-3 text-[#2D2D2D]"
                  // Typography enforcement style parameter
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {/* Dynamic output of current iterated card title */}
                  {card.title}
                  {/* Close card subtitle */}
                </h3>
                {/* Card description paragraph rendering container */}
                <p
                  // Classes for adjusting text color and line heights
                  className="text-gray-700 leading-relaxed"
                  // Typography enforcement style parameter
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Dynamic output of current iterated card description text */}
                  {card.description}
                  {/* Close description paragraph */}
                </p>
                {/* Close individual card structure */}
              </div>
              // End return block
            );
            // End map block
          })}
          {/* Close grid layout container */}
        </div>

        {/* Mobile Accordion container: visible only on mobile screens (smaller than sm) */}
        <div className="block sm:hidden space-y-4">
          {/* Iterate over cards to render expandable accordion items */}
          {cards.map((card, index) => {
            // Check if current accordion item matches openIndex state
            const isOpen = openIndex === index;
            // Get the specific icon component for current card
            const Icon = card.icon;
            // Return individual accordion container JSX
            return (
              // Use motion.div as parent container for animations
              <motion.div
                // Key required for React array mapping
                key={index}
                // Tailwind classes for card styling and hover shadow
                className="bg-[#F5F5F5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Button that acts as clickable toggle header for accordion */}
                <button
                  // Click handler to toggle open/close state of this index
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  // Styling for flex header layout spacing and hover state
                  className="w-full p-6 flex flex-col sm:flex-row items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  {/* Container for grouping icon and title horizontally */}
                  <div className="flex items-center space-x-4 w-full justify-between">
                    {/* Inner flex layout for icon and title grouping */}
                    <div className="flex items-center space-x-4">
                      {/* Circular container holding the respective card icon */}
                      <div className="bg-[#4A5D4E] shrink-0 w-12 h-12 rounded-full flex items-center justify-center">
                        {/* Render the specific icon in white */}
                        <Icon className="w-6 h-6 text-white" />
                        {/* Close icon container */}
                      </div>
                      {/* Title text for the accordion item header */}
                      <span
                        // Typography styles for header typography
                        className="text-xl text-[#2D2D2D]"
                        // Inline typography settings matching brand Playfair
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {/* Dynamic output of current iterated card title */}
                        {card.title}
                        {/* Close title span */}
                      </span>
                      {/* Close icon/title inner flex */}
                    </div>
                    {/* Motion container explicitly holding Plus/Minus expansion indicators */}
                    <motion.div
                      // State-driven rotation animation for plus/minus cross
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      // Timing curve definition for rotation
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      // Prevent shrinking in flex container
                      className="flex-shrink-0 ml-4"
                    >
                      {/* Ternary conditional resolving to icon output */}
                      {isOpen ? (
                        // Render minus icon if currently expanded
                        <Minus className="w-5 h-5 text-[#4A5D4E]" />
                      ) : (
                        // Render plus icon if currently collapsed
                        <Plus className="w-5 h-5 text-[#4A5D4E]" />
                      )}
                      {/* Close animation indicator container */}
                    </motion.div>
                    {/* Close parent flex container */}
                  </div>
                  {/* Close button wrapper */}
                </button>
                {/* Framer motion AnimatePresence handler for mount unmounting content */}
                <AnimatePresence initial={false}>
                  {/* Logical conditional gating content visibility */}
                  {isOpen && (
                    // Animated container wrapper dictating height collapse expansion
                    <motion.div
                      // Base animation state when spawning
                      initial={{ height: 0, opacity: 0 }}
                      // Final animation target when fully rendered
                      animate={{ height: 'auto', opacity: 1 }}
                      // Death state target when components unmount
                      exit={{ height: 0, opacity: 0 }}
                      // Timings applying smooth acceleration effects
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      // Overflow hide rule to clip content gracefully
                      className="overflow-hidden"
                    >
                      {/* Standard padding box surrounding description copy */}
                      <div className="px-6 pb-6 pt-2">
                        {/* Paragraph styled dynamically containing details */}
                        <p
                          // Muted text colors avoiding pure blacks
                          className="text-gray-700 leading-relaxed sm:max-w-[90%]"
                          // Match overall branding fonts
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {/* Print text description directly */}
                          {card.description}
                          {/* Close description p wrapper */}
                        </p>
                        {/* Close inner description box wrapper */}
                      </div>
                      {/* Close motion animation height handler box */}
                    </motion.div>
                  )}
                  {/* Close Framer motion logic handler */}
                </AnimatePresence>
                {/* Close root card motion division element */}
              </motion.div>
              // End return statement rendering components
            );
            // End callback executed against every cards entries
          })}
          {/* Close mobile block wrapper rendering array results */}
        </div>

        {/* Close max width aligned container */}
      </div>
      {/* Close main top level section */}
    </section>
    // Close the parent return block
  );
  // Close the parent component definition
}
