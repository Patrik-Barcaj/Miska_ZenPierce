import * as React from "react"; // Importing core React library
import { Slot } from "@radix-ui/react-slot"; // Importing Radix UI Slot for component composition
import { cva, type VariantProps } from "class-variance-authority"; // Importing CVA for style variant management

import { cn } from "./utils"; // Importing utility for conditional class merging

const badgeVariants = cva( // Defining style variants for the Badge component
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", // Base styles for the badge
  { // Variant configurations
    variants: { // Defining sub-style categories
      variant: { // Focus on semantic coloring
        default: // Primary badge style
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90", // Standard brand colors
        secondary: // Secondary badge style
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90", // Subtle colors
        destructive: // Alert/Error badge style
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60", // Prominent red coloring
        outline: // Transparent badge with border
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground", // Minimalist border style
      }, // Closing dynamic variants
    }, // Closing variants block
    defaultVariants: { // Setting default values
      variant: "default", // Defaulting to the primary style
    }, // Closing default variants
  }, // Closing configuration object
); // Closing cva function call

function Badge({ // Main Badge component
  className, // Optional custom CSS classes
  variant, // Style variant selection
  asChild = false, // Prop to determine if component should render as its child
  ...props // Remaining props
}: React.ComponentProps<"span"> & // Native span props
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) { // Merged prop types
  const Comp = asChild ? Slot : "span"; // Choosing component primitive based on asChild prop

  return ( // Returning component JSX
    <Comp // Rendering base element or Slot
      data-slot="badge" // Slot identifier for styling and selection
      className={cn(badgeVariants({ variant }), className)} // Merging variant and custom styles
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing Badge component block

export { Badge, badgeVariants }; // Exporting component and variants
