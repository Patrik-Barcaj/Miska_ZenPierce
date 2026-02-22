"use client"; // Indicating this is a client-side component for browser interactivity

import * as React from "react"; // Importing core React library
import * as AccordionPrimitive from "@radix-ui/react-accordion"; // Importing Radix UI Accordion primitives
import { ChevronDownIcon } from "lucide-react"; // Importing the down arrow icon

import { cn } from "./utils"; // Importing utility for conditional class merging

function Accordion({ // Main Accordion container component
  ...props // Spreading remaining props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) { // TS type definition from Radix
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />; // Rendering the root accordion provider
} // Closing Accordion component

function AccordionItem({ // Component for individual accordion sections
  className, // Optional custom CSS classes
  ...props // Remaining props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) { // TS type definition from Radix
  return ( // Returning JSX for the item
    <AccordionPrimitive.Item // Radix Item primitive
      data-slot="accordion-item" // Slot identifier for styling
      className={cn("border-b last:border-b-0", className)} // Default bottom border with conditional override
      {...props} // Spreading props
    /> // Closing primitive tag
  ); // Closing return statement
} // Closing AccordionItem component

function AccordionTrigger({ // Component for the clickable header of each section
  className, // Optional custom CSS classes
  children, // Content to be displayed inside the trigger
  ...props // Remaining props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) { // TS type definition from Radix
  return ( // Returning JSX for the trigger
    <AccordionPrimitive.Header className="flex"> // Radix Header wrapper for accessibility
      <AccordionPrimitive.Trigger // Functional trigger element
        data-slot="accordion-trigger" // Slot identifier
        className={cn( // Merging base and custom styles
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", // Complex Tailwind styling including focus states and icon rotation
          className, // Custom override
        )} // Closing cn function
        {...props} // Spreading props
      > // Closing opening tag
        {children} // Rendering trigger content
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" /> // Rendering animated arrow icon
      </AccordionPrimitive.Trigger> // Closing Radix trigger
    </AccordionPrimitive.Header> // Closing Radix header
  ); // Closing return statement
} // Closing AccordionTrigger component

function AccordionContent({ // Component for the collapsible body content
  className, // Optional custom CSS classes
  children, // Content to be displayed
  ...props // Remaining props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) { // TS type definition from Radix
  return ( // Returning JSX for the content
    <AccordionPrimitive.Content // Radix Content primitive
      data-slot="accordion-content" // Slot identifier
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" // Animation logic for expanding/collapsing
      {...props} // Spreading props
    > // Closing opening tag
      <div className={cn("pt-0 pb-4", className)}>{children}</div> // Inner wrapper for proper padding
    </AccordionPrimitive.Content> // Closing Radix content
  ); // Closing return statement
} // Closing AccordionContent component

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; // Exporting all components for external use
