"use client";

import { Button, cn } from "@m3000/market";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteLinks, siteTitle, siteVersion } from "@/app/layout.config";

type HeaderVariant = "site" | "docs";

interface HeaderProps {
	variant?: HeaderVariant;
}

export function Header({ variant = "site" }: HeaderProps) {
	const pathname = usePathname();
	const containerClassName =
		variant === "docs"
			? "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm"
			: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm";
	const innerClassName =
		variant === "docs"
			? "flex h-14 w-full items-center justify-between px-4 md:px-6"
			: "mx-auto flex h-14 max-w-[97rem] items-center justify-between px-4 md:px-6";

	return (
		<header className={containerClassName}>
			<div className={innerClassName}>
				<Link href="/" className="flex items-center gap-2">
					<span className="font-semibold">{siteTitle}</span>
					<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
						{siteVersion}
					</span>
				</Link>

				<nav className="flex items-center gap-2">
					{siteLinks.map((link) => {
						const isActive =
							!link.external && pathname?.startsWith(link.href);

						if (link.external) {
							return (
								<Button
									key={link.href}
									color="ghost"
									size="sm"
									className={cn(
										variant === "docs" &&
											"text-muted-foreground hover:text-foreground",
									)}
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
								className={cn(
									variant === "docs" &&
										"text-muted-foreground hover:text-foreground",
								)}
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
