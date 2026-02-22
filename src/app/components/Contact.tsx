import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'; // Importing relevant icons from lucide-react
//
export function Contact() { // Exporting the Contact functional component
  return ( // Returning the JSX structure
    <section id="contact" className="py-24 px-6 bg-[#F5F5F5]"> // Section element with ID 'contact' and gray background
      <div className="max-w-7xl mx-auto"> // Main container centered with maximum width
        <div className="grid lg:grid-cols-2 gap-16 items-start"> // Two-column grid on large screens with wide gap
          {/* Contact Information */} // Comment for organizers: details of the contact info section
          <div> // Container div for the left side (Contact Information)
            <h2 // Main heading for the contact section
              className="text-4xl md:text-5xl mb-8 text-[#2D2D2D]" // Styling for font size, margin and color
              style={{ fontFamily: 'Playfair Display, serif' }} // Applying specific font family style
            > // Closing h2 opening tag
              Kontaktujte nás // Heading text in Slovak: "Contact us"
            </h2> // Closing h2 tag
            <p className="text-gray-600 mb-12 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}> // Paragraph for introduction with specific font styling and margin
              Radi vám odpovieme na všetky vaše otázky. Nájdete nás v centre Lučenca, hneď pri hlavnom mestskom parku. // Informative text in Slovak
            </p> // Closing p tag
//
            <div className="space-y-8"> // Vertical list container with spacing between items
              <div className="flex gap-6 items-start"> // Individual contact info item container (Address)
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"> // Icon container with background, rounding, and shadow
                  <MapPin className="w-6 h-6 text-[#4A5D4E]" /> // MapPin icon with primary color
                </div> // Closing icon container div
                <div> // Text container for address details
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Adresa</h4> // Subtitle text: "Address"
                  <p className="text-gray-600">Cintorínska 12, 984 01 Lučenec</p> // Actual address text
                </div> // Closing text container div
              </div> // Closing flex container div
//
              <div className="flex gap-6 items-start"> // Individual contact info item container (Phone)
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"> // Icon container with background, rounding, and shadow
                  <Phone className="w-6 h-6 text-[#4A5D4E]" /> // Phone icon with primary color
                </div> // Closing icon container div
                <div> // Text container for phone details
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Telefón</h4> // Subtitle text: "Phone"
                  <p className="text-gray-600">+421 944 123 456</p> // Actual phone number text
                </div> // Closing text container div
              </div> // Closing flex container div
//
              <div className="flex gap-6 items-start"> // Individual contact info item container (Email)
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"> // Icon container with background, rounding, and shadow
                  <Mail className="w-6 h-6 text-[#4A5D4E]" /> // Mail icon with primary color
                </div> // Closing icon container div
                <div> // Text container for email details
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">E-mail</h4> // Subtitle text: "E-mail"
                  <p className="text-gray-600">info@acupierce.sk</p> // Actual email address text
                </div> // Closing text container div
              </div> // Closing flex container div
//
              <div className="flex gap-6 items-start"> // Individual contact info item container (Opening Hours)
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0"> // Icon container with background, rounding, and shadow
                  <Clock className="w-6 h-6 text-[#4A5D4E]" /> // Clock icon with primary color
                </div> // Closing icon container div
                <div> // Text container for hour details
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Otváracie hodiny</h4> // Subtitle text: "Opening Hours"
                  <p className="text-gray-600">Po - Pi: 09:00 - 18:00</p> // Weekday hours text
                  <p className="text-gray-600">So: Na objednávku</p> // Saturday hours text
                </div> // Closing text container div
              </div> // Closing flex container div
            </div> // Closing vertical list container div
//
            <div className="mt-12 flex gap-4"> // Container for social media links with margin and gap
              <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2D2D2D] hover:bg-[#4A5D4E] hover:text-white transition-all"> // Anchor for Instagram link with background, shadow, and hover transition
                <Instagram className="w-6 h-6" /> // Instagram icon
              </a> // Closing anchor tag
              <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2D2D2D] hover:bg-[#4A5D4E] hover:text-white transition-all"> // Anchor for Facebook link with background, shadow, and hover transition
                <Facebook className="w-6 h-6" /> // Facebook icon
              </a> // Closing anchor tag
            </div> // Closing social links container div
          </div> // Closing left side container div (Contact Information)
//
          {/* Map / Visual Element */} // Comment for organizers: details of the visual map embed
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]"> // Container for iframe with rounding, shadow, and responsive height/aspect ratio
            <iframe // Iframe element for Google Map embed
              src="https://www.google.com/maps?q=Cintor%C3%ADnska%2012,%20Lu%C4%8Denec&output=embed" // URL source for the map location
              width="100%" // Setting width to fill the container
              height="100%" // Setting height to fill the container
              style={{ border: 0 }} // Removing iframe border styling
              allowFullScreen // Enabling full screen mode for the map
              loading="lazy" // Enabling lazy loading for performance
              referrerPolicy="no-referrer-when-downgrade" // Setting referrer policy for privacy/safety
            ></iframe> // Closing iframe tag
          </div> // Closing map container div
        </div> // Closing two-column grid div
      </div> // Closing main container div
    </section> // Closing section tag
  ); // Closing return statement
} // Closing Contact component function
//
