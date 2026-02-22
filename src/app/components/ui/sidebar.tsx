"use client"; // Client-side entry point for interactive sidebar components

import * as React from "react"; // Core React library for components and hooks
import { Slot } from "@radix-ui/react-slot"; // Permitting component composition via 'asChild'
import { VariantProps, cva } from "class-variance-authority"; // Dynamic CSS class generation based on props
import { PanelLeftIcon } from "lucide-react"; // Visual indicator icon for toggling the sidebar

import { useIsMobile } from "./use-mobile"; // Custom hook for responsive breakpoints
import { cn } from "./utils"; // Utility function for merging Tailwind classes
import { Button } from "./button"; // Internal button component for consistent styling
import { Input } from "./input"; // Internal input component for the search/filter feature
import { Separator } from "./separator"; // Visual divider for grouping items
import { // Primitive sheet components for mobile drawer behavior
  Sheet, // root sheet
  SheetContent, // visible panel
  SheetDescription, // accessibility description
  SheetHeader, // panel header
  SheetTitle, // panel title
} from "./sheet"; // Importing from internal UI kit
import { Skeleton } from "./skeleton"; // Placeholder component for loading states
import { // Core tooltip primitives for hover labels
  Tooltip, // root tooltip
  TooltipContent, // tooltip message
  TooltipProvider, // context provider
  TooltipTrigger, // interactive element
} from "./tooltip"; // Importing from internal UI kit

const SIDEBAR_COOKIE_NAME = "sidebar_state"; // Identifier for persistent preference storage
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // One week expiration for state cookie
const SIDEBAR_WIDTH = "16rem"; // Default width for expanded desktop sidebar
const SIDEBAR_WIDTH_MOBILE = "18rem"; // Default width for mobile drawer panel
const SIDEBAR_WIDTH_ICON = "3rem"; // Compact width for collapsed sidebar state
const SIDEBAR_KEYBOARD_SHORTCUT = "b"; // Hotkey character for quick toggling

type SidebarContextProps = { // TS definition for the internal state management
  state: "expanded" | "collapsed"; // current visual mode
  open: boolean; // boolean flag for open state
  setOpen: (open: boolean) => void; // setter for open state
  openMobile: boolean; // boolean flag for mobile drawer visibility
  setOpenMobile: (open: boolean) => void; // setter for mobile visibility
  isMobile: boolean; // responsive detection result
  toggleSidebar: () => void; // convenience function for state toggling
}; // closing type block

const SidebarContext = React.createContext<SidebarContextProps | null>(null); // Shared state container for all sidebar sub-components

function useSidebar() { // Shared hook to access sidebar state and controls
  const context = React.useContext(SidebarContext); // reading from provider
  if (!context) { // error handling if used outside provider
    throw new Error("useSidebar must be used within a SidebarProvider."); // technical alert
  } // closing error check

  return context; // returning functional context properties
} // Closing useSidebar block

