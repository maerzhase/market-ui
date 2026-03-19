"use client";

import { RankedList, Separator, Text } from "@m3000/market";

interface Player {
	id: string;
	name: string;
	score: number;
}

const players: Player[] = [
	{ id: "1", name: "Alice", score: 950 },
	{ id: "2", name: "Bob", score: 880 },
	{ id: "3", name: "Charlie", score: 820 },
];

export function RankedListUsageExample() {
	return (
		<div className="overflow-hidden rounded-lg border border-border bg-background">
			<RankedList.Root
				items={players}
				getKey={(player) => player.id}
				boundaries={[3]}
				labels={["Top 3", "Others"]}
			>
				<RankedList.Group>
					<RankedList.GroupDivider />
					<RankedList.GroupItem>
						<RankedList.GroupItemValue>
							{(player: Player, ctx) => (
								<>
									<div className="flex justify-between px-4 py-2">
										<RankedList.GroupItemIndex />
										<Text>{player.name}</Text>
										<Text>{player.score}</Text>
									</div>
									{!ctx.isLastInGroup && (
										<Separator orientation="horizontal" />
									)}
								</>
							)}
						</RankedList.GroupItemValue>
					</RankedList.GroupItem>
				</RankedList.Group>
			</RankedList.Root>
		</div>
	);
}
