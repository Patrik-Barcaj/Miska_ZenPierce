"use client"; // Client-side entry for hover-based information popups

import * as React from "react"; // Core React library
import * as TooltipPrimitive from "@radix-ui/react-tooltip"; // Radix UI Tooltip primitives

import { cn } from "./utils"; // Utility for merging Tailwind classes

function TooltipProvider({ // Higher-order component to manage tooltip timing across the application
  delayDuration = 0, // default hover delay (0 for instant)
  ...props // provider props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) { // TS extension
  return ( // Returning functional provider
    <TooltipPrimitive.Provider // physical Radix primitive
      data-slot="tooltip-provider" // identifier
      delayDuration={delayDuration} // binding duration
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing TooltipProvider block

function Tooltip({ // Root container for a single tooltip instance
  ...props // root props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) { // TS extension
  return ( // Returning wrapped tooltip
    <TooltipProvider> // Ensuring provider exists
      <TooltipPrimitive.Root data-slot="tooltip" {...props} /> // literal Radix root
    </TooltipProvider> // closing provider
  ); // closing return
} // Closing Tooltip block

function TooltipTrigger({ // The element that reveals the tooltip on hover or focus
  ...props // trigger props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) { // TS extension
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />; // returning literal Radix trigger
} // Closing TooltipTrigger block

function TooltipContent({ // The actual popup balloon containing the information
  className, // optional classes
  sideOffset = 0, // visual gap from the trigger
  children, // content to display
  ...props // content props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) { // TS extension
  return ( // Returning functional content with portal and transitions
    <TooltipPrimitive.Portal> // Rendering outside the parent DOM tree for positioning reliability
      <TooltipPrimitive.Content // physical Radix content
        data-slot="tooltip-content" // identifier
        sideOffset={sideOffset} // applying gap
        className={cn( // styling the popup
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", // primary background with entry/exit animations and typography adjustments
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      > // closing opening tag
        {children} // rendering popup content
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" /> // visual pointer arrow pointing back to trigger
      </TooltipPrimitive.Content> // closing content
    </TooltipPrimitive.Portal> // closing portal
  ); // closing return
} // Closing TooltipContent block

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }; // Exporting component set
