"use client"; // Client-side component for accessible input labeling

import * as React from "react"; // Importing core React library
import * as LabelPrimitive from "@radix-ui/react-label"; // Importing Radix UI Label primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Label({ // Accessible text label for form controls
  className, // optional external classes
  ...props // remaining label props
}: React.ComponentProps<typeof LabelPrimitive.Root>) { // TS type definition from Radix
  return ( // Returning the stylized label
    <LabelPrimitive.Root // Radix Label primitive
      data-slot="label" // identifier
      className={cn( // styling the text
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", // typography and disabled state logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Label component block

export { Label }; // Exporting component
