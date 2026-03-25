import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <>
      <Header docsTree={tree} />
      {children}
    </>
  );
}
