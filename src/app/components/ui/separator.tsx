"use client"; // Client-side component for visual layout dividers

import * as React from "react"; // Importing core React library
import * as SeparatorPrimitive from "@radix-ui/react-separator"; // Importing Radix UI Separator primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Separator({ // Physical line used to group or separate content
  className, // optional external classes
  orientation = "horizontal", // direction of the line
  decorative = true, // toggle for accessibility (true = purely visual)
  ...props // remaining root props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) { // TS definition from Radix
  return ( // Returning functional line
    <SeparatorPrimitive.Root // Radix Root primitive
      data-slot="separator-root" // identifier
      decorative={decorative} // binding decorative flag
      orientation={orientation} // binding orientation
      className={cn( // styling the physical line
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", // dimension logic based on axis
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Separator component block

export { Separator }; // Exporting component
