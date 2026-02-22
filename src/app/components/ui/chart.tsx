"use client"; // Client-side component for handling dynamic chart visualization

import * as React from "react"; // Importing core React library
import * as RechartsPrimitive from "recharts"; // Importing Recharts library for underlying SVG generation

import { cn } from "./utils"; // Importing utility for conditional class merging

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const; // Mapping theme identifiers to their respective CSS selectors

export type ChartConfig = { // Type definition for global chart look and feel
  [k in string]: { // Index signature for various data keys
    label?: React.ReactNode; // Display label for the data series
    icon?: React.ComponentType; // Optional icon for legend/tooltip
  } & ( // Choosing between flat color or theme-dependent colors
    | { color?: string; theme?: never } // Single static color
    | { color?: never; theme: Record<keyof typeof THEMES, string> } // Colors for both light and dark modes
  ); // closing color configuration union
}; // closing ChartConfig block

type ChartContextProps = { // Props for the coordination context
  config: ChartConfig; // The chart configuration object
}; // closing props block

const ChartContext = React.createContext<ChartContextProps | null>(null); // Creating the context for chart components

function useChart() { // Custom hook to access chart configuration
  const context = React.useContext(ChartContext); // Accessing the provider

  if (!context) { // Validation check
    throw new Error("useChart must be used within a <ChartContainer />"); // Error if used in wrong location
  } // closing check

  return context; // returning the config
} // closing hook

function ChartContainer({ // Main container providing context and responsive layout for Recharts
  id, // Optional custom ID for style scoping
  className, // Optional external classes
  children, // The Recharts instances (BarChart, LineChart, etc.)
  config, // Required global chart styling config
  ...props // Remaining div props
}: React.ComponentProps<"div"> & { // Merged prop types
  config: ChartConfig; // Configuration type
  children: React.ComponentProps< // Child types from Recharts
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]; // Correctly typing the children expected by Recharts
}) { // Component implementation
  const uniqueId = React.useId(); // Generating unique ID for scoping styles
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`; // Creating the final CSS selector-safe ID

  return ( // Returning the provider and SVG container
    <ChartContext.Provider value={{ config }}> // Providing config down the tree
      <div // wrapper container for the chart
        data-slot="chart" // Slot identifier
        data-chart={chartId} // Scoped chart identifier for CSS variables
        className={cn( // Applying standard styling for Recharts sub-elements
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", // Massive Tailwind block for overriding defaulted Recharts SVG styles
          className, // Custom overrides
        )} // closing cn call
        {...props} // spreading props
      > // closing opening tag
        <ChartStyle id={chartId} config={config} /> // Injecting dynamic CSS variables for colors
        <RechartsPrimitive.ResponsiveContainer> // Standard Recharts automatic resizing container
          {children} // rendering the actual chart
        </RechartsPrimitive.ResponsiveContainer> // closing container
      </div> // closing wrapper
    </ChartContext.Provider> // closing provider
  ); // closing return
} // Closing ChartContainer component block

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => { // Helper component to inject CSS variables
  const colorConfig = Object.entries(config).filter( // Filtering for items that actually define colors
    ([, config]) => config.theme || config.color, // checking for color keys
  ); // closing filter

  if (!colorConfig.length) { // guard if no color variables needed
    return null; // exit
  } // closing guard

  return ( // Returning a dynamic style tag
    <style // embedding CSS
      dangerouslySetInnerHTML={{ // Injection of string-based styles
        __html: Object.entries(THEMES) // iterating through themes
          .map( // mapping to CSS rules
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => { // mapping individual series to variables
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color; // resolving color for current theme
    return color ? `  --color-${key}: ${color};` : null; // outputting CSS property
  })
  .join("\n")} // combining properties
}
`, // template literal for theme block
          )
          .join("\n"), // combining themes
      }} // closing innerHTML
    /> // closing style tag
  ); // closing return
}; // Closing ChartStyle helper

const ChartTooltip = RechartsPrimitive.Tooltip; // Re-exporting standard Tooltip wrapper

