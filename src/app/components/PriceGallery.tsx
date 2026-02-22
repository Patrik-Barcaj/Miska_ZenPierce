import { Check } from 'lucide-react'; // Importing positive confirmation icon Check from library
//
export function PriceGallery() { // Exporting component for displaying services and their prices
  const services = [ // Initializing a constant list of service items
    { // details for the Daith Piercing service
      name: 'Daith Piercing', // Display name of service item
      price: '65 €', // Cost for this specific piercing
      deposit: true, // Boolean flag to indicate if deposit is needed
      description: 'Na migrénu a úzkosť', // Description indicating target health benefits in Slovak
    }, // Closing first service object
    { // details for Tragus Piercing
      name: 'Tragus Piercing', // Service name
      price: '55 €', // Cost
      deposit: true, // Deposit required
      description: 'Na stres a bolesťi hlavy', // Health benefits description in Slovak
    }, // Closing second service object
    { // details for Conch Piercing
      name: 'Conch Piercing', // Service name
      price: '60 €', // Cost
      deposit: true, // Deposit required
      description: 'Na chronickú bolesť', // Health benefit description in Slovak
    }, // Closing third service object
    { // details for Helix Piercing
      name: 'Helix Piercing', // Service name
      price: '50 €', // Cost
      deposit: true, // Deposit required
      description: 'Na celkovú rovnováhu', // Health benefit description in Slovak
    }, // Closing fourth service object
    { // details for a basic Consultation
      name: 'Konzultácia', // Service name in Slovak: "Consultation"
      price: '15 €', // Cost
      deposit: false, // No deposit needed for this
      description: 'Individuálne posúdenie', // Description labels Slovak "Individual assessment"
    }, // Closing fifth service object
    { // details for Jewelry Replacement service
      name: 'Výmena šperku', // Service name in Slovak: "Jewelry change"
      price: '20 €', // Cost
      deposit: false, // No deposit needed
      description: 'Po zahojení', // Timing requirement in Slovak: "After healing"
    }, // Closing sixth service object
  ]; // Closing services array declaration
//
  return ( // Returning the visual structure for the pricing section
    <section id="pricing" className="py-20 px-6 bg-[#F5F5F5]"> // Parent section with anchor ID for navigation and styling
      <div className="max-w-6xl mx-auto"> // centering container with fixed maximum width
        {/* Price List */} // Internal label for section logic
        <div> // Wrapper container for pricing elements
          <h2 // Main section heading element
            className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]" // heading text styling for size/color alignment
            style={{ fontFamily: 'Playfair Display, serif' }} // Specific header font style
          > // Closing opening tag for h2
            Cenník // Section title in Slovak "Price list"
          </h2> // Closing h2 tag
          <p // Description paragraph text
            className="text-center text-gray-600 mb-12" // centered gray text with bottom margin
            style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
          > // Closing opening tag for p
            Transparentné ceny zahŕňajúce šperky a poradenstvo // Description text labels Slovak "Transparent prices including jewelry and advice"
          </p> // Closing p tag
//
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"> // responsive grid layout for service items
            {services.map((service, index) => ( // Mapping through services to render list cards
              <div // Individual service card container
                key={index} // Unique key for react renderer
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#4A5D4E] transition-all hover:shadow-md" // Styling for looks, borders, and hover depth
              > // Closing opening tag for service card
                <div className="flex justify-between items-start mb-2"> // Flex container to place name and price at extremes
                  <h3 // Service name heading
                    className="text-xl text-[#2D2D2D]" // Specific card header styling
                    style={{ fontFamily: 'Playfair Display, serif' }} // Specific font styling
                  > // Closing opening tag for h3
                    {service.name} // Displaying current service item name
                  </h3> // Closing h3 tag
                  <span // Price display element
                    className="text-2xl text-[#4A5D4E] font-semibold" // highlighting color and size for the price
                    style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
                  > // Closing opening tag for span
                    {service.price} // Displaying current service cost
                  </span> // Closing price span tag
                </div> // Closing name/price flex div
                <p // service description text paragraph
                  className="text-sm text-gray-600 mb-3" // Small subtle text for detail
                  style={{ fontFamily: 'Inter, sans-serif' }} // Standard body font
                > // Closing opening tag for p
                  {service.description} // Displaying current service description
                </p> // Closing description p tag
                {service.deposit && ( // conditional block to show deposit requirement if boolean is true
                  <div className="flex items-center gap-2 text-xs text-[#4A5D4E]"> // flex container for icon and requirement text
                    <Check className="w-4 h-4" /> // Checkmark icon for confirmation
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Záloha vyžadovaná</span> // text labels Slovak "Deposit required"
                  </div> // Closing deposit container div
                )} // Closing conditional check
              </div> // Closing service card div
            ))} // Closing mapping loop
          </div> // Closing the grid layout container div
        </div> // Closing pricing items wrapper div
      </div> // Closing centering container div
    </section> // Closing pricing section
  ); // Closing return statement
} // Closing PriceGallery functional component block
//
