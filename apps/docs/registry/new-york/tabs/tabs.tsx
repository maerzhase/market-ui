"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

export type TabsContextType = {
  layout: "default" | "centered";
  variant: "default" | "underline" | "segmented";
};

const TabsLayoutContext = React.createContext<TabsContextType>({
  layout: "default",
  variant: "default",
});

interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  layout?: TabsContextType["layout"];
  variant?: TabsContextType["variant"];
}

function Tabs({
  className,
  layout = "default",
  variant = "default",
  ...props
}: TabsProps): React.ReactElement {
  return (
    <TabsLayoutContext value={{ layout, variant }}>
      <TabsPrimitive.Root
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TabsLayoutContext>
  );
}

const tabsListVariants = cva("relative flex", {
  variants: {
    layout: {
      default: "items-center gap-5",
      centered: "justify-between px-1",
    },
    variant: {
      default: "border-b border-b-border pb-4",
      underline: "border-b border-b-border pb-4",
      segmented:
        "inline-flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1",
    },
  },
  defaultVariants: {
    layout: "default",
    variant: "default",
  },
});

function TabsList({
  children,
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>): React.ReactElement {
  const context = React.useContext(TabsLayoutContext);

  return (
    <TabsPrimitive.List
      className={cn(
        tabsListVariants({
          layout: context.layout,
          variant: context.variant,
        }),
        context.variant === "segmented" &&
          context.layout === "centered" &&
          "justify-start px-1",
        className,
      )}
      {...props}
    >
      {children}
      {context.variant === "underline" ? <TabsIndicator /> : null}
    </TabsPrimitive.List>
  );
}

function TabsIndicator({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator>): React.ReactElement {
  const context = React.useContext(TabsLayoutContext);
  return (
    <TabsPrimitive.Indicator
      className={cn(
        "absolute bottom-0 left-0 z-1 h-[3px] w-(--active-tab-width) translate-x-(--active-tab-left) bg-foreground transition-transform duration-200 ease-in-out",
        {
          "w-[calc(var(--active-tab-width)+4px)]":
            context.layout === "centered",
          "translate-x-[calc(var(--active-tab-left)-4px)]":
            context.layout === "centered",
        },
        className,
      )}
      {...props}
    />
  );
}

const tabVariants = cva(
  "relative rounded-xs font-sans text-sm leading-none whitespace-nowrap text-muted-foreground after:pointer-events-auto after:absolute after:z-0 after:rounded-xs after:bg-transparent after:content-[''] hover:text-foreground focus-visible:ring focus-visible:outline-none data-active:text-foreground",
  {
    variants: {
      layout: {
        default: "after:-inset-x-2.5 after:-inset-y-1.5",
        centered: "w-full after:inset-x-0 after:-inset-y-1.5",
      },
      variant: {
        default: "",
        underline: "",
        segmented:
          "rounded-md border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors after:hidden hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-active:border-border data-active:bg-background data-active:text-foreground data-active:shadow-[0_1px_2px_0_rgb(0,0,0,0.04)] aria-selected:border-border aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-[0_1px_2px_0_rgb(0,0,0,0.04)]",
      },
    },
    defaultVariants: {
      layout: "default",
      variant: "default",
    },
  },
);

function Tab({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>): React.ReactElement {
  const context = React.useContext(TabsLayoutContext);

  return (
    <TabsPrimitive.Tab
      className={cn(
        tabVariants({ layout: context.layout, variant: context.variant }),
        context.variant === "segmented" &&
          context.layout === "centered" &&
          "w-auto",
        className,
      )}
      {...props}
    />
  );
}

function TabsPanel({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsIndicator, Tab, TabsPanel };
