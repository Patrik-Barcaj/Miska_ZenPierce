"use client"; // Client-side component for handling One-Time Password input behavior

import * as React from "react"; // Importing core React library
import { OTPInput, OTPInputContext } from "input-otp"; // Importing specialized OTP input library
import { MinusIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function InputOTP({ // Main wrapper for the OTP input system
  className, // optional external classes for input
  containerClassName, // optional classes for the flex container
  ...props // remaining OTP input props
}: React.ComponentProps<typeof OTPInput> & { // Merged prop types
  containerClassName?: string; // custom container class flag
}) { // component implementation
  return ( // Returning coordinated input
    <OTPInput // Specialized OTP primitive
      data-slot="input-otp" // identifier
      containerClassName={cn( // styling the outer flex wrapper
        "flex items-center gap-2 has-disabled:opacity-50", // base layout and state handling
        containerClassName, // overrides
      )} // closing cn block
      className={cn("disabled:cursor-not-allowed", className)} // styling the hidden technical input
      {...props} // spreading functional props
    /> // closing primitive
  ); // closing return
} // Closing InputOTP block

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) { // Grouping of individual digit slots
  return ( // Returning flex group
    <div // simple div
      data-slot="input-otp-group" // identifier
      className={cn("flex items-center gap-1", className)} // tight horizontal list
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing InputOTPGroup block

function InputOTPSlot({ // Individual vertical box for a single digit
  index, // digit position
  className, // optional classes
  ...props // remaining div props
}: React.ComponentProps<"div"> & { // Merged prop types
  index: number; // numeric index
}) { // component implementation
  const inputOTPContext = React.useContext(OTPInputContext); // accessing shared OTP state
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}; // extracting specific slot state

  return ( // Returning the stylized slot
    <div // container box
      data-slot="input-otp-slot" // identifier
      data-active={isActive} // binding focus state
      className={cn( // styling the digit box
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]", // complex border and focus ring logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {char} // rendering the actual digit
      {hasFakeCaret && ( // conditional blinker display
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center"> // centering wrapper
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" /> // the animated cursor line
        </div> // closing blinker box
      )} // closing conditional
    </div> // closing slot box
  ); // closing return
} // Closing InputOTPSlot block

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) { // Visual divider between slot groups
  return ( // Returning separator JSX
    <div data-slot="input-otp-separator" role="separator" {...props}> // providing semantic role
      <MinusIcon /> // rendering the dash icon
    </div> // closing box
  ); // closing return
} // Closing InputOTPSeparator block

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }; // Exporting coordinated components
