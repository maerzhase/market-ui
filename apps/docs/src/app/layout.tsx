import type { Metadata } from "next";
import { DocsSearchProvider } from "@/components/layout/docs-search";
import { ThemeProvider } from "@/components/layout/theme-toggle";
import { Analytics } from "@vercel/analytics/next"
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
      <head />
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Analytics />
        <ThemeProvider>
          <DocsSearchProvider>{children}</DocsSearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
