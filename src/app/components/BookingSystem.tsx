import { useState, useEffect } from "react"; // Importing React hooks for state and side effects
import { // Importing multiple icons from lucide-react library
  X, // Close icon
  Check, // Checkmark icon
  Calendar, // Calendar icon
  FileText, // Document/Form icon
  CreditCard, // Payment card icon
  CheckCircle2, // Success check circle icon
  ChevronLeft, // Back navigation icon
  AlertCircle, // Warning/Info icon
  User, // Profile/User icon
} from "lucide-react"; // Source library for icons
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns"; // Importing date utility functions
import { sk } from "date-fns/locale"; // Importing Slovak locale for date formatting
import { Progress } from "./ui/progress"; // Importing a progress bar component
//
interface BookingSystemProps { // Defining props for the BookingSystem component
  isOpen: boolean; // Boolean to control if the booking modal is visible
  onClose: () => void; // Function to call when closing the modal
} // Closing interface definition
//
interface Service { // Defining structure for a service item
  id: string; // Unique identifier for the service
  name: string; // Display name of the service
  price: number; // Price of the service in Euro
  deposit: number; // Required deposit amount
  duration: number; // Duration of the service in minutes
} // Closing interface definition
//
interface HealthFormData { // Defining structure for the health questionnaire data
  allergies: string; // Description of client's allergies
  chronicDiseases: string; // Description of chronic health conditions
  medications: string; // Description of current medications
  consent: boolean; // Boolean indicating if the client gave legal consent
} // Closing interface definition
//
interface ClientDetails { // Defining structure for client contact information
  name: string; // Full name of the client
  email: string; // Contact email address
  phone: string; // Contact phone number
} // Closing interface definition
//
interface BookingData { // Aggregated structure for all booking-related information
  service?: Service; // Selected service details
  healthForm?: HealthFormData; // Submitted health questionnaire details
  date?: Date; // Selected appointment date
  time?: string; // Selected appointment time slot
  client?: ClientDetails; // Client contact details
} // Closing interface definition
//
const services: Service[] = [ // Initializing the list of available piercing services
  { id: "daith", name: "Daith Piercing", price: 65, deposit: 20, duration: 30 }, // Details for Daith service
  { // Details for Tragus service
    id: "tragus", // service id
    name: "Tragus Piercing", // display name
    price: 55, // total price
    deposit: 20, // deposit amount
    duration: 25, // time in minutes
  }, // closing tragus object
  { id: "conch", name: "Conch Piercing", price: 60, deposit: 20, duration: 30 }, // Details for Conch service
  { id: "helix", name: "Helix Piercing", price: 50, deposit: 15, duration: 25 }, // Details for Helix service
]; // Closing services array
//
const timeSlots = [ // Defining available daily time slots
  "09:00", // 9 AM slot
  "09:30", // 9:30 AM slot
  "10:00", // 10 AM slot
  "10:30", // 10:30 AM slot
  "11:00", // 11 AM slot
  "11:30", // 11:30 AM slot
  "12:00", // 12 PM slot
  "12:30", // 12:30 PM slot
  "14:00", // 2 PM slot
  "14:30", // 2:30 PM slot
  "15:00", // 3 PM slot
  "15:30", // 3:30 PM slot
  "16:00", // 4 PM slot
  "16:30", // 4:30 PM slot
  "17:00", // 5 PM slot
  "17:30", // 5:30 PM slot
  "18:00", // 6 PM slot
]; // Closing timeSlots array
//
export function BookingSystem({ isOpen, onClose }: BookingSystemProps) { // Exporting the main BookingSystem wizard component
  const [step, setStep] = useState(1); // State to track current wizard step (1-6)
  const [bookingData, setBookingData] = useState<BookingData>({}); // State to store all gathered booking information
//
  // Prevent background scrolling when modal is open
  useEffect(() => { // Hook to manage body scroll locking
    if (isOpen) { // If modal is active
      document.body.style.overflow = "hidden"; // Disable scrolling on the main page
    } else { // If modal is hidden
      document.body.style.overflow = ""; // Re-enable scrolling
    } // Closing conditional check
    return () => { // Cleanup function when component unmounts
      document.body.style.overflow = ""; // Ensure scrolling is restored
    }; // Closing cleanup block
  }, [isOpen]); // Re-run effect only when isOpen state changes
//
  const progress = (step / 6) * 100; // Calculating progress percentage for the bar
//
  const handleServiceSelect = (service: Service) => { // Handler for selecting a service
    setBookingData({ ...bookingData, service }); // Update data with chosen service
    setStep(2); // Move to health questionnaire step
  }; // Closing handleServiceSelect
//
  const handleHealthFormSubmit = (formData: HealthFormData) => { // Handler for health form submission
    setBookingData({ ...bookingData, healthForm: formData }); // Update data with health declarations
    setStep(3); // Move to date and time selection step
  }; // Closing handleHealthFormSubmit
//
  const handleDateTimeSelect = (date: Date, time: string) => { // Handler for choosing appointment time
    setBookingData({ ...bookingData, date, time }); // Update data with selected timing
    setStep(4); // Move to client info step
  }; // Closing handleDateTimeSelect
//
  const handleClientDetailsSubmit = (client: ClientDetails) => { // Handler for personal details submission
    setBookingData({ ...bookingData, client }); // Update data with contact info
    setStep(5); // Move to payment step
  }; // Closing handleClientDetailsSubmit
//
  const handlePayment = () => { // Handler for simulating successful payment
    setStep(6); // Move to final confirmation step
  }; // Closing handlePayment
//
  const resetBooking = () => { // Helper to revert the booking process to start
    setStep(1); // Back to first step
    setBookingData({}); // Clear stored data
    onClose(); // Close the modal via parent prop
  }; // Closing resetBooking
//
  if (!isOpen) return null; // Component renders nothing if not open

  return ( // Returning the JSX for the booking modal or backdrop
    <div // Main full-screen fixed container for the modal backdrop
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" // Dark semi-transparent background with blur and centered flex layout
      onClick={resetBooking} // Clicking the backdrop closes the booking wizard
    > // Closing opening div tag
      <div // Inner modal content container
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" // White box with rounded corners, responsive width, and restricted height
        onClick={(e) => e.stopPropagation()} // Preventing clicks inside the modal from closing it via the backdrop handler
      > // Closing opening div tag
//
        {/* Header */} // Comment for organizers: details of the wizard header/navigation
        <div className="p-6 border-b border-gray-200"> // Header wrapper with padding and bottom line separation
          <div className="flex justify-between items-center mb-4"> // Header top row for title and close toggle
            <h2 // Main wizard heading
              className="text-3xl text-[#2D2D2D]" // Standard sizing and branding color
              style={{ fontFamily: "Playfair Display, serif" }} // Specific header font family
            > // Closing opening h2 tag
              Rezervácia termínu // Headline text labels Slovak "Booking term"
            </h2> // Closing h2 tag
            <button // Top-right close button
              onClick={resetBooking} // Linking to the reset logic
              className="p-2 hover:bg-gray-100 rounded-full transition-colors" // Rounded icon button styling with hover state
            > // Closing opening button tag
              <X className="w-6 h-6" /> // Closing X icon from lucide
            </button> // Closing close button tag
          </div> // Closing top flex row div
          <Progress value={progress} className="h-2" /> // Visual progress bar component indicating current step
          <div // Wizard step labels container
            className="flex justify-between mt-4 text-sm" // horizontal distribution and small text
            style={{ fontFamily: "Inter, sans-serif" }} // Standard body font
          > // Closing opening div tag
            <span className={step >= 1 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Služba</span> // Label for Step 1 "Service" with conditional coloring
            <span className={step >= 2 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Dotazník</span> // Label for Step 2 "Questionnaire"
            <span className={step >= 3 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Termín</span> // Label for Step 3 "Term/Time"
            <span className={step >= 4 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Údaje</span> // Label for Step 4 "Details"
            <span className={step >= 5 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Platba</span> // Label for Step 5 "Payment"
            <span className={step >= 6 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Potvrdenie</span> // Label for Step 6 "Confirmation"
          </div> // Closing labels container div
        </div> // Closing header wrapper div
//
        {/* Content */} // Comment for organizers: detail for current active step content
        <div className="flex-1 overflow-y-auto p-6"> // Scrollable area for step-specific forms or info
          {step === 1 && <ServiceSelection onSelect={handleServiceSelect} />} // Conditionally rendering Step 1
          {step === 2 && ( // Conditionally rendering Step 2
            <HealthForm // questionnaire component
              onSubmit={handleHealthFormSubmit} // navigation forward handler
              onBack={() => setStep(1)} // navigation backward handler
            /> // closing questionnaire tag
          )} // closing conditional check
          {step === 3 && ( // Conditionally rendering Step 3
            <DateTimeSelection // date/time picker component
              onSelect={handleDateTimeSelect} // navigation forward handler
              onBack={() => setStep(2)} // navigation backward handler
            /> // closing picker tag
          )} // closing conditional check
          {step === 4 && ( // Conditionally rendering Step 4
            <ClientDetailsForm // contact details form component
              onSubmit={handleClientDetailsSubmit} // navigation forward handler
              onBack={() => setStep(3)} // navigation backward handler
            /> // closing form tag
          )} // closing conditional check
          {step === 5 && ( // Conditionally rendering Step 5
            <PaymentStep // payment simulation component
              bookingData={bookingData} // passing gathered data for summary
              onPay={handlePayment} // success navigation handler
              onBack={() => setStep(4)} // navigation backward handler
            /> // closing payment component tag
          )} // closing conditional check
          {step === 6 && ( // Conditionally rendering Step 6
            <ConfirmationStep // success summary and follow-up info component
              bookingData={bookingData} // passing finalized data
              onClose={resetBooking} // finish button handler
            /> // closing confirmation tag
          )} // closing conditional check
        </div> // Closing scrollable content area div
//
        {/* Notification Banner */} // Comment for organizers: detail of footer alert banner
        {step < 6 && ( // If process isn't finished yet
          <div className="p-4 bg-[#4A5D4E]/10 border-t border-[#4A5D4E]/20"> // Banner container with subtle branding color and background
            <div // Inner banner message container
              className="flex items-center gap-2 text-sm text-[#2D2D2D]" // Small text with horizontal icon-text gap
              style={{ fontFamily: "Inter, sans-serif" }} // Standard font
            > // Closing opening tag
              <AlertCircle className="w-4 h-4 text-[#4A5D4E]" /> // decorative notification icon
              Pripomenutie termínu vám zašleme SMS správou 24 hodín vopred. // Info text in Slovak about SMS reminder
            </div> // Closing inner div tag
          </div> // Closing banner container div
        )} // Closing conditional block
      </div> // Closing modal content wrapper div
    </div> // Closing main backdrop container div
  ); // Closing return statement
} // Closing BookingSystem functional component block
//
function ServiceSelection({ // Internal sub-component for step 1
  onSelect, // Event handler for choosing a service
}: { // TS type definition for props
  onSelect: (service: Service) => void; // Prop is a function pointer
}) { // Component implementation
  return ( // returning JSX for service list
    <div> // wrapper div for service selection UI
      <h3 // Section subtitle
        className="text-2xl mb-6 text-[#2D2D2D]" // specific styling for the header
        style={{ fontFamily: "Playfair Display, serif" }} // distinct visual branding font
      > // Closing opening tag for h3
        Vyberte službu // Subtitle text labels Slovak "Choose service"
      </h3> // Closing h3 subtitle tag
      <div className="grid md:grid-cols-2 gap-4"> // Responsive grid for service cards
        {services.map((service) => ( // mapping through list of piercing services
          <button // individual service card button
            key={service.id} // persistent React rendering identity
            onClick={() => onSelect(service)} // trigging selection on click
            className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-[#4A5D4E] hover:shadow-md transition-all group" // Styling for look, hover border change, and interactive depth
          > // Closing opening button tag
            <div className="flex justify-between items-start mb-2"> // Top part of card for name and cost placement
              <h4 // service title element
                className="text-xl font-medium text-[#2D2D2D]" // styling for readability
                style={{ fontFamily: "Playfair Display, serif" }} // distinct visual font
              > // Closing opening tag for h4
                {service.name} // displaying specific service name
              </h4> // Closing h4 title tag
              <span // Pricing highlight element
                className="text-2xl text-[#4A5D4E] font-semibold" // prominent size and branding color for cost
                style={{ fontFamily: "Inter, sans-serif" }} // standard body font for numbers
              > // Closing opening tag for span
                {service.price} € // displaying costs with Euro symbol
              </span> // Closing pricing span tag
            </div> // Closing top flex row div
            <p // duration description item
              className="text-sm text-gray-600 mb-3" // subtle small gray text
              style={{ fontFamily: "Inter, sans-serif" }} // standard body font
            > // Closing opening p tag
              Trvanie: {service.duration} minút // Content labels Slovak "Duration: X mins"
            </p> // Closing duration p tag
            <div // metadata line for deposit info
              className="flex items-center gap-2 text-sm text-[#4A5D4E]" // flex layout with branding color for the confirmation
              style={{ fontFamily: "Inter, sans-serif" }} // standard body font
            > // Closing opening tag
              <Check className="w-4 h-4" /> // Checkmark highlight for requirement
              Záloha: {service.deposit} € // Content labels Slovak "Deposit: X €"
            </div> // Closing info div tag
          </button> // Closing service card button tag
        ))} // Closing map function loop
      </div> // Closing grid container div
    </div> // Closing main selection wrapper div
  ); // Closing return statement
} // Closing ServiceSelection sub-component block

function HealthForm({ // Component for Step 2: Health Questionnaire
  onSubmit, // Success handler to proceed to next step
  onBack, // Back navigation handler
}: { // TS type definition for props
  onSubmit: (data: HealthFormData) => void; // Prop is a function pointer for data submission
  onBack: () => void; // Prop is a function pointer for navigation back
}) { // Component implementation
  const [formData, setFormData] = useState<HealthFormData>({ // Initializing local state for the health form fields
    allergies: "", // default empty allergies
    chronicDiseases: "", // default empty chronic diseases
    medications: "", // default empty medications
    consent: false, // default false for legal consent checkbox
  }); // closing state initialization
//
  const handleSubmit = (e: React.FormEvent) => { // Internal form submission handler
    e.preventDefault(); // Preventing default browser page reload behavior
    if (formData.consent) { // Proceeding only if the mandatory consent is checked
      onSubmit(formData); // Invoking parent callback with the gathered data
    } // closing check
  }; // closing handleSubmit function
//
  return ( // Returning the JSX for the health questionnaire form
    <form onSubmit={handleSubmit}> // Main form element with submission attachment
      <div className="flex items-center gap-3 mb-6"> // Header container for back button and title
        <button // Navigation back button
          type="button" // ensuring it doesn't trigger form submit
          onClick={onBack} // linking to parent back handler
          className="p-2 hover:bg-gray-100 rounded-full" // rounded layout with subtle hover effect
        > // closing opening button tag
          <ChevronLeft className="w-5 h-5" /> // rendering back arrow icon
        </button> // closing button tag
        <h3 // Section heading
          className="text-2xl text-[#2D2D2D]" // heading styling for size and color
          style={{ fontFamily: "Playfair Display, serif" }} // distinct brand header font
        > // closing opening tag
          Zdravotný dotazník // Heading text labels Slovak "Health questionnaire"
        </h3> // closing h3 tag
      </div> // closing header row div
//
      <div className="space-y-6"> // container for vertical spacing between form groups
        <div> // allergies input group
          <label // input descriptor
            className="block text-sm font-medium text-[#2D2D2D] mb-2" // styling for label text
            style={{ fontFamily: "Inter, sans-serif" }} // standard body font
          > // closing opening tag
            Alergie (na kovy, lieky, látky) // Label text in Slovak
          </label> // closing label tag
          <textarea // multi-line text input
            value={formData.allergies} // linking value to state
            onChange={(e) => // input change handler
              setFormData({ ...formData, allergies: e.target.value }) // updating specific state property while preserving others
            } // closing handler
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // full width styling with focus highlight
            rows={3} // setting default height
            placeholder="Uveďte všetky známe alergie" // helpful placeholder in Slovak
            style={{ fontFamily: "Inter, sans-serif" }} // standard font
          /> // closing textarea tag
        </div> // closing allergies div
//
        <div> // chronic diseases input group
          <label // input descriptor
            className="block text-sm font-medium text-[#2D2D2D] mb-2" // standard label styling
            style={{ fontFamily: "Inter, sans-serif" }} // standard body font
          > // closing opening tag
            Chronické choroby // Label text labels Slovak "Chronic diseases"
          </label> // closing label tag
          <textarea // multi-line input
            value={formData.chronicDiseases} // state link
            onChange={(e) => // change handler
              setFormData({ ...formData, chronicDiseases: e.target.value }) // state update logic
            } // closing handler
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // consistent input styling
            rows={3} // height definition
            placeholder="Diabetes, hemofília, kožné ochorenia..." // placeholder examples in Slovak
            style={{ fontFamily: "Inter, sans-serif" }} // standard font
          /> // closing textarea tag
        </div> // closing chronic diseases div
//
        <div> // medications input group
          <label // input descriptor
            className="block text-sm font-medium text-[#2D2D2D] mb-2" // standard label styling
            style={{ fontFamily: "Inter, sans-serif" }} // standard font
          > // closing opening tag
            Užívané lieky // Label text labels Slovak "Used medications"
          </label> // closing label tag
          <textarea // input element
            value={formData.medications} // state link
            onChange={(e) => // handler
              setFormData({ ...formData, medications: e.target.value }) // update logic
            } // closing handler
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // standard layout
            rows={3} // size
            placeholder="Antikoagulanciá, imunosupresíva..." // placeholder examples
            style={{ fontFamily: "Inter, sans-serif" }} // standard font
          /> // closing textarea tag
        </div> // closing medications div
//
        <div className="bg-[#4A5D4E]/10 p-4 rounded-lg"> // highlighted area for the mandatory consent checkbox
          <label className="flex items-start gap-3 cursor-pointer"> // flex layout allowing click on text too
            <input // checkable input
              type="checkbox" // boolean type
              checked={formData.consent} // linking checked state
              onChange={(e) => // checkbox handler
                setFormData({ ...formData, consent: e.target.checked }) // updating consent boolean in state
              } // closing handler
              className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4A5D4E] focus:ring-[#4A5D4E]" // custom checkmark styling using Tailwind
            /> // closing input tag
            <span // informative legal text
              className="text-sm text-[#2D2D2D]" // small disclaimer text
              style={{ fontFamily: "Inter, sans-serif" }} // standard body font
            > // closing opening tag
              Súhlasím so zákrokom a potvrdzujem, že som poskytol/a všetky
              potrebné informácie o svojom zdravotnom stave. Bol/a som
              informovaný/á o postupe a možných rizikách. // Detailed consent text in Slovak
            </span> // closing text span
          </label> // closing flex label
        </div> // closing consent container div
      </div> // closing space-y div
//
      <button // main action button for the form
        type="submit" // attaching to form submission
        disabled={!formData.consent} // disabling the button until consent is given
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors" // styling for CTA with disabled state variants
        style={{ fontFamily: "Inter, sans-serif" }} // standard body font
      > // closing opening button tag
        Pokračovať na výber termínu // CTA label labels Slovak "Continue to date selection"
      </button> // closing button tag
    </form> // closing form element
  ); // closing return statement
} // closing HealthForm component block

function DateTimeSelection({ // Component for Step 3: Date and Time selection
  onSelect, // Event handler for successful selection
  onBack, // Back navigation handler
}: { // TS props definition
  onSelect: (date: Date, time: string) => void; // Success callback type
  onBack: () => void; // Back callback type
}) { // Component implementation
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(); // State for tracking currently checked date
  const [selectedTime, setSelectedTime] = useState<string | undefined>(); // State for tracking currently checked time slot
//
  const startDate = startOfWeek(new Date(), { locale: sk }); // Determining start of current week in Slovak locale
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i)); // Generating 14 days list for the picker
//
  const handleContinue = () => { // Internal navigation handler
    if (selectedDate && selectedTime) { // Ensuring both requirements are met
      onSelect(selectedDate, selectedTime); // Proceeding to next step with selected data
    } // closing check
  }; // closing handleContinue
//
  return ( // Returning the JSX for the timing picker
    <div> // wrapper div for date/time UI
      <div className="flex items-center gap-3 mb-6"> // Header row for back navigation and title
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"> // back button with rounded hover style
          <ChevronLeft className="w-5 h-5" /> // rendering back arrow
        </button> // closing back button tag
        <h3 // Section title
          className="text-2xl text-[#2D2D2D]" // heading styling
          style={{ fontFamily: "Playfair Display, serif" }} // brand font
        > // closing opening tag
          Vyberte termín // Headline labels Slovak "Choose term"
        </h3> // closing heading tag
      </div> // closing header div
//
      <div className="mb-8"> // Date picker section container
        <h4 // Small subtitle for context
          className="text-sm font-medium text-[#2D2D2D] mb-3" // subtle sizing
          style={{ fontFamily: "Inter, sans-serif" }} // standard body font
        > // closing h4 opening tag
          Dátum // Labels Slovak "Date"
        </h4> // closing h4 tag
        <div className="grid grid-cols-7 gap-2"> // 7-column grid representing days of the week
          {dates.map((date, index) => { // mapping generated date objects
            const isSelected = selectedDate && isSameDay(date, selectedDate); // check if item is currently active
            const isPast = date < new Date(); // check if date is no longer selectable
            return ( // returning individual day button
              <button // day picker button
                key={index} // react identity key
                onClick={() => !isPast && setSelectedDate(date)} // selection handler with guard against past dates
                disabled={isPast} // visual and functional disablement for past dates
                className={`p-3 rounded-lg text-center transition-all ${ // base layout styling
                  isSelected // if highlight is active
                    ? "bg-[#4A5D4E] text-white" // branding colors for selection
                    : isPast // if disabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" // subtle colors for past dates
                      : "bg-gray-100 hover:bg-gray-200" // neutral colors for available dates
                }`} // closing class logic
              > // closing opening button tag
                <div // weekday label element
                  className="text-xs mb-1" // small text for day name
                  style={{ fontFamily: "Inter, sans-serif" }} // body font
                > // closing opening div tag
                  {format(date, "EEE", { locale: sk })} // formatting day abbreviation in Slovak (e.g. Pon)
                </div> // closing weekday div
                <div // day number element
                  className="text-lg font-medium" // prominent size for the number
                  style={{ fontFamily: "Inter, sans-serif" }} // body font
                > // closing opening div tag
                  {format(date, "d")} // formatting numerical day
                </div> // closing day number div
              </button> // closing individual day button tag
            ); // closing map return
          })} // closing map loop
        </div> // closing grid container div
      </div> // closing date picker section div
//
      {selectedDate && ( // Conditional block for time selection: only visible after date is picked
        <div> // time slots container
          <h4 // Time subtitle
            className="text-sm font-medium text-[#2D2D2D] mb-3" // subtle styling
            style={{ fontFamily: "Inter, sans-serif" }} // standard body font
          > // closing h4 opening tag
            Čas // Labels Slovak "Time"
          </h4> // closing h4 tag
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2"> // responsive grid for time chips
            {timeSlots.map((time) => { // mapping defined available hours
              const isSelected = selectedTime === time; // check if slot is active
              const isAvailable = Math.random() > 0.3; // Simulation of backend availability check
              return ( // returning individual time button
                <button // time chip button
                  key={time} // React identity key
                  onClick={() => isAvailable && setSelectedTime(time)} // handler with availability guard
                  disabled={!isAvailable} // functional disabling if slot is 'booked'
                  className={`p-3 rounded-lg text-center transition-all ${ // base button layout
                    isSelected // highlight logic
                      ? "bg-[#4A5D4E] text-white" // active branding colors
                      : !isAvailable // booked logic
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through" // struck-through style for booked slots
                        : "bg-gray-100 hover:bg-gray-200" // neutral hoverable style for available slots
                  }`} // closing class logic
                  style={{ fontFamily: "Inter, sans-serif" }} // standard body font
                > // closing opening button tag
                  {time} // displaying clock string
                </button> // closing time button tag
              ); // closing map return
            })} // closing map loop
          </div> // closing time grid div
        </div> // closing time slots container div
      )} // closing conditional date-picked check
//
      <button // main navigation button for step 3
        onClick={handleContinue} // trigger for step progression
        disabled={!selectedDate || !selectedTime} // ensuring full selection before proceeding
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors" // CTA styling with state variants
        style={{ fontFamily: "Inter, sans-serif" }} // body font
      > // closing opening button tag
        Pokračovať na údaje // CTA label labels Slovak "Continue to details"
      </button> // closing button tag
    </div> // closing main timing picker wrapper div
  ); // closing return statement
} // closing DateTimeSelection component block
//
function ClientDetailsForm({ // Component for Step 4: Contact details entry
  onSubmit, // Finalizer handler for form completion
  onBack, // Backward navigation handler
}: { // TS props definition
  onSubmit: (data: ClientDetails) => void; // Success callback type
  onBack: () => void; // Back callback type
}) { // Component implementation
  const [formData, setFormData] = useState<ClientDetails>({ // state for tracking text inputs
    name: "", // empty initial name
    email: "", // empty initial email
    phone: "", // empty initial phone
  }); // closing state initialization
//
  const [errors, setErrors] = useState<Partial<ClientDetails>>({}); // State for tracking form validation failures
//
  const validate = () => { // Internal validation logic
    const newErrors: Partial<ClientDetails> = {}; // temporary error collector
    if (!formData.name) newErrors.name = "Meno je povinné"; // Name presence check labels Slovak "Name is required"
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) // email regex check
      newErrors.email = "Neplatný e-mail"; // labels Slovak "Invalid email"
    if (!formData.phone || !/^\+?[0-9\s]{10,}$/.test(formData.phone)) // phone format check
      newErrors.phone = "Neplatné telefónne číslo"; // labels Slovak "Invalid phone number"
//    
    setErrors(newErrors); // Commit found errors to state
    return Object.keys(newErrors).length === 0; // returns true if everything is valid
  }; // closing validate function
//
  const handleSubmit = (e: React.FormEvent) => { // form submission handler
    e.preventDefault(); // stopping browser default behavior
    if (validate()) { // proceed only if valid
      onSubmit(formData); // pass data to parent handler
    } // closing check
  }; // closing handleSubmit func
//
  return ( // returning JSX for the personal info form
    <form onSubmit={handleSubmit}> // main form with attachment
      <div className="flex items-center gap-3 mb-6"> // Header container
        <button // back navigation trigger
          type="button" // ensuring no unintended submission
          onClick={onBack} // linking to parent handler
          className="p-2 hover:bg-gray-100 rounded-full" // rounded layout
        > // closing h5 opening tag
          <ChevronLeft className="w-5 h-5" /> // rendering back arrow
        </button> // closing button tag
        <h3 // Section headline
          className="text-2xl text-[#2D2D2D]" // heading styling
          style={{ fontFamily: "Playfair Display, serif" }} // brand header font
        > // closing h6 opening tag
          Vaše údaje // Headline labels Slovak "Your details"
        </h3> // closing h3 headline tag
      </div> // closing header row div
//
      <div className="space-y-6"> // Vertical form fields container
        <div> // name field group
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2"> // standard text label
            Celé meno // labels Slovak "Full name"
          </label> // closing label tag
          <input // text input element
            type="text" // generic text type
            value={formData.name} // state binding
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} // update specific field in state
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${ // responsive layout with focus color
              errors.name ? "border-red-500" : "border-gray-300" // dynamic error border color
            }`} // closing class logic
            placeholder="Ján Novák" // generic example placeholder
          /> // closing input tag
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>} // conditional error message visibility
        </div> // closing name div
//
        <div> // email field group
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2"> // labels styling
            E-mail // Labels generic "Email"
          </label> // closing label tag
          <input // email input element
            type="email" // email validation type
            value={formData.email} // binding
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} // update logic
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${ // focus and base styling
              errors.email ? "border-red-500" : "border-gray-300" // dynamic error indicator
            }`} // closing class logic
            placeholder="jan.novak@example.sk" // local domain placeholder
          /> // closing input tag
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>} // validation error display
        </div> // closing email div
//
        <div> // phone field group
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2"> // label styling
            Telefónne číslo // labels Slovak "Phone number"
          </label> // closing label tag
          <input // tel input element
            type="tel" // telephone specialization
            value={formData.phone} // binding
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} // update logic
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] ${ // standard layout
              errors.phone ? "border-red-500" : "border-gray-300" // validation color feedback
            }`} // closing class logic
            placeholder="+421 900 123 456" // local format placeholder example
          /> // closing input tag
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>} // validation feedback visibility
        </div> // closing phone div
      </div> // closing space-y container
//
      <button // main CTA for step 4
        type="submit" // form trigger
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] transition-colors" // prominent CTA styling
      > // closing opening button tag
        Pokračovať na platbu // CTA label labels Slovak "Continue to payment"
      </button> // closing button tag
    </form> // closing information form element
  ); // closing return statement
} // closing ClientDetailsForm component block

function PaymentStep({ // Component for Step 5: Deposit payment simulation
  bookingData, // Aggregated data for summary and cost extraction
  onPay, // Successful payment handler
  onBack, // Back navigation handler
}: { // TS props definition
  bookingData: BookingData; // Data prop type
  onPay: () => void; // Success prop type
  onBack: () => void; // Back prop type
}) { // Component implementation
  const [cardNumber, setCardNumber] = useState(""); // State for credit card number input
  const [expiryDate, setExpiryDate] = useState(""); // State for card expiration date
  const [cvv, setCvv] = useState(""); // State for security code input
//
  const handleSubmit = (e: React.FormEvent) => { // Payment form submission handler
    e.preventDefault(); // preventing browser reload
    onPay(); // simulating successful payment immediately
  }; // closing handleSubmit func
//
  return ( // Returning the JSX for payment step
    <div> // wrapper div
      <div className="flex items-center gap-3 mb-6"> // Header container
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"> // back button trigger
          <ChevronLeft className="w-5 h-5" /> // rendering arrow
        </button> // closing button tag
        <h3 // Section headline
          className="text-2xl text-[#2D2D2D]" // heading styling
          style={{ fontFamily: "Playfair Display, serif" }} // brand header font
        > // closing opening tag
          Platba zálohy // Headline labels Slovak "Deposit payment"
        </h3> // closing h3 tag
      </div> // closing header row div
//
      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-6"> // container for order recap
        <h4 // Recap subtitle
          className="text-lg font-medium text-[#2D2D2D] mb-4" // specific styling
          style={{ fontFamily: "Playfair Display, serif" }} // distinct brand font
        > // closing opening tag
          Rekapitulácia // Subtitle labels Slovak "Recapitulation"
        </h4> // closing h4 tag
        <div // detailed breakdown container
          className="space-y-2 text-sm" // horizontal list styling
          style={{ fontFamily: "Inter, sans-serif" }} // body font
        > // closing opening div tag
          <div className="flex justify-between"> // individual line item: service name
            <span className="text-gray-600">Služba:</span> // labels Slovak "Service:"
            <span className="font-medium">{bookingData.service?.name}</span> // dynamic service name
          </div> // closing service line
          <div className="flex justify-between"> // individual line item: date
            <span className="text-gray-600">Dátum:</span> // labels Slovak "Date:"
            <span className="font-medium"> // dynamic date display
              {bookingData.date && // rendering only if present
                format(bookingData.date, "dd. MMM yyyy", { locale: sk })} // formatting date in Slovak
            </span> // closing date span
          </div> // closing date line
          <div className="flex justify-between"> // individual line item: time
            <span className="text-gray-600">Čas:</span> // labels Slovak "Time:"
            <span className="font-medium">{bookingData.time}</span> // dynamic time slot
          </div> // closing time line
          <div className="border-t border-gray-300 my-3 pt-3"></div> // horizontal separator for totals
          <div className="flex justify-between"> // individual line item: total cost
            <span className="text-gray-600">Celková cena:</span> // labels Slovak "Total price:"
            <span className="font-medium">{bookingData.service?.price} €</span> // dynamic price
          </div> // closing price line
          <div className="flex justify-between text-lg"> // highlighted line for deposit
            <span className="font-medium">Záloha k úhrade:</span> // labels Slovak "Deposit to pay:"
            <span className="font-bold text-[#4A5D4E]"> // prominent branding color for the amount
              {bookingData.service?.deposit} € // dynamic deposit amount
            </span> // closing amount span
          </div> // closing deposit line
        </div> // closing recap breakdown div
      </div> // closing recap container div
//
      <form onSubmit={handleSubmit} className="space-y-4"> // Payment form with vertical spacing
        <div> // card number input group
          <label // input field descriptor
            className="block text-sm font-medium text-[#2D2D2D] mb-2" // label styling
            style={{ fontFamily: "Inter, sans-serif" }} // standard body font
          > // closing label opening tag
            Číslo karty // Label labels Slovak "Card number"
          </label> // closing label tag
          <input // credit card number entry
            type="text" // generic text for formatting control
            value={cardNumber} // state link
            onChange={(e) => { // custom formatter for chunks of 4 digits
              const value = e.target.value.replace(/\D/g, ''); // stripping non-numeric chars
              const formatted = value.match(/.{1,4}/g)?.join(' ') || value; // inserting spaces
              if (formatted.length <= 19) setCardNumber(formatted); // limiting length to 16 digits + 3 spaces
            }} // closing handler
            placeholder="1234 5678 9012 3456" // format example placeholder
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // standard layout
            style={{ fontFamily: "Inter, sans-serif" }} // standard font
          /> // closing input tag
        </div> // closing card number div
//
        <div className="grid grid-cols-2 gap-4"> // horizontal row for expiry and CVV
          <div> // expiry date input group
            <label // labels styling
              className="block text-sm font-medium text-[#2D2D2D] mb-2" // labels descriptors
              style={{ fontFamily: "Inter, sans-serif" }} // standard font
            > // closing label opening tag
              Platnosť // Label labels Slovak "Validity/Expiry"
            </label> // closing label tag
            <input // expiration entry
              type="text" // generic text
              value={expiryDate} // binding
              onChange={(e) => { // formatter for MM/YY
                const value = e.target.value.replace(/\D/g, ''); // digit only
                if (value.length <= 4) { // max 4 digits
                  const formatted = value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2)}` : value; // inserting slash
                  setExpiryDate(formatted); // state commit
                } // closing check
              }} // closing handler
              placeholder="MM/RR" // format example
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // standard layout
              style={{ fontFamily: "Inter, sans-serif" }} // body font
            /> // closing input tag
          </div> // closing expiry div
          <div> // CVV code input group
            <label // labels descriptor
              className="block text-sm font-medium text-[#2D2D2D] mb-2" // standard label style
              style={{ fontFamily: "Inter, sans-serif" }} // standard font
            > // closing label opening tag
              CVV // labels generic "CVV"
            </label> // closing label tag
            <input // security code entry
              type="text" // generic text
              value={cvv} // binding
              onChange={(e) => setCvv(e.target.value)} // direct state update
              placeholder="123" // generic placeholder
              maxLength={3} // strict character limit
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]" // standard style
              style={{ fontFamily: "Inter, sans-serif" }} // standard font
            /> // closing input tag
          </div> // closing CVV div
        </div> // closing row div
