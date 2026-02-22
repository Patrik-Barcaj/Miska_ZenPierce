"use client"; // Client-side component for mutual exclusion selection groups

import * as React from "react"; // Importing core React library
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"; // Importing Radix UI Radio Group primitives
import { CircleIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function RadioGroup({ // Main container for a set of radio items
  className, // optional external classes
  ...props // remaining root props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) { // TS definition
  return ( // Returning grid list
    <RadioGroupPrimitive.Root // Radix Root primitive
      data-slot="radio-group" // identifier
      className={cn("grid gap-3", className)} // vertical grid spacing
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing RadioGroup component block

function RadioGroupItem({ // Individual selection point within a radio group
  className, // optional classes
  ...props // remaining item props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) { // identifying props
  return ( // Returning stylized selection circle
    <RadioGroupPrimitive.Item // Radix Item primitive
      data-slot="radio-group-item" // identifier
      className={cn( // styling the physical circle
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", // comprehensive interactive and base styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <RadioGroupPrimitive.Indicator // Visual mark visible only when selected
        data-slot="radio-group-indicator" // identifier
        className="relative flex items-center justify-center" // centering indicator
      > // closing opening tag
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" /> // the internal selection dot
      </RadioGroupPrimitive.Indicator> // closing indicator
    </RadioGroupPrimitive.Item> // closing primitive
  ); // closing return
} // Closing RadioGroupItem component block

export { RadioGroup, RadioGroupItem }; // Exporting coordinated components
