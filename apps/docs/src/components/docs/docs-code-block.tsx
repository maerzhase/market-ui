"use client";

import { Button, cn } from "@m3000/market";
import { useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./docs-code-block.module.css";

export interface DocsCodeBlockProps {
  children: ReactNode;
  className?: string;
  preClassName?: string;
  copyText?: string;
  embedded?: boolean;
}

export function DocsCodeBlock({
  children,
  className,
  preClassName,
  copyText,
  embedded = false,
}: DocsCodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = copyText ?? preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      data-docs-code-surface
      data-embedded={embedded ? "true" : undefined}
      className={cn(styles.surface, embedded && styles.embedded, className)}
    >
      <Button
        type="button"
        size="xs"
        color="tertiary"
        className="absolute top-3 right-3 z-10"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
      <div data-docs-code-viewport className={styles.viewport}>
        <pre
          ref={preRef}
          className={cn(styles.pre, "text-sm text-foreground", preClassName)}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

export function DocsMdxPre(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <DocsCodeBlock copyText={undefined} preClassName={props.className}>
      {props.children}
    </DocsCodeBlock>
  );
}

export function DocsInlineCode(props: HTMLAttributes<HTMLElement>) {
  if (props.className || typeof props.children !== "string") {
    return <code {...props} />;
  }

  return (
    <code
      {...props}
      className="rounded-md border border-border bg-muted px-[0.3rem] py-[0.2rem] text-[0.875em]"
    />
  );
}
