"use client"; // Client-side component for visual progress bars

import * as React from "react"; // Importing core React library
import * as ProgressPrimitive from "@radix-ui/react-progress"; // Importing Radix UI Progress primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Progress({ // Visual line showing completion status
  className, // optional external classes
  value, // percentage completion (0-100)
  ...props // remaining root props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) { // TS type definition from Radix
  return ( // Returning functional bar
    <ProgressPrimitive.Root // Radix Root primitive
      data-slot="progress" // identifier
      className={cn( // styling the outer track
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", // slim track with subtle fill
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <ProgressPrimitive.Indicator // The filled portion of the bar
        data-slot="progress-indicator" // identifier
        className="bg-primary h-full w-full flex-1 transition-all" // solid primary color with smooth motion
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // CSS transform based on value for performance
      /> // closing indicator primitive
    </ProgressPrimitive.Root> // closing primitive
  ); // closing return
} // Closing Progress component block

export { Progress }; // Exporting component
