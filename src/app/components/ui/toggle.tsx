"use client"; // Client-side entry for binary toggle buttons

import * as React from "react"; // Core React library
import * as TogglePrimitive from "@radix-ui/react-toggle"; // Radix UI Toggle primitives
import { cva, type VariantProps } from "class-variance-authority"; // Dynamic styling generator

import { cn } from "./utils"; // Utility for merging Tailwind classes

const toggleVariants = cva( // Defining aesthetic variations for toggle states
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", // base interactive and state-dependent styles
  { // variants configuration
    variants: { // visual props
      variant: { // style choices
        default: "bg-transparent", // clean background
        outline: // bordered style
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground", // classic border with accent hover
      }, // closing variants
      size: { // dimension choices
        default: "h-9 px-2 min-w-9", // standard height
        sm: "h-8 px-1.5 min-w-8", // compact height
        lg: "h-10 px-2.5 min-w-10", // larger height
      }, // closing sizes
    }, // closing categories
    defaultVariants: { // fallback values
      variant: "default", // default style
      size: "default", // default size
    }, // closing defaults
  }, // closing configuration
); // Closing cva block

function Toggle({ // A two-state button that can be either "on" or "off"
  className, // optional classes
  variant, // style choice
  size, // size choice
  ...props // Radix props
}: React.ComponentProps<typeof TogglePrimitive.Root> & // TS extensions
  VariantProps<typeof toggleVariants>) { // extending with variant types
  return ( // Returning functional toggle
    <TogglePrimitive.Root // physical Radix primitive
      data-slot="toggle" // identifier
      className={cn(toggleVariants({ variant, size, className }))} // applying generated visual styles and overrides
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Toggle block

export { Toggle, toggleVariants }; // Exporting component and variants for reuse
