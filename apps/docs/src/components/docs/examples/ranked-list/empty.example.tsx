"use client";

import { Ranking, Text } from "@m3000/market";

export function RankingEmptyExample() {
	return (
		<Ranking.Root
			items={[]}
			getKey={() => ""}
			className="overflow-hidden rounded-lg border border-border bg-background"
		>
			<Ranking.Empty className="px-4 py-6">
				<Text color="secondary">No items yet.</Text>
			</Ranking.Empty>
		</Ranking.Root>
	);
}
