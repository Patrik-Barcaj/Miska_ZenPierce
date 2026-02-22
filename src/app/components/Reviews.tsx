import { Star, Quote } from 'lucide-react'; // Importing Star and Quote icons from Lucide library
import Slider from 'react-slick'; // Importing Slider component for the mobile reviews carousel
//
export function Reviews() { // Exporting the Reviews functional component
  const reviews = [ // Defining an constant list of customer review objects
    { // Initial review data object item
      name: 'Mária K.', // Name of the customer who provided the review
      rating: 5, // Star rating value (out of 5)
      text: 'Po rokoch migréna konečne našla úľavu. Profesionálny prístup, sterilné prostredie a milý personál. Daith piercing mi zmenil život.', // Slovak review text
      date: 'Január 2026', // Timeframe of the review
    }, // Closing first review object
    { // details for the second review
      name: 'Peter S.', // Reviewer name
      rating: 5, // Rating
      text: 'Najlepšie rozhodnutie! Piercing tragus mi pomohol s chronickým stresom a bolesťami hlavy. Odporúčam každému.', // Slovak review text
      date: 'December 2025', // Date of review
    }, // Closing second review object
    { // details for the third review
      name: 'Lucia T.', // Reviewer name
      rating: 5, // Rating
      text: 'Úžasný zážitok od začiatku do konca. Konzultácia bola dôkladná, zákrok bezbolestný a výsledky prekročili očakávania. Ďakujem!', // Slovak review text
      date: 'November 2025', // Date of review
    }, // Closing third review object
    { // details for the fourth review
      name: 'Tomáš B.', // Reviewer name
      rating: 5, // Rating
      text: 'Trpel som nespavosťou a úzkosťou. Po akupunktúrnom piercingu sa môj spánok zlepšil a cítim sa vyrovnanejšie. Veľká vďaka!', // Slovak review text
      date: 'Oktober 2025', // Date of review
    }, // Closing fourth review object
  ]; // Closing the reviews array
//
  return ( // Returning the visual section for client feedback
    <section id="reviews" className="py-20 px-6 bg-white"> // Main section with identifier and base styling
      <div className="max-w-6xl mx-auto"> // Main centering maximum-width container
        <h2 // Main section title element
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]" // heading text styling for size/alignment/color
          style={{ fontFamily: 'Playfair Display, serif' }} // Specific header font style
        > // Closing opening tag for h2
          Čo hovoria naši klienti // Section title text labels Slovak "What our clients say"
        </h2> // Closing h2 tag
        <p // Supporting introduction paragraph
          className="text-center text-gray-600 mb-8" // centered subtle text with bottom margin
          style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
        > // Closing opening tag for p
          Skutočné skúsenosti od spokojných klientov // Intro text labels Slovak "Real experiences from satisfied clients"
        </p> // Closing p tag
//
        {/* Mobile: Carousel */} // Internal label for mobile-only logic
        <div className="md:hidden reviews-carousel"> // Container visible only on mobile screens (hidden from medium up)
          <Slider // Initializing the slick slider component
            dots={true} // showing navigation dots
            infinite={true} // enabling infinite sliding loop
            speed={500} // transition speed constant in milliseconds
            slidesToShow={1} // how many slides visible at once
            slidesToScroll={1} // how many slides to advance per swipe
            arrows={false} // disabling next/prev arrows for mobile UX
            swipeToSlide={true} // allowing direct tracking of swipes
            touchThreshold={10} // setting swipe sensitivity
          > // Closing opening slider tag
            {reviews.map((review, index) => ( // mapping through reviews list for carousel items
              <div key={index} className="px-2"> // individual slide slide item wrapper with padding
                <div className="bg-[#F5F5F5] p-6 rounded-xl relative"> // inner card with background and relative positioning for icon
                  <Quote className="absolute top-4 right-4 w-6 h-6 text-[#4A5D4E]/20" /> // Decorative watermarked quote icon
//                  
                  <div className="flex gap-1 mb-3"> // horizontal container for star icons with gap
                    {Array.from({ length: review.rating }).map((_, i) => ( // creating an array of star entries based on specific rating
                      <Star key={i} className="w-4 h-4 fill-[#4A5D4E] text-[#4A5D4E]" /> // rendering individual filled star icon
                    ))} // closing star loop
                  </div> // closing stars container div
//
                  <p // review text paragraph
                    className="text-gray-700 mb-4 leading-relaxed text-sm" // mobile text styling for size and readability
                    style={{ fontFamily: 'Inter, sans-serif' }} // standard font styling
                  > // Closing opening tag for p
                    {review.text} // displaying specific customer feedback
                  </p> // Closing review text p tag
//
                  <div className="flex justify-between items-center text-sm"> // Bottom info container for name and date
                    <span // Reviewer name highlight
                      className="font-medium text-[#2D2D2D]" // Bold highlight for the name
                      style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
                    > // Closing opening tag for span
                      {review.name} // displaying reviewer name
                    </span> // Closing name span tag
                    <span // specific timeframe of the feedback
                      className="text-xs text-gray-500" // subtle small text for the date
                      style={{ fontFamily: 'Inter, sans-serif' }} // Standard font styling
                    > // Closing opening tag for span
                      {review.date} // displaying the review date
                    </span> // Closing date span tag
                  </div> // Closing bottom flex div
                </div> // Closing inner card div
              </div> // Closing slide div
            ))} // Closing mapping function
          </Slider> // Closing the Slider component tag
        </div> // Closing mobile carousel container div
//
        {/* Desktop: Grid */} // Internal label for desktop-only grid layout logic
        <div className="hidden md:grid md:grid-cols-2 gap-6"> // Grid container hidden on mobile, 2 columns on medium up
          {reviews.map((review, index) => ( // mapping through reviews for static grid items
            <div // individual grid item card wrapper
              key={index} // unique React rendering key
              className="bg-[#F5F5F5] p-8 rounded-xl relative hover:shadow-lg transition-shadow" // card styling for look and hover effect
            > // Closing opening div tag for grid item
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#4A5D4E]/20" /> // Decorative quote icon positioned absolutely
//              
              <div className="flex gap-1 mb-4"> // horizontal container for star ratings
                {Array.from({ length: review.rating }).map((_, i) => ( // mapping star elements
                  <Star key={i} className="w-5 h-5 fill-[#4A5D4E] text-[#4A5D4E]" /> // individual rendered star with desktop scaling
                ))} // closing star loop
              </div> // closing stars container div
//
              <p // main feedback text paragraph element
                className="text-gray-700 mb-6 leading-relaxed" // descriptive styling for readability on desktop
                style={{ fontFamily: 'Inter, sans-serif' }} // standard font selection
              > // Closing opening tag for p
                {review.text} // displaying individual feedback content
              </p> // Closing review p tag
//
              <div className="flex justify-between items-center"> // bottom metadata container for user and time
                <span // user name text marker
                  className="font-medium text-[#2D2D2D]" // highlighting style for name
                  style={{ fontFamily: 'Inter, sans-serif' }} // standard font
                > // Closing opening tag for span
                  {review.name} // name display logic
                </span> // closing user span tag
                <span // time metadata text marker
                  className="text-sm text-gray-500" // subtle styling for secondary info
                  style={{ fontFamily: 'Inter, sans-serif' }} // standard font
                > // Closing opening tag for span
                  {review.date} // date display logic
                </span> // closing date span tag
              </div> // closing bottom metadata div
            </div> // closing grid item individual div container
          ))} // closing mapping function
        </div> // closing desktop grid div container
      </div> // closing main centering container
    </section> // closing reviews section tag
  ); // closing return statement
} // closing Reviews functional component block
//
