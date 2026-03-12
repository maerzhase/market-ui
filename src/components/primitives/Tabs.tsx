"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

export type TabsContextType = {
  layout: "default" | "centered";
  variant: "default" | "underline";
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
  layout = "default",
  variant = "default",
  ...props
}: TabsProps): React.ReactElement {
  return (
    <TabsLayoutContext value={{ layout, variant }}>
      <TabsPrimitive.Root className="flex flex-col" {...props} />
    </TabsLayoutContext>
  );
}

const tabsListVariants = cva("relative flex border-b border-b-border pb-4", {
  variants: {
    layout: {
      default: "items-center gap-5",
      centered: "justify-between px-1",
    },
  },
  defaultVariants: {
    layout: "default",
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
      className={cn(tabsListVariants({ layout: context.layout }), className)}
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
  "relative rounded-xs font-sans text-2 leading-none whitespace-nowrap text-muted-foreground after:pointer-events-auto after:absolute after:z-0 after:rounded-xs after:bg-transparent after:content-[''] hover:text-foreground focus-visible:ring focus-visible:outline-none data-active:text-foreground",
  {
    variants: {
      layout: {
        default: "after:-inset-x-2.5 after:-inset-y-1.5",
        centered: "w-full after:inset-x-0 after:-inset-y-1.5",
      },
    },
    defaultVariants: {
      layout: "default",
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
      className={cn(tabVariants({ layout: context.layout }), className)}
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
