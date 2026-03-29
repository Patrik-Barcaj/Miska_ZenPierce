// Import useState from React library
import { useState } from 'react';
// Import necessary icon components from lucide-react module
import { X, Check, Calendar, FileText, CreditCard, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';
// Import date formatting and manipulation utilities from date-fns library
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns';
// Import the Slovak language locale for date-fns formatting
import { sk } from 'date-fns/locale';
// Import the custom Progress component from the ui directory
import { Progress } from './ui/progress';

// Define the shape of props for the BookingSystem component
interface BookingSystemProps {
  // Boolean indicating whether the booking modal should be displayed
  isOpen: boolean;
  // Callback function invoked to close the booking modal
  onClose: () => void;
  // Close the interface definition
}

// Define the properties expected for a service offering
interface Service {
  // Unique string identifier for the service
  id: string;
  // Display name of the service
  name: string;
  // Total cost of the service
  price: number;
  // Required up-front deposit amount
  deposit: number;
  // Estimated duration of the service in minutes
  duration: number;
  // Close the interface definition
}

// Define the data collected from the health questionnaire
interface HealthFormData {
  // Details of any user allergies
  allergies: string;
  // Details of any user chronic diseases
  chronicDiseases: string;
  // Details of medications the user uses
  medications: string;
  // Boolean indicating if the user has consented
  consent: boolean;
  // Close the interface definition
}

// Define the comprehensive structure of a user's booking
interface BookingData {
  // Selected service object, optional
  service?: Service;
  // Filled-out health form data, optional
  healthForm?: HealthFormData;
  // Chosen appointment date, optional
  date?: Date;
  // Chosen appointment time string, optional
  time?: string;
  // Close the interface definition
}

// Constant array defining the available services and their details
const services: Service[] = [
  // Object defining Daith Piercing service and costs
  { id: 'daith', name: 'Daith Piercing', price: 65, deposit: 20, duration: 30 },
  // Object defining Tragus Piercing service and costs
  { id: 'tragus', name: 'Tragus Piercing', price: 55, deposit: 20, duration: 25 },
  // Object defining Conch Piercing service and costs
  { id: 'conch', name: 'Conch Piercing', price: 60, deposit: 20, duration: 30 },
  // Object defining Helix Piercing service and costs
  { id: 'helix', name: 'Helix Piercing', price: 50, deposit: 15, duration: 25 },
  // Close the services array
];

// Constant array defining the selectable times for booking appointments
const timeSlots = [
  // Morning slots
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  // Noon and early afternoon slots
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  // Late afternoon slots
  '16:00', '16:30', '17:00', '17:30', '18:00'
  // Close the timeSlots array
];

// Export the primary BookingSystem functional component
export function BookingSystem({ isOpen, onClose }: BookingSystemProps) {
  // useState hook to track which step (1-5) the user is currently on
  const [step, setStep] = useState(1);
  // useState hook to store all booking details as they proceed
  const [bookingData, setBookingData] = useState<BookingData>({});

  // Compute a percentage to represent how complete the steps are
  const progress = (step / 5) * 100;

  // Function called when a service is chosen by the user
  const handleServiceSelect = (service: Service) => {
    // Update booking data to include the chosen service
    setBookingData({ ...bookingData, service });
    // Advance progress to step 2 (questionnaire)
    setStep(2);
    // Close the handleServiceSelect function
  };

  // Function called upon completing the health form
  const handleHealthFormSubmit = (formData: HealthFormData) => {
    // Save form data into the booking data state object
    setBookingData({ ...bookingData, healthForm: formData });
    // Advance progress to step 3 (date and time picking)
    setStep(3);
    // Close the handleHealthFormSubmit function
  };

  // Function called when a specific slot string and date object are picked
  const handleDateTimeSelect = (date: Date, time: string) => {
    // Store selected appointment info in state
    setBookingData({ ...bookingData, date, time });
    // Advance to step 4 (payment processing)
    setStep(4);
    // Close the handleDateTimeSelect function
  };

  // Function moving process to the final receipt block
  const handlePayment = () => {
    // Update step state object to final step 5
    setStep(5);
    // Close the handlePayment block
  };

  // Function clearing form entries if process exits or resets
  const resetBooking = () => {
    // Set view back to step 1
    setStep(1);
    // Erase memory of ongoing booking
    setBookingData({});
    // Call user-provided onClose method to shut down UI
    onClose();
    // Close the resetBooking function
  };

  // Abort rendering if the isOpen flag is false
  if (!isOpen) return null;

  // Return the JSX representing the modal
  return (
    // Overlay container with a backdrop blur effect
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal white box container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal header border wrapper */}
        <div className="p-6 border-b border-gray-200">
          {/* Flex wrapper for the title and the close button */}
          <div className="flex justify-between items-center mb-4">
            {/* The main heading element for the modal */}
            <h2
              // Apply Tailwind classes for size and color
              className="text-3xl text-[#2D2D2D]"
              // Apply inline style for playfair display font
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {/* The text content of the heading */}
              Rezervácia termínu
              {/* Close the h2 tag */}
            </h2>
            {/* Submit button wrapper for the close icon */}
            <button
              // Event listener to reset booking on click
              onClick={resetBooking}
              // Tailwind classes for spacing, background hover, and rounded corners
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {/* Close icon element */}
              <X className="w-6 h-6" />
              {/* Close the button tag */}
            </button>
            {/* Close the flex wrapper */}
          </div>
          {/* Progress bar visual indicator */}
          <Progress value={progress} className="h-2" />
          {/* Text wrappers for step tracking titles */}
          <div className="flex justify-between mt-4 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Step 1 label text */}
            <span className={step >= 1 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Služba</span>
            {/* Step 2 label text */}
            <span className={step >= 2 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Dotazník</span>
            {/* Step 3 label text */}
            <span className={step >= 3 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Termín</span>
            {/* Step 4 label text */}
            <span className={step >= 4 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Platba</span>
            {/* Step 5 label text */}
            <span className={step >= 5 ? 'text-[#4A5D4E] font-medium' : 'text-gray-400'}>Potvrdenie</span>
            {/* Close the step text wrapper */}
          </div>
          {/* Close the header container */}
        </div>

        {/* Scrollable area for dynamic content components */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Display service component if step 1 is active */}
          {step === 1 && <ServiceSelection onSelect={handleServiceSelect} />}
          {/* Display health form if step 2 is active */}
          {step === 2 && <HealthForm onSubmit={handleHealthFormSubmit} onBack={() => setStep(1)} />}
          {/* Display date selection if step 3 is active */}
          {step === 3 && <DateTimeSelection onSelect={handleDateTimeSelect} onBack={() => setStep(2)} />}
          {/* Display payment form if step 4 is active */}
          {step === 4 && <PaymentStep bookingData={bookingData} onPay={handlePayment} onBack={() => setStep(3)} />}
          {/* Display confirmation component if step 5 is active */}
          {step === 5 && <ConfirmationStep bookingData={bookingData} onClose={resetBooking} />}
          {/* Close the content area */}
        </div>

        {/* Display banner area if not yet on step 5 */}
        {step < 5 && (
          // Container for the informational banner
          <div className="p-4 bg-[#4A5D4E]/10 border-t border-[#4A5D4E]/20">
            {/* Wrapper for the banner text and icon */}
            <div className="flex items-center gap-2 text-sm text-[#2D2D2D]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* Alert circle marker icon */}
              <AlertCircle className="w-4 h-4 text-[#4A5D4E]" />
              {/* Simple info text to notify users about SMS */}
              Pripomenutie termínu vám zašleme SMS správou 24 hodín vopred.
              {/* Close the banner text container */}
            </div>
            {/* Close the banner component wrapper */}
          </div>
          // Close the conditional rendering parentheses
        )}
        {/* Close the modal white box component */}
      </div>
      {/* Close the overlay full screen component */}
    </div>
    // Close the return block
  );
  // Close the BookingSystem block
}

// Export the functional component handling service selection with a callback prop
function ServiceSelection({ onSelect }: { onSelect: (service: Service) => void }) {
  // Return the JSX representing the service selection view
  return (
    // Outer division container for the selection view
    <div>
      {/* Title heading indicating user needs to pick a service */}
      <h3 className="text-2xl mb-6 text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
        {/* Title text */}
        Vyberte službu
        {/* Close the heading component */}
      </h3>
      {/* CSS grid division laying out items in a 2-column responsive layout */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Interate over the services array to render individual buttons */}
        {services.map((service) => (
          // Render a button element acting as a card for each service
          <button
            // Uniquely identify each mapped button item React-side
            key={service.id}
            // Bind the passed prop callback to select this specific service object
            onClick={() => onSelect(service)}
            // Extensive Tailwind classes to format the card block layout
            className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-[#4A5D4E] hover:shadow-md transition-all group"
          >
            {/* Inner div setting up a flex-row to separate name and price horizontally */}
            <div className="flex justify-between items-start mb-2">
              {/* Heading element displaying the service name */}
              <h4 className="text-xl font-medium text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                {/* Dynamically insert the current service's name */}
                {service.name}
                {/* Close the service name heading */}
              </h4>
              {/* Span container dynamically showing expected service price */}
              <span className="text-2xl text-[#4A5D4E] font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Dynamically insert the numeric price and Euro symbol */}
                {service.price} €
                {/* Close the price span tag */}
              </span>
              {/* Close the flex header wrapper */}
            </div>
            {/* Detailed paragraph storing duration info string */}
            <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* Interpolated duration data presentation */}
              Trvanie: {service.duration} minút
              {/* Close the duration description paragraph */}
            </p>
            {/* Bottom flex container aligning the check icon and deposit numbers */}
            <div className="flex items-center gap-2 text-sm text-[#4A5D4E]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* Insert the Check Lucide icon indicating an included feature */}
              <Check className="w-4 h-4" />
              {/* Present necessary deposit amount */}
              Záloha: {service.deposit} €
              {/* Close deposit wrap */}
            </div>
            {/* Close the mapped button */}
          </button>
          // Close map iterator
        ))}
        {/* Close grid layout divisor */}
      </div>
      {/* Close entire function wrapper */}
    </div>
    // Close return statement
  );
  // Close function structure
}

// Declare the HealthForm function which gathers medical safety data
function HealthForm({ onSubmit, onBack }: { onSubmit: (data: HealthFormData) => void; onBack: () => void }) {
  // initialize state to store input variables representing user answers
  const [formData, setFormData] = useState<HealthFormData>({
    // Store user allergy disclosures initially empty
    allergies: '',
    // Store user chronic disease disclosures initially empty
    chronicDiseases: '',
    // Store user ongoing medications currently empty
    medications: '',
    // Boolean confirming the user verified policies
    consent: false,
    // Close the initial state assignment map
  });

  // Action executed upon trying to submit the HTML form element
  const handleSubmit = (e: React.FormEvent) => {
    // Blocks default form reload behavior to allow local programmatic handling
    e.preventDefault();
    // Validate that the user indeed clicked consent checkbox
    if (formData.consent) {
      // Invoke parent component hook passing gathered information structure
      onSubmit(formData);
      // End the conditional logic
    }
    // Close the submit listener block
  };

  // Return the visual markup defining the medical questionnaire
  return (
    // HTML form wrapping elements to organize submission scope mapping the Submit handler
    <form onSubmit={handleSubmit}>
      {/* Division storing top control buttons next to the specific title */}
      <div className="flex items-center gap-3 mb-6">
        {/* Standard button triggering the prior step logic flow hook */}
        <button type="button" onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          {/* Insert Chevron Left backwards arrow UI element */}
          <ChevronLeft className="w-5 h-5" />
          {/* End back-travel button definition */}
        </button>
        {/* Distinct visual semantic group describing section contents */}
        <h3 className="text-2xl text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          {/* Static component literal header title text */}
          Zdravotný dotazník
          {/* Close literal title item */}
        </h3>
        {/* Close controls row grid element */}
      </div>

      {/* General layout container managing internal margin spacings between form lines */}
      <div className="space-y-6">
        {/* Top-level block mapping form element relating to allergy tracking */}
        <div>
          {/* Semantic text explaining input objective to users */}
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Input hint literal string */}
            Alergie (na kovy, lieky, látky)
            {/* Complete visual label syntax */}
          </label>
          {/* Box handling large text input lines relating to allergic properties */}
          <textarea
            // Data binding hook aligning literal UI variable mapped property value
            value={formData.allergies}
            // Update the form tracking map variables natively tracking events on change
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            // Complex border and state management Tailwind classes configuring visuals
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            // Configure default vertical rendering height in expected characters lines
            rows={3}
            // Ghosted indicator giving implicit examples when box logic empty
            placeholder="Uveďte všetky známe alergie"
            // Assign explicitly specified family properties bypassing external conflicts
            style={{ fontFamily: 'Inter, sans-serif' }}
          // Finalize interactive element definition instance
          />
          {/* Clear internal boundary component wrapping node tree layout */}
        </div>

        {/* Top-level block mapping form element for chronic diseases */}
        <div>
          {/* Label declaring the purpose of the form input field */}
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* The textual prompt for the user */}
            Chronické choroby
            {/* End of the label component */}
          </label>
          {/* Textarea to input chronic diseases information */}
          <textarea
            // Synchronize the component state for chronic diseases
            value={formData.chronicDiseases}
            // Handle state updates when value is changed
            onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
            // Styles mapping visual representation and focus bounds
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            // Preconfigure default visible lines count parameter to 3
            rows={3}
            // Provide placeholder text demonstrating expected examples to users
            placeholder="Diabetes, hemofília, kožné ochorenia..."
            // Inline style specifying specific typographical characteristics natively
            style={{ fontFamily: 'Inter, sans-serif' }}
          // Close the textarea element
          />
          {/* Close the surrounding constraint box elements */}
        </div>

        {/* Top-level component layout wrapper block for drug forms processing */}
        <div>
          {/* Accompanying textual title identifying component responsibility */}
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Literal string parameter presented inside the label element */}
            Užívané lieky
            {/* Termination character of the label tag definition */}
          </label>
          {/* Element configuring multi-line string text gathering */}
          <textarea
            // Associate bound React property holding target medication value memory store
            value={formData.medications}
            // State hook reacting and rebuilding form properties mapping external actions
            onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            // Layout classes controlling width borders structural sizing interactions focusing bounds
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            // Setup base vertical dimensions limiting view size directly initially 3 levels
            rows={3}
            // Establish instructional background string literal to instruct filling methods
            placeholder="Antikoagulanciá, imunosupresíva..."
            // Declare style parameter to impose direct typography hierarchy resolution explicitly
            style={{ fontFamily: 'Inter, sans-serif' }}
          // Conclude input tag object definition component
          />
          {/* Enclose div isolating section */}
        </div>

        {/* Layout defining highlighting background grouping consent verification logic structure */}
        <div className="bg-[#4A5D4E]/10 p-4 rounded-lg">
          {/* Flex mapping label allowing click tracking to check target items visually bounding context */}
          <label className="flex items-start gap-3 cursor-pointer">
            {/* Form interaction element configured specifically for Boolean resolution properties */}
            <input
              // Specific declarative type of native element explicitly checked behaviors mapping checkboxes
              type="checkbox"
              // Map direct Boolean bound memory variables reflecting truth state status values
              checked={formData.consent}
              // State mutation interceptor handling check interactions rewriting boolean state value
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              // Style variables configuring spacing visual dimensions shapes margins text sizing formatting rules
              className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4A5D4E] focus:ring-[#4A5D4E]"
            // Finish interactive definition
            />
            {/* Render span isolating string paragraph styling independent from component elements hierarchy text variables */}
            <span className="text-sm text-[#2D2D2D]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* Complex string text declaring the literal consent phrase and warning components section text segment start block */}
              Súhlasím so zákrokom a potvrdzujem, že som poskytol/a všetky potrebné informácie o svojom zdravotnom stave.
              {/* Secondary text describing additional warning component string segment literals block part continuation line break representation literal */}
              Bol/a som informovaný/á o postupe a možných rizikách.
              {/* Concluding item closing span definitions */}
            </span>
            {/* Closes label binding mapping input string block elements structure layout tree bounds */}
          </label>
          {/* End definition wrapper boundaries targeting consent blocks sections structures element container */}
        </div>
        {/* End section group wrapper mapping elements separating block layout variables margins internal limits bounds */}
      </div>

      {/* Main button initiating the validation submission triggering function actions */}
      <button
        // Specify button type triggering form submittal action mappings
        type="submit"
        // Conditional disabling of interactions preventing flow based on explicit consent requirement logic
        disabled={!formData.consent}
        // Styling configuration governing primary colors spacing size properties formatting logic transitions logic variables
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        // Applying explicitly resolved typography properties layout constraints rendering fonts variables literal mapping
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Form submittal call literal string instructing users interface actions results components text variables */}
        Pokračovať na výber termínu
        {/* Complete rendering button element definition object instance map context constraints tag termination string */}
      </button>
      {/* Clean up enclosing interactive scope map node element definition wrapper boundaries context tag structures layout */}
    </form>
    // Close primary structural component map bounds blocks mapping actions layout wrapper block definition object closure parenthesis instance rendering context map structures variables termination limits variables limits bounds literal elements component boundaries
  );
  // Finalize component definition mapped logic tree closure parenthesis mapping definitions parameters layout functions rendering bounds instance object
}

