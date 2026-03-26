import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/layout/docs-sidebar";
import { Header } from "@/components/layout/header";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <div className="min-h-screen">
      <Header variant="docs" docsTree={tree} />
      <main className="mx-auto flex w-full max-w-[97rem] flex-col gap-6 px-4 py-6 md:px-6 lg:flex-row lg:items-start">
        <aside className="hidden w-72 shrink-0 lg:sticky lg:top-20 lg:block">
          <DocsSidebar tree={tree} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
