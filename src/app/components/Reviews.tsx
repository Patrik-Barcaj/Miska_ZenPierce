// Import Star and Quote icons from lucide-react for visual styling
import { Star, Quote } from 'lucide-react';
// Import the Slider component from react-slick for the mobile reviews carousel
import Slider from 'react-slick';

// Export the Reviews functional component layout
export function Reviews() {
  // Define an array of objects representing customer reviews
  const reviews = [
    // First review definition
    {
      // Customer name
      name: 'Mária K.',
      // Rating given out of 5
      rating: 5,
      // Review text content
      text: 'Po rokoch migréna konečne našla úľavu. Profesionálny prístup, sterilné prostredie a milý personál. Daith piercing mi zmenil život.',
      // Date of the review
      date: 'Január 2026',
      // End first review
    },
    // Second review definition
    {
      // Customer name
      name: 'Peter S.',
      // Rating given out of 5
      rating: 5,
      // Review text content
      text: 'Najlepšie rozhodnutie! Piercing tragus mi pomohol s chronickým stresom a bolesťami hlavy. Odporúčam každému.',
      // Date of the review
      date: 'December 2025',
      // End second review
    },
    // Third review definition
    {
      // Customer name
      name: 'Lucia T.',
      // Rating given out of 5
      rating: 5,
      // Review text content
      text: 'Úžasný zážitok od začiatku do konca. Konzultácia bola dôkladná, zákrok bezbolestný a výsledky prekročili očakávania. Ďakujem!',
      // Date of the review
      date: 'November 2025',
      // End third review
    },
    // Fourth review definition
    {
      // Customer name
      name: 'Tomáš B.',
      // Rating given out of 5
      rating: 5,
      // Review text content
      text: 'Trpel som nespavosťou a úzkosťou. Po Zen Piercingu sa môj spánok zlepšil a cítim sa vyrovnanejšie. Veľká vďaka!',
      // Date of the review
      date: 'Oktober 2025',
      // End fourth review
    },
    // End reviews array
  ];

  // Return the JSX layout structure
  return (
    // Top level section element with padding and white background
    <section id="recenzie" className="py-20 px-6 bg-white">
      {/* Maximum width container, horizontally centered */}
      <div className="max-w-6xl mx-auto">
        {/* Main section heading for the reviews */}
        <h2
          // CSS classes for text sizing, alignment, and color
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          // Inline style enforcing Playfair Display font family
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {/* Main heading text */}
          Čo hovoria naši klienti
          {/* Close main heading */}
        </h2>
        {/* Subtitle paragraph adding context for the reviews */}
        <p
          // CSS classes for text alignment, color, and margin
          className="text-center text-gray-600 mb-8"
          // Inline style enforcing Inter font family
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* Subtitle text */}
          Skutočné skúsenosti od spokojných klientov
          {/* Close subtitle paragraph */}
        </p>

        {/* Mobile view rendering block: Carousel implementation */}
        <div className="md:hidden reviews-carousel">
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
            {/* Map iteration over reviews array for carousel items */}
            {reviews.map((review, index) => (
              // Individual slide container with unique key
              <div key={index} className="px-2">
                {/* Review card container with background, padding, and rounded corners */}
                <div className="bg-[#F5F5F5] p-6 rounded-xl relative">
                  {/* Decorative Quote icon absolutely positioned within the card */}
                  <Quote className="absolute top-4 right-4 w-6 h-6 text-[#4A5D4E]/20" />

                  {/* Flex container for rendering star rating icons */}
                  <div className="flex gap-1 mb-3">
                    {/* Create an array based on the rating number to render stars */}
                    {Array.from({ length: review.rating }).map((_, i) => (
                      // Render individual Star icon component with styling
                      <Star key={i} className="w-4 h-4 fill-[#4A5D4E] text-[#4A5D4E]" />
                      // End inner map
                    ))}
                    {/* Close star rating container */}
                  </div>

                  {/* Review text paragraph rendering container */}
                  <p
                    // Classes for text color, margin, and sizing
                    className="text-gray-700 mb-4 leading-relaxed text-sm"
                    // Typography enforcement style parameter
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {/* Dynamic output of current iterated review text */}
                    {review.text}
                    {/* Close review text paragraph */}
                  </p>

                  {/* Flex container bridging reviewer name and date layout */}
                  <div className="flex justify-between items-center text-sm">
                    {/* Reviewer name rendering element */}
                    <span
                      // Font weight and color styling
                      className="font-medium text-[#2D2D2D]"
                      // Typography enforcement style parameter
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {/* Dynamic output of reviewer name */}
                      {review.name}
                      {/* Close reviewer name element */}
                    </span>
                    {/* Review date rendering element */}
                    <span
                      // Text size and color styling
                      className="text-xs text-gray-500"
                      // Typography enforcement style parameter
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {/* Dynamic output of review date */}
                      {review.date}
                      {/* Close review date element */}
                    </span>
                    {/* Close reviewer info flex container */}
                  </div>
                  {/* Close review card container */}
                </div>
                {/* Close slide container */}
              </div>
              // End map block implicit return
            ))}
            {/* Close Slider component */}
          </Slider>
          {/* Close mobile carousel section container */}
        </div>

        {/* Desktop view rendering block: Grid layout implementation */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Map iteration over reviews array for grid items */}
          {reviews.map((review, index) => (
            // Individual review container card layout definition
            <div
              // Key assignment for React mapping
              key={index}
              // Dynamic class composition setting background, padding, rounding, hover effects, and transitions
              className="bg-[#F5F5F5] p-8 rounded-xl relative hover:shadow-lg transition-shadow"
            >
              {/* Decorative Quote icon absolutely positioned inside grid card */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#4A5D4E]/20" />

              {/* Flex container for rendering star rating icons in grid */}
              <div className="flex gap-1 mb-4">
                {/* Create an array based on the rating number to render stars */}
                {Array.from({ length: review.rating }).map((_, i) => (
                  // Render individual Star icon component with slightly larger sizing for desktop grid
                  <Star key={i} className="w-5 h-5 fill-[#4A5D4E] text-[#4A5D4E]" />
                  // End inner map
                ))}
                {/* Close star rating container */}
              </div>

              {/* Review text paragraph rendering container for grid */}
              <p
                // Classes for text color, margin, and sizing
                className="text-gray-700 mb-6 leading-relaxed"
                // Typography enforcement style parameter
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {/* Dynamic output of current iterated review text */}
                {review.text}
                {/* Close review text paragraph */}
              </p>

              {/* Flex container bridging reviewer name and date layout for grid view */}
              <div className="flex justify-between items-center">
                {/* Reviewer name rendering element for grid */}
                <span
                  // Font weight and color styling
                  className="font-medium text-[#2D2D2D]"
                  // Typography enforcement style parameter
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Dynamic output of reviewer name */}
                  {review.name}
                  {/* Close reviewer name element */}
                </span>
                {/* Review date rendering element for grid */}
                <span
                  // Text size and color styling
                  className="text-sm text-gray-500"
                  // Typography enforcement style parameter
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Dynamic output of review date */}
                  {review.date}
                  {/* Close review date element */}
                </span>
                {/* Close reviewer info flex container */}
              </div>
              {/* Close review grid card container */}
            </div>
            // End map block implicit return
          ))}
          {/* Close desktop grid section container */}
        </div>
        {/* Close max width aligned container */}
      </div>
      {/* Close main top level section */}
    </section>
    // Close the parent return block
  );
  // Close the parent component definition
}