// Date/time
function DateTimeSelection({ onSelect, onBack }: { onSelect: (date: Date, time: string) => void; onBack: () => void }) {
  // state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  // state
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  // date
  const startDate = startOfWeek(new Date(), { locale: sk });
  // dates
  const dates = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  // continue
  const handleContinue = () => {
    // if
    if (selectedDate && selectedTime) {
      // select
      onSelect(selectedDate, selectedTime);
      // end if
    }
    // end func
  };

  // return
  return (
    // div
    <div>
      {/* div */}
      <div className="flex items-center gap-3 mb-6">
        {/* btn */}
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          {/* icon */}
          <ChevronLeft className="w-5 h-5" />
          {/* end btn */}
        </button>
        {/* h3 */}
        <h3 className="text-2xl text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          {/* text */}
          Vyberte termín
          {/* end h3 */}
        </h3>
        {/* end div */}
      </div>

      {/* div */}
      <div className="mb-8">
        {/* h4 */}
        <h4 className="text-sm font-medium text-[#2D2D2D] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          {/* text */}
          Dátum
          {/* end h4 */}
        </h4>
        {/* div */}
        <div className="grid grid-cols-7 gap-2">
          {/* map */}
          {dates.map((date, index) => {
            // is selected
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            // is past
            const isPast = date < new Date();
            // return
            return (
              // btn
              <button
                // key
                key={index}
                // click
                onClick={() => !isPast && setSelectedDate(date)}
                // disabled
                disabled={isPast}
                // class applying responsive padding to fit 7 columns on mobile
                className={`p-2 sm:p-3 rounded-lg text-center transition-all ${isSelected
                  ? 'bg-[#4A5D4E] text-white'
                  : isPast
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {/* div */}
                <div className="text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {/* text */}
                  {format(date, 'EEE', { locale: sk })}
                  {/* end div */}
                </div>
                {/* div */}
                <div className="text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {/* text */}
                  {format(date, 'd')}
                  {/* end div */}
                </div>
                {/* end btn */}
              </button>
              // end return
            );
            // end map
          })}
          {/* end div */}
        </div>
        {/* end div */}
      </div>

      {/* if */}
      {selectedDate && (
        // div
        <div>
          {/* h4 */}
          <h4 className="text-sm font-medium text-[#2D2D2D] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* text */}
            Čas
            {/* end h4 */}
          </h4>
          {/* div */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {/* map */}
            {timeSlots.map((time) => {
              // is selected
              const isSelected = selectedTime === time;
              // is available
              const isAvailable = Math.random() > 0.3; // Simulate availability
              // return
              return (
                // btn
                <button
                  // key
                  key={time}
                  // click
                  onClick={() => isAvailable && setSelectedTime(time)}
                  // disabled
                  disabled={!isAvailable}
                  // class applying responsive padding for smaller screens
                  className={`p-2 sm:p-3 rounded-lg text-center transition-all ${isSelected
                    ? 'bg-[#4A5D4E] text-white'
                    : !isAvailable
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  // style
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* text */}
                  {time}
                  {/* end btn */}
                </button>
                // end return
              );
              // end map
            })}
            {/* end div */}
          </div>
          {/* end div */}
        </div>
        // end if
      )}

      {/* btn */}
      <button
        // click
        onClick={handleContinue}
        // disabled
        disabled={!selectedDate || !selectedTime}
        // class
        className="w-full mt-8 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        // style
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* text */}
        Pokračovať na platbu
        {/* end btn */}
      </button>
      {/* end div */}
    </div>
    // end return
  );
  // end func
}

