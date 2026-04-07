import {
  siteDescription,
  siteLinks,
  siteTitle,
  siteUrl,
  siteVersion,
} from "@/app/layout.config";

export function getRootStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteTitle,
        url: siteUrl,
        description: siteDescription,
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "m3000",
        url: siteUrl,
        sameAs: siteLinks
          .filter((link) => link.external)
          .map((link) => link.href),
      },
    ],
  };
}

export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: siteTitle,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        softwareVersion: siteVersion,
        description:
          "React marketplace UI components for prices, rankings, countdowns, receipts, and auction-style interfaces.",
        url: siteUrl,
        isAccessibleForFree: true,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };
}
