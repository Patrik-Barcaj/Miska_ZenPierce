"use client"; // Client-side component for handling context menu interactivity

import * as React from "react"; // Importing React core library
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"; // Importing Radix UI Context Menu primitives
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function ContextMenu({ // Root coordination component for the context menu
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) { // TS type definition from Radix
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />; // Rendering the functional root provider
} // Closing ContextMenu component block

function ContextMenuTrigger({ // Designated area that activates the menu on right-click
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) { // TS type definition
  return ( // Returning the trigger component
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} /> // Radix Trigger primitive
  ); // closing return
} // Closing ContextMenuTrigger component block

function ContextMenuGroup({ // Logic grouping for menu items
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) { // TS type definition
  return ( // Returning the group wrapper
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} /> // Radix Group primitive
  ); // closing return
} // Closing ContextMenuGroup component block

function ContextMenuPortal({ // Portal for escaping container clipping
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) { // TS type definition
  return ( // Returning the portal component
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} /> // Radix Portal primitive
  ); // closing return
} // Closing ContextMenuPortal component block

function ContextMenuSub({ // Logical wrapper for nested submenus
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) { // TS type definition
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />; // Radix Sub primitive
} // Closing ContextMenuSub component block

function ContextMenuRadioGroup({ // Grouping for mutually exclusive selection items
  ...props // spreading props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) { // TS type definition
  return ( // Returning the radio group
    <ContextMenuPrimitive.RadioGroup // Radix RadioGroup primitive
      data-slot="context-menu-radio-group" // identifier
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing ContextMenuRadioGroup component block

function ContextMenuSubTrigger({ // Item that opens a submenu when hovered or clicked
  className, // optional external classes
  inset, // toggle for indent alignment
  children, // trigger content
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { // Merged prop types
  inset?: boolean; // indentation flag
}) { // component implementation
  return ( // Returning the subtrigger JSX
    <ContextMenuPrimitive.SubTrigger // Radix SubTrigger primitive
      data-slot="context-menu-sub-trigger" // identifier
      data-inset={inset} // binding state to attribute
      className={cn( // styling the interactive row
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // standard menu item styles
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering text/icons
      <ChevronRightIcon className="ml-auto" /> // trailing arrow indicator
    </ContextMenuPrimitive.SubTrigger> // closing primitive
  ); // closing return
} // Closing ContextMenuSubTrigger component block

function ContextMenuSubContent({ // The content displayed inside a submenu
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) { // identifying props
  return ( // Returning the submenu panel
    <ContextMenuPrimitive.SubContent // Radix SubContent primitive
      data-slot="context-menu-sub-content" // identifier
      className={cn( // styling the floating panel
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", // complex entry/exit animations
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing ContextMenuSubContent component block

function ContextMenuContent({ // The main floating menu container
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) { // identifying props
  return ( // Returning the main panel inside a portal
    <ContextMenuPrimitive.Portal> // Automatically portal to document root
      <ContextMenuPrimitive.Content // The actual menu box
        data-slot="context-menu-content" // identifier
        className={cn( // styling the main container
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", // animation and layout logic
          className, // overrides
        )} // closing cn call
        {...props} // spreading props
      /> // closing content primitive
    </ContextMenuPrimitive.Portal> // closing portal
  ); // closing main return
} // Closing ContextMenuContent component block

function ContextMenuItem({ // Standard actionable row in the menu
  className, // optional classes
  inset, // indentation toggle
  variant = "default", // visual emphasis variant
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & { // Merged props
  inset?: boolean; // indent flag
  variant?: "default" | "destructive"; // styling flag
}) { // component implementation
  return ( // Returning the item JSX
    <ContextMenuPrimitive.Item // Radix Item primitive
      data-slot="context-menu-item" // identifier
      data-inset={inset} // binding state
      data-variant={variant} // binding variant
      className={cn( // styling the interactive item
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // complex selector based styling for variants and states
        className, // overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing item primitive
  ); // closing return
} // Closing ContextMenuItem component block

function ContextMenuCheckboxItem({ // Menu item that toggles between checked states
  className, // optional classes
  children, // item label content
  checked, // current boolean state
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) { // identifying props
  return ( // Returning the checkbox row
    <ContextMenuPrimitive.CheckboxItem // Radix CheckboxItem primitive
      data-slot="context-menu-checkbox-item" // identifier
      className={cn( // styling the toggleable row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // item styles with space for indicator
        className, // overrides
      )} // closing cn
      checked={checked} // binding state
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for the check mark
        <ContextMenuPrimitive.ItemIndicator> // Content only visible when checked
          <CheckIcon className="size-4" /> // The check icon
        </ContextMenuPrimitive.ItemIndicator> // closing indicator
      </span> // closing icon box
      {children} // rendering label
    </ContextMenuPrimitive.CheckboxItem> // closing primitive
  ); // closing return
} // Closing ContextMenuCheckboxItem component block

function ContextMenuRadioItem({ // Selection item within a radio group
  className, // optional classes
  children, // item label
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) { // identifying props
  return ( // Returning the radio row
    <ContextMenuPrimitive.RadioItem // Radix RadioItem primitive
      data-slot="context-menu-radio-item" // identifier
      className={cn( // styling the radio row
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", // standard styles
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    > // closing opening tag
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"> // container for selection dot
        <ContextMenuPrimitive.ItemIndicator> // Content only visible when selected
          <CircleIcon className="size-2 fill-current" /> // The circle icon
        </ContextMenuPrimitive.ItemIndicator> // closing indicator
      </span> // closing box
      {children} // rendering label
    </ContextMenuPrimitive.RadioItem> // closing primitive
  ); // closing return
} // Closing ContextMenuRadioItem component block

function ContextMenuLabel({ // Non-interactive descriptive label in the menu
  className, // optional classes
  inset, // indentation toggle
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & { // Merged props
  inset?: boolean; // indentation flag
}) { // component implementation
  return ( // Returning the label JSX
    <ContextMenuPrimitive.Label // Radix Label primitive
      data-slot="context-menu-label" // identifier
      data-inset={inset} // binding state
      className={cn( // styling the text
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", // clean label styles
        className, // overrides
      )} // closing cn
      {...props} // spreading props
    /> // closing primitive
  ); // closing return
} // Closing ContextMenuLabel component block

function ContextMenuSeparator({ // Visual line dividing menu sections
  className, // optional classes
  ...props // remaining props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) { // identifying props
  return ( // Returning functional separator
    <ContextMenuPrimitive.Separator // Radix Separator primitive
      data-slot="context-menu-separator" // identifier
      className={cn("bg-border -mx-1 my-1 h-px", className)} // thin line with container escaping margin
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing ContextMenuSeparator component block

function ContextMenuShortcut({ // Visual hint for keyboard shortcuts
  className, // optional classes
  ...props // remaining span props
}: React.ComponentProps<"span">) { // Identifying span props
  return ( // Returning Shortcut JSX
    <span // simple text span
      data-slot="context-menu-shortcut" // identifier
      className={cn( // styling the hint
        "text-muted-foreground ml-auto text-xs tracking-widest", // right-aligned muted text
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing ContextMenuShortcut component block

export { // Exporting coordinated components for full menu assembly
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}; // closing export block
