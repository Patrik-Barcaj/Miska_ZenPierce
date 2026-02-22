"use client"; // Client-side component for handling interactive select dropdowns

import * as React from "react"; // Importing core React library
import * as SelectPrimitive from "@radix-ui/react-select"; // Importing Radix UI Select primitives
import { // Importing iconography icons
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

import { cn } from "./utils"; // Importing utility for conditional class merging

function Select({ // Main coordination component for the selection state
  ...props // spreading props
}: React.ComponentProps<typeof SelectPrimitive.Root>) { // identifying props
  return <SelectPrimitive.Root data-slot="select" {...props} />; // functional root provider from Radix
} // Closing Select component block

function SelectGroup({ // Internal wrapper for grouping related selection items
  ...props // spreading props
}: React.ComponentProps<typeof SelectPrimitive.Group>) { // identifying props
  return <SelectPrimitive.Group data-slot="select-group" {...props} />; // Radix Group primitive
} // Closing SelectGroup component block

function SelectValue({ // Display area for the currently selected value
  ...props // spreading props
}: React.ComponentProps<typeof SelectPrimitive.Value>) { // identifying props
  return <SelectPrimitive.Value data-slot="select-value" {...props} />; // Radix Value primitive
} // Closing SelectValue component block

function SelectTrigger({ // Actionable button that opens the selection dropdown
  className, // optional external classes
  size = "default", // predefined size variant
  children, // trigger inner content (usually SelectValue)
  ...props // remaining trigger props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { // Merged prop types
  size?: "sm" | "default"; // explicit size options
}) { // component implementation
  return ( // Returning the interactive button
    <SelectPrimitive.Trigger // Radix Trigger primitive
      data-slot="select-trigger" // identifier
      data-size={size} // binding size state
      className={cn( // styling the physical trigger
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // comprehensive interactive and state styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering select label content
      <SelectPrimitive.Icon asChild> // dropdown arrow icon wrapper
        <ChevronDownIcon className="size-4 opacity-50" /> // the internal icon
      </SelectPrimitive.Icon> // closing icon primitive
    </SelectPrimitive.Trigger> // closing trigger primitive
  ); // closing return
} // Closing SelectTrigger component block

function SelectContent({ // Floating panel containing selection options
  className, // optional classes
  children, // list items
  position = "popper", // floating positioning logic
  ...props // remaining content props
}: React.ComponentProps<typeof SelectPrimitive.Content>) { // identifying props
  return ( // Returning content inside a portal
    <SelectPrimitive.Portal> // Portaling for z-index safety
      <SelectPrimitive.Content // Radix Content primitive
        data-slot="select-content" // identifier
        className={cn( // styling the floating panel
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", // exit/entry animations and standard layout
          position === "popper" && // popper-specific offset translations
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", // small gap from trigger
          className, // overrides
        )} // closing cn block
        position={position} // binding position type
        {...props} // spreading props
      > // closing opening tag
        <SelectScrollUpButton /> // helper for scrolling overflow upwards
        <SelectPrimitive.Viewport // The physical view container for items
          className={cn( // styling the internal viewport
            "p-1", // small internal padding
            position === "popper" && // popper-specific dimensions
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1", // matching trigger width
          )} // closing cn block
        > // closing opening tag
          {children} // rendering categorized items
        </SelectPrimitive.Viewport> // closing viewport
        <SelectScrollDownButton /> // helper for scrolling overflow downwards
      </SelectPrimitive.Content> // closing primitive content
    </SelectPrimitive.Portal> // closing portal
  ); // closing return
} // Closing SelectContent block

function SelectLabel({ // Categorical label within the select list
  className, // optional classes
  ...props // remaining label props
}: React.ComponentProps<typeof SelectPrimitive.Label>) { // identifying props
  return ( // Returning non-interactive label
    <SelectPrimitive.Label // Radix Label primitive
      data-slot="select-label" // identifier
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} // subtle small text
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SelectLabel block

function SelectItem({ // Single actionable selection option
  className, // optional classes
  children, // item label content
  ...props // remaining item props
}: React.ComponentProps<typeof SelectPrimitive.Item>) { // identifying props
  return ( // Returning interactive item
    <SelectPrimitive.Item // Radix Item primitive
      data-slot="select-item" // identifier
      className={cn( // styling the selectable item row
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", // highlight logic and layout for text/icons
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <span className="absolute right-2 flex size-3.5 items-center justify-center"> // checkmark icon track
        <SelectPrimitive.ItemIndicator> // Radix selected-state indicator
          <CheckIcon className="size-4" /> // internal checkmark icon
        </SelectPrimitive.ItemIndicator> // closing indicator
      </span> // closing track
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText> // The physical item label provider
    </SelectPrimitive.Item> // closing primitive item
  ); // closing return
} // Closing SelectItem block

function SelectSeparator({ // Visual divider between items or groups
  className, // optional classes
  ...props // remaining separator props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) { // identifying props
  return ( // Returning horizontal line
    <SelectPrimitive.Separator // Radix Separator primitive
      data-slot="select-separator" // identifier
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)} // thin divider with negative margin
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SelectSeparator block

function SelectScrollUpButton({ // Indicator button for overflow scrolling up
  className, // optional classes
  ...props // remaining button props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) { // identifying props
  return ( // Returning helper button
    <SelectPrimitive.ScrollUpButton // Radix ScrollUp primitive
      data-slot="select-scroll-up-button" // identifier
      className={cn( // styling the scroll sensor
        "flex cursor-default items-center justify-center py-1", // centered vertical hit area
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <ChevronUpIcon className="size-4" /> // internal directional icon
    </SelectPrimitive.ScrollUpButton> // closing primitive
  ); // closing return
} // Closing SelectScrollUpButton block

function SelectScrollDownButton({ // Indicator button for overflow scrolling down
  className, // optional classes
  ...props // remaining button props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) { // identifying props
  return ( // Returning helper button
    <SelectPrimitive.ScrollDownButton // Radix ScrollDown primitive
      data-slot="select-scroll-down-button" // identifier
      className={cn( // styling the scroll sensor
        "flex cursor-default items-center justify-center py-1", // centered vertical hit area
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <ChevronDownIcon className="size-4" /> // internal directional icon
    </SelectPrimitive.ScrollDownButton> // closing primitive
  ); // closing return
} // Closing SelectScrollDownButton block

export { // Exporting coordinated components for dropdown selection construction
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}; // closing export block
