import { Plus, Minus } from 'lucide-react'; // Importing icons for expand/collapse actions
import { useState } from 'react'; // Importing React's useState for managing selected FAQ item
import { motion, AnimatePresence } from 'framer-motion'; // Importing components from framer-motion for smooth animations
//
const faqs = [// Defining an constant array of FAQ data objects
  { // Start object for the first FAQ item
    question: 'Je akupunktúrny piercing bolestivý?', // Question text in Slovak: "Is acupuncture piercing painful?"
    answer: 'Väčšina klientov pociťuje len krátke uštipnutie pri aplikácii. Po zákroku môže byť ucho pár hodín citlivé, ale nejde o intenzívnu bolesť.' // Answer text in Slovak
  }, // Closing first FAQ object
  { // Start object for the second FAQ item
    question: 'Kedy pocítim prvé účinky?', // Question text in Slovak: "When will I feel first effects?"
    answer: 'Individuálne. Niektorí klienti pociťujú úľavu takmer okamžite, u iných sa účinok dostaví po 2-3 týždňoch od aplikácie.' // Answer text in Slovak
  }, // Closing second FAQ object
  { // Start object for the third FAQ item
    question: 'Ako sa mám o piercing starať?', // Question text in Slovak: "How to take care of piercing?"
    answer: 'Dôležitá je hygiena. Odporúčame čistiť fyziologickým roztokom 2x denne, vyhnúť sa spaniu na danej strane aspoň 2 týždne a nechytať piercing špinavými rukami.' // Answer text in Slovak
  }, // Closing third FAQ object
  { // Start object for the fourth FAQ item
    question: 'Môžem mať viac piercingov naraz?', // Question text in Slovak: "Can I have multiple piercings?"
    answer: 'Áno, je to možné. Odporúčame však začať jedným, aby sme vedeli presne vyhodnotiť jeho účinok na vaše symptómy.' // Answer text in Slovak
  }, // Closing fourth FAQ object
  { // Start object for the fifth FAQ item
    question: 'Čo ak sa mi bod nepodarí trafiť?', // Question text in Slovak: "What if the point isn't reached?"
    answer: 'Používame špeciálne pero na lokalizáciu akupunktúrneho bodu, ktoré meria kožný odpor. To nám zaručuje vysokú presnosť aplikácie.' // Answer text in Slovak
  } // Closing fifth FAQ object
]; // Closing the faqs array
//
export function FAQ() {// Exporting the FAQ functional component
  const [openIndex, setOpenIndex] = useState<number | null>(null); // State initializer to track currently opened FAQ index
  //
  return (// Returning the JSX element structure
    <section id="faq" className="py-20 px-6 bg-[#F5F5F5]">{/* Parent section with ID and background styling */}
      <div className="max-w-3xl mx-auto">{/* Main container centered with maximum width for readability */}
        <h2 // Main section title
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]" // Styling for text size, color, and centering
          style={{ fontFamily: 'Playfair Display, serif' }} // Specific font styling
        >{/* Closing opening h2 tag */}
          Často kladené otázky {/* Section title text in Slovak "Frequently asked questions" */}
        </h2>{/* Closing h2 tag */}
        <p // Short introduction text
          className="text-center text-gray-600 mb-12" // Styling for color and margin
          style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
        >{/* Closing opening p tag */}
          Všetko, čo potrebujete vedieť pred vašou návštevou {/* Intro text in Slovak */}
        </p>{/* Closing p tag */}
        <div className="space-y-4">{/* Container for vertical FAQ items with constant spacing */}
          {faqs.map((faq, index) => {// Mapping data to UI elements
            const isOpen = openIndex === index; // Boolean to check if item is currently expanded
            return (// Returning JSX for individual FAQ card
              <motion.div // Using motion div for potential block-level animations
                key={index} // Identity key for React rendering
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" // Styling for card look and hover depth
              >{/* Closing opening tag for motion.div */}
                <button // Expandable button to toggle FAQ visibility
                  onClick={() => setOpenIndex(isOpen ? null : index)} // Click handler to toggle current index or close it
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors" // Styling for layout, padding, and hover state
                >{/* Closing opening button tag */}
                  <span className="text-lg font-medium text-[#2D2D2D]" style={{ fontFamily: 'Inter, sans-serif' }}>{/* The question text within span with specific styling */}
                    {faq.question}{/* Displaying question text */}
                  </span>{/* Closing span tag */}
                  <motion.div // Animated container for icons
                    animate={{ rotate: isOpen ? 180 : 0 }} // Smooth rotation animation based on open state
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Transition parameters for rotation
                    className="flex-shrink-0" // Preventing icon compression
                  >{/* Closing opening tag for motion.div (icon container) */}
                    {isOpen ? // Conditional rendering for icons depending on state
                      <Minus className="w-5 h-5 text-[#4A5D4E]" /> // Display Minus icon if opened
                      : // Otherwise
                      <Plus className="w-5 h-5 text-[#4A5D4E]" /> // Display Plus icon if closed
                    }{/* Closing conditionalIcon injection */}
                  </motion.div>{/* Closing motion.div icon container */}
                </button>{/* Closing button tag */}
                <AnimatePresence initial={false}>{/* Utility for handling mounting/unmounting animations */}
                  {isOpen && // Conditional rendering based on expanded state
                    <motion.div // Animated wrapper for answer content
                      initial={{ height: 0, opacity: 0 }} // Start animation properties
                      animate={{ height: 'auto', opacity: 1 }} // Target animation properties
                      exit={{ height: 0, opacity: 0 }} // Final animation properties when removing
                      transition={{ duration: 0.3, ease: "easeInOut" }} // Transition time and curve
                      className="overflow-hidden" // Ensuring smooth clipping during height changes
                    >{/* Closing opening tag for motion.div (content wrapper) */}
                      <div className="px-6 pb-6">{/* Inner container with padding for content spacing */}
                        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{/* Answer text styles for readability */}
                          {faq.answer}{/* Displaying answer text */}
                        </p>{/* Closing p tag */}
                      </div>{/* Closing inner div wrapper */}
                    </motion.div> // Closing motion.div answer wrapper
                  }{/* Closing logical check for expanded state show/hide */}
                </AnimatePresence>{/* Closing AnimatePresence helper */}
              </motion.div> // Closing individual FAQ motion.div card
            ); // Closing return statement for map
          })}{/* Closing mapped loop function */}
        </div>{/* Closing FAQ items list div */}
      </div>{/* Closing centering container div */}
    </section> // Closing section
  ); // Closing return statement
} // Closing FAQ component function
//