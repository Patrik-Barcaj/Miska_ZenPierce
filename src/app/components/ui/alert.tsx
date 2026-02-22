import * as React from "react"; // Importing React core library
import { cva, type VariantProps } from "class-variance-authority"; // Importing CVA for managing component variants

import { cn } from "./utils"; // Importing utility for conditional class merging

const alertVariants = cva( // Defining style variants for the Alert component
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", // Base styles including grid layout for optional icons
  { // Variant configurations
    variants: { // Defining sub-variants
      variant: { // Focus on semantic variants
        default: "bg-card text-card-foreground", // Standard alert style
        destructive: // Critical alert style
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90", // Reddish coloring for error states
      }, // Closing dynamic variants
    }, // Closing variants block
    defaultVariants: { // Setting default values
      variant: "default", // Defaulting to the standard look
    }, // Closing default variants
  }, // Closing metadata object
); // Closing cva function call

function Alert({ // main Alert wrapper component
  className, // Optional custom CSS classes
  variant, // Variant selector (default/destructive)
  ...props // Remaining props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) { // Merged prop types for div and variants
  return ( // Returning component JSX
    <div // main container div
      data-slot="alert" // Slot identifier for styling
      role="alert" // Semantic ARIA role for accessibility
      className={cn(alertVariants({ variant }), className)} // Applying dynamic styles based on variant and custom class
      {...props} // Spreading remaining props
    /> // Closing div tag
  ); // Closing return statement
} // Closing Alert component

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) { // Component for the alert's main heading
  return ( // Returning JSX for title
    <div // heading container
      data-slot="alert-title" // Slot identifier
      className={cn( // Applying styles
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", // Proper grid positioning and typography
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing div tag
  ); // Closing return statement
} // Closing AlertTitle component

function AlertDescription({ // Component for the alert's secondary message text
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"div">) { // Standard div props
  return ( // Returning JSX for description
    <div // message container
      data-slot="alert-description" // Slot identifier
      className={cn( // Applying styles
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", // Grid alignment and readability styling
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing div tag
  ); // Closing return statement
} // Closing AlertDescription component

export { Alert, AlertTitle, AlertDescription }; // Exporting components for modular consumption
