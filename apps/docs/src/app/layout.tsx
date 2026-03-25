import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { DocsSearchDialog } from "@/components/layout/search-dialog";
import "./globals.css";

export const metadata: Metadata = {
	title: "@m3000/market - Market UI Components",
	description:
		"A collection of React components for marketplace applications, featuring Price, Ranking, Countdown, Receipt, and more.",
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
						SearchDialog: DocsSearchDialog,
					}}
				>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
