import Slider from 'react-slick'; // Importing the Slider component from react-slick library for the carousel
//
export function Gallery() { // Exporting the Gallery functional component
  const galleryImages = [ // Defining an array of objects to store gallery image data
    { // Starting a new image object
      src: 'https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWxsbmVzcyUyMHN0dWRpbyUyMGludGVyaW9yJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzMjUzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080', // Source URL for the studio interior image
      alt: 'Studio interior', // Alternative text for accessibility describing the image
    }, // Closing the first image object
    { // Starting a second image object
      src: 'https://images.unsplash.com/photo-1770221797827-839d22db4a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXIlMjBwaWVyY2luZyUyMHByb2Zlc3Npb25hbCUyMG1lZGljYWx8ZW58MXx8fHwxNzcwMzI1MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080', // Source URL for the professional piercing image
      alt: 'Professional piercing', // Alternative text for accessibility describing the image
    }, // Closing the second image object
    { // Starting a third image object
      src: 'https://images.unsplash.com/photo-1668453557069-023d287d22f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3VwdW5jdHVyZSUyMG5lZWRsZSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080', // Source URL for the acupuncture detail image
      alt: 'Acupuncture detail', // Alternative text for accessibility describing the image
    }, // Closing the third image object
    { // Starting a fourth image object
      src: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWluaW1hbGlzdCUyMGNsaW5pYyUyMHJvb218ZW58MXx8fHwxNzcwMzI1MzM5fDA&ixlib=rb-4.1.0&q=80&w=1080', // Source URL for the calm treatment room image
      alt: 'Calm treatment room', // Alternative text for accessibility describing the image
    }, // Closing the fourth image object
  ]; // Closing the galleryImages array
//
  return ( // Returning the JSX to be rendered
    <section id="gallery" className="py-20 px-6 bg-white"> // Section element with padding and white background
      <div className="max-w-6xl mx-auto"> // Container div with max width and centered via auto margins
        <h2 // Heading for the gallery section
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]" // Styling for text size, margin, alignment, and color
          style={{ fontFamily: 'Playfair Display, serif' }} // Specific font family styling for the heading
        > // Closing opening tag for h2
          Galéria // The title text in Slovak "Gallery"
        </h2> // Closing h2 tag
        <p // Paragraph tag for the section subtitle
          className="text-center text-gray-600 mb-12" // Styling for text alignment, color, and margin
          style={{ fontFamily: 'Inter, sans-serif' }} // Specific font family styling for the paragraph
        > // Closing opening tag for p
          Pohľad do nášho moderného a sterilného prostredia // Subtitle text: "A look into our modern and sterile environment"
        </p> // Closing p tag
//
        {/* Mobile: Carousel */} // Comment indicating this block is for the mobile carousel view
        <div className="md:hidden gallery-carousel"> // Div container visible only on mobile (hidden on medium screens and up)
          <Slider // Initializing the Slider component
            dots={true} // Showing navigation dots at the bottom
            infinite={true} // Enabling infinite looping of slides
            speed={500} // Setting transition speed to 500ms
            slidesToShow={1} // Showing 1 slide at a time
            slidesToScroll={1} // Scrolling 1 slide at a time
            arrows={false} // Disabling navigation arrows
            swipeToSlide={true} // Enabling swiping functionality to go to slides
            touchThreshold={10} // Setting sensitivity of touch swiping
          > // Closing opening tag for Slider
            {galleryImages.map((image, index) => ( // Mapping through images to create slide containers
              <div key={index} className="px-2 pb-10"> // Individual slide div with padding
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg"> // Image container with rounded corners and aspect ratio
                  <img // Image tag for the slide
                    src={image.src} // Setting source from the image data
                    alt={image.alt} // Setting alt text from the image data
                    className="w-full h-full object-cover" // Styling image to fill container and maintain aspect ratio
                  /> // Closing self-closing img tag
                </div> // Closing image container div
              </div> // Closing slide div
            ))} // Closing mapping function
          </Slider> // Closing Slider component tag
        </div> // Closing mobile carousel container div
//
        {/* Desktop: Grid */} // Comment indicating this block is for the desktop grid view
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6"> // Grid container hidden on mobile, 2 columns on medium, 4 on large screens
          {galleryImages.map((image, index) => ( // Mapping through images to create grid items
            <div // Container for each grid image
              key={index} // Unique key for React reconciliation
              className="relative overflow-hidden rounded-2xl aspect-[4/5] group shadow-md hover:shadow-xl transition-shadow duration-500" // Styling for corners, aspect ratio, shadows, and transitions
            > // Closing opening tag for grid item div
              <img // Image tag for the grid item
                src={image.src} // Setting source from the image data
                alt={image.alt} // Setting alt text from the image data
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" // Styling for scaling effect on hover
              /> // Closing self-closing img tag
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div> // Overlay div that darkens image on hover
            </div> // Closing grid item div
          ))} // Closing mapping function
        </div> // Closing desktop grid container div
      </div> // Closing max-width container div
    </section> // Closing gallery section
  ); // Closing return statement
} // Closing Gallery component function
