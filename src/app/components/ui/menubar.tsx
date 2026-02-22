"use client"; // Client-side component for handling application menubar interactivity

import * as React from "react"; // Importing core React library
import * as MenubarPrimitive from "@radix-ui/react-menubar"; // Importing Radix UI Menubar primitives
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function Menubar({ // Main horizontal container for menu triggers
  className, // optional classes
  ...props // remaining root props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) { // TS definition
  return ( // Returning the bar
    <MenubarPrimitive.Root // Radix Root primitive
      data-slot="menubar" // identifier
      className={cn( // styling the bar
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs", // horizontal layout and clean surface
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing Menubar component block

function MenubarMenu({ // Logical wrapper for a single menu column
  ...props // spreading props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) { // identifying props
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />; // Radix Menu primitive
} // Closing MenubarMenu block

function MenubarGroup({ // Logic grouping for items within a menu
  ...props // spreading props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) { // identifying props
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />; // Radix Group primitive
} // Closing MenubarGroup block

function MenubarPortal({ // Portal for escaping container clipping
  ...props // spreading props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) { // identifying props
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />; // Radix Portal primitive
} // Closing MenubarPortal block

function MenubarRadioGroup({ // Mutual selection group for radio items
  ...props // spreading props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) { // identifying props
  return ( // Returning radio provider
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} /> // Radix RadioGroup primitive
  ); // closing return
} // Closing MenubarRadioGroup block

function MenubarTrigger({ // Item in the bar that opens a menu panel
  className, // optional classes
  ...props // remaining trigger props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) { // identifying props
  return ( // Returning interactive trigger
    <MenubarPrimitive.Trigger // Radix Trigger primitive
      data-slot="menubar-trigger" // identifier
      className={cn( // styling the trigger button
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none", // interactive highlighting
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarTrigger block

function MenubarContent({ // The floating panel displayed below a trigger
  className, // optional classes
  align = "start", // horizontal anchor position
  alignOffset = -4, // horizontal nudge
  sideOffset = 8, // vertical distance
  ...props // remaining content props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) { // identifying props
  return ( // Returning panel inside portal
    <MenubarPortal> // Automatically portal to document root
      <MenubarPrimitive.Content // The actual floating box
        data-slot="menubar-content" // identifier
        align={align} // binding alignment
        alignOffset={alignOffset} // binding offset
        sideOffset={sideOffset} // binding vertical offset
        className={cn( // styling the floating panel
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md", // complex entry animations and layouts
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      /> // closing content primitive
    </MenubarPortal> // closing portal
  ); // closing return
} // Closing MenubarContent block

function MenubarItem({ // Standard actionable row in a menu
  className, // optional classes
  inset, // indentation toggle
  variant = "default", // styling variant
  ...props // remaining item props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & { // Merged props
  inset?: boolean; // indentation flag
  variant?: "default" | "destructive"; // variant flag
}) { // component implementation
  return ( // Returning interactive row
    <MenubarPrimitive.Item // Radix Item primitive
      data-slot="menubar-item" // identifier
      data-inset={inset} // binding indentation state
      data-variant={variant} // binding variant state
      className={cn( // styling the interactive item
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // complex selector based styling for states and variants
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarItem block

function MenubarCheckboxItem({ // Menu item that toggles between checked states
  className, // optional classes
  children, // item text content
  checked, // current checked state
  ...props // remaining checkbox props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) { // identifying props
  return ( // Returning toggleable row
    <MenubarPrimitive.CheckboxItem // Radix CheckboxItem primitive
      data-slot="menubar-checkbox-item" // identifier
      className={cn( // styling the row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // item styles with space for check
        className, // overrides
      )} // closing cn block
      checked={checked} // binding state
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for checkmark
        <MenubarPrimitive.ItemIndicator> // visible only when checked
          <CheckIcon className="size-4" /> // rendering check icon
        </MenubarPrimitive.ItemIndicator> // closing indicator
      </span> // closing box
      {children} // rendering label content
    </MenubarPrimitive.CheckboxItem> // closing primitive
  ); // closing return
} // Closing MenubarCheckboxItem block

function MenubarRadioItem({ // Selection item within a radio group
  className, // optional classes
  children, // item text content
  ...props // remaining radio props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) { // identifying props
  return ( // Returning selection row
    <MenubarPrimitive.RadioItem // Radix RadioItem primitive
      data-slot="menubar-radio-item" // identifier
      className={cn( // styling the row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // standard menu row styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for selection dot
        <MenubarPrimitive.ItemIndicator> // visible only when selected
          <CircleIcon className="size-2 fill-current" /> // rendering circle icon
        </MenubarPrimitive.ItemIndicator> // closing indicator
      </span> // closing box
      {children} // rendering label
    </MenubarPrimitive.RadioItem> // closing primitive
  ); // closing return
} // Closing MenubarRadioItem block

function MenubarLabel({ // Non-interactive title in a menu panel
  className, // optional classes
  inset, // indentation toggle
  ...props // remaining label props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & { // Merged props
  inset?: boolean; // indentation flag
}) { // component implementation
  return ( // Returning label JSX
    <MenubarPrimitive.Label // Radix Label primitive
      data-slot="menubar-label" // identifier
      data-inset={inset} // binding state
      className={cn( // styling the text
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", // clean label styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarLabel block

function MenubarSeparator({ // Visual line dividing sections in a menu
  className, // optional classes
  ...props // remaining separator props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) { // identifying props
  return ( // Returning functional line
    <MenubarPrimitive.Separator // Radix Separator primitive
      data-slot="menubar-separator" // identifier
      className={cn("bg-border -mx-1 my-1 h-px", className)} // line escaping margins
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarSeparator block

function MenubarShortcut({ // Visual hint for keyboard shortcuts
  className, // optional classes
  ...props // remaining span props
}: React.ComponentProps<"span">) { // identifying span props
  return ( // Returning Shortcut Hint
    <span // simple span
      data-slot="menubar-shortcut" // identifier
      className={cn( // styling the hint text
        "text-muted-foreground ml-auto text-xs tracking-widest", // right-aligned muted text
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarShortcut block

function MenubarSub({ // Logical wrapper for nested submenus
  ...props // spreading props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) { // identifying props
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />; // Radix Sub primitive
} // Closing MenubarSub block

function MenubarSubTrigger({ // Item that opens a submenu when hovered
  className, // optional classes
  inset, // indentation toggle
  children, // trigger text content
  ...props // remaining trigger props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { // Merged props
  inset?: boolean; // indentation flag
}) { // component implementation
  return ( // Returning interactive trigger
    <MenubarPrimitive.SubTrigger // Radix SubTrigger primitive
      data-slot="menubar-sub-trigger" // identifier
      data-inset={inset} // binding indentation state
      className={cn( // styling the interactive row
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8", // highlighting logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering trigger label
      <ChevronRightIcon className="ml-auto h-4 w-4" /> // trailing arrow indicator
    </MenubarPrimitive.SubTrigger> // closing primitive
  ); // closing return
} // Closing MenubarSubTrigger block

function MenubarSubContent({ // The content displayed in a submenu panel
  className, // optional classes
  ...props // remaining content props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) { // identifying props
  return ( // Returning panel JSX
    <MenubarPrimitive.SubContent // Radix SubContent primitive
      data-slot="menubar-sub-content" // identifier
      className={cn( // styling the floating panel
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", // exit/entry animations
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing MenubarSubContent block

export { // Exporting coordinated components for full menubar assembly
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}; // closing export block
