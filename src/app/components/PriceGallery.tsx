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

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Studio interior',
    },
    {
      src: 'https://images.unsplash.com/photo-1770221797827-839d22db4a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXIlMjBwaWVyY2luZyUyMHByb2Zlc3Npb25hbCUyMG1lZGljYWx8ZW58MXx8fHwxNzcwMzI1MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Professional piercing',
    },
    {
      src: 'https://images.unsplash.com/photo-1668453557069-023d287d22f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3VwdW5jdHVyZSUyMG5lZWRsZSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Acupuncture detail',
    },
    {
      src: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWluaW1hbGlzdCUyMGNsaW5pYyUyMHJvb218ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Calm treatment room',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        {/* Price List */}
        <div className="mb-16">
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

        {/* Gallery */}
        <div>
          <h2
            className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Naše štúdio
          </h2>
          <p
            className="text-center text-gray-600 mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Moderné, sterilné prostredie navrhnuté pre vaše pohodlie
          </p>

          {/* Mobile: Carousel */}
          <div className="md:hidden gallery-carousel">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              swipeToSlide={true}
              touchThreshold={10}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="px-2">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl aspect-[4/3] group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
