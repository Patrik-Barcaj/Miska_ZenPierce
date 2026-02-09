import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Je akupunktúrny piercing bolestivý?',
    answer: 'Väčšina klientov pociťuje len krátke uštipnutie pri aplikácii. Po zákroku môže byť ucho pár hodín citlivé, ale nejde o intenzívnu bolesť.'
  },
  {
    question: 'Kedy pocítim prvé účinky?',
    answer: 'Individuálne. Niektorí klienti pociťujú úľavu takmer okamžite, u iných sa účinok dostaví po 2-3 týždňoch od aplikácie.'
  },
  {
    question: 'Ako sa mám o piercing starať?',
    answer: 'Dôležitá je hygiena. Odporúčame čistiť fyziologickým roztokom 2x denne, vyhnúť sa spaniu na danej strane aspoň 2 týždne a nechytať piercing špinavými rukami.'
  },
  {
    question: 'Môžem mať viac piercingov naraz?',
    answer: 'Áno, je to možné. Odporúčame však začať jedným, aby sme vedeli presne vyhodnotiť jeho účinok na vaše symptómy.'
  },
  {
    question: 'Čo ak sa mi bod nepodarí trafiť?',
    answer: 'Používame špeciálne pero na lokalizáciu akupunktúrneho bodu, ktoré meria kožný odpor. To nám zaručuje vysokú presnosť aplikácie.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-3xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Často kladené otázky
        </h2>
        <p 
          className="text-center text-gray-600 mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Všetko, čo potrebujete vedieť pred vašou návštevou
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-[#2D2D2D]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#4A5D4E]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#4A5D4E]" />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
