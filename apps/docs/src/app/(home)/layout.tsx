import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteTitle, siteUrl } from "@/app/layout.config";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { source } from "@/lib/source";
import { getHomeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: `${siteTitle} - React Marketplace UI Components`,
  description:
    "Build marketplace interfaces with React UI components for prices, rankings, countdowns, receipts, and auction flows.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteTitle} - React Marketplace UI Components`,
    description:
      "Build marketplace interfaces with React UI components for prices, rankings, countdowns, receipts, and auction flows.",
    url: siteUrl,
  },
  twitter: {
    title: `${siteTitle} - React Marketplace UI Components`,
    description:
      "Build marketplace interfaces with React UI components for prices, rankings, countdowns, receipts, and auction flows.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();
  const structuredData = getHomeStructuredData();

  return (
    <>
      <JsonLd data={structuredData} />
      <Header docsTree={tree} />
      {children}
    </>
  );
}
