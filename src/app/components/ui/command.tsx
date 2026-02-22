"use client"; // Client-side component for command palette functionality

import * as React from "react"; // Importing React core
import { Command as CommandPrimitive } from "cmdk"; // Importing the underlying command menu engine
import { SearchIcon } from "lucide-react"; // Importing search icon

import { cn } from "./utils"; // Importing utility for conditional class merging
import { // Importing Dialog components for the modal version
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"; // path to dialog component

function Command({ // Main command palette root component
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive>) { // identifying props from primitive
  return ( // Returning the command container
    <CommandPrimitive // The cmdk root
      data-slot="command" // identifier
      className={cn( // styling the container
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", // standard popover appearance
        className, // custom overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing engine tag
  ); // closing return
} // Closing Command component block

function CommandDialog({ // Specialized command palette that opens in a modal
  title = "Command Palette", // default accessible title
  description = "Search for a command to run...", // default accessible description
  children, // inner command components
  ...props // remaining dialog props
}: React.ComponentProps<typeof Dialog> & { // Merged props
  title?: string; // extension
  description?: string; // extension
}) { // component implementation
  return ( // Returning the dialog hierarchy
    <Dialog {...props}> // the modal provider
      <DialogHeader className="sr-only"> // hidden header for screen readers
        <DialogTitle>{title}</DialogTitle> // accessible title
        <DialogDescription>{description}</DialogDescription> // accessible description
      </DialogHeader> // closing header
      <DialogContent className="overflow-hidden p-0"> // the modal card
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"> // injecting complex nested styles for the dialog variant
          {children} // rendering the command content
        </Command> // closing command wrapper
      </DialogContent> // closing dialog content
    </Dialog> // closing dialog
  ); // closing return
} // Closing CommandDialog component block

function CommandInput({ // The search input field
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.Input>) { // identifying props
  return ( // Returning the input with icon wrapper
    <div // the visual wrapper
      data-slot="command-input-wrapper" // identifier
      className="flex h-9 items-center gap-2 border-b px-3" // horizontal layout with bottom border
    > // closing opening tag
      <SearchIcon className="size-4 shrink-0 opacity-50" /> // the search icon
      <CommandPrimitive.Input // the actual functional input
        data-slot="command-input" // identifier
        className={cn( // styling the input field
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", // clean transparent input style
          className, // overrides
        )} // closing cn
        {...props} // spreading props
      /> // closing tag
    </div> // closing wrapper
  ); // closing return
} // Closing CommandInput component block

function CommandList({ // Container for command results
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.List>) { // identifying props
  return ( // Returning the list container
    <CommandPrimitive.List // functional list component
      data-slot="command-list" // identifier
      className={cn( // styling the scrollable list
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", // height limit and scrolling
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandList component block

function CommandEmpty({ // Component shown when no results are found
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) { // identifying props
  return ( // Returning the empty state message
    <CommandPrimitive.Empty // functional empty state component
      data-slot="command-empty" // identifier
      className="py-6 text-center text-sm" // centered padding
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandEmpty component block

function CommandGroup({ // Grouping related command items
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.Group>) { // identifying props
  return ( // Returning the group container
    <CommandPrimitive.Group // functional group component
      data-slot="command-group" // identifier
      className={cn( // styling the group and its heading
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", // nested selector styling for headings
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandGroup component block

function CommandSeparator({ // Horizontal line between items or groups
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) { // identifying props
  return ( // Returning the visual separator
    <CommandPrimitive.Separator // functional separator
      data-slot="command-separator" // identifier
      className={cn("bg-border -mx-1 h-px", className)} // thin line with negative margin
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandSeparator component block

function CommandItem({ // Individual actionable item in the list
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof CommandPrimitive.Item>) { // identifying props
  return ( // Returning the command item
    <CommandPrimitive.Item // functional item component
      data-slot="command-item" // identifier
      className={cn( // styling the interactive item
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // highlight state and icon styling
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandItem component block

function CommandShortcut({ // Keyboard shortcut hint for an item
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<"span">) { // identifying span props
  return ( // Returning the shortcut label
    <span // simple text span
      data-slot="command-shortcut" // identifier
      className={cn( // styling the shortcut text
        "text-muted-foreground ml-auto text-xs tracking-widest", // muted right-aligned text
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CommandShortcut component block

export { // Exporting coordinated components
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}; // closing export block
