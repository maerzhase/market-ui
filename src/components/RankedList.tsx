"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Text } from "./primitives/Text";

interface RankedListContextValue<T> {
  items: T[];
  boundaries: number[];
  labels: string[];
  getKey: (item: T) => string;
}

const RankedListContext =
  React.createContext<RankedListContextValue<unknown> | null>(null);

function useRankedList<T>(): RankedListContextValue<T> {
  const context = React.useContext(RankedListContext);
  if (!context) {
    throw new Error("useRankedList must be used within RankedList");
  }
  return context as RankedListContextValue<T>;
}

interface GroupContextValue<T> {
  groupIndex: number;
  groupLabel: string;
  items: T[];
  startIndex: number;
}

const GroupContext = React.createContext<GroupContextValue<unknown> | null>(
  null,
);

function useGroup<T>(): GroupContextValue<T> {
  const context = React.useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within RankedList.Group");
  }
  return context as GroupContextValue<T>;
}

interface GroupItemContextValue<T> {
  item: T;
  globalIndex: number;
  groupIndex: number;
  rankInGroup: number;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isLastItem: boolean;
}

const GroupItemContext =
  React.createContext<GroupItemContextValue<unknown> | null>(null);

function useGroupItem<T>(): GroupItemContextValue<T> {
  const context = React.useContext(GroupItemContext);
  if (!context) {
    throw new Error("useGroupItem must be used within RankedList.GroupItem");
  }
  return context as GroupItemContextValue<T>;
}

interface EmptyProps {
  children: React.ReactNode;
  className?: string;
}

function Empty({ children, className }: EmptyProps): React.ReactElement {
  return (
    <div className={cn("flex flex-1 items-center justify-center", className)}>
      {children}
    </div>
  );
}

interface RankedListProps<T> {
  items: T[];
  children: React.ReactNode;
  getKey: (item: T) => string;
  boundaries?: number[];
  labels?: string[];
  className?: string;
}

function RankedListInner<T>({
  items,
  children,
  getKey,
  boundaries = [],
  labels = [],
  className,
}: RankedListProps<T>): React.ReactElement {
  const childArray = React.Children.toArray(children);

  const emptyChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === Empty,
  );

  const otherChildren = childArray.filter(
    (child) => !React.isValidElement(child) || child.type !== Empty,
  );

  if (items.length === 0) {
    return emptyChild ? (
      <>{emptyChild}</>
    ) : (
      <Empty>
        <Text color="tertiary">No items</Text>
      </Empty>
    );
  }

  return (
    <RankedListContext.Provider
      value={{
        items: items as unknown[],
        boundaries,
        labels,
        getKey: getKey as (item: unknown) => string,
      }}
    >
      <div className={className}>{otherChildren}</div>
    </RankedListContext.Provider>
  );
}

interface GroupProps {
  children: React.ReactNode;
  className?: string;
}

function Group({ children, className }: GroupProps): React.ReactElement {
  const { items, boundaries, labels } = useRankedList();

  const groups: Array<{ label: string; startIndex: number; items: unknown[] }> =
    [];
  let currentGroupItems: unknown[] = [];
  let currentGroupStartIndex = 0;
  let currentGroupIndex = 0;
  let nextBoundary = boundaries[0] ?? Infinity;

  items.forEach((item, index) => {
    if (index >= nextBoundary) {
      groups.push({
        label: labels[currentGroupIndex] ?? `Group ${currentGroupIndex + 1}`,
        startIndex: currentGroupStartIndex,
        items: currentGroupItems,
      });
      currentGroupItems = [];
      currentGroupStartIndex = index;
      currentGroupIndex++;
      nextBoundary = boundaries[currentGroupIndex] ?? Infinity;
    }
    currentGroupItems.push(item);
  });

  if (currentGroupItems.length > 0) {
    groups.push({
      label: labels[currentGroupIndex] ?? `Group ${currentGroupIndex + 1}`,
      startIndex: currentGroupStartIndex,
      items: currentGroupItems,
    });
  }

  return (
    <>
      {groups.map((group, groupIndex) => (
        <GroupContext.Provider
          key={group.label}
          value={{
            groupIndex,
            groupLabel: group.label,
            items: group.items,
            startIndex: group.startIndex,
          }}
        >
          <div className={className}>{children}</div>
        </GroupContext.Provider>
      ))}
    </>
  );
}

