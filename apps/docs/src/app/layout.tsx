import type { Metadata } from "next";
import { DocsSearchProvider } from "@/components/layout/docs-search";
import { ThemeProvider } from "@/components/layout/theme-toggle";
import "./globals.css";

const themeInitScript = `
(() => {
  try {
    const key = "m3000-docs-theme";
    const stored = localStorage.getItem(key);
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <DocsSearchProvider>{children}</DocsSearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
