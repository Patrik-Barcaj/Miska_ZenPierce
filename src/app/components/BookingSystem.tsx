import { useState, useEffect } from "react";
import {
  X,
  Check,
  Calendar,
  FileText,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  AlertCircle,
  User,
} from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
import { sk } from "date-fns/locale";
import { Progress } from "./ui/progress";

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  price: number;
  deposit: number;
  duration: number;
}

interface HealthFormData {
  allergies: string;
  chronicDiseases: string;
  medications: string;
  consent: boolean;
}

interface ClientDetails {
  name: string;
  email: string;
  phone: string;
}

interface BookingData {
  service?: Service;
  healthForm?: HealthFormData;
  date?: Date;
  time?: string;
  client?: ClientDetails;
}

const services: Service[] = [
  { id: "daith", name: "Daith Piercing", price: 65, deposit: 20, duration: 30 },
  {
    id: "tragus",
    name: "Tragus Piercing",
    price: 55,
    deposit: 20,
    duration: 25,
  },
  { id: "conch", name: "Conch Piercing", price: 60, deposit: 20, duration: 30 },
  { id: "helix", name: "Helix Piercing", price: 50, deposit: 15, duration: 25 },
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function BookingSystem({ isOpen, onClose }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const progress = (step / 6) * 100;

  const handleServiceSelect = (service: Service) => {
    setBookingData({ ...bookingData, service });
    setStep(2);
  };

  const handleHealthFormSubmit = (formData: HealthFormData) => {
    setBookingData({ ...bookingData, healthForm: formData });
    setStep(3);
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setBookingData({ ...bookingData, date, time });
    setStep(4);
  };

  const handleClientDetailsSubmit = (client: ClientDetails) => {
    setBookingData({ ...bookingData, client });
    setStep(5);
  };

  const handlePayment = () => {
    setStep(6);
  };

  const resetBooking = () => {
    setStep(1);
    setBookingData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={resetBooking}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-3xl text-[#2D2D2D]"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Rezervácia termínu
            </h2>
            <button
              onClick={resetBooking}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <Progress value={progress} className="h-2" />
          <div
            className="flex justify-between mt-4 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className={step >= 1 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Služba</span>
            <span className={step >= 2 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Dotazník</span>
            <span className={step >= 3 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Termín</span>
            <span className={step >= 4 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Údaje</span>
            <span className={step >= 5 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Platba</span>
            <span className={step >= 6 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Potvrdenie</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && <ServiceSelection onSelect={handleServiceSelect} />}
          {step === 2 && (
            <HealthForm
              onSubmit={handleHealthFormSubmit}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <DateTimeSelection
              onSelect={handleDateTimeSelect}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <ClientDetailsForm
              onSubmit={handleClientDetailsSubmit}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <PaymentStep
              bookingData={bookingData}
              onPay={handlePayment}
              onBack={() => setStep(4)}
            />
          )}
          {step === 6 && (
            <ConfirmationStep
              bookingData={bookingData}
              onClose={resetBooking}
            />
          )}
        </div>

        {/* Notification Banner */}
        {step < 6 && (
          <div className="p-4 bg-[#4A5D4E]/10 border-t border-[#4A5D4E]/20">
            <div
              className="flex items-center gap-2 text-sm text-[#2D2D2D]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <AlertCircle className="w-4 h-4 text-[#4A5D4E]" />
              Pripomenutie termínu vám zašleme SMS správou 24 hodín vopred.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceSelection({
  onSelect,
}: {
  onSelect: (service: Service) => void;
}) {
  return (
    <div>
      <h3
        className="text-2xl mb-6 text-[#2D2D2D]"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Vyberte službu
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-[#4A5D4E] hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4
                className="text-xl font-medium text-[#2D2D2D]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {service.name}
              </h4>
              <span
                className="text-2xl text-[#4A5D4E] font-semibold"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {service.price} €
              </span>
            </div>
            <p
              className="text-sm text-gray-600 mb-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Trvanie: {service.duration} minút
            </p>
            <div
              className="flex items-center gap-2 text-sm text-[#4A5D4E]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Check className="w-4 h-4" />
              Záloha: {service.deposit} €
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HealthForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: HealthFormData) => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState<HealthFormData>({
    allergies: "",
    chronicDiseases: "",
    medications: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.consent) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3
          className="text-2xl text-[#2D2D2D]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Zdravotný dotazník
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium text-[#2D2D2D] mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Alergie (na kovy, lieky, látky)
          </label>
          <textarea
            value={formData.allergies}
            onChange={(e) =>
              setFormData({ ...formData, allergies: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            rows={3}
            placeholder="Uveďte všetky známe alergie"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-[#2D2D2D] mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Chronické choroby
          </label>
          <textarea
            value={formData.chronicDiseases}
            onChange={(e) =>
              setFormData({ ...formData, chronicDiseases: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            rows={3}
            placeholder="Diabetes, hemofília, kožné ochorenia..."
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-[#2D2D2D] mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Užívané lieky
          </label>
          <textarea
            value={formData.medications}
            onChange={(e) =>
              setFormData({ ...formData, medications: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            rows={3}
            placeholder="Antikoagulanciá, imunosupresíva..."
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div className="bg-[#4A5D4E]/10 p-4 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) =>
                setFormData({ ...formData, consent: e.target.checked })
              }
              className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4A5D4E] focus:ring-[#4A5D4E]"
            />
            <span
              className="text-sm text-[#2D2D2D]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Súhlasím so zákrokom a potvrdzujem, že som poskytol/a všetky
              potrebné informácie o svojom zdravotnom stave. Bol/a som
              informovaný/á o postupe a možných rizikách.
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={!formData.consent}
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Pokračovať na výber termínu
      </button>
    </form>
  );
}

function DateTimeSelection({
  onSelect,
  onBack,
}: {
  onSelect: (date: Date, time: string) => void;
  onBack: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const startDate = startOfWeek(new Date(), { locale: sk });
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3
          className="text-2xl text-[#2D2D2D]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Vyberte termín
        </h3>
      </div>

      <div className="mb-8">
        <h4
          className="text-sm font-medium text-[#2D2D2D] mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Dátum
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isPast = date < new Date();
            return (
              <button
                key={index}
                onClick={() => !isPast && setSelectedDate(date)}
                disabled={isPast}
                className={`p-3 rounded-lg text-center transition-all ${
                  isSelected
                    ? "bg-[#4A5D4E] text-white"
                    : isPast
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <div
                  className="text-xs mb-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {format(date, "EEE", { locale: sk })}
                </div>
                <div
                  className="text-lg font-medium"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {format(date, "d")}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h4
            className="text-sm font-medium text-[#2D2D2D] mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Čas
          </h4>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              const isAvailable = Math.random() > 0.3; // Simulate availability
              return (
                <button
                  key={time}
                  onClick={() => isAvailable && setSelectedTime(time)}
                  disabled={!isAvailable}
                  className={`p-3 rounded-lg text-center transition-all ${
                    isSelected
                      ? "bg-[#4A5D4E] text-white"
                      : !isAvailable
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                        : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!selectedDate || !selectedTime}
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Pokračovať na údaje
      </button>
    </div>
  );
}

function ClientDetailsForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: ClientDetails) => void;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState<ClientDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<ClientDetails>>({});

  const validate = () => {
    const newErrors: Partial<ClientDetails> = {};
    if (!formData.name) newErrors.name = "Meno je povinné";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Neplatný e-mail";
    if (!formData.phone || !/^\+?[0-9\s]{10,}$/.test(formData.phone))
      newErrors.phone = "Neplatné telefónne číslo";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3
          className="text-2xl text-[#2D2D2D]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Vaše údaje
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Celé meno
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ján Novák"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            E-mail
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="jan.novak@example.sk"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2">
            Telefónne číslo
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+421 900 123 456"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] transition-colors"
      >
        Pokračovať na platbu
      </button>
    </form>
  );
}

function PaymentStep({
  bookingData,
  onPay,
  onBack,
}: {
  bookingData: BookingData;
  onPay: () => void;
  onBack: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPay();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3
          className="text-2xl text-[#2D2D2D]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Platba zálohy
        </h3>
      </div>

      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-6">
        <h4
          className="text-lg font-medium text-[#2D2D2D] mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Rekapitulácia
        </h4>
        <div
          className="space-y-2 text-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <div className="flex justify-between">
            <span className="text-gray-600">Služba:</span>
            <span className="font-medium">{bookingData.service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dátum:</span>
            <span className="font-medium">
              {bookingData.date &&
                format(bookingData.date, "dd. MMM yyyy", { locale: sk })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Čas:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
          <div className="border-t border-gray-300 my-3 pt-3"></div>
          <div className="flex justify-between">
            <span className="text-gray-600">Celková cena:</span>
            <span className="font-medium">{bookingData.service?.price} €</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-medium">Záloha k úhrade:</span>
            <span className="font-bold text-[#4A5D4E]">
              {bookingData.service?.deposit} €
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-[#2D2D2D] mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Číslo karty
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
              if (formatted.length <= 19) setCardNumber(formatted);
            }}
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-[#2D2D2D] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Platnosť
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  const formatted = value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                  setExpiryDate(formatted);
                }
              }}
              placeholder="MM/RR"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-[#2D2D2D] mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] transition-colors flex items-center justify-center gap-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <CreditCard className="w-5 h-5" />
          Zaplatiť {bookingData.service?.deposit} €
        </button>
      </form>
    </div>
  );
}

function ConfirmationStep({
  bookingData,
  onClose,
}: {
  bookingData: BookingData;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>

      <h3
        className="text-3xl mb-4 text-[#2D2D2D]"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Termín potvrdený
      </h3>

      <p
        className="text-lg text-gray-600 mb-8"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        SMS a e-mail s potvrdením boli odoslané.
      </p>

      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-8 max-w-md mx-auto text-left">
        <h4
          className="font-medium text-[#2D2D2D] mb-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Detail rezervácie:
        </h4>
        <div
          className="space-y-2 text-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <div className="flex justify-between">
            <span className="text-gray-600">Služba:</span>
            <span className="font-medium">{bookingData.service?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dátum:</span>
            <span className="font-medium">
              {bookingData.date &&
                format(bookingData.date, "dd. MMMM yyyy", { locale: sk })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Čas:</span>
            <span className="font-medium">{bookingData.time}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-[#4A5D4E] text-white rounded-lg hover:bg-[#3d4d41] transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Zavrieť
        </button>
        <button
          onClick={() => {
            const appointmentDate = bookingData.date || new Date();
            const [hours, minutes] = (bookingData.time || "09:00").split(':').map(Number);
            
            const start = new Date(appointmentDate);
            start.setHours(hours, minutes, 0);
            
            const end = new Date(start);
            end.setMinutes(start.getMinutes() + (bookingData.service?.duration || 30));

            const formatDate = (date: Date) => {
              return date.toISOString().replace(/-|:|\.\d+/g, '');
            };

            const icsContent = [
              'BEGIN:VCALENDAR',
              'VERSION:2.0',
              'PRODID:-//AcuPierce//Booking//SK',
              'BEGIN:VEVENT',
              `SUMMARY:Akupunktúrny Piercing - ${bookingData.service?.name}`,
              `DTSTART:${formatDate(start)}`,
              `DTEND:${formatDate(end)}`,
              `DESCRIPTION:Rezervácia na meno ${bookingData.client?.name}. Služba: ${bookingData.service?.name}. Adresa: Cintorínska 12, Lučenec.`,
              'LOCATION:Cintorínska 12, 984 01 Lučenec',
              'END:VEVENT',
              'END:VCALENDAR'
            ].join('\r\n');

            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute('download', 'acupierce-termin.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="px-6 py-3 border-2 border-[#4A5D4E] text-[#4A5D4E] rounded-lg hover:bg-[#4A5D4E] hover:text-white transition-colors flex items-center gap-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <Calendar className="w-4 h-4" />
          Pridať do kalendára
        </button>
      </div>
    </div>
  );
}
