"use client"; // Client-side entry for toggle selection groups

import * as React from "react"; // Core React library
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"; // Radix UI Toggle Group primitives
import { type VariantProps } from "class-variance-authority"; // Variant prop type support

import { cn } from "./utils"; // Utility for merging Tailwind classes
import { toggleVariants } from "./toggle"; // Sharing variants from base toggle component

const ToggleGroupContext = React.createContext< // Context for cascading variants to items
  VariantProps<typeof toggleVariants> // variant prop types
>({ // opening context
  size: "default", // default size
  variant: "default", // default style
}); // closing context

function ToggleGroup({ // Container for grouping multiple toggle buttons
  className, // optional classes
  variant, // style choice
  size, // size choice
  children, // nested toggle items
  ...props // Radix props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & // TS extensions
  VariantProps<typeof toggleVariants>) { // extending with variant type
  return ( // Returning functional group
    <ToggleGroupPrimitive.Root // Radix Root primitive
      data-slot="toggle-group" // identifier
      data-variant={variant} // binding variant state
      data-size={size} // binding size state
      className={cn( // styling the group
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", // horizontal layout with outline-specific shadow
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <ToggleGroupContext.Provider value={{ variant, size }}> // Providing visual settings to items
        {children} // rendering toggle group items
      </ToggleGroupContext.Provider> // closing provider
    </ToggleGroupPrimitive.Root> // closing root
  ); // closing return
} // Closing ToggleGroup block

function ToggleGroupItem({ // An individual selectable button within a ToggleGroup
  className, // optional classes
  children, // text or icon content
  variant, // local variant override
  size, // local size override
  ...props // Radix item props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & // TS extensions
  VariantProps<typeof toggleVariants>) { // extending with variant type
  const context = React.useContext(ToggleGroupContext); // consuming group-level variants

  return ( // Returning functional item
    <ToggleGroupPrimitive.Item // physical Radix Item primitive
      data-slot="toggle-group-item" // identifier
      data-variant={context.variant || variant} // determining effective variant
      data-size={context.size || size} // determining effective size
      className={cn( // styling the physical button
        toggleVariants({ // using shared toggle logic
          variant: context.variant || variant, // applying context if present
          size: context.size || size, // applying context if present
        }), // closing variants
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", // aesthetic border merging logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering button content
    </ToggleGroupPrimitive.Item> // closing item
  ); // closing return
} // Closing ToggleGroupItem block

export { ToggleGroup, ToggleGroupItem }; // Exporting components
