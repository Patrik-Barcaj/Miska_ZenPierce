"use client"; // Client-side component for handling dropdown menu interactivity

import * as React from "react"; // Importing core React library
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"; // Importing Radix UI Dropdown Menu primitives
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function DropdownMenu({ // Main coordination component for the dropdown
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) { // TS type definition from Radix
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />; // Rendering the functional root provider
} // Closing DropdownMenu component block

function DropdownMenuPortal({ // Portal for escaping container clipping
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) { // identifying props
  return ( // Returning functional portal
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} /> // Radix Portal primitive
  ); // closing return
} // Closing DropdownMenuPortal component block

function DropdownMenuTrigger({ // Item that activates the menu when clicked
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) { // identifying props
  return ( // Returning functional trigger
    <DropdownMenuPrimitive.Trigger // Radix Trigger primitive
      data-slot="dropdown-menu-trigger" // identifier
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DropdownMenuTrigger component block

function DropdownMenuContent({ // The floating panel container for menu items
  className, // optional classes
  sideOffset = 4, // distance from the trigger
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) { // identifying props
  return ( // Returning centered panel inside a portal
    <DropdownMenuPrimitive.Portal> // Automatically portal to document root
      <DropdownMenuPrimitive.Content // The actual menu box
        data-slot="dropdown-menu-content" // identifier
        sideOffset={sideOffset} // binding offset
        className={cn( // styling the floating panel
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", // complex animations and layout logic
          className, // overrides
        )} // closing cn call
        {...props} // spreading props
      /> // closing content primitive
    </DropdownMenuPrimitive.Portal> // closing portal
  ); // closing return
} // Closing DropdownMenuContent component block

function DropdownMenuGroup({ // Logic grouping for menu items
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) { // identifying props
  return ( // Returning group wrapper
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} /> // Radix Group primitive
  ); // closing return
} // Closing DropdownMenuGroup component block

function DropdownMenuItem({ // Standard actionable row in the menu
  className, // optional classes
  inset, // toggle for indentation
  variant = "default", // visual emphasis variant
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { // Merged props
  inset?: boolean; // indent flag
  variant?: "default" | "destructive"; // styling flag
}) { // component implementation
  return ( // Returning item JSX
    <DropdownMenuPrimitive.Item // Radix Item primitive
      data-slot="dropdown-menu-item" // identifier
      data-inset={inset} // binding indentation state
      data-variant={variant} // binding variant state
      className={cn( // styling the interactive row
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // complex selector based styling for states and variants
        className, // overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing item primitive
  ); // closing return
} // Closing DropdownMenuItem component block

function DropdownMenuCheckboxItem({ // Menu item that toggles between checked states
  className, // optional classes
  children, // item label content
  checked, // current boolean state
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) { // identifying props
  return ( // Returning toggleable row
    <DropdownMenuPrimitive.CheckboxItem // Radix CheckboxItem primitive
      data-slot="dropdown-menu-checkbox-item" // identifier
      className={cn( // styling the toggleable row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // item styles with space for indicator
        className, // overrides
      )} // closing cn block
      checked={checked} // binding state
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for check mark
        <DropdownMenuPrimitive.ItemIndicator> // Content only visible when checked
          <CheckIcon className="size-4" /> // rendering check icon
        </DropdownMenuPrimitive.ItemIndicator> // closing indicator
      </span> // closing box
      {children} // rendering label content
    </DropdownMenuPrimitive.CheckboxItem> // closing primitive
  ); // closing return
} // Closing DropdownMenuCheckboxItem component block

function DropdownMenuRadioGroup({ // Grouping for mutually exclusive selection items
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) { // identifying props
  return ( // Returning radio group provider
    <DropdownMenuPrimitive.RadioGroup // Radix RadioGroup primitive
      data-slot="dropdown-menu-radio-group" // identifier
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DropdownMenuRadioGroup component block

function DropdownMenuRadioItem({ // Selection item within a radio group
  className, // optional classes
  children, // item label content
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) { // identifying props
  return ( // Returning selection row
    <DropdownMenuPrimitive.RadioItem // Radix RadioItem primitive
      data-slot="dropdown-menu-radio-item" // identifier
      className={cn( // styling the radio row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // standard styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for selection dot
        <DropdownMenuPrimitive.ItemIndicator> // Content only visible when selected
          <CircleIcon className="size-2 fill-current" /> // rendering circle icon
        </DropdownMenuPrimitive.ItemIndicator> // closing indicator
      </span> // closing icon box
      {children} // rendering label
    </DropdownMenuPrimitive.RadioItem> // closing primitive
  ); // closing return
} // Closing DropdownMenuRadioItem component block

function DropdownMenuLabel({ // Non-interactive descriptive label in the menu
  className, // optional classes
  inset, // indentation toggle
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { // Merged props
  inset?: boolean; // indentation flag
}) { // component implementation
  return ( // Returning label JSX
    <DropdownMenuPrimitive.Label // Radix Label primitive
      data-slot="dropdown-menu-label" // identifier
      data-inset={inset} // binding state
      className={cn( // styling the text
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", // clean label styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing primitive
  ); // closing return
} // Closing DropdownMenuLabel component block

function DropdownMenuSeparator({ // Visual line dividing menu sections
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) { // identifying props
  return ( // Returning functional separator
    <DropdownMenuPrimitive.Separator // Radix Separator primitive
      data-slot="dropdown-menu-separator" // identifier
      className={cn("bg-border -mx-1 my-1 h-px", className)} // thin line with container escaping margin
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DropdownMenuSeparator component block

function DropdownMenuShortcut({ // Visual hint for keyboard shortcuts
  className, // optional classes
  ...props // remaining span props
}: React.ComponentProps<"span">) { // identifying span props
  return ( // Returning Shortcut JSX
    <span // simple span
      data-slot="dropdown-menu-shortcut" // identifier
      className={cn( // styling the hint
        "text-muted-foreground ml-auto text-xs tracking-widest", // right-aligned muted text
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DropdownMenuShortcut component block

function DropdownMenuSub({ // Logical wrapper for nested submenus
  ...props // spreading props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) { // identifying props
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />; // Rendering the functional subprovider
} // Closing DropdownMenuSub component block

function DropdownMenuSubTrigger({ // Item that opens a submenu when hovered or clicked
  className, // optional classes
  inset, // indentation toggle
  children, // trigger content
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { // Merged props
  inset?: boolean; // indent flag
}) { // component implementation
  return ( // Returning interactive subtrigger
    <DropdownMenuPrimitive.SubTrigger // Radix SubTrigger primitive
      data-slot="dropdown-menu-sub-trigger" // identifier
      data-inset={inset} // binding state
      className={cn( // styling the interactive row
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8", // standard item styles
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering trigger label
      <ChevronRightIcon className="ml-auto size-4" /> // trailing arrow indicator
    </DropdownMenuPrimitive.SubTrigger> // closing primitive
  ); // closing return
} // Closing DropdownMenuSubTrigger component block

function DropdownMenuSubContent({ // The content displayed inside a submenu
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) { // identifying props
  return ( // Returning submenu panel
    <DropdownMenuPrimitive.SubContent // Radix SubContent primitive
      data-slot="dropdown-menu-sub-content" // identifier
      className={cn( // styling the floating panel
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", // exit/entry animations
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing DropdownMenuSubContent component block

export { // Exporting coordinated components for full menu construction
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}; // closing export block
