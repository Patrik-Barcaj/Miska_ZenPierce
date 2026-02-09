import { Check } from 'lucide-react';
import Slider from 'react-slick';

export function PriceGallery() {
  const services = [
    {
      name: 'Daith Piercing',
      price: '65 €',
      deposit: true,
      description: 'Na migrénu a úzkosť',
    },
    {
      name: 'Tragus Piercing',
      price: '55 €',
      deposit: true,
      description: 'Na stres a bolesti hlavy',
    },
    {
      name: 'Conch Piercing',
      price: '60 €',
      deposit: true,
      description: 'Na chronickú bolesť',
    },
    {
      name: 'Helix Piercing',
      price: '50 €',
      deposit: true,
      description: 'Na celkovú rovnováhu',
    },
    {
      name: 'Konzultácia',
      price: '15 €',
      deposit: false,
      description: 'Individuálne posúdenie',
    },
    {
      name: 'Výmena šperku',
      price: '20 €',
      deposit: false,
      description: 'Po zahojení',
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        {/* Price List */}
        <div>
          <h2
            className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Cenník
          </h2>
          <p
            className="text-center text-gray-600 mb-12"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Transparentné ceny zahŕňajúce šperky a poradenstvo
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4A5D4E] transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-xl text-[#2D2D2D]"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.name}
                  </h3>
                  <span
                    className="text-2xl text-[#4A5D4E] font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {service.price}
                  </span>
                </div>
                <p
                  className="text-sm text-gray-600 mb-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {service.description}
                </p>
                {service.deposit && (
                  <div className="flex items-center gap-2 text-xs text-[#4A5D4E]">
                    <Check className="w-4 h-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Záloha vyžadovaná</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
