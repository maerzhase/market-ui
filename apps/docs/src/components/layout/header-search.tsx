"use client";

import { Button } from "@m3000/market";
import { IconSearch } from "@tabler/icons-react";
import { useDocsSearchDialog } from "@/components/layout/docs-search";

interface HeaderSearchProps {
  variant?: "site" | "docs";
}

export function HeaderSearch(_: HeaderSearchProps) {
  const { hotKey, setOpen } = useDocsSearchDialog();

  return (
    <Button
      type="button"
      color="tertiary"
      size="sm"
      onClick={() => setOpen(true)}
      aria-label="Open search"
    >
      <IconSearch aria-hidden className="size-4" />
      <span className="hidden items-center gap-1 md:ml-1 md:inline-flex">
        {hotKey.map((key) => (
          <kbd
            key={key}
            className="rounded border border-border bg-background px-1.5 py-0.5 text-[0.7rem] text-muted-foreground"
          >
            {key}
          </kbd>
        ))}
      </span>
    </Button>
  );
}
