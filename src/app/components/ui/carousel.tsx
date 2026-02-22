"use client"; // Client-side component for carousel interactivity

import * as React from "react"; // Importing core React library
import useEmblaCarousel, { // Importing Embla Carousel hook
  type UseEmblaCarouselType, // Type definition for the Embla API
} from "embla-carousel-react"; // The underlying carousel engine library
import { ArrowLeft, ArrowRight } from "lucide-react"; // Importing navigation icons

import { cn } from "./utils"; // Importing utility for conditional class merging
import { Button } from "./button"; // Importing standard Button component

type CarouselApi = UseEmblaCarouselType[1]; // Extracting API type from Embla return
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>; // Extracting hook parameter types
type CarouselOptions = UseCarouselParameters[0]; // Extracting options configuration type
type CarouselPlugin = UseCarouselParameters[1]; // Extracting plugin configuration type

type CarouselProps = { // Props for the main Carousel component
  opts?: CarouselOptions; // Embla options (loop, speed, etc.)
  plugins?: CarouselPlugin; // Embla plugins (autoplay, etc.)
  orientation?: "horizontal" | "vertical"; // Display axis
  setApi?: (api: CarouselApi) => void; // Optional callback to expose the API to parent
}; // Closing props type

type CarouselContextProps = { // Context state for child component coordination
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]; // Reference to the scroll viewport
  api: ReturnType<typeof useEmblaCarousel>[1]; // The Embla API instance
  scrollPrev: () => void; // Function to go back
  scrollNext: () => void; // Function to go forward
  canScrollPrev: boolean; // State to disable/enable back button
  canScrollNext: boolean; // State to disable/enable next button
} & CarouselProps; // Merging with base Carousel props

const CarouselContext = React.createContext<CarouselContextProps | null>(null); // Creating the coordination context

function useCarousel() { // Custom hook to consume carousel state
  const context = React.useContext(CarouselContext); // Accessing the provider values

  if (!context) { // Validation check
    throw new Error("useCarousel must be used within a <Carousel />"); // Error if used outside hierarchy
  } // Closing validation

  return context; // Returning the carousel state
} // Closing useCarousel hook

function Carousel({ // Main Carousel provider component
  orientation = "horizontal", // Defaulting to horizontal scroll
  opts, // Embla options
  setApi, // API exposure callback
  plugins, // Plugins list
  className, // Optional external classes
  children, // Child slides and controls
  ...props // Remaining div props
}: React.ComponentProps<"div"> & CarouselProps) { // Merged prop types
  const [carouselRef, api] = useEmblaCarousel( // Initializing Embla engine
    { // Configuration object
      ...opts, // Merging user options
      axis: orientation === "horizontal" ? "x" : "y", // Mapping orientation to Embla axis
    }, // closing config
    plugins, // injecting plugins
  ); // closing hook call
  const [canScrollPrev, setCanScrollPrev] = React.useState(false); // Tracking backward scrollability
  const [canScrollNext, setCanScrollNext] = React.useState(false); // Tracking forward scrollability

  const onSelect = React.useCallback((api: CarouselApi) => { // Handler for carousel state changes
    if (!api) return; // Guard clause
    setCanScrollPrev(api.canScrollPrev()); // Updating back button state
    setCanScrollNext(api.canScrollNext()); // Updating forward button state
  }, []); // Memoized dependency array

  const scrollPrev = React.useCallback(() => { // Command to scroll backward
    api?.scrollPrev(); // Executing Embla API call
  }, [api]); // Dependency on API instance

  const scrollNext = React.useCallback(() => { // Command to scroll forward
    api?.scrollNext(); // Executing Embla API call
  }, [api]); // Dependency on API instance

  const handleKeyDown = React.useCallback( // Keyboard navigation handler
    (event: React.KeyboardEvent<HTMLDivElement>) => { // capturing key event
      if (event.key === "ArrowLeft") { // monitoring left arrow
        event.preventDefault(); // preventing page scroll
        scrollPrev(); // triggered scroll
      } else if (event.key === "ArrowRight") { // monitoring right arrow
        event.preventDefault(); // preventing page scroll
        scrollNext(); // triggered scroll
      } // closing key check
    }, // closing callback
    [scrollPrev, scrollNext], // dependencies
  ); // closing check

  React.useEffect(() => { // Effect to sync API to parent
    if (!api || !setApi) return; // checking availability
    setApi(api); // bubbling up the instance
  }, [api, setApi]); // trigger on change

  React.useEffect(() => { // Effect to manage event listeners
    if (!api) return; // guard
    onSelect(api); // initial state check
    api.on("reInit", onSelect); // listener for initialization
    api.on("select", onSelect); // listener for slide selection

    return () => { // cleanup function
      api?.off("select", onSelect); // removing selective listener
    }; // closing cleanup
  }, [api, onSelect]); // dependencies

  return ( // Returning the provider and region wrapper
    <CarouselContext.Provider // Providing state down the tree
      value={{ // Context object
        carouselRef, // reference to viewport
        api: api, // the engine api
        opts, // config options
        orientation: // actual orientation
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"), // fallback logic
        scrollPrev, // control function
        scrollNext, // control function
        canScrollPrev, // view state
        canScrollNext, // view state
      }} // closing value
    > // closing provider tag
      <div // interactive region wrapper
        onKeyDownCapture={handleKeyDown} // capturing keyboard events
        className={cn("relative", className)} // relative positioning for controls
        role="region" // semantic role for lists
        aria-roledescription="carousel" // screen reader hint
        data-slot="carousel" // identifier
        {...props} // spreading props
      > // closing opening tag
        {children} // rendering inner elements
      </div> // closing wrapper
    </CarouselContext.Provider> // closing provider
  ); // closing return
} // Closing Carousel component

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) { // Scroll viewport and track component
  const { carouselRef, orientation } = useCarousel(); // accessing shared state

  return ( // Returning the viewport JSX
    <div // the viewport (mask)
      ref={carouselRef} // connecting to Embla engine
      className="overflow-hidden" // clipping the scroll track
      data-slot="carousel-content" // identifier
    > // closing opening tag
      <div // the actual scroll track
        className={cn( // dynamic layout based on axis
          "flex", // standard horizontal track
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", // gap compensation logic
          className, // custom overrides
        )} // closing cn call
        {...props} // spreading props
      /> // closing track div
    </div> // closing viewport div
  ); // closing return
} // Closing CarouselContent component

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) { // Individual slide component
  const { orientation } = useCarousel(); // accessing axis information

  return ( // Returning the slide JSX
    <div // slide container
      role="group" // making it a grouped unit for accessibility
      aria-roledescription="slide" // ARIA hint
      data-slot="carousel-item" // identifier
      className={cn( // sizing logic
        "min-w-0 shrink-0 grow-0 basis-full", // non-shrinking slides
        orientation === "horizontal" ? "pl-4" : "pt-4", // applying track gap
        className, // custom overrides
      )} // closing cn call
      {...props} // spreading props
    /> // closing tag
  ); // closing return
} // Closing CarouselItem component

