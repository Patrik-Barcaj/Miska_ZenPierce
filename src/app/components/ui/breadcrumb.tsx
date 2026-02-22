import * as React from "react"; // Importing core React library
import { Slot } from "@radix-ui/react-slot"; // Importing Radix UI Slot for component composition
import { ChevronRight, MoreHorizontal } from "lucide-react"; // Importing essential icons

import { cn } from "./utils"; // Importing utility for conditional class merging

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) { // Main navigation wrapper for breadcrumbs
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />; // Rendering semantic nav element with ARIA support
} // Closing Breadcrumb component block

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) { // Component for the ordered list of items
  return ( // Returning JSX for the list
    <ol // semantic ordered list
      data-slot="breadcrumb-list" // Slot identifier
      className={cn( // Applying list layout styles
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", // Responsive flex layout
        className, // Custom override
      )} // Closing cn call
      {...props} // Spreading props
    /> // Closing ol tag
  ); // Closing return statement
} // Closing BreadcrumbList component block

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) { // Component for individual list items
  return ( // Returning JSX for the item
    <li // semantic list item
      data-slot="breadcrumb-item" // Slot identifier
      className={cn("inline-flex items-center gap-1.5", className)} // flex layout for item + separator
      {...props} // Spreading props
    /> // Closing li tag
  ); // Closing return statement
} // Closing BreadcrumbItem component block

function BreadcrumbLink({ // Component for interactive breadcrumb links
  asChild, // Prop to allow custom element rendering (e.g., Next.js Link)
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"a"> & { // Native anchor props
  asChild?: boolean; // Prop type
}) { // Component implementation
  const Comp = asChild ? Slot : "a"; // Determining primitive base

  return ( // Returning link JSX
    <Comp // Rendering base or Slot
      data-slot="breadcrumb-link" // Slot identifier
      className={cn("hover:text-foreground transition-colors", className)} // Smooth hover state styling
      {...props} // Spreading props
    /> // Closing tag
  ); // Closing return statement
} // Closing BreadcrumbLink component block

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) { // Component for the current page indicator
  return ( // Returning JSX for the current page
    <span // non-interactive span
      data-slot="breadcrumb-page" // Slot identifier
      role="link" // ARIA role for navigation clarity
      aria-disabled="true" // Indicating this is the terminal item
      aria-current="page" // Accessibility state for current location
      className={cn("text-foreground font-normal", className)} // Visual style for active item
      {...props} // Spreading props
    /> // Closing span tag
  ); // Closing return statement
} // Closing BreadcrumbPage component block

function BreadcrumbSeparator({ // Component for separating items (usually an arrow icon)
  children, // Optional custom separator icon
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"li">) { // Standard list item props
  return ( // Returning JSX for separator
    <li // presentation item
      data-slot="breadcrumb-separator" // Slot identifier
      role="presentation" // ARIA role for non-semantic item
      aria-hidden="true" // Hiding from screen readers as it's purely visual
      className={cn("[&>svg]:size-3.5", className)} // Sizing for inner icons
      {...props} // Spreading props
    > // Closing opening tag
      {children ?? <ChevronRight />} // Defaulting to right arrow if no custom child provided
    </li> // Closing li tag
  ); // Closing return statement
} // Closing BreadcrumbSeparator component block

function BreadcrumbEllipsis({ // Component for representing truncated path segments
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<"span">) { // Standard span props
  return ( // Returning JSX for ellipsis
    <span // icon wrapper
      data-slot="breadcrumb-ellipsis" // Slot identifier
      role="presentation" // Purely visual indicator
      aria-hidden="true" // Hiding from screen readers
      className={cn("flex size-9 items-center justify-center", className)} // Centered box for the ellipsis
      {...props} // Spreading props
    > // Closing opening tag
      <MoreHorizontal className="size-4" /> // Standard three-dot icon
      <span className="sr-only">More</span> // SR hint for the ellipsis
    </span> // Closing span tag
  ); // Closing return statement
} // Closing BreadcrumbEllipsis component block

export { // Exporting all sub-components for modular breadcrumb construction
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}; // Closing export block
