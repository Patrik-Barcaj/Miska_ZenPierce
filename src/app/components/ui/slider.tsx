"use client"; // Client-side component for range selection sliders

import * as React from "react"; // Importing core React library
import * as SliderPrimitive from "@radix-ui/react-slider"; // Importing Radix UI Slider primitives

import { cn } from "./utils"; // Importing utility for conditional class merging

function Slider({ // Interactive track for selecting values within a range
  className, // optional external classes
  defaultValue, // initial starting values
  value, // current controlled values
  min = 0, // minimum selectable value
  max = 100, // maximum selectable value
  ...props // remaining distribution props
}: React.ComponentProps<typeof SliderPrimitive.Root>) { // TS definition from Radix
  const _values = React.useMemo( // Normalizing values for multi-thumb rendering
    () => // memoized logic
      Array.isArray(value) // checking for array prop
        ? value // using value if array
        : Array.isArray(defaultValue) // checking for array default
          ? defaultValue // using default if array
          : [min, max], // fallback to min/max pair
    [value, defaultValue, min, max], // dependencies
  ); // closing useMemo

  return ( // Returning functional slider
    <SliderPrimitive.Root // Radix Root primitive
      data-slot="slider" // identifier
      defaultValue={defaultValue} // binding default
      value={value} // binding value
      min={min} // binding min
      max={max} // binding max
      className={cn( // styling the root container
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", // flex layout logic based on orientation
        className, // overrides
      )} // closing cn block
      {...props} // spreading props
    > // closing opening tag
      <SliderPrimitive.Track // The physical background track
        data-slot="slider-track" // identifier
        className={cn( // styling the track
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5", // responsive dimensions
        )} // closing cn block
      > // closing opening tag
        <SliderPrimitive.Range // The filled portion of the track
          data-slot="slider-range" // identifier
          className={cn( // styling the fill
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full", // solid primary color fill
          )} // closing cn block
        /> // closing range primitive
      </SliderPrimitive.Track> // closing track
      {Array.from({ length: _values.length }, (_, index) => ( // Rendering an interactive thumb for each value
        <SliderPrimitive.Thumb // The physical slider pill
          data-slot="slider-thumb" // identifier
          key={index} // stable key
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" // comprehensive interactive and base styles
        /> // closing thumb primitive
      ))} // closing map
    </SliderPrimitive.Root> // closing primitive root
  ); // closing return
} // Closing Slider component block

export { Slider }; // Exporting component
