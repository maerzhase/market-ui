"use client";

import { Price, RankedList, Separator, Text } from "@m3000/market";

interface DemoBid {
	id: string;
	name: string;
	score: number;
}

const DEMO_BIDS: DemoBid[] = [
	{ id: "1", name: "Alice", score: 950 },
	{ id: "2", name: "Bob", score: 880 },
	{ id: "3", name: "Charlie", score: 820 },
];

export function RankedListDemo() {
	return (
		<div className="max-h-36 w-full overflow-hidden rounded-lg border border-border bg-background">
			<RankedList.Root
				items={DEMO_BIDS}
				getKey={(item) => item.id}
				boundaries={[2]}
				labels={["Top", "Others"]}
			>
				<RankedList.Group>
					<RankedList.GroupDivider />
					<RankedList.GroupItem>
						<RankedList.GroupItemValue>
							{(item: DemoBid, ctx) => (
								<>
									<div className="flex items-center justify-between px-3 py-1.5">
										<div className="flex items-center gap-2">
											<RankedList.GroupItemIndex />
											<Text size="2">{item.name}</Text>
										</div>
										<Text size="2" color="secondary">
											{item.score}
										</Text>
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
