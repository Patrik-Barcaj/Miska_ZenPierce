"use client"; // Client-side component for visual toggle switches

import * as React from "react"; // Importing core React library
import * as SwitchPrimitive from "@radix-ui/react-switch"; // Importing Radix UI Switch primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Switch({ // Interactive binary toggle slider
  className, // optional external classes
  ...props // remaining root props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) { // TS definition from Radix
  return ( // Returning functional switch
    <SwitchPrimitive.Root // Radix Root primitive
      data-slot="switch" // identifier
      className={cn( // styling the track
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", // comprehensive interactive and state-based track styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <SwitchPrimitive.Thumb // The physical slider pill
        data-slot="switch-thumb" // identifier
        className={cn( // styling the physical slider piece
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0", // internal movement and color logic
        )} // closing cn block
      /> // closing thumb primitive
    </SwitchPrimitive.Root> // closing primitive root
  ); // closing return
} // Closing Switch component block

export { Switch }; // Exporting component
