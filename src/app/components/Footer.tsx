export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Ochrana osobných údajov (GDPR)
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Obchodné podmienky
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Informovaný súhlas
            </a>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 w-full text-center">
            <p className="text-gray-400 text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              © 2026 Akupunktúrny Piercing Studio. Všetky práva vyhradené.
            </p>
            <p className="text-gray-500 text-xs mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              IČO: 12345678 | DIČ: 1234567890 | Certifikované zdravotnícke zariadenie
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span>Made with ❤️ by</span>
              <a 
                href="https://elysiovisions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#4A5D4E] font-semibold hover:text-white transition-colors"
                title="ElysioVisions - Premium Web Design Studio"
              >
                ElysioVisions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
