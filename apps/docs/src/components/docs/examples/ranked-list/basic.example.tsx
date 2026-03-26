"use client";

import { Ranking, Text } from "@m3000/market";

interface Player {
  id: string;
  name: string;
  score: number;
}

const players: Player[] = [
  { id: "1", name: "Alice", score: 950 },
  { id: "2", name: "Bob", score: 880 },
  { id: "3", name: "Charlie", score: 820 },
  { id: "4", name: "Dana", score: 790 },
];

export function RankingBasicExample() {
  return (
    <Ranking.Root
      items={players}
      getKey={(player) => player.id}
      boundaries={[3]}
      labels={["Top 3", "Others"]}
      className="overflow-hidden rounded-lg border border-border bg-background"
    >
      <Ranking.Group>
        <Ranking.GroupDivider />
        <Ranking.GroupItem>
          <Ranking.GroupItemValue>
            {(player: Player) => (
              <Text render={<div className="px-4 py-2" />}>
                <Ranking.GroupItemIndex /> {player.name}{" "}
                <Text color="secondary">{player.score}</Text>
              </Text>
            )}
          </Ranking.GroupItemValue>
        </Ranking.GroupItem>
      </Ranking.Group>
    </Ranking.Root>
  );
}