//
        <button // main payment action trigger
          type="submit" // form connection
          className="w-full mt-6 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] transition-colors flex items-center justify-center gap-2" // CTA look with icon alignment
          style={{ fontFamily: "Inter, sans-serif" }} // body font
        > // closing button opening tag
          <CreditCard className="w-5 h-5" /> // rendering card icon
          Zaplatiť {bookingData.service?.deposit} € // CTA text labels Slovak "Pay X €"
        </button> // closing button tag
      </form> // closing payment form element
    </div> // closing payment step wrapper div
  ); // closing return statement
} // closing PaymentStep component block
//
function ConfirmationStep({ // Component for Step 6: Booking success summary
  bookingData, // finalized data for display and export
  onClose, // handler to finish and exit the wizard
}: { // TS props definition
  bookingData: BookingData; // Data prop type
  onClose: () => void; // Closure prop type
}) { // Component implementation
  return ( // Returning JSX for final confirmation screen
    <div className="text-center py-8"> // centered content wrapper with padding
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"> // success icon container with green variant
        <CheckCircle2 className="w-12 h-12 text-green-600" /> // rendering large success check icon
      </div> // closing icon container
//
      <h3 // Final status headline
        className="text-3xl mb-4 text-[#2D2D2D]" // headline style
        style={{ fontFamily: "Playfair Display, serif" }} // brand header font
      > // closing h3 opening tag
        Termín potvrdený // Headline labels Slovak "Term confirmed"
      </h3> // closing status headline tag
//
      <p // secondary status info
        className="text-lg text-gray-600 mb-8" // clear readable text
        style={{ fontFamily: "Inter, sans-serif" }} // standard body font
      > // closing p opening tag
        SMS a e-mail s potvrdením boli odoslané. // Status labels Slovak "SMS and email confirmation sent"
      </p> // closing status p tag
//
      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-8 max-w-md mx-auto text-left"> // container for final booking summary
        <h4 // section subtitle
          className="font-medium text-[#2D2D2D] mb-4" // specific styling
          style={{ fontFamily: "Inter, sans-serif" }} // standard body font
        > // closing h4 opening tag
          Detail rezervácie: // Labels labels Slovak "Booking detail"
        </h4> // closing h4 tag
        <div // summary list container
          className="space-y-2 text-sm" // horizontal list styling
          style={{ fontFamily: "Inter, sans-serif" }} // body font
        > // closing summary opening tag
          <div className="flex justify-between"> // summary line item: service name
            <span className="text-gray-600">Služba:</span> // labels generic "Service:"
            <span className="font-medium">{bookingData.service?.name}</span> // service name display
          </div> // closing line div
          <div className="flex justify-between"> // summary line item: date
            <span className="text-gray-600">Dátum:</span> // labels generic "Date:"
            <span className="font-medium"> // formatted date display
              {bookingData.date && // rendering if present
                format(bookingData.date, "dd. MMMM yyyy", { locale: sk })} // long Slovak date format
            </span> // closing date span
          </div> // closing line div
          <div className="flex justify-between"> // summary line item: time
            <span className="text-gray-600">Čas:</span> // labels generic "Time:"
            <span className="font-medium">{bookingData.time}</span> // time slot display
          </div> // closing time div
        </div> // closing list container
      </div> // closing summary box div
//
      <div className="flex gap-3 justify-center"> // Action buttons container
        <button // Finished close action button
          onClick={onClose} // linking to parents closure handler
          className="px-6 py-3 bg-[#4A5D4E] text-white rounded-lg hover:bg-[#3d4d41] transition-colors" // branding colored CTA
          style={{ fontFamily: "Inter, sans-serif" }} // body font
        > // closing button opening tag
          Zavrieť // button labels Slovak "Close"
        </button> // closing button tag
        <button // Calendar export action button
          onClick={() => { // complex handler to generate and download .ics file
            const appointmentDate = bookingData.date || new Date(); // fallback for date
            const [hours, minutes] = (bookingData.time || "09:00").split(':').map(Number); // parsing time string
//            
            const start = new Date(appointmentDate); // initiating JS date object
            start.setHours(hours, minutes, 0); // setting exact appointment hour
//            
            const end = new Date(start); // initiating end time
            end.setMinutes(start.getMinutes() + (bookingData.service?.duration || 30)); // adding service duration
//
            const formatDate = (date: Date) => { // internal ISO format helper for ICS compatibility
              return date.toISOString().replace(/-|:|\.\d+/g, ''); // stripping dashes and colons
            }; // closing helper
//
            const icsContent = [ // Constructing VCALENDAR format strings
              'BEGIN:VCALENDAR', // header start
              'VERSION:2.0', // format version
              'PRODID:-//AcuPierce//Booking//SK', // generator identity
              'BEGIN:VEVENT', // event block start
              `SUMMARY:Akupunktúrny Piercing - ${bookingData.service?.name}`, // event title
              `DTSTART:${formatDate(start)}`, // start time in UTC
              `DTEND:${formatDate(end)}`, // end time in UTC
              `DESCRIPTION:Rezervácia na meno ${bookingData.client?.name}. Služba: ${bookingData.service?.name}. Adresa: Cintorínska 12, Lučenec.`, // textual description
              'LOCATION:Cintorínska 12, 984 01 Lučenec', // physical address of the studio
              'END:VEVENT', // event block end
              'END:VCALENDAR' // header end
            ].join('\r\n'); // joining lines with CRLF line endings
//
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' }); // creating file-like object in browser
            const link = document.createElement('a'); // temporary link for download trigger
            link.href = window.URL.createObjectURL(blob); // linking blob to the element
            link.setAttribute('download', 'acupierce-termin.ics'); // setting download filename
            document.body.appendChild(link); // appending to skip browser security issues in some environments
            link.click(); // triggering click
            document.body.removeChild(link); // immediate cleanup
          }} // closing click handler
          className="px-6 py-3 border-2 border-[#4A5D4E] text-[#4A5D4E] rounded-lg hover:bg-[#4A5D4E] hover:text-white transition-colors flex items-center gap-2" // ghost button styling with interactive hover
          style={{ fontFamily: "Inter, sans-serif" }} // standard body font
        > // closing button opening tag
          <Calendar className="w-4 h-4" /> // calendar icon from lucide
          Pridať do kalendára // labels Slovak "Add to calendar"
        </button> // closing export button tag
      </div> // closing horizontal buttons div
    </div> // closing confirmation screen wrapper div
  ); // closing return statement
} // closing ConfirmationStep component block
