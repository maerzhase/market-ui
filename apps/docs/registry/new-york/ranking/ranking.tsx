"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Separator, Text } from "..";

interface SlotSpec {
  key: string;
  atIndex: number;
  children: SlotProps["children"];
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

type SlotChildren =
  | React.ReactNode
  | ((context: SlotContext) => React.ReactNode);

type ListEntry<T> =
  | { type: "item"; item: T; key: string }
  | { type: "slot"; spec: SlotSpec };

interface RankingContextValue<T> {
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
  totalEntryCount: number;
}

interface GroupItemContextValue<T> {
  item: T;
  globalIndex: number;
  groupIndex: number;
  rank: number;
  rankInGroup: number;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  isLastItem: boolean;
}

const RankingContext =
  React.createContext<RankingContextValue<unknown> | null>(null);

function useRanking<T>(): RankingContextValue<T> {
  const context = React.useContext(RankingContext);
  if (!context) {
    throw new Error("useRanking must be used within Ranking.Root");
  }
  return context as RankingContextValue<T>;
}

const GroupContext = React.createContext<GroupContextValue<unknown> | null>(
  null,
);

function useGroup<T>(): GroupContextValue<T> {
  const context = React.useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within Ranking.Group");
  }
  return context as GroupContextValue<T>;
}

const GroupItemContext =
  React.createContext<GroupItemContextValue<unknown> | null>(null);

function useGroupItem<T>(): GroupItemContextValue<T> {
  const context = React.useContext(GroupItemContext);
  if (!context) {
    throw new Error("useGroupItem must be used within Ranking.GroupItem");
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

interface SlotProps {
  slotKey: string;
  atIndex: number;
  children: SlotChildren;
}

function Slot({
  slotKey,
  atIndex,
  children,
}: SlotProps): React.ReactElement | null {
  const { registerSlot, unregisterSlot } = useRanking();

  React.useEffect(() => {
    registerSlot({ key: slotKey, atIndex, children });
    return () => unregisterSlot(slotKey);
  }, [slotKey, atIndex, children, registerSlot, unregisterSlot]);

  return null;
}

interface RankingProps<T> {
  items: T[];
  children: React.ReactNode;
  getKey: (item: T) => string;
  boundaries?: number[];
  labels?: string[];
  className?: string;
}

function RankingRoot<T>({
  items,
  children,
  getKey,
  boundaries = [],
  labels = [],
  className,
}: RankingProps<T>): React.ReactElement {
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

  const entries = React.useMemo<ListEntry<T>[]>(() => {
    const result: ListEntry<T>[] = items.map((item) => ({
      type: "item" as const,
      item,
      key: getKey(item),
    }));

    const sortedSlots = Array.from(slots.values()).sort(
      (a, b) => a.atIndex - b.atIndex,
    );

    let offset = 0;
    for (const spec of sortedSlots) {
      const slotEntry: ListEntry<T> = { type: "slot", spec };
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
    <RankingContext.Provider
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
    </RankingContext.Provider>
  );
}

interface GroupProps {
  children: React.ReactNode;
  className?: string;
}

function Group({ children, className }: GroupProps): React.ReactElement {
  const { entries, boundaries, labels } = useRanking();

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

  const childArray = React.Children.toArray(children);
  const dividerChildren = childArray.filter(
    (child) => React.isValidElement(child) && child.type === GroupDivider,
  );
  const itemChildren = childArray.filter(
    (child) => !React.isValidElement(child) || child.type !== GroupDivider,
  );

  return (
    <>
      {groups.map((group, groupIndex) => (
        <GroupContext.Provider
          key={`${group.startIndex}-${group.label}`}
          value={{
            groupIndex,
            groupLabel: group.label,
            entries: group.entries,
            startIndex: group.startIndex,
            totalEntryCount: entries.length,
          }}
        >
          <div>
            {dividerChildren}
            <ol
              className={cn("m-0 list-none p-0", className)}
              start={group.startIndex + 1}
            >
              {itemChildren}
            </ol>
          </div>
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
  const { entries, startIndex, groupIndex, totalEntryCount } = useGroup<unknown>();
  const { getKey } = useRanking<unknown>();

  return (
    <>
      {entries.map((entry, entryIndexInGroup) => {
        const globalIndex = startIndex + entryIndexInGroup;
        const sharedContext = {
          globalIndex,
          groupIndex,
          rank: globalIndex + 1,
          rankInGroup: entryIndexInGroup + 1,
          isFirstInGroup: entryIndexInGroup === 0,
          isLastInGroup: entryIndexInGroup === entries.length - 1,
          isLastItem: globalIndex === totalEntryCount - 1,
        };

        if (entry.type === "slot") {
          return (
            <li key={entry.spec.key} className={className}>
              {typeof entry.spec.children === "function"
                ? entry.spec.children(sharedContext)
                : entry.spec.children}
            </li>
          );
        }

        const context: GroupItemContextValue<unknown> = {
          item: entry.item,
          ...sharedContext,
        };

        return (
          <GroupItemContext.Provider key={getKey(entry.item)} value={context}>
            <li className={className}>{children}</li>
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
  const { globalIndex, rank, groupIndex } = useGroupItem();

  if (children) {
    return <>{children({ globalIndex, rank, groupIndex })}</>;
  }

  return (
    <Text color="tertiary" className={cn("w-8 shrink-0", className)}>
      #{rank}
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

interface RankingComponent {
  Root: typeof RankingRoot;
  Empty: typeof Empty;
  Slot: typeof Slot;
  Group: typeof Group;
  GroupItem: typeof GroupItem;
  GroupItemIndex: typeof GroupItemIndex;
  GroupItemValue: typeof GroupItemValue;
  GroupDivider: typeof GroupDivider;
}

const Ranking = {
  Root: RankingRoot,
  Empty,
  Slot,
  Group,
  GroupItem,
  GroupItemIndex,
  GroupItemValue,
  GroupDivider,
} as RankingComponent;

const RankedList: RankingComponent = Ranking;

type RankedListProps<T> = RankingProps<T>;

export { Ranking, RankedList };
export type {
  GroupItemContextValue,
  RankedListProps,
  RankingProps,
  SlotContext,
  SlotProps,
};