// Payment step
function PaymentStep({ bookingData, onPay, onBack }: { bookingData: BookingData; onPay: () => void; onBack: () => void }) {
  // state
  const [cardNumber, setCardNumber] = useState('');
  // state
  const [expiryDate, setExpiryDate] = useState('');
  // state
  const [cvv, setCvv] = useState('');

  // submit
  const handleSubmit = (e: React.FormEvent) => {
    // prevent default
    e.preventDefault();
    // pay
    onPay();
    // end fn
  };

  // return
  return (
    // div
    <div>
      {/* div */}
      <div className="flex items-center gap-3 mb-6">
        {/* btn */}
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          {/* icon */}
          <ChevronLeft className="w-5 h-5" />
          {/* end btn */}
        </button>
        {/* h3 */}
        <h3 className="text-2xl text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          {/* text */}
          Platba zálohy
          {/* end h3 */}
        </h3>
        {/* end div */}
      </div>

      {/* div */}
      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-6">
        {/* h4 */}
        <h4 className="text-lg font-medium text-[#2D2D2D] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          {/* text */}
          Rekapitulácia
          {/* end h4 */}
        </h4>
        {/* div */}
        <div className="space-y-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Služba:</span>
            {/* span */}
            <span className="font-medium">{bookingData.service?.name}</span>
            {/* end div */}
          </div>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Dátum:</span>
            {/* span */}
            <span className="font-medium">
              {/* text */}
              {bookingData.date && format(bookingData.date, 'dd. MMM yyyy', { locale: sk })}
              {/* end span */}
            </span>
            {/* end div */}
          </div>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Čas:</span>
            {/* span */}
            <span className="font-medium">{bookingData.time}</span>
            {/* end div */}
          </div>
          {/* div */}
          <div className="border-t border-gray-300 my-3 pt-3"></div>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Celková cena:</span>
            {/* span */}
            <span className="font-medium">{bookingData.service?.price} €</span>
            {/* end div */}
          </div>
          {/* div */}
          <div className="flex justify-between text-lg">
            {/* span */}
            <span className="font-medium">Záloha k úhrade:</span>
            {/* span */}
            <span className="font-bold text-[#4A5D4E]">{bookingData.service?.deposit} €</span>
            {/* end div */}
          </div>
          {/* end div */}
        </div>
        {/* end div */}
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* div */}
        <div>
          {/* label */}
          <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* text */}
            Číslo karty
            {/* label end */}
          </label>
          {/* input */}
          <input
            // type
            type="text"
            // val
            value={cardNumber}
            // onchange
            onChange={(e) => setCardNumber(e.target.value)}
            // placeholder
            placeholder="1234 5678 9012 3456"
            // length
            maxLength={19}
            // class
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
            // style
            style={{ fontFamily: 'Inter, sans-serif' }}
          // input end
          />
          {/* div end */}
        </div>

        {/* div */}
        <div className="grid grid-cols-2 gap-4">
          {/* div */}
          <div>
            {/* label */}
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* text */}
              Platnosť
              {/* label end */}
            </label>
            {/* input */}
            <input
              // type
              type="text"
              // val
              value={expiryDate}
              // onchange
              onChange={(e) => setExpiryDate(e.target.value)}
              // placeholder
              placeholder="MM/RR"
              // length
              maxLength={5}
              // class
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              // style
              style={{ fontFamily: 'Inter, sans-serif' }}
            // input end
            />
            {/* div end */}
          </div>
          {/* div */}
          <div>
            {/* label */}
            <label className="block text-sm font-medium text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              {/* text */}
              CVV
              {/* label end */}
            </label>
            {/* input */}
            <input
              // type
              type="text"
              // val
              value={cvv}
              // onchange
              onChange={(e) => setCvv(e.target.value)}
              // placeholder
              placeholder="123"
              // length
              maxLength={3}
              // class
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              // style
              style={{ fontFamily: 'Inter, sans-serif' }}
            // input end
            />
            {/* div end */}
          </div>
          {/* div end */}
        </div>

        {/* btn */}
        <button
          // type
          type="submit"
          // class
          className="w-full mt-6 bg-[#4A5D4E] text-white py-3 rounded-lg hover:bg-[#3d4d41] transition-colors flex items-center justify-center gap-2"
          // style
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* icon */}
          <CreditCard className="w-5 h-5" />
          {/* text */}
          Zaplatiť {bookingData.service?.deposit} €
          {/* btn end */}
        </button>
        {/* form end */}
      </form>
      {/* div end */}
    </div>
    // return end
  );
  // fn end
}

