import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3
              className="text-xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Kontakt
            </h3>
            <div className="space-y-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#4A5D4E] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Vajanského 2<br />
                  984 01 Lučenec
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4A5D4E] flex-shrink-0" />
                <span className="text-gray-300">+421 900 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4A5D4E] flex-shrink-0" />
                <span className="text-gray-300">info@akupunkturny-piercing.sk</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3
              className="text-xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Otváracie hodiny
            </h3>
            <div className="space-y-2 text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex justify-between">
                <span>Pondelok - Piatok:</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sobota:</span>
                <span>10:00 - 15:00</span>
              </div>
              <div className="flex justify-between">
                <span>Nedeľa:</span>
                <span>Zatvorené</span>
              </div>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h3
              className="text-xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Sledujte nás
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-[#4A5D4E] rounded-full flex items-center justify-center hover:bg-[#3d4d41] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#4A5D4E] rounded-full flex items-center justify-center hover:bg-[#3d4d41] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

            <div className="space-y-2 text-center md:text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Ochrana osobných údajov (GDPR)
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Obchodné podmienky
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Informovaný súhlas
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 Akupunktúrny Piercing Studio. Všetky práva vyhradené.
          </p>
          <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            IČO: 12345678 | DIČ: 1234567890 | Certifikované zdravotnícke zariadenie
          </p>
        </div>
      </div>
    </footer>
  );
}
