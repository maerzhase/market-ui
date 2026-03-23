"use client";

import { Ranking, Text } from "@m3000/market";

interface Item {
  id: string;
  label: string;
  value: string;
}

const items: Item[] = [
  { id: "1", label: "Alpha", value: "98" },
  { id: "2", label: "Beacon", value: "94" },
  { id: "3", label: "Cipher", value: "91" },
  { id: "4", label: "Drift", value: "88" },
];

export function RankingStaticSlotExample() {
  return (
    <Ranking.Root
      items={items}
      getKey={(item) => item.id}
      boundaries={[3]}
      labels={["Top entries", "More entries"]}
      className="overflow-hidden rounded-lg border border-border bg-background"
    >
      <Ranking.Slot slotKey="highlight" atIndex={1}>
        <div className="bg-muted/50 px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            <Text color="tertiary" className="w-12 shrink-0">
              Preview
            </Text>
            <Text>Preview item</Text>
            <Text color="secondary">96</Text>
          </div>
        </div>
      </Ranking.Slot>
      <Ranking.Group>
        <Ranking.GroupDivider />
        <Ranking.GroupItem>
          <Ranking.GroupItemValue>
            {(item: Item) => (
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-3">
                  <Ranking.GroupItemIndex />
                  <Text>{item.label}</Text>
                </div>
                <Text color="secondary">{item.value}</Text>
              </div>
            )}
          </Ranking.GroupItemValue>
        </Ranking.GroupItem>
      </Ranking.Group>
    </Ranking.Root>
  );
}
