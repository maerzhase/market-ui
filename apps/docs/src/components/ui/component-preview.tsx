"use client";

import { Tab, Tabs, TabsList, TabsPanel, cn } from "@m3000/market";
import { useState } from "react";
import type { ReactNode } from "react";
import { DocsCodeBlock } from "@/components/docs/docs-code-block";

interface PreviewProps {
  children: ReactNode;
  className?: string;
}

export function Preview({ children, className }: PreviewProps) {
  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-border bg-muted/30",
        className,
      )}
    >
      <div className="flex min-h-32 items-center justify-center p-6">
        <div className="w-full max-w-md pointer-events-none select-none [&>*]:pointer-events-auto [&>*]:select-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ComponentPreviewProps {
  children: ReactNode;
  code: string;
  highlightedCode?: ReactNode;
  className?: string;
  previewClassName?: string;
  maxWidth?: string | number;
  minHeight?: string | number;
  align?: "center" | "start" | "stretch";
  allowPointerEvents?: boolean;
}

export function ComponentPreview({
  children,
  code,
  highlightedCode,
  className,
  previewClassName,
  maxWidth = "28rem",
  minHeight = "8rem",
  align = "start",
  allowPointerEvents = false,
}: ComponentPreviewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const resolvedMaxWidth =
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const resolvedMinHeight =
    typeof minHeight === "number" ? `${minHeight}px` : minHeight;

  return (
    <Tabs
      value={view}
      onValueChange={(value) => setView(value as "preview" | "code")}
      variant="segmented"
      className={cn("my-6 gap-3", className)}
    >
      <div>
        <TabsList
          aria-label="Example view toggle"
          className="border-transparent bg-transparent p-0"
        >
          <Tab value="preview">Preview</Tab>
          <Tab value="code">Code</Tab>
        </TabsList>
      </div>
      <TabsPanel
        value="preview"
        className="overflow-hidden rounded-xl border border-border bg-muted/30"
        data-example-preview
      >
        {view === "preview" && (
          <div
            className={cn(
              "flex p-6",
              align === "center" && "items-center justify-center",
              align === "start" && "items-start justify-start",
              align === "stretch" && "items-stretch justify-center",
              previewClassName,
            )}
            style={{ minHeight: resolvedMinHeight }}
          >
            <div
              className={cn(
                "w-full",
                !allowPointerEvents &&
                  "pointer-events-none select-none [&>*]:pointer-events-auto [&>*]:select-auto",
              )}
              style={{ maxWidth: resolvedMaxWidth }}
            >
              {children}
            </div>
          </div>
        )}
      </TabsPanel>
      <TabsPanel
        value="code"
        className="overflow-hidden rounded-xl border border-border bg-muted/30"
        data-example-code
      >
        {view === "code" && (
          <DocsCodeBlock copyText={code} embedded>
            {highlightedCode ?? <code>{code}</code>}
          </DocsCodeBlock>
        )}
      </TabsPanel>
    </Tabs>
  );
}
