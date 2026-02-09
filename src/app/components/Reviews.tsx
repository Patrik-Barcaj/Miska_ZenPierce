import { Star, Quote } from 'lucide-react';
import Slider from 'react-slick';

export function Reviews() {
  const reviews = [
    {
      name: 'Mária K.',
      rating: 5,
      text: 'Po rokoch migréna konečne našla úľavu. Profesionálny prístup, sterilné prostredie a milý personál. Daith piercing mi zmenil život.',
      date: 'Január 2026',
    },
    {
      name: 'Peter S.',
      rating: 5,
      text: 'Najlepšie rozhodnutie! Piercing tragus mi pomohol s chronickým stresom a bolesťami hlavy. Odporúčam každému.',
      date: 'December 2025',
    },
    {
      name: 'Lucia T.',
      rating: 5,
      text: 'Úžasný zážitok od začiatku do konca. Konzultácia bola dôkladná, zákrok bezbolestný a výsledky prekročili očakávania. Ďakujem!',
      date: 'November 2025',
    },
    {
      name: 'Tomáš B.',
      rating: 5,
      text: 'Trpel som nespavosťou a úzkosťou. Po akupunktúrnom piercingu sa môj spánok zlepšil a cítim sa vyrovnanejšie. Veľká vďaka!',
      date: 'Oktober 2025',
    },
  ];

  return (
    <section id="reviews" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Čo hovoria naši klienti
        </h2>
        <p
          className="text-center text-gray-600 mb-8"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Skutočné skúsenosti od spokojných klientov
        </p>

        {/* Mobile: Carousel */}
        <div className="md:hidden reviews-carousel">
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
            {reviews.map((review, index) => (
              <div key={index} className="px-2">
                <div className="bg-[#F5F5F5] p-6 rounded-xl relative">
                  <Quote className="absolute top-4 right-4 w-6 h-6 text-[#4A5D4E]/20" />
                  
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#4A5D4E] text-[#4A5D4E]" />
                    ))}
                  </div>

                  <p
                    className="text-gray-700 mb-4 leading-relaxed text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {review.text}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span
                      className="font-medium text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {review.name}
                    </span>
                    <span
                      className="text-xs text-gray-500"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] p-8 rounded-xl relative hover:shadow-lg transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#4A5D4E]/20" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#4A5D4E] text-[#4A5D4E]" />
                ))}
              </div>

              <p
                className="text-gray-700 mb-6 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {review.text}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className="font-medium text-[#2D2D2D]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {review.name}
                </span>
                <span
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