function ChartTooltipContent({ // Specialized content renderer for Recharts tooltips
  active, // Is the tooltip currently visible?
  payload, // The data points under the cursor
  className, // Tooltip container classes
  indicator = "dot", // Visual indicator type
  hideLabel = false, // Toggle label display
  hideIndicator = false, // Toggle indicator display
  label, // The tooltip headline value
  labelFormatter, // Custom headline formatter
  labelClassName, // Headline styling
  formatter, // Custom value formatter
  color, // Custom overriding color
  nameKey, // Key for series name resolution
  labelKey, // Key for label resolution
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> & // Native Recharts props
  React.ComponentProps<"div"> & { // Native div props
    hideLabel?: boolean; // toggle
    hideIndicator?: boolean; // toggle
    indicator?: "line" | "dot" | "dashed"; // styling choice
    nameKey?: string; // key selector
    labelKey?: string; // key selector
  }) { // Component implementation
  const { config } = useChart(); // accessing global config

  const tooltipLabel = React.useMemo(() => { // Memoizing the formatted headline
    if (hideLabel || !payload?.length) { // visibility guard
      return null; // exit
    } // closing guard

    const [item] = payload; // getting first item in payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`; // resolving the config lookup key
    const itemConfig = getPayloadConfigFromPayload(config, item, key); // getting specific series config
    const value = // resolving the headline text
      !labelKey && typeof label === "string" // checking for direct label match
        ? config[label as keyof typeof config]?.label || label // lookup or fallback
        : itemConfig?.label; // config based label

    if (labelFormatter) { // handling custom formatter
      return ( // returning formatted JSX
        <div className={cn("font-medium", labelClassName)}> // headline wrapper
          {labelFormatter(value, payload)} // executing child formatter
        </div> // closing wrapper
      ); // closing return
    } // closing check

    if (!value) { // guard for empty labels
      return null; // exit
    } // closing guard

    return <div className={cn("font-medium", labelClassName)}>{value}</div>; // Default headline rendering
  }, [ // dependencies for memoization
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]); // closing memo block

  if (!active || !payload?.length) { // global visibility guard for the tooltip
    return null; // exit
  } // closing guard

  const nestLabel = payload.length === 1 && indicator !== "dot"; // determining if label should be inline or global

  return ( // Returning the content card
    <div // the tooltip card
      className={cn( // styling the popover
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", // Professional floating card style
        className, // custom overrides
      )} // closing cn call
    > // closing opening tag
      {!nestLabel ? tooltipLabel : null} // rendering global label if not nested
      <div className="grid gap-1.5"> // container for value items
        {payload.map((item, index) => { // iterating through active series
          const key = `${nameKey || item.name || item.dataKey || "value"}`; // resolving key for lookup
          const itemConfig = getPayloadConfigFromPayload(config, item, key); // getting item config
          const indicatorColor = color || item.payload.fill || item.color; // resolving display color

          return ( // Returning individual value row
            <div // row container
              key={item.dataKey} // stable key
              className={cn( // layout styling
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", // sizing for icons/indicators
                indicator === "dot" && "items-center", // vertical centering for dot indicators
              )} // closing cn call
            > // closing opening tag
              {formatter && item?.value !== undefined && item.name ? ( // handling custom value formatter
                formatter(item.value, item.name, item, index, item.payload) // executing user formatter
              ) : ( // standard item rendering
                <> // fragment
                  {itemConfig?.icon ? ( // rendering custom icon if configured
                    <itemConfig.icon /> // icon component
                  ) : ( // standard visual indicator
                    !hideIndicator && ( // global toggle check
                      <div // the indicator shape
                        className={cn( // dynamic shape logic
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", // base shapes
                          { // variations mapping
                            "h-2.5 w-2.5": indicator === "dot", // small square/circle
                            "w-1": indicator === "line", // thin line
                            "w-0 border-[1.5px] border-dashed bg-transparent": // dashed border line
                              indicator === "dashed", // checking state
                            "my-0.5": nestLabel && indicator === "dashed", // spacing adjustment
                          }, // closing dynamic map
                        )} // closing cn call
                        style={ // applying resolved colors via style object
                          { // inline styles
                            "--color-bg": indicatorColor, // background color
                            "--color-border": indicatorColor, // border color
                          } as React.CSSProperties // casting for TS
                        } // closing style block
                      /> // closing indicator
                    )
                  )} // closing icon/indicator choice
                  <div // text content box
                    className={cn( // layout logic
                      "flex flex-1 justify-between leading-none", // spacing out label and value
                      nestLabel ? "items-end" : "items-center", // alignment based on nesting
                    )} // closing cn call
                  > // closing opening tag
                    <div className="grid gap-1.5"> // label container
                      {nestLabel ? tooltipLabel : null} // rendering nested headline if applicable
                      <span className="text-muted-foreground"> // the series name
                        {itemConfig?.label || item.name} // label lookup or fallback
                      </span> // closing span
                    </div> // closing container
                    {item.value && ( // rendering calculated value
                      <span className="text-foreground font-mono font-medium tabular-nums"> // Monospace tabular formatting for alignment
                        {item.value.toLocaleString()} // localized number formatting
                      </span> // closing value span
                    )} // closing check
                  </div> // closing text box
                </> // closing fragment
              )} // closing specialized formatter block
            </div> // closing row div
          ); // closing map return
        })} // closing map block
      </div> // closing data points container
    </div> // closing card div
  ); // closing main return
} // Closing ChartTooltipContent component block

const ChartLegend = RechartsPrimitive.Legend; // Re-exporting standard Legend wrapper

function ChartLegendContent({ // specialized implementation for chart legends
  className, // optional classes
  hideIcon = false, // toggle icons
  payload, // the series list
  verticalAlign = "bottom", // placement location
  nameKey, // translation key
}: React.ComponentProps<"div"> & // div props
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & { // essential props from Recharts
    hideIcon?: boolean; // extension prop
    nameKey?: string; // extension prop
  }) { // component implementation
  const { config } = useChart(); // accessing global context

  if (!payload?.length) { // guard for empty legends
    return null; // exit
  } // closing guard

  return ( // Returning legend container
    <div // the legend box
      className={cn( // styling the layout
        "flex items-center justify-center gap-4", // centered horizontal list
        verticalAlign === "top" ? "pb-3" : "pt-3", // directional padding
        className, // overrides
      )} // closing cn call
    > // closing opening tag
      {payload.map((item) => { // iterating through legend items
        const key = `${nameKey || item.dataKey || "value"}`; // resolving config key
        const itemConfig = getPayloadConfigFromPayload(config, item, key); // getting specific lookups

        return ( // Returning individual item
          <div // item container
            key={item.value} // stable key
            className={cn( // layout styling
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3", // icon sizing
            )} // closing cn call
          > // closing opening tag
            {itemConfig?.icon && !hideIcon ? ( // rendering custom legend icon
              <itemConfig.icon /> // icon component
            ) : ( // standard colored box
              <div // small color swatch
                className="h-2 w-2 shrink-0 rounded-[2px]" // consistent small square
                style={{ // applying item color
                  backgroundColor: item.color, // direct color fill
                }} // closing style
              /> // closing swatch
            )} // closing icon check
            {itemConfig?.label} // the display text
          </div> // closing item div
        ); // closing map return
      })} // closing map block
    </div> // closing wrapper
  ); // closing main return
} // Closing ChartLegendContent component block

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload( // Utility for resolving config for complex data structures
  config: ChartConfig, // global configuration
  payload: unknown, // the raw data point
  key: string, // current resolution key
) { // utility implementation
  if (typeof payload !== "object" || payload === null) { // primitive sanity check
    return undefined; // exit if not an object
  } // closing check

  const payloadPayload = // descending into Recharts payload structure
    "payload" in payload && // checking for standard nesting
    typeof payload.payload === "object" && // ensuring it's an object
    payload.payload !== null // ensuring not null
      ? payload.payload // assigning found sub-object
      : undefined; // falling back

  let configLabelKey: string = key; // defaulting to the original key

  if ( // checking for direct key existence in payload
    key in payload && // key check
    typeof payload[key as keyof typeof payload] === "string" // ensuring it's a string identifier
  ) { // successful find
    configLabelKey = payload[key as keyof typeof payload] as string; // updating identifier
  } else if ( // checking nested payload logic
    payloadPayload && // ensuring nested payloads exist
    key in payloadPayload && // checking key in nested data
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string" // string validation
  ) { // successful find
    configLabelKey = payloadPayload[ // updating identifier
      key as keyof typeof payloadPayload // type safe access
    ] as string; // casting result
  } // closing checks

  return configLabelKey in config // standard config resolution logic
    ? config[configLabelKey] // returning specific matches
    : config[key as keyof typeof config]; // falling back to the raw key lookup
} // Closing helper function

export { // Exporting coordinated components for chart building
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}; // closing export block
