"use client";

import { Button } from "@m3000/market";
import { IconSearch } from "@tabler/icons-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";

interface HeaderSearchProps {
  variant?: "site" | "docs";
}

export function HeaderSearch(_: HeaderSearchProps) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();

  if (!enabled) {
    return null;
  }

  return (
    <Button
      type="button"
      color="secondary"
      size="sm"
      onClick={() => setOpenSearch(true)}
      aria-label="Open search"
    >
      <IconSearch aria-hidden className="size-4" />
      <span className="hidden items-center gap-1 md:ml-1 md:inline-flex">
        {hotKey.map((key, index) => (
          <kbd
            key={index}
            className="border-0"
          >
            {key.display}
          </kbd>
        ))}
      </span>
    </Button>
  );
}
