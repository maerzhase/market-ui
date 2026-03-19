"use client";

import { Tab as DsTab, Tabs as DsTabs, TabsList, TabsPanel, cn } from "@m3000/market";
import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

function escapeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, "-");
}

export interface TabProps {
  value?: string;
  children?: ReactNode;
}

export interface TabsProps {
  items?: string[];
  label?: ReactNode;
  defaultIndex?: number;
  className?: string;
  children?: ReactNode;
}

function getTabs(children: ReactNode): ReactElement<TabProps>[] {
  return Children.toArray(children).filter((child): child is ReactElement<TabProps> =>
    isValidElement<TabProps>(child),
  );
}

export function Tabs({
  items,
  label,
  defaultIndex = 0,
  className,
  children,
}: TabsProps) {
  const tabs = useMemo(() => getTabs(children), [children]);
  const labels = items ?? tabs.map((tab, index) => tab.props.value ?? `Tab ${index + 1}`);
  const firstLabel = labels[defaultIndex] ?? labels[0] ?? "";
  const [active, setActive] = useState(escapeValue(firstLabel));

  return (
    <DsTabs
      value={active}
      onValueChange={setActive}
      variant="segmented"
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
      data-installation-tabs
    >
      {label ? (
        <div className="px-4 pt-4 text-sm font-medium text-foreground">{label}</div>
      ) : null}
      <div className="border-b border-border bg-background px-4 py-3">
        <TabsList
          aria-label="Installation options"
        >
          {labels.map((tabLabel) => (
            <DsTab key={tabLabel} value={escapeValue(tabLabel)}>
              {tabLabel}
            </DsTab>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab, index) => {
        const value = tab.props.value ?? labels[index] ?? "";
        return (
          <TabsPanel className="bg-muted/30" key={value || index} value={escapeValue(value)}>
            {tab.props.children}
          </TabsPanel>
        );
      })}
    </DsTabs>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