function CarouselPrevious({ // Back navigation button
  className, // optional classes
  variant = "outline", // default button style
  size = "icon", // default button size
  ...props // remaining props
}: React.ComponentProps<typeof Button>) { // Button props
  const { orientation, scrollPrev, canScrollPrev } = useCarousel(); // accessing control state

  return ( // Returning the previous button
    <Button // standard button component
      data-slot="carousel-previous" // identifier
      variant={variant} // standard variants
      size={size} // standard sizes
      className={cn( // complex absolute positioning
        "absolute size-8 rounded-full", // circular small button
        orientation === "horizontal" // horizontal positioning
          ? "top-1/2 -left-12 -translate-y-1/2" // middle left
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90", // top center rotated
        className, // overrides
      )} // closing cn call
      disabled={!canScrollPrev} // using Embla state to disable
      onClick={scrollPrev} // executing back command
      {...props} // spreading props
    > // closing opening tag
      <ArrowLeft /> // standard icon
      <span className="sr-only">Previous slide</span> // accessibility text
    </Button> // closing button
  ); // closing return
} // Closing CarouselPrevious component

function CarouselNext({ // Forward navigation button
  className, // optional classes
  variant = "outline", // default button style
  size = "icon", // default button size
  ...props // remaining props
}: React.ComponentProps<typeof Button>) { // Button props
  const { orientation, scrollNext, canScrollNext } = useCarousel(); // accessing control state

  return ( // Returning the next button
    <Button // standard button component
      data-slot="carousel-next" // identifier
      variant={variant} // standard variants
      size={size} // standard sizes
      className={cn( // complex absolute positioning
        "absolute size-8 rounded-full", // circular small button
        orientation === "horizontal" // horizontal positioning
          ? "top-1/2 -right-12 -translate-y-1/2" // middle right
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", // bottom center rotated
        className, // overrides
      )} // closing cn call
      disabled={!canScrollNext} // using Embla state to disable
      onClick={scrollNext} // executing forward command
      {...props} // spreading props
    > // closing opening tag
      <ArrowRight /> // standard icon
      <span className="sr-only">Next slide</span> // accessibility text
    </Button> // closing button
  ); // closing return
} // Closing CarouselNext component

export { // Exporting all components and types
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}; // closing export block
