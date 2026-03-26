"use client";

import { useMemo, useState } from "react";
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

const slotTargets = [
  { rank: 1, score: 975 },
  { rank: 2, score: 905 },
  { rank: 3, score: 845 },
  { rank: 5, score: 760 },
];

function getInsertionIndex(score: number) {
  const index = players.findIndex((player) => score >= player.score);
  return index === -1 ? players.length : index;
}

export function RankingDynamicSlotExample() {
  const [candidateScore, setCandidateScore] = useState(slotTargets[1].score);

  const insertionIndex = useMemo(
    () => getInsertionIndex(candidateScore),
    [candidateScore],
  );

  return (
    <>
      <div className="space-y-2 pb-3">
        <Text size="2" color="secondary">
          Move slot to rank
        </Text>
        <div className="flex flex-wrap gap-2">
          {slotTargets.map(({ rank, score }) => (
            <button
              key={rank}
              type="button"
              onClick={() => setCandidateScore(score)}
              className="rounded-md border border-border px-2.5 py-1 text-sm"
            >
              Rank {rank}
            </button>
          ))}
        </div>
      </div>

      <Ranking.Root
        items={players}
        getKey={(player) => player.id}
        boundaries={[3]}
        labels={["Podium", "Field"]}
        className="overflow-hidden rounded-lg border border-border bg-background"
      >
        <Ranking.Slot slotKey="candidate-preview" atIndex={insertionIndex}>
          {({ rank }) => (
            <div className="bg-muted/50 px-4 py-2">
              <div className="flex items-center justify-between gap-3">
                <Text color="tertiary" className="w-12 shrink-0">
                  #{rank}
                </Text>
                <Text>Preview bid</Text>
                <Text color="secondary">Score {candidateScore}</Text>
              </div>
            </div>
          )}
        </Ranking.Slot>
        <Ranking.Group>
          <Ranking.GroupDivider />
          <Ranking.GroupItem>
            <Ranking.GroupItemValue>
              {(player: Player) => (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Ranking.GroupItemIndex />
                    <Text>{player.name}</Text>
                  </div>
                  <Text color="secondary">{player.score}</Text>
                </div>
              )}
            </Ranking.GroupItemValue>
          </Ranking.GroupItem>
        </Ranking.Group>
      </Ranking.Root>
    </>
  );
}
