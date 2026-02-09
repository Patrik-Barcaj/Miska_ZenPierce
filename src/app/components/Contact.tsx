import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div>
            <h2
              className="text-4xl md:text-5xl mb-8 text-[#2D2D2D]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Kontaktujte nás
            </h2>
            <p className="text-gray-600 mb-12 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Radi vám odpovieme na všetky vaše otázky. Nájdete nás v centre Lučenca, hneď pri hlavnom mestskom parku.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Adresa</h4>
                  <p className="text-gray-600">Cintorínska 12, 984 01 Lučenec</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Telefón</h4>
                  <p className="text-gray-600">+421 944 123 456</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">E-mail</h4>
                  <p className="text-gray-600">info@acupierce.sk</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#4A5D4E]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#2D2D2D] text-lg mb-1">Otváracie hodiny</h4>
                  <p className="text-gray-600">Po - Pi: 09:00 - 18:00</p>
                  <p className="text-gray-600">So: Na objednávku</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2D2D2D] hover:bg-[#4A5D4E] hover:text-white transition-all">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#2D2D2D] hover:bg-[#4A5D4E] hover:text-white transition-all">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Map / Visual Element */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps?q=Cintor%C3%ADnska%2012,%20Lu%C4%8Denec&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
