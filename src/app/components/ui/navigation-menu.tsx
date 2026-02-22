import * as React from "react"; // Importing core React library
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"; // Importing Radix UI Navigation Menu primitives
import { cva } from "class-variance-authority"; // Importing utility for styling variants
import { ChevronDownIcon } from "lucide-react"; // Importing iconography

import { cn } from "./utils"; // Importing utility for conditional class merging

function NavigationMenu({ // Main coordination component for navigation
  className, // optional external classes
  children, // menu list and viewports
  viewport = true, // toggle for the global viewport container
  ...props // remaining root props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & { // Merged prop types
  viewport?: boolean; // viewport flag
}) { // component implementation
  return ( // Returning the navigation provider
    <NavigationMenuPrimitive.Root // Radix Root primitive
      data-slot="navigation-menu" // identifier
      data-viewport={viewport} // binding viewport state
      className={cn( // styling the root container
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", // shared layout logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {children} // rendering menu content
      {viewport && <NavigationMenuViewport />} // conditional viewport display
    </NavigationMenuPrimitive.Root> // closing primitive
  ); // closing return
} // Closing NavigationMenu block

function NavigationMenuList({ // Horizontal list for top-level menu triggers
  className, // optional classes
  ...props // remaining list props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) { // identifying props
  return ( // Returning functional list
    <NavigationMenuPrimitive.List // Radix List primitive
      data-slot="navigation-menu-list" // identifier
      className={cn( // styling the list
        "group flex flex-1 list-none items-center justify-center gap-1", // horizontal flex row
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing NavigationMenuList block

function NavigationMenuItem({ // Wrapper for a single menu trigger and content pair
  className, // optional classes
  ...props // remaining item props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) { // identifying props
  return ( // Returning item wrapper
    <NavigationMenuPrimitive.Item // Radix Item primitive
      data-slot="navigation-menu-item" // identifier
      className={cn("relative", className)} // relative positioning for content anchoring
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing NavigationMenuItem block

const navigationMenuTriggerStyle = cva( // Reusable style utility for menu triggers
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1", // comprehensive interactive and state styles
); // closing cva call

function NavigationMenuTrigger({ // Item in the list that opens a content panel
  className, // optional classes
  children, // trigger label content
  ...props // remaining trigger props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) { // identifying props
  return ( // Returning interactive trigger
    <NavigationMenuPrimitive.Trigger // Radix Trigger primitive
      data-slot="navigation-menu-trigger" // identifier
      className={cn(navigationMenuTriggerStyle(), "group", className)} // applying CVA styles
      {...props} // spreading props
    > // closing opening tag
      {children}{" "} // rendering trigger label
      <ChevronDownIcon // dropdown arrow indicator
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" // animated rotation on open
        aria-hidden="true" // hiding icon from screen readers
      /> // closing icon
    </NavigationMenuPrimitive.Trigger> // closing primitive
  ); // closing return
} // Closing NavigationMenuTrigger block

function NavigationMenuContent({ // The panel content displayed when a trigger is active
  className, // optional classes
  ...props // remaining content props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) { // identifying props
  return ( // Returning the floating panel
    <NavigationMenuPrimitive.Content // Radix Content primitive
      data-slot="navigation-menu-content" // identifier
      className={cn( // styling the interactive panel
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto", // complex directional animations
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none", // styles for non-viewport (inline) mode
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing NavigationMenuContent block

function NavigationMenuViewport({ // The shared container that contents slide into
  className, // optional classes
  ...props // remaining viewport props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) { // identifying props
  return ( // Returning the view container
    <div // positioning wrapper
      className={cn( // styling the fixed anchor
        "absolute top-full left-0 isolate z-50 flex justify-center", // centered below the bar
      )} // closing cn block
    > // closing opening tag
      <NavigationMenuPrimitive.Viewport // Radix Viewport primitive
        data-slot="navigation-menu-viewport" // identifier
        className={cn( // styling the physical panel
          "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]", // responsive dimensions based on active content
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      /> // closing primitive
    </div> // closing div
  ); // closing return
} // Closing NavigationMenuViewport block

function NavigationMenuLink({ // Actionable link item within a menu panel
  className, // optional classes
  ...props // remaining link props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) { // identifying props
  return ( // Returning interactive link
    <NavigationMenuPrimitive.Link // Radix Link primitive
      data-slot="navigation-menu-link" // identifier
      className={cn( // styling the link row
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4", // interactive highlighting logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing NavigationMenuLink block

function NavigationMenuIndicator({ // Visual highlight following active menu item
  className, // optional classes
  ...props // remaining indicator props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) { // identifying props
  return ( // Returning follow-me indicator
    <NavigationMenuPrimitive.Indicator // Radix Indicator primitive
      data-slot="navigation-menu-indicator" // identifier
      className={cn( // styling the animation
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", // fade and positioning logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" /> // the physical caret triangle
    </NavigationMenuPrimitive.Indicator> // closing primitive
  ); // closing return
} // Closing NavigationMenuIndicator block

export { // Exporting coordinated components for horizontal navigation construction
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}; // closing export block
