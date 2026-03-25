"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";

export function DocsSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch(
    process.env.NODE_ENV === "production"
      ? {
        type: "static",
        from: "/search-index.json",
        locale,
      }
      : {
        type: "fetch",
        api: "/api/search",
        locale,
      },
  );

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="top-20 w-[calc(100%-0.75rem)] rounded-xl border-border bg-background text-foreground shadow-xl shadow-black/20 md:top-[calc(50%-250px)] md:w-[calc(100%-2rem)]">
        <SearchDialogHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 sm:px-4">
          <SearchDialogIcon className="size-4 shrink-0 text-muted-foreground" />
          <SearchDialogInput className="min-w-0 text-base text-foreground placeholder:text-muted-foreground sm:text-lg" />
          <SearchDialogClose className="shrink-0 border-border bg-secondary text-muted-foreground hover:bg-secondary/80" />
        </SearchDialogHeader>
        <SearchDialogList
          className="max-h-[min(60vh,28rem)] sm:max-h-[28rem]"
          items={query.data !== "empty" ? query.data : null}
        />
      </SearchDialogContent>
    </SearchDialog>
  );
}
