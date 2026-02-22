import { Brain, Users, Clipboard, Heart } from 'lucide-react'; // Importing icons from the lucide-react library
//
export function BentoGrid() { // Exporting the BentoGrid functional component
  const cards = [ // Defining an array of objects to store data for grid cards
    { // Starting a card object for acupuncture explanation
      icon: Brain, // Setting the icon to 'Brain'
      title: 'Čo je akupunktúrny piercing?', // Slovak title: "What is acupuncture piercing?"
      description: // Starting description text
        'Akupunktúrny piercing kombinuje tradičnú čínsku medicínu s modernou technikou. Šperk je umiestnený do špecifického bodu na uchu, ktorý je prepojený s nervovým systémom a môže ovplyvniť rôzne telesné funkcie.', // Detailed explanation of the procedure
      className: 'md:col-span-2', // Setting grid column span to 2 on medium screens and up
    }, // Closing first card object
    { // Starting a card object for target audience
      icon: Users, // Setting the icon to 'Users'
      title: 'Pre koho je vhodný?', // Slovak title: "Who is it suitable for?"
      description: // Starting description text
        'Ideálne pre osoby trpiace migrénou, chronickým stresom, nespavosťou, úzkosťou alebo bolesťami hlavy. Vhodné aj pre tých, ktorí hľadajú prirodzený spôsob podpory celkového well-beingu.', // List of benefits and suitable candidates
      className: 'md:col-span-1', // Setting grid column span to 1 on medium screens and up
    }, // Closing second card object
    { // Starting a card object for procedure steps
      icon: Clipboard, // Setting the icon to 'Clipboard'
      title: 'Priebeh zákroku', // Slovak title: "Procedure course"
      description: // Starting description text
        'Začíname konzultáciou a zdravotným dotazníkom. Následne lokalizujeme správny akupunktúrny bod na uchu a sterilnou technikou aplikujeme šperk. Celý proces trvá 20-30 minút.', // Steps of the acupuncture piercing process
      className: 'md:col-span-1', // Setting grid column span to 1 on medium screens and up
    }, // Closing third card object
    { // Starting a card object for aftercare
      icon: Heart, // Setting the icon to 'Heart'
      title: 'Starostlivosť', // Slovak title: "Care"
      description: // Starting description text
        'Po zákroku vám poskytneme detailné pokyny na starostlivosť. Dôležitá je pravidelná dezinfekcia, správne hojenie a kontrola po 2-3 týždňoch. Plné zahojenie trvá 6-8 týždňov.', // Instructions for maintaining the piercing
      className: 'md:col-span-2', // Setting grid column span to 2 on medium screens and up
    }, // Closing fourth card object
  ]; // Closing the cards array
//
  return ( // Returning the JSX structure
    <section id="about" className="py-20 px-6 bg-white"> // Section element with unique ID, padding, and background color
      <div className="max-w-6xl mx-auto"> // Centered container with max width
        <h2 // Section heading
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]" // Styling for responsive size, margin, and alignment
          style={{ fontFamily: 'Playfair Display, serif' }} // Specific font styling
        > // Closing opening tag for h2
          O zákroku // Section title text in Slovak "About the procedure"
        </h2> // Closing h2 tag
        <p // Section introduction paragraph
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" // Styling for alignment, color, and centered max width
          style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
        > // Closing opening tag for p
          Všetko, čo potrebujete vedieť o akupunktúrnom piercingu a jeho prospešných účinkoch. // Intro text in Slovak
        </p> // Closing p tag
//
        <div className="grid md:grid-cols-3 gap-4"> // Responsive grid container with 3 columns on medium screens
          {cards.map((card, index) => { // Mapping over cards array to create DOM elements
            const Icon = card.icon; // Extracting the icon component for rendering
            return ( // Returning JSX for each card
              <div // Individual card div
                key={index} // Unique key for React indexing
                className={`${card.className} bg-[#F5F5F5] p-8 rounded-2xl hover:shadow-lg transition-shadow group`} // Conditional class names and styling for hover effects
              > // Closing opening tag for card div
                <div className="bg-[#4A5D4E] w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"> // Icon container with background and hover scaling
                  <Icon className="w-6 h-6 text-white" /> // Rendering the Lucide icon with specific size and color
                </div> // Closing icon container div
                <h3 // Card title heading
                  className="text-2xl mb-3 text-[#2D2D2D]" // Styling for size and margin
                  style={{ fontFamily: 'Playfair Display, serif' }} // Specific font styling
                > // Closing opening tag for h3
                  {card.title} // Displaying the card's title
                </h3> // Closing h3 tag
                <p // Card description paragraph
                  className="text-gray-700 leading-relaxed" // Styling for readable line height and color
                  style={{ fontFamily: 'Inter, sans-serif' }} // Specific font styling
                > // Closing opening tag for p
                  {card.description} // Displaying the card's description
                </p> // Closing p tag
              </div> // Closing card div
            ); // Closing return statement for map
          })} // Closing map function
        </div> // Closing grid container div
      </div> // Closing max-width container div
    </section> // Closing section
  ); // Closing return statement
} // Closing BentoGrid component function
//
