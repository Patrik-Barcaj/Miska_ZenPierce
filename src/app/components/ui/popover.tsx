"use client"; // Client-side component for handling floating popover interactivity

import * as React from "react"; // Importing core React library
import * as PopoverPrimitive from "@radix-ui/react-popover"; // Importing Radix UI Popover primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Popover({ // Primary coordination component for the popover
  ...props // spreading props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) { // TS definition
  return <PopoverPrimitive.Root data-slot="popover" {...props} />; // Rendering the functional root provider
} // Closing Popover component block

function PopoverTrigger({ // Item that opens the popover when ashed
  ...props // spreading props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) { // identifying props
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />; // Radix Trigger primitive
} // Closing PopoverTrigger component block

function PopoverContent({ // The floating panel displayed above the trigger
  className, // optional classes
  align = "center", // horizontal alignment relative to trigger
  sideOffset = 4, // distance from trigger
  ...props // remaining content props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) { // identifying props
  return ( // Returning content inside a portal
    <PopoverPrimitive.Portal> // Automatically portal to document root
      <PopoverPrimitive.Content // The actual floating box
        data-slot="popover-content" // identifier
        align={align} // binding alignment
        sideOffset={sideOffset} // binding offset
        className={cn( // styling the floating panel
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", // exit/entry animations and standard layout
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      /> // closing primitive content
    </PopoverPrimitive.Portal> // closing portal
  ); // closing return
} // Closing PopoverContent block

function PopoverAnchor({ // Optional secondary element to anchor the popover to
  ...props // spreading props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) { // identifying props
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />; // Radix Anchor primitive
} // Closing PopoverAnchor component block

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }; // Exporting coordinated components
