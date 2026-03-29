// Import the Check icon from lucide-react for the deposit required indicator
import { Check } from 'lucide-react';
// Import the Slider component from react-slick for the mobile gallery carousel
import Slider from 'react-slick';

// Export the PriceGallery functional component layout
export function PriceGallery() {
  // Define an array of objects representing the available piercing services
  const services = [
    // First service definition
    {
      // Name of the service
      name: 'Daith Piercing',
      // Cost of the service
      price: '65 €',
      // Boolean indicating if a deposit is required
      deposit: true,
      // Short description of the service benefits
      description: 'Na migrénu a úzkosť',
      // End first service
    },
    // Second service definition
    {
      // Name of the service
      name: 'Tragus Piercing',
      // Cost of the service
      price: '55 €',
      // Boolean indicating if a deposit is required
      deposit: true,
      // Short description of the service benefits
      description: 'Na stres a bolesti hlavy',
      // End second service
    },
    // Third service definition
    {
      // Name of the service
      name: 'Conch Piercing',
      // Cost of the service
      price: '60 €',
      // Boolean indicating if a deposit is required
      deposit: true,
      // Short description of the service benefits
      description: 'Na chronickú bolesť',
      // End third service
    },
    // Fourth service definition
    {
      // Name of the service
      name: 'Helix Piercing',
      // Cost of the service
      price: '50 €',
      // Boolean indicating if a deposit is required
      deposit: true,
      // Short description of the service benefits
      description: 'Na celkovú rovnováhu',
      // End fourth service
    },
    // Fifth service definition
    {
      // Name of the service
      name: 'Konzultácia',
      // Cost of the service
      price: '15 €',
      // Boolean indicating if a deposit is required
      deposit: false,
      // Short description of the service benefits
      description: 'Individuálne posúdenie',
      // End fifth service
    },
    // Sixth service definition
    {
      // Name of the service
      name: 'Výmena šperku',
      // Cost of the service
      price: '20 €',
      // Boolean indicating if a deposit is required
      deposit: false,
      // Short description of the service benefits
      description: 'Po zahojení',
      // End sixth service
    },
    // End services array
  ];

  // Define an array of objects representing the gallery images
  const galleryImages = [
    // First gallery image definition
    {
      // Source URL for the image
      src: 'https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      // Alternative text for accessibility
      alt: 'Studio interior',
      // End first gallery image
    },
    // Second gallery image definition
    {
      // Source URL for the image
      src: 'https://images.unsplash.com/photo-1770221797827-839d22db4a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXIlMjBwaWVyY2luZyUyMHByb2Zlc3Npb25hbCUyMG1lZGljYWx8ZW58MXx8fHwxNzcwMzI1MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      // Alternative text for accessibility
      alt: 'Professional piercing',
      // End second gallery image
    },
    // Third gallery image definition
    {
      // Source URL for the image
      src: 'https://images.unsplash.com/photo-1668453557069-023d287d22f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3VwdW5jdHVyZSUyMG5lZWRsZSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      // Alternative text for accessibility
      alt: 'Acupuncture detail',
      // End third gallery image
    },
    // Fourth gallery image definition
    {
      // Source URL for the image
      src: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWluaW1hbGlzdCUyMGNsaW5pYyUyMHJvb218ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      // Alternative text for accessibility
      alt: 'Calm treatment room',
      // End fourth gallery image
    },
    // End gallery images array
  ];

  // Return the JSX layout structure
  return (
    // Top level section element with padding and background color
    <section className="py-20 px-6 bg-[#F5F5F5]">
      {/* Maximum width container, horizontally centered */}
      <div className="max-w-6xl mx-auto">
        {/* Price List section container with navigation anchor ID and scroll margin to prevent navbar overlap */}
        <div id="cennik" className="scroll-mt-24 mb-16">
          {/* Main section heading for the price list */}
          <h2
            // CSS classes for text sizing, alignment, and color
            className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
            // Inline style enforcing Playfair Display font family
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {/* Main heading text */}
            Cenník
            {/* Close main heading */}
          </h2>
          {/* Subtitle paragraph adding more context for the prices */}
          <p
            // CSS classes for text alignment, color, and margin
            className="text-center text-gray-600 mb-12"
            // Inline style enforcing Inter font family
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Subtitle paragraph text */}
            Transparentné ceny zahŕňajúce šperky a poradenstvo
            {/* Close subtitle paragraph */}
          </p>

          {/* Mobile view rendering block: Carousel implementation for price list */}
          <div className="md:hidden price-carousel pb-8">
            {/* Initialize the react-slick Slider component with configuration options */}
            <Slider
              // Enable pagination dots
              dots={true}
              // Enable infinite scrolling loop
              infinite={true}
              // Set transition speed in milliseconds
              speed={500}
              // Number of slides to show simultaneously
              slidesToShow={1}
              // Number of slides to scroll per action
              slidesToScroll={1}
              // Disable previous/next arrow buttons
              arrows={false}
              // Enable swipe action to navigate slides
              swipeToSlide={true}
              // Set touch threshold for swipe sensitivity
              touchThreshold={10}
            >
              {/* Map iteration over services array for carousel items */}
              {services.map((service, index) => (
                // Individual slide container with unique key and padding to prevent shadow clipping
                <div key={index} className="px-2 py-2">
                  {/* Individual service container card for mobile slider */}
                  <div
                    // Dynamic class composition setting background, padding, border, and hover effects
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4A5D4E] transition-all hover:shadow-md"
                  >
                    {/* Header flex container for the service name and price */}
                    <div className="flex justify-between items-start mb-2">
                      {/* Service name heading element */}
                      <h3
                        // Text styling and coloring
                        className="text-xl text-[#2D2D2D]"
                        // Typography enforcement style parameter
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {/* Dynamic output of current iterated service name */}
                        {service.name}
                        {/* Close service name heading */}
                      </h3>
                      {/* Service price text element */}
                      <span
                        // Text styling, sizing, and coloring
                        className="text-2xl text-[#4A5D4E] font-semibold"
                        // Typography enforcement style parameter
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {/* Dynamic output of current iterated service price */}
                        {service.price}
                        {/* Close service price text */}
                      </span>
                      {/* Close header flex container */}
                    </div>
                    {/* Service description paragraph element */}
                    <p
                      // Classes for adjusting text color, size, and bottom margin
                      className="text-sm text-gray-600 mb-3"
                      // Typography enforcement style parameter
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {/* Dynamic output of current iterated service description text */}
                      {service.description}
                      {/* Close description paragraph */}
                    </p>
                    {/* Conditional render for the deposit required indicator */}
                    {service.deposit && (
                      // Flex container for the deposit indicator icon and text
                      <div className="flex items-center gap-2 text-xs text-[#4A5D4E]">
                        {/* Render the Check icon with specific sizing */}
                        <Check className="w-4 h-4" />
                        {/* Deposit required text element with typography style */}
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Záloha vyžadovaná</span>
                        {/* Close deposit indicator container */}
                      </div>
                      // End conditional render
                    )}
                    {/* Close individual service card structure */}
                  </div>
                  {/* Close slide wrapper div */}
                </div>
                // End map block implicit return
              ))}
              {/* Close Slider component */}
            </Slider>
            {/* Close mobile view rendering block */}
          </div>

          {/* Desktop view rendering block: Grid container defining the layout rules for the service cards with responsive columns */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map iteration over the services array to render elements dynamically */}
            {services.map((service, index) => (
              // Individual service container card
              <div
                // Unique key assignment required by React mapping
                key={index}
                // Dynamic class composition setting background, padding, border, and hover effects
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4A5D4E] transition-all hover:shadow-md flex flex-col"
              >
                {/* Header flex container for the service name and price */}
                <div className="flex justify-between items-start mb-2">
                  {/* Service name heading element */}
                  <h3
                    // Text styling and coloring
                    className="text-xl text-[#2D2D2D]"
                    // Typography enforcement style parameter
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {/* Dynamic output of current iterated service name */}
                    {service.name}
                    {/* Close service name heading */}
                  </h3>
                  {/* Service price text element */}
                  <span
                    // Text styling, sizing, and coloring
                    className="text-2xl text-[#4A5D4E] font-semibold flex-shrink-0 ml-4"
                    // Typography enforcement style parameter
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {/* Dynamic output of current iterated service price */}
                    {service.price}
                    {/* Close service price text */}
                  </span>
                  {/* Close header flex container */}
                </div>
                {/* Service description paragraph element */}
                <p
                  // Classes for adjusting text color, size, and bottom margin
                  className="text-sm text-gray-600 mb-3 flex-grow"
                  // Typography enforcement style parameter
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Dynamic output of current iterated service description text */}
                  {service.description}
                  {/* Close description paragraph */}
                </p>
                {/* Conditional render for the deposit required indicator */}
                {service.deposit && (
                  // Flex container for the deposit indicator icon and text
                  <div className="flex items-center gap-2 text-xs text-[#4A5D4E] mt-auto">
                    {/* Render the Check icon with specific sizing */}
                    <Check className="w-4 h-4" />
                    {/* Deposit required text element with typography style */}
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Záloha vyžadovaná</span>
                    {/* Close deposit indicator container */}
                  </div>
                  // End conditional render
                )}
                {/* Close individual service card structure */}
              </div>
              // End map block implicit return
            ))}
            {/* Close grid layout container */}
          </div>
          {/* Close price list section container */}
        </div>

        {/* Gallery section container with navigation anchor ID and scroll margin to prevent navbar overlap */}
        <div id="galeria" className="scroll-mt-24">
          {/* Main heading for the gallery section */}
          <h2
            // CSS classes for text sizing, alignment, and color
            className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
            // Inline style enforcing Playfair Display font family
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {/* Gallery heading text */}
            Naše štúdio
            {/* Close gallery heading */}
          </h2>
          {/* Subtitle paragraph adding context for the gallery */}
          <p
            // CSS classes for text alignment, color, and margin
            className="text-center text-gray-600 mb-8"
            // Inline style enforcing Inter font family
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Subtitle text */}
            Moderné, sterilné prostredie navrhnuté pre vaše pohodlie
            {/* Close subtitle paragraph */}
          </p>

          {/* Mobile view rendering block: Carousel implementation */}
          <div className="md:hidden gallery-carousel">
            {/* Initialize the react-slick Slider component with configuration options */}
            <Slider
              // Enable pagination dots
              dots={true}
              // Enable infinite scrolling loop
              infinite={true}
              // Set transition speed in milliseconds
              speed={500}
              // Number of slides to show simultaneously
              slidesToShow={1}
              // Number of slides to scroll per action
              slidesToScroll={1}
              // Disable previous/next arrow buttons
              arrows={false}
              // Enable swipe action to navigate slides
              swipeToSlide={true}
              // Set touch threshold for swipe sensitivity
              touchThreshold={10}
            >
              {/* Map iteration over galleryImages array for carousel items */}
              {galleryImages.map((image, index) => (
                // Individual slide container with unique key
                <div key={index} className="px-2">
                  {/* Wrapper for the image applying rounded corners and aspect ratio */}
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    {/* Image rendering element */}
                    <img
                      // Set image source URL
                      src={image.src}
                      // Set alternative text for accessibility
                      alt={image.alt}
                      // Classes for full width/height and crop behavior
                      className="w-full h-full object-cover"
                    // Close image tag
                    />
                    {/* Close image wrapper */}
                  </div>
                  {/* Close slide container */}
                </div>
                // End map block implicit return
              ))}
              {/* Close Slider component */}
            </Slider>
            {/* Close mobile carousel container */}
          </div>

          {/* Desktop view rendering block: Grid layout implementation */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            {/* Map iteration over galleryImages array for grid items */}
            {galleryImages.map((image, index) => (
              // Individual image container cell with unique key and hover group styling
              <div
                // Key assignment for React mapping
                key={index}
                // Classes for rounded corners, aspect ratio, overflow, and relative positioning
                className="relative overflow-hidden rounded-xl aspect-[4/3] group"
              >
                {/* Image rendering element within grid */}
                <img
                  // Set image source URL
                  src={image.src}
                  // Set alternative text for accessibility
                  alt={image.alt}
                  // Classes for object covering and interactive zoom transform on hover
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                // Close grid image element
                />
                {/* Overlay element applying a slight dark tint when hovered */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                {/* Close individual grid image container */}
              </div>
              // End map block implicit return
            ))}
            {/* Close desktop grid container */}
          </div>
          {/* Close gallery section container */}
        </div>
        {/* Close max width aligned container */}
      </div>
      {/* Close main top level section */}
    </section>
    // Close the parent return block
  );
  // Close the parent component definition
}
