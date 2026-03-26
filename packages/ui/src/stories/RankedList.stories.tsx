import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Ranking } from "@/components";
import { Separator, Text } from "@/components/primitives";

interface Player {
  id: string;
  name: string;
  score: number;
}

const players: Player[] = [
  { id: "1", name: "Alice", score: 950 },
  { id: "2", name: "Bob", score: 880 },
  { id: "3", name: "Charlie", score: 820 },
  { id: "4", name: "Diana", score: 790 },
  { id: "5", name: "Eve", score: 750 },
];

const meta: Meta<typeof Ranking.Root> = {
  title: "Primitives/Ranking",
  component: Ranking.Root,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="h-125 w-96 overflow-y-auto rounded-lg border border-border bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;

function RankingRows() {
  return (
    <Ranking.Group>
      <Ranking.GroupDivider />
      <Ranking.GroupItem>
        <Ranking.GroupItemValue>
          {(player: Player, context) => (
            <>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <Ranking.GroupItemIndex />
                  <Text>{player.name}</Text>
                </div>
                <Text color="secondary">{player.score} pts</Text>
              </div>
              {!context.isLastInGroup && <Separator orientation="horizontal" />}
            </>
          )}
        </Ranking.GroupItemValue>
      </Ranking.GroupItem>
    </Ranking.Group>
  );
}

export const Basic: StoryObj<typeof Ranking.Root> = {
  render: () => (
    <Ranking.Root
      items={players}
      getKey={(player) => player.id}
      boundaries={[3]}
      labels={["Top 3", "Others"]}
    >
      <Ranking.Empty>
        <Text color="tertiary">No players</Text>
      </Ranking.Empty>
      <RankingRows />
    </Ranking.Root>
  ),
};

export const CustomGroup: StoryObj<typeof Ranking.Root> = {
  render: () => (
    <Ranking.Root
      items={players}
      getKey={(player) => player.id}
      boundaries={[2]}
      labels={["Qualified", "Chasing"]}
    >
      <Ranking.Group>
        <Ranking.GroupDivider className="px-3 py-2">
          {({ label, groupIndex }) => (
            <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
              <Text weight="medium">{label}</Text>
              <Text color="secondary">
                {groupIndex === 0 ? "In form" : "Needs a result"}
              </Text>
            </div>
          )}
        </Ranking.GroupDivider>
        <Ranking.GroupItem>
          <Ranking.GroupItemValue>
            {(player: Player, context) => (
              <>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Ranking.GroupItemIndex />
                    <Text>{player.name}</Text>
                  </div>
                  <Text color="secondary">{player.score} pts</Text>
                </div>
                {!context.isLastInGroup && (
                  <Separator orientation="horizontal" />
                )}
              </>
            )}
          </Ranking.GroupItemValue>
        </Ranking.GroupItem>
      </Ranking.Group>
    </Ranking.Root>
  ),
};

export const StaticSlot: StoryObj<typeof Ranking.Root> = {
  render: () => (
    <Ranking.Root
      items={players}
      getKey={(player) => player.id}
      boundaries={[3]}
      labels={["Top 3", "Others"]}
    >
      <Ranking.Slot slotKey="reserved" atIndex={1}>
        <div className="mx-4 my-3 rounded-md border border-dashed border-border bg-muted px-3 py-2">
          <Text size="2" weight="medium">
            Reserved position
          </Text>
          <Text size="2" color="secondary">
            Static slot content can be inserted at a fixed ranked index.
          </Text>
        </div>
      </Ranking.Slot>
      <RankingRows />
    </Ranking.Root>
  ),
};

export const DynamicSlot: StoryObj<typeof Ranking.Root> = {
  render: () => {
    const [candidateScore, setCandidateScore] = useState(905);
    const insertionIndex = useMemo(() => {
      const index = players.findIndex(
        (player) => candidateScore >= player.score,
      );
      return index === -1 ? players.length : index;
    }, [candidateScore]);

    return (
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2 border-b border-border p-3">
          {[975, 905, 845, 760].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setCandidateScore(score)}
              className="rounded-md border border-border px-2.5 py-1 text-sm"
            >
              Preview {score}
            </button>
          ))}
        </div>
        <Ranking.Root
          items={players}
          getKey={(player) => player.id}
          boundaries={[3]}
          labels={["Podium", "Field"]}
        >
          <Ranking.Slot slotKey="preview" atIndex={insertionIndex}>
            {({ rank, groupIndex }) => (
              <div className="mx-4 my-3 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
                <Text size="2" weight="medium">
                  Candidate preview
                </Text>
                <Text size="2" color="secondary">
                  Score {candidateScore} would render at rank #{rank} in group{" "}
                  {groupIndex + 1}.
                </Text>
              </div>
            )}
          </Ranking.Slot>
          <RankingRows />
        </Ranking.Root>
      </div>
    );
  },
};
