"use client";

import { RankedList, Text } from "@m3000/market";

interface Team {
	id: string;
	name: string;
}

const teams: Team[] = [
	{ id: "1", name: "Atlas" },
	{ id: "2", name: "Beacon" },
	{ id: "3", name: "Cipher" },
	{ id: "4", name: "Drift" },
	{ id: "5", name: "Ember" },
];

export function RankedListThreeGroupsExample() {
	return (
		<div className="overflow-hidden rounded-lg border border-border bg-background">
			<RankedList.Root
				items={teams}
				getKey={(team) => team.id}
				boundaries={[1, 3]}
				labels={["Gold", "Silver", "Bronze"]}
			>
				<RankedList.Group>
					<RankedList.GroupDivider />
					<RankedList.GroupItem>
						<RankedList.GroupItemValue>
							{(team: Team) => (
								<div className="flex justify-between px-4 py-2">
									<RankedList.GroupItemIndex />
									<Text>{team.name}</Text>
								</div>
							)}
						</RankedList.GroupItemValue>
					</RankedList.GroupItem>
				</RankedList.Group>
			</RankedList.Root>
		</div>
	);
}
