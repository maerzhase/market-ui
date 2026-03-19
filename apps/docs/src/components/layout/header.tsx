"use client";

import { Button } from "@m3000/market";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
	{ href: "/docs", label: "Docs" },
	{ href: "https://github.com/m3000/market", label: "GitHub", external: true },
];

function SearchIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="size-4"
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function DocsSearchButton() {
	const { enabled, setOpenSearch } = useSearchContext();

	if (!enabled) {
		return null;
	}

	return (
		<Button
			type="button"
			color="secondary"
			size="sm"
			onClick={() => setOpenSearch(true)}
			className="gap-2"
			aria-label="Search docs"
		>
			<SearchIcon />
			<span className="hidden sm:inline">Search</span>
		</Button>
	);
}

export function Header() {
	const pathname = usePathname();
	const isDocsRoute = pathname?.startsWith("/docs");

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex h-14 max-w-[97rem] items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center gap-2">
					<span className="font-semibold">@m3000/market</span>
					<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
						v0.0.0
					</span>
				</Link>

				<nav className="flex items-center gap-2">
					{isDocsRoute ? <DocsSearchButton /> : null}
					{NAV_LINKS.map((link) => {
						const isActive =
							!link.external && pathname?.startsWith(link.href);

						if (link.external) {
							return (
								<Button
									key={link.href}
									color="ghost"
									size="sm"
									render={
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
										/>
									}
								>
									{link.label}
								</Button>
							);
						}

						return (
							<Button
								key={link.href}
								color="ghost"
								size="sm"
								active={isActive}
								render={<Link href={link.href} />}
							>
								{link.label}
							</Button>
						);
					})}
				</nav>
			</div>
		</header>
	);
}
