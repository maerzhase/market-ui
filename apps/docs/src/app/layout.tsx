import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./globals.css";

const docsSearch =
	process.env.NODE_ENV === "production"
		? {
				type: "static" as const,
				api: "/search-index.json",
			}
		: {
				type: "fetch" as const,
				api: "/api/search",
			};

export const metadata: Metadata = {
	title: "@m3000/market - Market UI Components",
	description:
		"A collection of React components for marketplace applications, featuring Price, RankedList, Countdown, Receipt, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<RootProvider
					search={{
						enabled: true,
						options: docsSearch,
					}}
				>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