// Confirmation
function ConfirmationStep({ bookingData, onClose }: { bookingData: BookingData; onClose: () => void }) {
  // return
  return (
    // div
    <div className="text-center py-8">
      {/* div */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        {/* icon */}
        <CheckCircle2 className="w-12 h-12 text-green-600" />
        {/* div end */}
      </div>

      {/* h3 */}
      <h3 className="text-3xl mb-4 text-[#2D2D2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
        {/* text */}
        Termín potvrdený
        {/* h3 end */}
      </h3>

      {/* p */}
      <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* text */}
        SMS a e-mail s potvrdením boli odoslané.
        {/* p end */}
      </p>

      {/* div */}
      <div className="bg-[#F5F5F5] p-6 rounded-xl mb-8 max-w-md mx-auto text-left">
        {/* h4 */}
        <h4 className="font-medium text-[#2D2D2D] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          {/* text */}
          Detail rezervácie:
          {/* h4 end */}
        </h4>
        {/* div */}
        <div className="space-y-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Služba:</span>
            {/* span */}
            <span className="font-medium">{bookingData.service?.name}</span>
            {/* div end */}
          </div>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Dátum:</span>
            {/* span */}
            <span className="font-medium">
              {/* text */}
              {bookingData.date && format(bookingData.date, 'dd. MMMM yyyy', { locale: sk })}
              {/* span end */}
            </span>
            {/* div end */}
          </div>
          {/* div */}
          <div className="flex justify-between">
            {/* span */}
            <span className="text-gray-600">Čas:</span>
            {/* span */}
            <span className="font-medium">{bookingData.time}</span>
            {/* div end */}
          </div>
          {/* div end */}
        </div>
        {/* div end */}
      </div>

      {/* div wrapper modifying flex direction conditionally for mobile stacking */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {/* btn */}
        <button
          // click
          onClick={onClose}
          // class handling button main actions scaling
          className="w-full sm:w-auto px-6 py-3 bg-[#4A5D4E] text-white rounded-lg hover:bg-[#3d4d41] transition-colors"
          // style
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* text */}
          Zavrieť
          {/* btn end */}
        </button>
        {/* btn */}
        <button
          // class handling button secondary actions scaling layout
          className="w-full sm:w-auto px-6 py-3 border-2 border-[#4A5D4E] text-[#4A5D4E] rounded-lg hover:bg-[#4A5D4E] hover:text-white transition-colors flex items-center justify-center gap-2"
          // style
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {/* icon */}
          <Calendar className="w-4 h-4" />
          {/* text */}
          Pridať do kalendára
          {/* btn end */}
        </button>
        {/* div end */}
      </div>
      {/* div end */}
    </div>
    // return end
  );
  // fn end
}