interface GroupItemProps {
  children: React.ReactNode;
  className?: string;
}

function GroupItem({
  children,
  className,
}: GroupItemProps): React.ReactElement {
  const { items, startIndex, groupIndex } = useGroup<unknown>();
  const { items: allItems, getKey } = useRankedList<unknown>();

  return (
    <>
      {items.map((item, itemIndexInGroup) => {
        const globalIndex = startIndex + itemIndexInGroup;
        const context: GroupItemContextValue<unknown> = {
          item,
          globalIndex,
          groupIndex,
          rankInGroup: itemIndexInGroup + 1,
          isFirstInGroup: itemIndexInGroup === 0,
          isLastInGroup: itemIndexInGroup === items.length - 1,
          isLastItem: globalIndex === allItems.length - 1,
        };

        return (
          <GroupItemContext.Provider key={getKey(item)} value={context}>
            <div className={className}>{children}</div>
          </GroupItemContext.Provider>
        );
      })}
    </>
  );
}

interface GroupItemIndexProps {
  children?: (context: {
    globalIndex: number;
    rank: number;
    groupIndex: number;
  }) => React.ReactNode;
  className?: string;
}

function GroupItemIndex({
  children,
  className,
}: GroupItemIndexProps): React.ReactElement | null {
  const { globalIndex, rankInGroup, groupIndex } = useGroupItem();

  if (children) {
    return <>{children({ globalIndex, rank: rankInGroup, groupIndex })}</>;
  }

  return (
    <Text color="tertiary" className={cn("w-8 shrink-0", className)}>
      #{globalIndex + 1}
    </Text>
  );
}

interface GroupItemValueProps<T> {
  children: (item: T, context: GroupItemContextValue<T>) => React.ReactNode;
}

function GroupItemValue<T>({
  children,
}: GroupItemValueProps<T>): React.ReactElement | null {
  const groupItemContext = useGroupItem<T>();
  return <>{children(groupItemContext.item, groupItemContext)}</>;
}

interface GroupDividerProps {
  children?: (context: {
    label: string;
    groupIndex: number;
  }) => React.ReactNode;
  className?: string;
}

function GroupDivider({
  children,
  className,
}: GroupDividerProps): React.ReactElement | null {
  const { groupLabel, groupIndex } = useGroup();

  if (children) {
    return (
      <div
        className={cn("sticky top-0 bg-background", className)}
        style={{ zIndex: 10 + groupIndex }}
      >
        {children({ label: groupLabel, groupIndex })}
      </div>
    );
  }

  return (
    <div
      className={cn("sticky top-0 bg-background", className)}
      style={{ zIndex: 10 + groupIndex }}
    >
      <div className="flex items-center gap-3 py-2">
        <div className="h-px min-w-0 flex-1 bg-separator" aria-hidden />
        <Text size="1" color="secondary" className="shrink-0">
          {groupLabel}
        </Text>
        <div className="h-px min-w-0 flex-1 bg-separator" aria-hidden />
      </div>
    </div>
  );
}

interface RankedListComponent {
  Root: typeof RankedListInner;
  Empty: typeof Empty;
  Group: typeof Group;
  GroupItem: typeof GroupItem;
  GroupItemIndex: typeof GroupItemIndex;
  GroupItemValue: typeof GroupItemValue;
  GroupDivider: typeof GroupDivider;
}

const RankedList = {
  Root: RankedListInner,
  Empty,
  Group,
  GroupItem,
  GroupItemIndex,
  GroupItemValue,
  GroupDivider,
} as RankedListComponent;

export { RankedList };

export type { RankedListProps, GroupItemContextValue };
