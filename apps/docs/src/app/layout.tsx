import type { Metadata } from "next";
import { DocsSearchProvider } from "@/components/layout/docs-search";
import { ThemeProvider } from "@/components/layout/theme-toggle";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/next";
import { siteDescription, siteTitle, siteUrl } from "@/app/layout.config";
import { getRootStructuredData } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitle} - React Marketplace UI Components`,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${siteTitle} - React Marketplace UI Components`,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "@m3000/market - Marketplace design system",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} - React Marketplace UI Components`,
    description: siteDescription,
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getRootStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={structuredData} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Analytics />
        <ThemeProvider>
          <DocsSearchProvider>{children}</DocsSearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
