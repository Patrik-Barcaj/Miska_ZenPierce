"use client"; // Client-side component for custom styled scrollbars

import * as React from "react"; // Importing core React library
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"; // Importing Radix UI Scroll Area primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function ScrollArea({ // Scrollable container wrapper
  className, // optional external classes
  children, // content to scroll
  ...props // remaining root props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) { // TS definition from Radix
  return ( // Returning functional scroll block
    <ScrollAreaPrimitive.Root // Radix Root primitive
      data-slot="scroll-area" // identifier
      className={cn("relative", className)} // relative anchor for bars
      {...props} // spreading props
    > // closing opening tag
      <ScrollAreaPrimitive.Viewport // The physical clipping box
        data-slot="scroll-area-viewport" // identifier
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1" // full size with focus styles
      > // closing opening tag
        {children} // rendering scrollable content
      </ScrollAreaPrimitive.Viewport> // closing viewport
      <ScrollBar /> // internal default vertical scrollbar
      <ScrollAreaPrimitive.Corner /> // interaction point for dual-axis scrollbars
    </ScrollAreaPrimitive.Root> // closing primitive root
  ); // closing return
} // Closing ScrollArea component block

function ScrollBar({ // The visual slider element
  className, // optional classes
  orientation = "vertical", // axis of scroll (vertical or horizontal)
  ...props // horizontal/vertical props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) { // identifying props
  return ( // Returning functional bar
    <ScrollAreaPrimitive.ScrollAreaScrollbar // Radix Scrollbar primitive
      data-slot="scroll-area-scrollbar" // identifier
      orientation={orientation} // binding orientation
      className={cn( // styling the bar track
        "flex touch-none p-px transition-colors select-none", // shared layout logic
        orientation === "vertical" && // logic for vertical axis
          "h-full w-2.5 border-l border-l-transparent", // tall and slim
        orientation === "horizontal" && // logic for horizontal axis
          "h-2.5 flex-col border-t border-t-transparent", // wide and flat
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <ScrollAreaPrimitive.ScrollAreaThumb // The physical slider piece
        data-slot="scroll-area-thumb" // identifier
        className="bg-border relative flex-1 rounded-full" // rounded rect pill
      /> // closing thumb primitive
    </ScrollAreaPrimitive.ScrollAreaScrollbar> // closing primitive bar
  ); // closing return
} // Closing ScrollBar component block

export { ScrollArea, ScrollBar }; // Exporting coordinated components
