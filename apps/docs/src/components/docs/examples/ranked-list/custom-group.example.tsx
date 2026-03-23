"use client";

import { Ranking, Text } from "@m3000/market";

interface Team {
  id: string;
  name: string;
  points: number;
}

const teams: Team[] = [
  { id: "1", name: "North Star", points: 112 },
  { id: "2", name: "Atlas Club", points: 108 },
  { id: "3", name: "Beacon FC", points: 97 },
  { id: "4", name: "Drift Union", points: 92 },
  { id: "5", name: "Ember SC", points: 88 },
  { id: "6", name: "Harbor AC", points: 84 },
];

export function RankingCustomGroupExample() {
  return (
    <Ranking.Root
      items={teams}
      getKey={(team) => team.id}
      boundaries={[2, 4]}
      labels={["Gold", "Silver", "Bronze"]}
      className="overflow-hidden rounded-lg border border-border bg-background"
    >
      <Ranking.Group>
        <Ranking.GroupDivider className="px-4 py-2">
          {({ label, groupIndex }) => (
            <div
              className={
                groupIndex === 0
                  ? "flex items-center justify-between rounded-md bg-amber-500/10 px-3 py-2"
                  : groupIndex === 1
                    ? "flex items-center justify-between rounded-md bg-slate-500/10 px-3 py-2"
                    : "flex items-center justify-between rounded-md bg-orange-500/10 px-3 py-2"
              }
            >
              <Text weight="medium">{label}</Text>
              <Text color="secondary" size="2">
                {groupIndex === 0
                  ? "Leading"
                  : groupIndex === 1
                    ? "Close behind"
                    : "Still in it"}
              </Text>
            </div>
            )}
          </Ranking.GroupDivider>
          <Ranking.GroupItem>
            <Ranking.GroupItemValue>
              {(team: Team, context) => (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Ranking.GroupItemIndex />
                    <Text
                    className={
                      context.groupIndex === 0
                        ? "text-amber-700 dark:text-amber-300"
                        : context.groupIndex === 1
                          ? "text-slate-700 dark:text-slate-300"
                          : "text-orange-700 dark:text-orange-300"
                    }
                  >
                    {team.name}
                  </Text>
                </div>
                <Text color="secondary">{team.points} pts</Text>
              </div>
            )}
          </Ranking.GroupItemValue>
        </Ranking.GroupItem>
      </Ranking.Group>
    </Ranking.Root>
  );
}
