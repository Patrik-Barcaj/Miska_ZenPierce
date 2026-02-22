"use client"; // Client-side component for handling hover-activated information cards

import * as React from "react"; // Importing core React library
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"; // Importing Radix UI Hover Card primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function HoverCard({ // Main coordination component for the hover card
  ...props // spreading props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) { // TS type definition from Radix
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />; // Rendering the functional root provider
} // Closing HoverCard component block

function HoverCardTrigger({ // Item that activates the card when hovered
  ...props // spreading props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) { // identifying props
  return ( // Returning functional trigger
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} /> // Radix Trigger primitive
  ); // closing return
} // Closing HoverCardTrigger component block

function HoverCardContent({ // The floating panel displayed on hover
  className, // optional classes
  align = "center", // horizontal alignment relative to trigger
  sideOffset = 4, // distance from trigger
  ...props // remaining content props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) { // identifying props
  return ( // Returning content inside a portal
    <HoverCardPrimitive.Portal data-slot="hover-card-portal"> // Automatically portal to document root
      <HoverCardPrimitive.Content // The actual floating box
        data-slot="hover-card-content" // identifier
        align={align} // binding alignment
        sideOffset={sideOffset} // binding offset
        className={cn( // styling the floating panel
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", // complex animations and layout styles
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      /> // closing content primitive
    </HoverCardPrimitive.Portal> // closing portal
  ); // closing return
} // Closing HoverCardContent block

export { HoverCard, HoverCardTrigger, HoverCardContent }; // Exporting coordinated components
