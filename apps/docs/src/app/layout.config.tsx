import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<div className="flex items-center gap-2">
				<span className="font-semibold">@m3000/market</span>
				<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
					v0.0.0
				</span>
			</div>
		),
	},
	links: [
		{
			text: "Docs",
			url: "/docs",
			active: "nested-url",
		},
		{
			text: "GitHub",
			url: "https://github.com/m3000/market",
			external: true,
		},
	],
};
