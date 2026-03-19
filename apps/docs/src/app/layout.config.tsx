import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const siteTitle = "@m3000/market";
export const siteVersion = "v0.0.0";
export const siteLinks = [
	{
		href: "/docs",
		label: "Docs",
		external: false,
	},
	{
		href: "https://github.com/m3000/market",
		label: "GitHub",
		external: true,
	},
] as const;

export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<div className="flex items-center gap-2">
				<span className="font-semibold">{siteTitle}</span>
				<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
					{siteVersion}
				</span>
			</div>
		),
		url: "/",
	},
	links: [],
};
