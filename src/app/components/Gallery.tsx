import Slider from 'react-slick';

export function Gallery() {
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
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Galéria
        </h2>
        <p
          className="text-center text-gray-600 mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Pohľad do nášho moderného a sterilného prostredia
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
              <div key={index} className="px-2 pb-10">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl aspect-[4/5] group shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