function SidebarProvider({ // Managing the high-level state and preferences for the entire sidebar
  defaultOpen = true, // default starting state if no cookie/prop exists
  open: openProp, // controlled open state from parent
  onOpenChange: setOpenProp, // callback for controlled state changes
  className, // optional external classes for the wrapper
  style, // optional inline styles for custom dimensions
  children, // nested sidebar sub-components
  ...props // remaining distribution props
}: React.ComponentProps<"div"> & { // Extends standard div props
  defaultOpen?: boolean; // prop type
  open?: boolean; // prop type
  onOpenChange?: (open: boolean) => void; // prop type
}) { // opening function block
  const isMobile = useIsMobile(); // detecting mobile environment via hook
  const [openMobile, setOpenMobile] = React.useState(false); // internal state for mobile drawer drawer

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen); // internal fallback state
  const open = openProp ?? _open; // determining active state based on presence of prop
  const setOpen = React.useCallback( // memoized state setter that handles persistence
    (value: boolean | ((value: boolean) => boolean)) => { // supports functional updates
      const openState = typeof value === "function" ? value(open) : value; // resolving new state value
      if (setOpenProp) { // responding to external control if present
        setOpenProp(openState); // notifying parent
      } else { // handling internal state locally
        _setOpen(openState); // updating state
      } // closing state conditional

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`; // persisting to browser cookies
    }, // closing callback logic
    [setOpenProp, open], // dependencies for stability
  ); // closing useCallback block

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => { // simplified toggle action
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open); // switching state based on current viewport context
  }, [isMobile, setOpen, setOpenMobile]); // dependencies

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => { // side effect for global event listeners
    const handleKeyDown = (event: KeyboardEvent) => { // keyboard listener logic
      if ( // checking for specific key combo
        event.key === SIDEBAR_KEYBOARD_SHORTCUT && // designated shortcut key
        (event.metaKey || event.ctrlKey) // modifier key required
      ) { // matching condition
        event.preventDefault(); // suppressing default browser behavior
        toggleSidebar(); // executing toggle
      } // closing condition
    }; // closing handler

    window.addEventListener("keydown", handleKeyDown); // registering listener
    return () => window.removeEventListener("keydown", handleKeyDown); // cleaning up listener on unmount
  }, [toggleSidebar]); // dependencies

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"; // derived visual state string

  const contextValue = React.useMemo<SidebarContextProps>( // bundles all state properties for consumer components
    () => ({ // returning object
      state, // current mode
      open, // boolean flag
      setOpen, // setter
      isMobile, // mobile status
      openMobile, // mobile flag
      setOpenMobile, // mobile setter
      toggleSidebar, // toggle helper
    }), // closing object
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar], // deps for reference stability
  ); // closing useMemo

  return ( // Returning the context tree
    <SidebarContext.Provider value={contextValue}> // Establishing state provider
      <TooltipProvider delayDuration={0}> // Configuring tooltips with immediate display
        <div // high level wrapper div
          data-slot="sidebar-wrapper" // identifier
          style={ // passing custom CSS variables for layout calculations
            {
              "--sidebar-width": SIDEBAR_WIDTH, // binding width token
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, // binding icon width token
              ...style, // merging external styles
            } as React.CSSProperties // TS casting
          } // closing style block
          className={cn( // styling the wrapper
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", // flex base with conditional backgrounds
            className, // overrides
          )} // closing cn block
          {...props} // spreading props
        > // closing opening tag
          {children} // rendering nested components
        </div> // closing wrapper
      </TooltipProvider> // closing tooltip tree
    </SidebarContext.Provider> // closing context tree
  ); // closing return
} // Closing SidebarProvider block

function Sidebar({ // The main responsive sidebar container components
  side = "left", // alignment side (left or right)
  variant = "sidebar", // visual style variant (sidebar, floating, inset)
  collapsible = "offcanvas", // behavior when toggled (offcanvas, icon, none)
  className, // optional external classes
  children, // internal menu structure
  ...props // remaining distribution props
}: React.ComponentProps<"div"> & { // TS definition extension
  side?: "left" | "right"; // prop type
  variant?: "sidebar" | "floating" | "inset"; // prop type
  collapsible?: "offcanvas" | "icon" | "none"; // prop type
}) { // opening function block
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar(); // consuming sidebar state context

  if (collapsible === "none") { // static non-collapsible layout branch
    return ( // returning static div
      <div // base container
        data-slot="sidebar" // identifier
        className={cn( // styling the static column
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", // solid layout with fixed CSS variable width
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      > // closing opening tag
        {children} // rendering nested content
      </div> // closing container
    ); // closing return
  } // closing static branch

  if (isMobile) { // mobile responsive layout branch utilizing a sheet
    return ( // returning sheet primitive
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}> // Binding mobile drawer state and props
        <SheetContent // The physical sliding panel
          data-sidebar="sidebar" // internal identifier
          data-slot="sidebar" // identifier
          data-mobile="true" // mobile flag
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden" // styling the panel to match desktop width and hide default close icons
          style={ // passing mobile width variable
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE, // specific mobile width token
            } as React.CSSProperties // TS casting
          } // closing style block
          side={side} // matching defined side (left/right)
        > // closing opening tag
          <SheetHeader className="sr-only"> // hidden header for screen readers
            <SheetTitle>Sidebar</SheetTitle> // accessible title
            <SheetDescription>Displays the mobile sidebar.</SheetDescription> // accessible description
          </SheetHeader> // closing header
          <div className="flex h-full w-full flex-col">{children}</div> // internal scrollable wrapper for children
        </SheetContent> // closing sheet content
      </Sheet> // closing sheet root
    ); // closing return
  } // closing mobile branch

  return ( // Desktop layout branch with transitions and variants
    <div // root desktop container
      className="group peer text-sidebar-foreground hidden md:block" // visibility control and styling hooks
      data-state={state} // binding expanded/collapsed state for Tailwind targeting
      data-collapsible={state === "collapsed" ? collapsible : ""} // binding collapsible behavior
      data-variant={variant} // binding visual variant choice
      data-side={side} // binding side selection
      data-slot="sidebar" // identifier
    > // closing opening tag
      {/* This is what handles the sidebar gap on desktop */}
      <div // spacer div that occupies layout space even when sidebar is fixed/absolute
        data-slot="sidebar-gap" // identifier
        className={cn( // responsive spacer styling
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", // smooth width transitions
          "group-data-[collapsible=offcanvas]:w-0", // zero width when hidden offscreen
          "group-data-[side=right]:rotate-180", // flipping orientation for right-aligned layouts
          variant === "floating" || variant === "inset" // logic for specific variants
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" // extra space for floating/inset icons
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)", // standard icon width
        )} // closing cn block
      /> // closing spacer
      <div // the actual physical sidebar panel
        data-slot="sidebar-container" // identifier
        className={cn( // styling the physical sidebar
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", // fixed positioning with smooth layout transitions
          side === "left" // left alignment logic
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" // hiding offscreen when collapsed offcanvas
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", // hiding offscreen for right side
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset" // aesthetic adjustments for advanced variants
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" // inset padding and width adjustment
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", // solid borders for standard sidebar
          className, // overrides
        )} // closing cn block
        {...props} // spreading props
      > // closing opening tag
        <div // internal inner container for backgrounds and grouping
          data-sidebar="sidebar" // internal identifier
          data-slot="sidebar-inner" // identifier
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm" // applying container styles based on variant
        > // closing opening tag
          {children} // rendering actual menu items
        </div> // closing inner container
      </div> // closing physical panel
    </div> // closing root container
  ); // closing return
} // Closing Sidebar block

function SidebarTrigger({ // Iconic interactive button to toggle the sidebar state
  className, // optional external classes
  onClick, // standard click event handler
  ...props // remaining button props
}: React.ComponentProps<typeof Button>) { // TS definition extension from Button component
  const { toggleSidebar } = useSidebar(); // consuming toggle function from context

  return ( // Returning stylized button
    <Button // internal UI button component
      data-sidebar="trigger" // internal identifier
      data-slot="sidebar-trigger" // identifier
      variant="ghost" // subtle appearance
      size="icon" // symmetrical padding
      className={cn("size-7", className)} // fixed sizing and overrides
      onClick={(event) => { // click logic
        onClick?.(event); // executing external handler if passed
        toggleSidebar(); // executing internal state toggle
      }} // closing handler
      {...props} // spreading props
    > // closing opening tag
      <PanelLeftIcon /> // lucide icon indicating sidebar behavior
      <span className="sr-only">Toggle Sidebar</span> // accessible text for automated tools
    </Button> // closing button
  ); // closing return
} // Closing SidebarTrigger block

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) { // Invisible interactive edge for toggling sidebar on hover/click interaction
  const { toggleSidebar } = useSidebar(); // consuming toggle function

  return ( // Returning functional button rail
    <button // standard button element
      data-sidebar="rail" // internal identifier
      data-slot="sidebar-rail" // identifier
      aria-label="Toggle Sidebar" // accessible label
      tabIndex={-1} // removing from keyboard tab order for decorative use
      onClick={toggleSidebar} // simple toggle on click
      title="Toggle Sidebar" // browser tooltip
      className={cn( // styling the physical rail
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex", // positioning along the edge of the sidebar with interactive hover styles
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", // responsive cursors based on side
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", // cursor changes based on open/closed state
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", // offcanvas specific behaviors
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", // alignment adjustments
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", // alignment adjustments
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarRail block

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) { // Main content area wrapper that shifts when sidebar is present
  return ( // Returning functional main container
    <main // standard main tag
      data-slot="sidebar-inset" // identifier
      className={cn( // styling the main area
        "bg-background relative flex w-full flex-1 flex-col", // flex layout taking remaining space
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", // specific adjustments for 'inset' variant to create a card-like effect
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarInset block

function SidebarInput({ // Specialized input styled specifically for sidebar use
  className, // optional classes
  ...props // input props
}: React.ComponentProps<typeof Input>) { // TS definition extension from base Input
  return ( // Returning functional input
    <Input // internal UI input component
      data-slot="sidebar-input" // identifier
      data-sidebar="input" // internal identifier
      className={cn("bg-background h-8 w-full shadow-none", className)} // compact height and clean styling
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarInput block

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) { // Top section of the sidebar for branding or user profiles
  return ( // Returning vertical flex container
    <div // standard div
      data-slot="sidebar-header" // identifier
      data-sidebar="header" // internal identifier
      className={cn("flex flex-col gap-2 p-2", className)} // padded column layout
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarHeader block

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) { // Bottom section of the sidebar for utility links or logout
  return ( // Returning vertical flex container
    <div // standard div
      data-slot="sidebar-footer" // identifier
      data-sidebar="footer" // internal identifier
      className={cn("flex flex-col gap-2 p-2", className)} // padded column layout
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarFooter block

function SidebarSeparator({ // Visual line to divide groups within the sidebar
  className, // optional classes
  ...props // separator props
}: React.ComponentProps<typeof Separator>) { // TS extension from Separator component
  return ( // Returning stylized separator
    <Separator // internal UI separator component
      data-slot="sidebar-separator" // identifier
      data-sidebar="separator" // internal identifier
      className={cn("bg-sidebar-border mx-2 w-auto", className)} // using theme-specific border color and margins
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarSeparator block

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) { // Main scrollable area for menu navigation
  return ( // Returning flexible column
    <div // standard div
      data-slot="sidebar-content" // identifier
      data-sidebar="content" // internal identifier
      className={cn( // styling the content area
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", // scrollable flex container with overflow management based on state
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarContent block

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) { // Semantic grouping for menu items
  return ( // Returning container
    <div // standard div
      data-slot="sidebar-group" // identifier
      data-sidebar="group" // internal identifier
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)} // padded vertical flex
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarGroup block

function SidebarGroupLabel({ // Header text for a sidebar group
  className, // optional classes
  asChild = false, // permission for Slot utilization
  ...props // div props
}: React.ComponentProps<"div"> & { asChild?: boolean }) { // TS extension
  const Comp = asChild ? Slot : "div"; // determining root element

  return ( // Returning stylized label
    <Comp // dynamic root
      data-slot="sidebar-group-label" // identifier
      data-sidebar="group-label" // internal identifier
      className={cn( // styling the label
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", // subtle typography and layout with smooth transitions for collapsible states
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", // hiding label when sidebar is in icon mode
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarGroupLabel block

function SidebarGroupAction({ // Interactive auxiliary button next to a group label (e.g. "Add")
  className, // optional classes
  asChild = false, // Slot support
  ...props // button props
}: React.ComponentProps<"button"> & { asChild?: boolean }) { // TS extension
  const Comp = asChild ? Slot : "button"; // root element selection

  return ( // Returning action button
    <Comp // dynamic root
      data-slot="sidebar-group-action" // identifier
      data-sidebar="group-action" // internal identifier
      className={cn( // styling the button
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", // compact absolute positioning with hover effects
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden", // larger touch target for mobile devices
        "group-data-[collapsible=icon]:hidden", // hiding button when collapsed
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarGroupAction block

function SidebarGroupContent({ // Container for the actual menu items within a group
  className, // optional classes
  ...props // div props
}: React.ComponentProps<"div">) { // TS definition
  return ( // Returning vertical column
    <div // standard div
      data-slot="sidebar-group-content" // identifier
      data-sidebar="group-content" // internal identifier
      className={cn("w-full text-sm", className)} // simple layout box
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarGroupContent block

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) { // Unordered list for vertical menu navigation
  return ( // Returning list
    <ul // standard ul
      data-slot="sidebar-menu" // identifier
      data-sidebar="menu" // internal identifier
      className={cn("flex w-full min-w-0 flex-col gap-1", className)} // vertical gap-based layout
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenu block

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) { // List item wrapper for a single menu entry
  return ( // Returning list item
    <li // standard li
      data-slot="sidebar-menu-item" // identifier
      data-sidebar="menu-item" // internal identifier
      className={cn("group/menu-item relative", className)} // styling hook for nested child components
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuItem block

const sidebarMenuButtonVariants = cva( // Defining dynamic styling variations for menu buttons
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", // comprehensive list of base, interactive, and state-dependent styles
  { // variants configuration
    variants: { // visual props
      variant: { // style choices
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", // standard ghost hover
        outline: // bordered style
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]", // inset border shadow
      }, // closing variants
      size: { // dimension choices
        default: "h-8 text-sm", // standard height
        sm: "h-7 text-xs", // compact height
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!", // larger height with icon mode adjustment
      }, // closing sizes
    }, // closing categories
    defaultVariants: { // fallback values
      variant: "default", // default style
      size: "default", // default size
    }, // closing defaults
  }, // closing configuration
); // Closing cva block

function SidebarMenuButton({ // The primary interactive element for sidebar navigation links
  asChild = false, // Slot support
  isActive = false, // boolean active flag
  variant = "default", // visual variant
  size = "default", // size variant
  tooltip, // optional hover tooltip text or component
  className, // optional classes
  ...props // button props
}: React.ComponentProps<"button"> & { // TS extension
  asChild?: boolean; // prop type
  isActive?: boolean; // prop type
  tooltip?: string | React.ComponentProps<typeof TooltipContent>; // prop type
} & VariantProps<typeof sidebarMenuButtonVariants>) { // Extension from cva variants
  const Comp = asChild ? Slot : "button"; // selecting root element
  const { isMobile, state } = useSidebar(); // consuming sidebar context

  const button = ( // Pre-defining the core button element
    <Comp // dynamic root
      data-slot="sidebar-menu-button" // identifier
      data-sidebar="menu-button" // internal identifier
      data-size={size} // binding size state
      data-active={isActive} // binding active state
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)} // applying generated variants and overrides
      {...props} // spreading props
    /> // closing tag
  ); // closing element

  if (!tooltip) { // simple return if no tooltip requested
    return button; // returning raw button
  } // closing check

  if (typeof tooltip === "string") { // normalizing string tooltip to object
    tooltip = { // creating config object
      children: tooltip, // binding text
    }; // closing object
  } // closing normalization

  return ( // Returning button wrapped in tooltip primitives
    <Tooltip> // Root tooltip container
      <TooltipTrigger asChild>{button}</TooltipTrigger> // Wrapping button as trigger
      <TooltipContent // The popup content
        side="right" // positioning to the right of the button
        align="center" // centering relative to trigger
        hidden={state !== "collapsed" || isMobile} // hiding when sidebar is expanded (where text is already visible) or on mobile
        {...tooltip} // spreading tooltip specific props
      /> // closing content
    </Tooltip> // closing root
  ); // closing return
} // Closing SidebarMenuButton block

function SidebarMenuAction({ // Small interactive button positioned absolutely within a menu item (e.g. for sub-menus)
  className, // optional classes
  asChild = false, // Slot support
  showOnHover = false, // boolean flag for hover-only visibility
  ...props // button props
}: React.ComponentProps<"button"> & { // TS extension
  asChild?: boolean; // prop type
  showOnHover?: boolean; // prop type
}) { // opening function block
  const Comp = asChild ? Slot : "button"; // selecting root element

  return ( // Returning functional action button
    <Comp // dynamic root
      data-slot="sidebar-menu-action" // identifier
      data-sidebar="menu-action" // internal identifier
      className={cn( // styling the action
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", // absolute positioning with interactive effects and peer styling
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden", // larger touch target for mobile
        "peer-data-[size=sm]/menu-button:top-1", // alignment adjustments based on peer button size
        "peer-data-[size=default]/menu-button:top-1.5", // alignment adjustments
        "peer-data-[size=lg]/menu-button:top-2.5", // alignment adjustments
        "group-data-[collapsible=icon]:hidden", // hiding when collapsed
        showOnHover && // hover-only logic
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0", // opacity transitions based on interaction
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuAction block

function SidebarMenuBadge({ // Non-interactive numeric or status indicator for menu items
  className, // optional classes
  ...props // div props
}: React.ComponentProps<"div">) { // TS definition
  return ( // Returning functional badge
    <div // standard div
      data-slot="sidebar-menu-badge" // identifier
      data-sidebar="menu-badge" // internal identifier
      className={cn( // styling the badge
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none", // clean absolute positioning with numeric alignment
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", // matching text color with hover states
        "peer-data-[size=sm]/menu-button:top-1", // alignment adjustments
        "peer-data-[size=default]/menu-button:top-1.5", // alignment adjustments
        "peer-data-[size=lg]/menu-button:top-2.5", // alignment adjustments
        "group-data-[collapsible=icon]:hidden", // hiding when collapsed
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuBadge block

function SidebarMenuSkeleton({ // Placeholder for loading menu items
  className, // optional classes
  showIcon = false, // toggle for icon placeholder
  ...props // div props
}: React.ComponentProps<"div"> & { // TS extension
  showIcon?: boolean; // prop type
}) { // opening function block
  // Random width between 50 to 90%.
  const width = React.useMemo(() => { // generating varied widths for a natural loading look
    return `${Math.floor(Math.random() * 40) + 50}%`; // random percentage
  }, []); // stable across re-renders

  return ( // Returning skeleton container
    <div // standard div
      data-slot="sidebar-menu-skeleton" // identifier
      data-sidebar="menu-skeleton" // internal identifier
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)} // flex layout for placeholders
      {...props} // spreading props
    > // closing opening tag
      {showIcon && ( // conditional icon placeholder
        <Skeleton // UI skeleton primitive
          className="size-4 rounded-md" // fixed icon size
          data-sidebar="menu-skeleton-icon" // identifier
        /> // closing skeleton
      )} // closing conditional
      <Skeleton // main text placeholder
        className="h-4 max-w-(--skeleton-width) flex-1" // flexible height and randomized max-width
        data-sidebar="menu-skeleton-text" // identifier
        style={ // passing generated width variable
          {
            "--skeleton-width": width, // binding variable
          } as React.CSSProperties // TS casting
        } // closing style block
      /> // closing skeleton
    </div> // closing container
  ); // closing return
} // Closing SidebarMenuSkeleton block

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) { // Secondary nested menu list
  return ( // Returning list
    <ul // standard ul
      data-slot="sidebar-menu-sub" // identifier
      data-sidebar="menu-sub" // internal identifier
      className={cn( // styling the sub-menu
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5", // left-bordered vertical layout with indentation
        "group-data-[collapsible=icon]:hidden", // hiding when sidebar is in icon mode
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuSub block

function SidebarMenuSubItem({ // Individual item within a sub-menu
  className, // optional classes
  ...props // li props
}: React.ComponentProps<"li">) { // TS definition
  return ( // Returning list item
    <li // standard li
      data-slot="sidebar-menu-sub-item" // identifier
      data-sidebar="menu-sub-item" // internal identifier
      className={cn("group/menu-sub-item relative", className)} // styling hook for sub-menu children
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuSubItem block

function SidebarMenuSubButton({ // Interactive link for a sub-menu items
  asChild = false, // Slot support
  size = "md", // size variant
  isActive = false, // active flag
  className, // optional classes
  ...props // anchor/button props
}: React.ComponentProps<"a"> & { // TS extension defaults to anchor
  asChild?: boolean; // prop type
  size?: "sm" | "md"; // size choices
  isActive?: boolean; // prop type
}) { // opening function block
  const Comp = asChild ? Slot : "a"; // dynamic root element

  return ( // Returning functional sub-menu button
    <Comp // dynamic root
      data-slot="sidebar-menu-sub-button" // identifier
      data-sidebar="menu-sub-button" // internal identifier
      data-size={size} // binding size state
      data-active={isActive} // binding active state
      className={cn( // styling the sub-button
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", // comprehensive list of hierarchical menu styles
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", // specific styling for active sub-links
        size === "sm" && "text-xs", // small text for compact mode
        size === "md" && "text-sm", // standard text size
        "group-data-[collapsible=icon]:hidden", // hiding when sidebar is collapsed to icons
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing SidebarMenuSubButton block

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
