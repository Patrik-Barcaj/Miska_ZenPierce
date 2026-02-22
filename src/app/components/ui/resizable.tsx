"use client"; // Client-side component for drag-to-resize layouts

import * as React from "react"; // Importing core React library
import { GripVerticalIcon } from "lucide-react"; // Importing iconography
import * as ResizablePrimitive from "react-resizable-panels"; // Importing the functional resizing engine

import { cn } from "./utils"; // Importing utility for conditional class merging

function ResizablePanelGroup({ // Container for managing sizing logic across child panels
  className, // optional external classes
  ...props // remaining distribution props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) { // TS definition from primitive
  return ( // Returning functional group
    <ResizablePrimitive.PanelGroup // Panels engine root
      data-slot="resizable-panel-group" // identifier
      className={cn( // styling the container
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col", // flex behavior based on orientation
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing ResizablePanelGroup block

function ResizablePanel({ // Individual adjustable area within a group
  ...props // spreading props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) { // identifying props
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />; // functional panel wrapper
} // Closing ResizablePanel block

function ResizableHandle({ // Interactive divider used to resize adjacent panels
  withHandle, // toggle for a visual grip icon
  className, // optional classes
  ...props // remaining handle props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { // Merged prop types
  withHandle?: boolean; // grip icon flag
}) { // component implementation
  return ( // Returning functional handle
    <ResizablePrimitive.PanelResizeHandle // Panels engine handle primitive
      data-slot="resizable-handle" // identifier
      className={cn( // styling the divider
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90", // invisible hit area expansion and orientation logic
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      {withHandle && ( // conditional grip icon
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"> // the visual pill box
          <GripVerticalIcon className="size-2.5" /> // the internal grip icon
        </div> // closing pill box
      )} // closing conditional
    </ResizablePrimitive.PanelResizeHandle> // closing primitive
  ); // closing return
} // Closing ResizableHandle block

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }; // Exporting coordinated components
