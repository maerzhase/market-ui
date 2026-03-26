"use client";

import { Button } from "@m3000/market";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useDocsSearch } from "fumadocs-core/search/client";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

interface DocsSearchContextValue {
  hotKey: string[];
  open: boolean;
  setOpen: (value: boolean) => void;
}

const DocsSearchContext = createContext<DocsSearchContextValue | null>(null);

function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(window.navigator.platform.toLowerCase().includes("mac"));
  }, []);

  return isMac;
}

export function DocsSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const isMac = useIsMac();
  const hotKey = useMemo(() => (isMac ? ["⌘", "K"] : ["Ctrl", "K"]), [isMac]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <DocsSearchContext.Provider value={{ hotKey, open, setOpen }}>
      {children}
      <DocsSearchDialog />
    </DocsSearchContext.Provider>
  );
}

export function useDocsSearchDialog() {
  const context = useContext(DocsSearchContext);

  if (!context) {
    throw new Error(
      "useDocsSearchDialog must be used within DocsSearchProvider",
    );
  }

  return context;
}

type SearchResult = NonNullable<
  ReturnType<typeof useDocsSearch>["query"]["data"]
> extends infer Data
  ? Data extends Array<infer Item>
    ? Item
    : never
  : never;

function HighlightedText({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  );
}

function SearchResultItem({
  item,
  onSelect,
}: {
  item: SearchResult;
  onSelect: () => void;
}) {
  return (
    <Link
      href={item.url}
      onClick={onSelect}
      className="block rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {item.breadcrumbs?.length ? (
            <div className="mb-1 flex flex-wrap items-center gap-1 text-[0.68rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              {item.breadcrumbs.map((breadcrumb, index) => (
                <HighlightedText
                  key={`${item.id}-breadcrumb-${index}`}
                  value={breadcrumb}
                />
              ))}
            </div>
          ) : null}
          <HighlightedText
            value={item.content}
            className="line-clamp-2 text-sm leading-6 text-foreground [&_mark]:font-semibold"
          />
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground capitalize">
          {item.type}
        </span>
      </div>
    </Link>
  );
}

export function DocsSearchDialog() {
  const { open, setOpen } = useDocsSearchDialog();
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, setSearch, query } = useDocsSearch(
    process.env.NODE_ENV === "production"
      ? {
          type: "static",
          from: "/search-index.json",
        }
      : {
          type: "fetch",
          api: "/api/search",
        },
  );

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open, setSearch]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-[1] mx-auto flex min-h-full w-full max-w-3xl items-start px-3 pt-20 sm:px-6">
        <div className="w-full rounded-2xl border border-border bg-background shadow-2xl shadow-black/20">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3">
            <IconSearch className="size-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search docs..."
              className="min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-lg"
            />
            <Button
              type="button"
              color="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              <IconX className="size-4" />
            </Button>
          </div>

          <div className="max-h-[min(60vh,32rem)] overflow-y-auto p-2">
            {query.isLoading ? (
              <div className="px-3 py-8 text-sm text-muted-foreground">
                Searching…
              </div>
            ) : query.error ? (
              <div className="px-3 py-8 text-sm text-destructive">
                Unable to load search results.
              </div>
            ) : query.data === "empty" ? (
              <div className="px-3 py-8 text-sm text-muted-foreground">
                No results found for{" "}
                <span className="font-medium">{search}</span>.
              </div>
            ) : query.data?.length ? (
              <div className="space-y-1">
                {query.data.map((item) => (
                  <SearchResultItem
                    key={item.id}
                    item={item}
                    onSelect={() => setOpen(false)}
                  />
                ))}
              </div>
            ) : (
              <div className="px-3 py-8 text-sm text-muted-foreground">
                Start typing to search the docs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
