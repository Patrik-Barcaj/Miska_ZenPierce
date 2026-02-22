export function Footer() { // Exporting the Footer functional component
  return ( // Returning the JSX element structure
    <footer className="bg-[#2D2D2D] text-white py-12 px-6"> // Footer element with background color, text color, and responsive padding
      <div className="max-w-6xl mx-auto"> // Main container centered with maximum width
        <div className="flex flex-col items-center"> // Flex column container to stack children vertically and center them
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}> // Navigation links container with wrapping and gap, centered text
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> // Link for privacy policy with color styles and hover transition
              Ochrana osobných údajov (GDPR) // Link text labels Slovak "Data privacy protection (GDPR)"
            </a> // Closing anchor tag for privacy policy
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> // Link for terms of service with color styles and hover transition
              Obchodné podmienky // Link text labels Slovak "Business terms and conditions"
            </a> // Closing anchor tag for terms
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm"> // Link for informed consent with color styles and hover transition
              Informovaný súhlas // Link text labels Slovak "Informed consent"
            </a> // Closing anchor tag for informed consent
          </div> // Closing the navigation links container div
//
          {/* Bottom Bar */} // Internal comment to mark the footer's bottom copyright section
          <div className="border-t border-gray-700 pt-8 w-full text-center"> // Horizontal border divider and bottom section container
            <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}> // Copyright statement paragraph with small text size and margin
              © 2026 Akupunktúrny Piercing Studio. Všetky práva vyhradené. // Copyright text labels Slovak "All rights reserved"
            </p> // Closing copyright paragraph
            <p className="text-gray-500 text-xs mb-4" style={{ fontFamily: 'Inter, sans-serif' }}> // Business entity details paragraph with smaller text size
              IČO: 12345678 | DIČ: 1234567890 | Certifikované zdravotnícke zariadenie // IDs and "Certified medical facility" label
            </p> // Closing business details paragraph
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}> // Attribution footer container
              <span>Made with ❤️ by</span> // Label text "Made with love by"
              <a // Creator's link
                href="https://elysiovisions.com" // Creator's website URL
                target="_blank" // Target blank for external opening
                rel="noopener noreferrer" // Security attributes for external links
                className="text-[#4A5D4E] font-semibold hover:text-white transition-colors" // Creator link styling for color, bold weight, and hover effect
                title="ElysioVisions - Premium Web Design Studio" // Tooltip title for link
              > // Closing anchor opening tag
                ElysioVisions // Creators brand name "ElysioVisions"
              </a> // Closing anchor creator link
            </div> // Closing attribution div
          </div> // Closing the footer bottom bar container div
        </div> // Closing main column child wrapper div
      </div> // Closing centering max-width container div
    </footer> // Closing the footer main tag
  ); // Closing return statement
} // Closing Footer component block
//
