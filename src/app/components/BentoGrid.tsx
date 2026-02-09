import { Brain, Users, Clipboard, Heart } from 'lucide-react';

export function BentoGrid() {
  const cards = [
    {
      icon: Brain,
      title: 'Čo je akupunktúrny piercing?',
      description:
        'Akupunktúrny piercing kombinuje tradičnú čínsku medicínu s modernou technikou. Šperk je umiestnený do špecifického bodu na uchu, ktorý je prepojený s nervovým systémom a môže ovplyvniť rôzne telesné funkcie.',
      className: 'md:col-span-2',
    },
    {
      icon: Users,
      title: 'Pre koho je vhodný?',
      description:
        'Ideálne pre osoby trpiace migrénou, chronickým stresom, nespavosťou, úzkosťou alebo bolesťami hlavy. Vhodné aj pre tých, ktorí hľadajú prirodzený spôsob podpory celkového well-beingu.',
      className: 'md:col-span-1',
    },
    {
      icon: Clipboard,
      title: 'Priebeh zákroku',
      description:
        'Začíname konzultáciou a zdravotným dotazníkom. Následne lokalizujeme správny akupunktúrny bod na uchu a sterilnou technikou aplikujeme šperk. Celý proces trvá 20-30 minút.',
      className: 'md:col-span-1',
    },
    {
      icon: Heart,
      title: 'Starostlivosť',
      description:
        'Po zákroku vám poskytneme detailné pokyny na starostlivosť. Dôležitá je pravidelná dezinfekcia, správne hojenie a kontrola po 2-3 týždňoch. Plné zahojenie trvá 6-8 týždňov.',
      className: 'md:col-span-2',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl mb-4 text-center text-[#2D2D2D]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          O zákroku
        </h2>
        <p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Všetko, čo potrebujete vedieť o akupunktúrnom piercingu a jeho prospešných účinkoch.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`${card.className} bg-[#F5F5F5] p-8 rounded-2xl hover:shadow-lg transition-shadow group`}
              >
                <div className="bg-[#4A5D4E] w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-2xl mb-3 text-[#2D2D2D]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
