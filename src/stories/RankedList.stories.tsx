import type { Meta, StoryObj } from "@storybook/react";
import { RankedList } from "@/components";
import { Separator, Text } from "@/components/primitives";
import { cn } from "@/lib";

interface Player {
  id: string;
  name: string;
  score: number;
  avatar?: string;
}

const meta: Meta<typeof RankedList.Root> = {
  title: "Trading UI/RankedList",
  component: RankedList.Root,
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

export const Basic: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const players: Player[] = [
      { id: "1", name: "Alice", score: 950 },
      { id: "2", name: "Bob", score: 880 },
      { id: "3", name: "Charlie", score: 820 },
      { id: "4", name: "Diana", score: 790 },
      { id: "5", name: "Eve", score: 750 },
      { id: "6", name: "Frank", score: 700 },
    ];

    return (
      <RankedList.Root
        items={players}
        getKey={(player) => player.id}
        boundaries={[3]}
        labels={["Winners", "Runners Up"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No players</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(player: Player, context) => (
                <>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                      <RankedList.GroupItemIndex />
                      <Text>{player.name}</Text>
                    </div>
                    <Text color="secondary">{player.score} pts</Text>
                  </div>
                  {!context.isLastInGroup && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              )}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const ThreeGroups: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const teams: Player[] = [
      { id: "1", name: "Team Alpha", score: 1000 },
      { id: "2", name: "Team Beta", score: 950 },
      { id: "3", name: "Team Gamma", score: 900 },
      { id: "4", name: "Team Delta", score: 850 },
      { id: "5", name: "Team Epsilon", score: 800 },
      { id: "6", name: "Team Zeta", score: 750 },
      { id: "7", name: "Team Eta", score: 700 },
      { id: "8", name: "Team Theta", score: 650 },
    ];

    return (
      <RankedList.Root
        items={teams}
        getKey={(team) => team.id}
        boundaries={[3, 6]}
        labels={["Gold", "Silver", "Bronze"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No teams</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(team: Player, context) => {
                const colors = [
                  "text-yellow-500",
                  "text-gray-400",
                  "text-orange-400",
                ];
                const color = colors[context.groupIndex] || "text-foreground";

                return (
                  <>
                    <div className="flex items-center justify-between px-4 py-2">
                      <div className="flex items-center gap-3">
                        <RankedList.GroupItemIndex>
                          {({ globalIndex }) => (
                            <Text color="tertiary" className="w-8 shrink-0">
                              #{globalIndex + 1}
                            </Text>
                          )}
                        </RankedList.GroupItemIndex>
                        <Text className={color}>{team.name}</Text>
                      </div>
                      <Text color="secondary">{team.score} pts</Text>
                    </div>
                    {!context.isLastInGroup && (
                      <Separator orientation="horizontal" />
                    )}
                  </>
                );
              }}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const CustomDivider: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const items: Player[] = [
      { id: "1", name: "Item 1", score: 100 },
      { id: "2", name: "Item 2", score: 90 },
      { id: "3", name: "Item 3", score: 80 },
      { id: "4", name: "Item 4", score: 70 },
    ];

    return (
      <RankedList.Root
        items={items}
        getKey={(item) => item.id}
        boundaries={[2]}
        labels={["Active", "Inactive"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No items</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider className="bg-linear-to-r from-transparent via-separator to-transparent">
            {({ label }) => (
              <div className="flex items-center justify-center py-1">
                <span className="rounded-full bg-muted px-4 py-1 text-xs text-muted-foreground">
                  {label}
                </span>
              </div>
            )}
          </RankedList.GroupDivider>
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(player: Player, context) => (
                <>
                  <div className="flex items-center justify-between px-4 py-2">
                    <Text>{player.name}</Text>
                    <Text color="secondary">{player.score}</Text>
                  </div>
                  {!context.isLastInGroup && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              )}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const WithAvatars: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const users: Player[] = [
      {
        id: "1",
        name: "Alice",
        score: 950,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        id: "2",
        name: "Bob",
        score: 880,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        id: "3",
        name: "Charlie",
        score: 820,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
      {
        id: "4",
        name: "Diana",
        score: 790,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
      },
      {
        id: "5",
        name: "Eve",
        score: 750,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      },
    ];

    return (
      <RankedList.Root
        items={users}
        getKey={(user) => user.id}
        boundaries={[3]}
        labels={["Top Performers", "Other Players"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No users</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(user: Player, context) => {
                const isTop = context.groupIndex === 0;

                return (
                  <>
                    <div
                      className={cn(
                        "flex items-center justify-between px-4 py-2",
                        !isTop && "opacity-50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RankedList.GroupItemIndex />
                        <img
                          src={user.avatar}
                          alt=""
                          className="size-8 rounded-full"
                        />
                        <Text weight={isTop ? "medium" : "regular"}>
                          {user.name}
                        </Text>
                      </div>
                      <Text color="secondary">{user.score} pts</Text>
                    </div>
                    {!context.isLastInGroup && (
                      <Separator orientation="horizontal" />
                    )}
                  </>
                );
              }}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const EmptyState: StoryObj<typeof RankedList.Root> = {
  parameters: {
    layout: "centered",
  },
  render: () => {
    return (
      <RankedList.Root items={[]} getKey={() => ""} boundaries={[]} labels={[]}>
        <RankedList.Empty className="h-40">
          <Text color="tertiary">No rankings available</Text>
        </RankedList.Empty>
      </RankedList.Root>
    );
  },
};

export const SingleGroup: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const items: Player[] = [
      { id: "1", name: "First", score: 100 },
      { id: "2", name: "Second", score: 90 },
      { id: "3", name: "Third", score: 80 },
    ];

    return (
      <RankedList.Root
        items={items}
        getKey={(item) => item.id}
        boundaries={[]}
        labels={["All Items"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No items</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(player: Player, context) => (
                <>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                      <RankedList.GroupItemIndex />
                      <Text>{player.name}</Text>
                    </div>
                    <Text color="secondary">{player.score}</Text>
                  </div>
                  {!context.isLastInGroup && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              )}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const LongList: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const items: Player[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Player ${i + 1}`,
      score: 1000 - i * 10,
    }));

    return (
      <RankedList.Root
        items={items}
        getKey={(item) => item.id}
        boundaries={[10]}
        labels={["Top 10", "Others"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No items</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider />
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(player: Player, context) => {
                const isTop = context.groupIndex === 0;

                return (
                  <>
                    <div
                      className={cn(
                        "flex items-center justify-between px-4 py-2",
                        !isTop && "opacity-40",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RankedList.GroupItemIndex />
                        <Text>{player.name}</Text>
                      </div>
                      <Text color="secondary">{player.score}</Text>
                    </div>
                    {!context.isLastInGroup && (
                      <Separator orientation="horizontal" />
                    )}
                  </>
                );
              }}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};

export const StyledGroups: StoryObj<typeof RankedList.Root> = {
  render: () => {
    const items: Player[] = [
      { id: "1", name: "Premium User 1", score: 100 },
      { id: "2", name: "Premium User 2", score: 95 },
      { id: "3", name: "Standard User 1", score: 85 },
      { id: "4", name: "Standard User 2", score: 80 },
      { id: "5", name: "Basic User 1", score: 70 },
      { id: "6", name: "Basic User 2", score: 65 },
    ];

    return (
      <RankedList.Root
        items={items}
        getKey={(item) => item.id}
        boundaries={[2, 4]}
        labels={["Premium", "Standard", "Basic"]}
      >
        <RankedList.Empty>
          <Text color="tertiary">No items</Text>
        </RankedList.Empty>
        <RankedList.Group>
          <RankedList.GroupDivider>
            {({ label, groupIndex }) => {
              // Keep decorative gradient colors for demo purposes
              const bgColors = [
                "bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
                "bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                "bg-linear-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
              ];
              const textColors = [
                "text-yellow-700 dark:text-yellow-300",
                "text-blue-700 dark:text-blue-300",
                "text-gray-700 dark:text-gray-300",
              ];

              return (
                <div
                  className={cn("sticky top-0 z-10", bgColors[groupIndex])}
                  style={{ zIndex: 10 + groupIndex }}
                >
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div
                      className="h-px min-w-0 flex-1 bg-separator"
                      aria-hidden
                    />
                    <Text
                      size="1"
                      className={cn("shrink-0", textColors[groupIndex])}
                    >
                      {label}
                    </Text>
                    <div
                      className="h-px min-w-0 flex-1 bg-separator"
                      aria-hidden
                    />
                  </div>
                </div>
              );
            }}
          </RankedList.GroupDivider>
          <RankedList.GroupItem>
            <RankedList.GroupItemValue>
              {(player: Player, context) => (
                <>
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                      <RankedList.GroupItemIndex />
                      <Text>{player.name}</Text>
                    </div>
                    <Text color="secondary">{player.score}</Text>
                  </div>
                  {!context.isLastInGroup && (
                    <Separator orientation="horizontal" />
                  )}
                </>
              )}
            </RankedList.GroupItemValue>
          </RankedList.GroupItem>
        </RankedList.Group>
      </RankedList.Root>
    );
  },
};
