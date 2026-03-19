"use client";

import { Tab, Tabs, TabsList, TabsPanel } from "@m3000/market";
import { useState } from "react";
import { DocsCodeBlock } from "./docs-code-block";

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const INSTALL_COMMANDS: Record<PackageManager, string> = {
	pnpm: "pnpm add @m3000/market",
	npm: "npm install @m3000/market",
	yarn: "yarn add @m3000/market",
	bun: "bun add @m3000/market",
};

export function Installation() {
	const [pm, setPm] = useState<PackageManager>("pnpm");

	return (
		<Tabs
			value={pm}
			onValueChange={(value) => setPm(value as PackageManager)}
			variant="segmented"
			className="w-full max-w-[28rem] gap-3"
			data-installation-tabs
		>
			<div>
				<TabsList
					aria-label="Package managers"
					className="w-fit border-transparent bg-transparent p-0"
				>
					{PACKAGE_MANAGERS.map((packageManager) => (
						<Tab key={packageManager} value={packageManager}>
							{packageManager}
						</Tab>
					))}
				</TabsList>
			</div>
			{PACKAGE_MANAGERS.map((packageManager) => (
				<TabsPanel key={packageManager} value={packageManager}>
					<DocsCodeBlock
						copyText={INSTALL_COMMANDS[packageManager]}
						className="overflow-hidden"
						preClassName="text-sm text-foreground"
					>
						<code>{INSTALL_COMMANDS[packageManager]}</code>
					</DocsCodeBlock>
				</TabsPanel>
			))}
		</Tabs>
	);
}
