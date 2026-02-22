"use client"; // Indicating this is a client-side component

import * as React from "react"; // Importing React core library
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // Importing Radix UI Checkbox primitives
import { CheckIcon } from "lucide-react"; // Importing the checkmark icon

import { cn } from "./utils"; // Importing utility for conditional class merging

function Checkbox({ // Main Checkbox component
  className, // Optional external classes
  ...props // Remaining props from Radix primitive
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) { // TS type definition
  return ( // Returning JSX for the checkbox
    <CheckboxPrimitive.Root // Radix Root checkbox component
      data-slot="checkbox" // identifier for systematic styling
      className={cn( // merging complex state and base styles
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", // Styling for all states including checked, focused, and disabled
        className, // custom overrides
      )} // closing cn call
      {...props} // spreading props
    > // closing opening root tag
      <CheckboxPrimitive.Indicator // Visual mark visible only when checked
        data-slot="checkbox-indicator" // identifier
        className="flex items-center justify-center text-current transition-none" // centering the icon
      > // closing opening indicator tag
        <CheckIcon className="size-3.5" /> // rendering standard check icon
      </CheckboxPrimitive.Indicator> // closing Radix indicator
    </CheckboxPrimitive.Root> // closing Radix root
  ); // closing return
} // Closing Checkbox component block

export { Checkbox }; // Exporting component
