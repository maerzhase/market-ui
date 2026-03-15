"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Separator, Text } from "./primitives";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SlotSpec {
  key: string;
  atIndex: number;
  children: (context: SlotContext) => React.ReactNode;
}

interface SlotContext {
  globalIndex: number;
  groupIndex: number;
  rank: number;
  rankInGroup: number;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isLastItem: boolean;
}

type ListEntry<T> =
  | { type: "item"; item: T; key: string }
  | { type: "slot"; spec: SlotSpec };

interface RankedListContextValue<T> {
  items: T[];
  entries: ListEntry<T>[];
  boundaries: number[];
  labels: string[];
  getKey: (item: T) => string;
  registerSlot: (spec: SlotSpec) => void;
  unregisterSlot: (key: string) => void;
}

interface GroupContextValue<T> {
  groupIndex: number;
  groupLabel: string;
  entries: ListEntry<T>[];
  startIndex: number;
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

// ─── Contexts ─────────────────────────────────────────────────────────────────

const RankedListContext =
  React.createContext<RankedListContextValue<unknown> | null>(null);

function useRankedList<T>(): RankedListContextValue<T> {
  const context = React.useContext(RankedListContext);
  if (!context) {
    throw new Error("useRankedList must be used within RankedList.Root");
  }
  return context as RankedListContextValue<T>;
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

const GroupItemContext =
  React.createContext<GroupItemContextValue<unknown> | null>(null);

function useGroupItem<T>(): GroupItemContextValue<T> {
  const context = React.useContext(GroupItemContext);
  if (!context) {
    throw new Error("useGroupItem must be used within RankedList.GroupItem");
  }
  return context as GroupItemContextValue<T>;
}

// ─── Components ───────────────────────────────────────────────────────────────

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

interface SlotProps {
  slotKey: string;
  atIndex: number;
  children: (context: SlotContext) => React.ReactNode;
}

function Slot({
  slotKey,
  atIndex,
  children,
}: SlotProps): React.ReactElement | null {
  const { registerSlot, unregisterSlot } = useRankedList();

  React.useEffect(() => {
    registerSlot({ key: slotKey, atIndex, children });
    return () => unregisterSlot(slotKey);
  }, [slotKey, atIndex, children, registerSlot, unregisterSlot]);

  return null;
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
  const [slots, setSlots] = React.useState<Map<string, SlotSpec>>(new Map());

  const registerSlot = React.useCallback((spec: SlotSpec) => {
    setSlots((prev) => {
      const next = new Map(prev);
      next.set(spec.key, spec);
      return next;
    });
  }, []);

  const unregisterSlot = React.useCallback((key: string) => {
    setSlots((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  // Build entries: items in original order, with slots inserted at their specified indices
  const entries = React.useMemo<ListEntry<T>[]>(() => {
    // Start with items in their original order
    const result: ListEntry<T>[] = items.map((item) => ({
      type: "item" as const,
      item,
      key: getKey(item),
    }));

    // Insert slots at their specified indices
    // Sort by atIndex ascending so slots at same index maintain registration order
    const sortedSlots = Array.from(slots.values()).sort(
      (a, b) => a.atIndex - b.atIndex,
    );

    // Track offset as we insert (each insertion shifts subsequent indices)
    let offset = 0;
    for (const spec of sortedSlots) {
      const slotEntry: ListEntry<T> = { type: "slot", spec };
      // Clamp to valid range: [0, result.length]
      const targetIndex = Math.max(0, Math.min(spec.atIndex, items.length));
      const insertAt = targetIndex + offset;
      result.splice(insertAt, 0, slotEntry);
      offset++;
    }

    return result;
  }, [items, slots, getKey]);

  const childArray = React.Children.toArray(children);

  const emptyChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === Empty,
  );

  const otherChildren = childArray.filter(
    (child) => !React.isValidElement(child) || child.type !== Empty,
  );

  // Show empty state only if no items AND no slots
  if (entries.length === 0) {
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
        entries: entries as ListEntry<unknown>[],
        boundaries,
        labels,
        getKey: getKey as (item: unknown) => string,
        registerSlot,
        unregisterSlot,
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
  const { entries, boundaries, labels } = useRankedList();

  const groups: Array<{
    label: string;
    startIndex: number;
    entries: ListEntry<unknown>[];
  }> = [];
  let currentGroupEntries: ListEntry<unknown>[] = [];
  let currentGroupStartIndex = 0;
  let currentGroupIndex = 0;
  let nextBoundary = boundaries[0] ?? Infinity;

  entries.forEach((entry, index) => {
    if (index >= nextBoundary) {
      groups.push({
        label: labels[currentGroupIndex] ?? `Group ${currentGroupIndex + 1}`,
        startIndex: currentGroupStartIndex,
        entries: currentGroupEntries,
      });
      currentGroupEntries = [];
      currentGroupStartIndex = index;
      currentGroupIndex++;
      nextBoundary = boundaries[currentGroupIndex] ?? Infinity;
    }
    currentGroupEntries.push(entry);
  });

  if (currentGroupEntries.length > 0) {
    groups.push({
      label: labels[currentGroupIndex] ?? `Group ${currentGroupIndex + 1}`,
      startIndex: currentGroupStartIndex,
      entries: currentGroupEntries,
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
            entries: group.entries,
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
  const { entries, startIndex, groupIndex } = useGroup<unknown>();
  const { getKey } = useRankedList<unknown>();

  return (
    <>
      {entries.map((entry, entryIndexInGroup) => {
        const globalIndex = startIndex + entryIndexInGroup;

        // Render slots using their children function
        if (entry.type === "slot") {
          const context: SlotContext = {
            globalIndex,
            groupIndex,
            rank: globalIndex + 1,
            rankInGroup: entryIndexInGroup + 1,
            isFirstInGroup: entryIndexInGroup === 0,
            isLastInGroup: entryIndexInGroup === entries.length - 1,
            isLastItem: globalIndex === entries.length - 1,
          };
          return (
            <div key={entry.spec.key} className={className}>
              {entry.spec.children(context)}
            </div>
          );
        }

        // Render items with children
        const context: GroupItemContextValue<unknown> = {
          item: entry.item,
          globalIndex,
          groupIndex,
          rankInGroup: entryIndexInGroup + 1,
          isFirstInGroup: entryIndexInGroup === 0,
          isLastInGroup: entryIndexInGroup === entries.length - 1,
          isLastItem: globalIndex === entries.length - 1,
        };

        return (
          <GroupItemContext.Provider key={getKey(entry.item)} value={context}>
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
      <Separator label={groupLabel} />
    </div>
  );
}

// ─── Component Export ─────────────────────────────────────────────────────────

interface RankedListComponent {
  Root: typeof RankedListInner;
  Empty: typeof Empty;
  Slot: typeof Slot;
  Group: typeof Group;
  GroupItem: typeof GroupItem;
  GroupItemIndex: typeof GroupItemIndex;
  GroupItemValue: typeof GroupItemValue;
  GroupDivider: typeof GroupDivider;
}

const RankedList = {
  Root: RankedListInner,
  Empty,
  Slot,
  Group,
  GroupItem,
  GroupItemIndex,
  GroupItemValue,
  GroupDivider,
} as RankedListComponent;

export { RankedList };
export type { RankedListProps, GroupItemContextValue, SlotContext, SlotProps };
