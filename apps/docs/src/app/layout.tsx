import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
	title: "@m3000/market - Trading UI Components",
	description:
		"A collection of React components for trading interfaces, featuring Price, RankedList, Countdown, Receipt, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<RootProvider>
					<Header />
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
