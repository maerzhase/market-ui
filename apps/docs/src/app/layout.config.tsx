export const siteTitle = "@m3000/market";
export const siteVersion = `v${process.env.NEXT_PUBLIC_PACKAGE_VERSION}`;
export const siteLinks = [
  {
    href: "/docs",
    label: "Docs",
    external: false,
  },
  {
    href: "https://github.com/maerzhase/market-ui",
    label: "GitHub",
    external: true,
  },
] as const;
