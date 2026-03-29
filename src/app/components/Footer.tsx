// Import necessary icons from lucide-react package
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

// Export the Footer functional component layout
export function Footer() {
  // Return the JSX layout structure
  return (
    // Top level footer element with dark background, padding, and text coloring
    <footer className="bg-[#2D2D2D] text-white py-12 px-6">
      {/* Maximum width container, horizontally centered */}
      <div className="max-w-6xl mx-auto">
        {/* Grid container dividing footer content responsively: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 text-center">
          {/* Column 1: Contact Information block */}
          <div className="flex flex-col items-center">
            {/* Inner centering wrapper */}
            <div className="flex flex-col items-center">
              {/* Column heading */}
              <h3
                // Text sizing and margin
                className="text-xl mb-4 text-center"
                // Typography styling
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Kontakt
                {/* Close heading */}
              </h3>
              {/* Contact details container */}
              <div className="space-y-3 w-max" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Address flex container */}
                <div className="flex items-start justify-start gap-3">
                  {/* MapPin Icon */}
                  <MapPin className="w-5 h-5 text-[#4A5D4E] mt-0.5 flex-shrink-0" />
                  {/* Address text */}
                  <span className="text-gray-300">
                    {/* Street */}
                    Vajanského 2<br />
                    {/* City */}
                    984 01 Lučenec
                    {/* Close text */}
                  </span>
                  {/* Close address container */}
                </div>
                {/* Phone flex container */}
                <div className="flex items-center justify-start gap-3">
                  {/* Phone icon */}
                  <Phone className="w-5 h-5 text-[#4A5D4E] flex-shrink-0" />
                  {/* Phone text */}
                  <span className="text-gray-300">+421 900 123 456</span>
                  {/* Close phone container */}
                </div>
                {/* Email flex container */}
                <div className="flex items-center justify-start gap-3">
                  {/* Mail Icon */}
                  <Mail className="w-5 h-5 text-[#4A5D4E] flex-shrink-0" />
                  {/* Email text */}
                  <span className="text-gray-300">info@zen-piercing.sk</span>
                  {/* Close email container */}
                </div>
                {/* Close contact details */}
              </div>
              {/* Close inner centering wrapper */}
            </div>
            {/* Close Column 1 */}
          </div>

          {/* Column 2: Opening Hours block */}
          <div className="flex flex-col items-center">
            {/* Inner centering wrapper */}
            <div className="flex flex-col items-center">
              {/* Column 2 heading */}
              <h3
                // Text styling
                className="text-xl mb-4"
                // Taxonomy styling
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {/* Heading Text */}
                Otváracie hodiny
                {/* Close heading */}
              </h3>
              {/* Opening hours list container */}
              <div className="space-y-4 text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Weekdays container */}
                <div className="text-center flex flex-col items-center">
                  {/* Weekdays label */}
                  <span>Pondelok - Piatok</span>
                  {/* Weekdays hours */}
                  <span>9:00 - 18:00</span>
                  {/* Close weekdays container */}
                </div>
                {/* Saturday container */}
                <div className="text-center flex flex-col items-center">
                  {/* Saturday label */}
                  <span>Sobota</span>
                  {/* Saturday hours */}
                  <span>10:00 - 15:00</span>
                  {/* Close saturday container */}
                </div>
                {/* Sunday container */}
                <div className="text-center flex flex-col items-center">
                  {/* Sunday label */}
                  <span>Nedeľa</span>
                  {/* Sunday status */}
                  <span>Zatvorené</span>
                  {/* Close sunday container */}
                </div>
                {/* Close opening hours list */}
              </div>
              {/* Close inner centering wrapper */}
            </div>
            {/* Close Column 2 */}
          </div>

          {/* Social & Legal */}
          <div className="flex flex-col items-center sm:col-span-2 md:col-span-1 mt-6 sm:mt-0">
            {/* Inner centering wrapper */}
            <div className="flex flex-col items-center">
              {/* Column 3 heading */}
              <h3
                // Text sizing
                className="text-xl mb-4 text-center"
                // Taxonomy styling
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {/* Text rendering */}
                Sledujte nás
                {/* Close heading */}
              </h3>
              {/* Social media flex container */}
              <div className="flex gap-4 mb-6">
                {/* Instagram link */}
                <a
                  // Empty link
                  href="#"
                  // Styling classes
                  className="w-10 h-10 bg-[#4A5D4E] rounded-full flex items-center justify-center hover:bg-[#3d4d41] transition-colors"
                >
                  {/* Instagram Icon */}
                  <Instagram className="w-5 h-5" />
                  {/* Close Instagram link */}
                </a>
                {/* Facebook link */}
                <a
                  // Empty link
                  href="#"
                  // Styling classes
                  className="w-10 h-10 bg-[#4A5D4E] rounded-full flex items-center justify-center hover:bg-[#3d4d41] transition-colors"
                >
                  {/* Facebook Icon */}
                  <Facebook className="w-5 h-5" />
                  {/* Close Facebook link */}
                </a>
                {/* Close Social container */}
              </div>

              {/* Legal links container */}
              <div className="space-y-2 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* GDPR link */}
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Ochrana osobných údajov (GDPR)
                  {/* Close GDPR link */}
                </a>
                {/* Terms link */}
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Obchodné podmienky
                  {/* Close Terms link */}
                </a>
                {/* Consent link */}
                <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Informovaný súhlas
                  {/* Close consent link */}
                </a>
                {/* Close legal links */}
              </div>
              {/* Close inner centering wrapper */}
            </div>
            {/* Close Column 3 */}
          </div>
          {/* Close grid layout */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          {/* Copyright paragraph */}
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Copyright text */}
            © 2026 Zen Piercing. Všetky práva vyhradené.
            {/* Close paragraph */}
          </p>
          {/* Company details paragraph */}
          <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Company details text */}
            IČO: 12345678 | DIČ: 1234567890 | Certifikované zdravotnícke zariadenie
            {/* Close details  */}
          </p>
          {/* Developer credit paragraph */}
          <p className="text-gray-500 text-xs mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Developer credit text */}
            website made by ElysioVisions :)
            {/* Close developer credit  */}
          </p>
          {/* Close bottom bar */}
        </div>
        {/* Close Wrapper  */}
      </div>
      {/* Close Footer  */}
    </footer>
    // Close the return  
  );
  // Close function  
}
