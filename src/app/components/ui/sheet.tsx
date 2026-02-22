"use client"; // Client-side component for sliding side-panel overlays

import * as React from "react"; // Importing core React library
import * as SheetPrimitive from "@radix-ui/react-dialog"; // Importing Radix UI Dialog primitives (base for Sheets)
import { XIcon } from "lucide-react"; // Importing iconography for close button

import { cn } from "./utils"; // Importing utility for conditional class merging

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) { // Primary coordination component for the side panel
  return <SheetPrimitive.Root data-slot="sheet" {...props} />; // functional root provider
} // Closing Sheet block

function SheetTrigger({ // Item that opens the panel when interacted with
  ...props // spreading props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) { // identifying props
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />; // Radix Trigger primitive
} // Closing SheetTrigger block

function SheetClose({ // Item that closes the panel when interacted with
  ...props // spreading props
}: React.ComponentProps<typeof SheetPrimitive.Close>) { // identifying props
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />; // Radix Close primitive
} // Closing SheetClose block

function SheetPortal({ // Coordination wrapper for portaling content to document root
  ...props // spreading props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) { // identifying props
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />; // Radix Portal primitive
} // Closing SheetPortal block

function SheetOverlay({ // Full-screen dimming background behind the panel
  className, // optional classes
  ...props // remaining overlay props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) { // identifying props
  return ( // Returning stylized overlay
    <SheetPrimitive.Overlay // Radix Overlay primitive
      data-slot="sheet-overlay" // identifier
      className={cn( // styling the dimmed background
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", // entry/exit fades and fixed positioning
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SheetOverlay block

function SheetContent({ // The actual sliding panel container
  className, // optional classes
  children, // panel content
  side = "right", // side of screen the panel emerges from
  ...props // remaining content props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { // Merged prop types
  side?: "top" | "right" | "bottom" | "left"; // explicit side options
}) { // component implementation
  return ( // Returning content inside a portal
    <SheetPortal> // Ensuring panel is rendered at top level
      <SheetOverlay /> // adding the background dim
      <SheetPrimitive.Content // Radix Content primitive
        data-slot="sheet-content" // identifier
        className={cn( // styling the physical panel
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", // shared animation and layout logic
          side === "right" && // logic for right-side drawer
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", // tall and sliding from right
          side === "left" && // logic for left-side drawer
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", // tall and sliding from left
          side === "top" && // logic for top drawer
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", // wide and sliding from top
          side === "bottom" && // logic for bottom drawer
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", // wide and sliding from bottom
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      > // closing opening tag
        {children} // rendering panel items
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"> // internal sticky close button
          <XIcon className="size-4" /> // internal icon
          <span className="sr-only">Close</span> // accessibility label
        </SheetPrimitive.Close> // closing close trigger
      </SheetPrimitive.Content> // closing primitive content
    </SheetPortal> // closing portal
  ); // closing return
} // Closing SheetContent block

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) { // Contextual header for the panel
  return ( // Returning flex container
    <div // standard div
      data-slot="sheet-header" // identifier
      className={cn("flex flex-col gap-1.5 p-4", className)} // vertical spacing and padding
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SheetHeader block

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) { // Contextual footer for the panel (sticky-bottom usage)
  return ( // Returning flex container
    <div // standard div
      data-slot="sheet-footer" // identifier
      className={cn("mt-auto flex flex-col gap-2 p-4", className)} // pushed to bottom with padding
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SheetFooter block

function SheetTitle({ // Display title for the panel (required for accessibility)
  className, // optional classes
  ...props // remaining title props
}: React.ComponentProps<typeof SheetPrimitive.Title>) { // identifying props
  return ( // Returning stylized text
    <SheetPrimitive.Title // Radix Title primitive
      data-slot="sheet-title" // identifier
      className={cn("text-foreground font-semibold", className)} // bold primary color text
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SheetTitle block

function SheetDescription({ // Descriptive text for the panel purpose
  className, // optional classes
  ...props // remaining description props
}: React.ComponentProps<typeof SheetPrimitive.Description>) { // identifying props
  return ( // Returning stylized text
    <SheetPrimitive.Description // Radix Description primitive
      data-slot="sheet-description" // identifier
      className={cn("text-muted-foreground text-sm", className)} // subtle small text
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SheetDescription block

export { // Exporting coordinated components for side-panel construction
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}; // closing export block
