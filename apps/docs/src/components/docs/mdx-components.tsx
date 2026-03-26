import { cn } from "@m3000/market";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { ComponentExample } from "@/components/docs/component-example";
import { DocsInlineCode, DocsMdxPre } from "@/components/docs/docs-code-block";

function HeadingLink({
  as: Tag,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  as: "h1" | "h2" | "h3" | "h4";
}) {
  const id = props.id;

  return (
    <Tag className={className} {...props}>
      {id ? (
        <a href={`#${id}`} className="no-underline hover:text-primary">
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  ComponentExample,
  a: ({ className, href = "", ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");

    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary",
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary",
          className,
        )}
        {...props}
      />
    );
  },
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-xl border-l-4 border-primary/40 bg-accent/30 px-5 py-4 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: DocsInlineCode,
  h1: ({ className, ...props }) => (
    <HeadingLink
      as="h1"
      className={cn(
        "scroll-mt-24 text-4xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <HeadingLink
      as="h2"
      className={cn(
        "mt-12 scroll-mt-24 border-t border-border pt-8 text-2xl font-semibold tracking-tight first:mt-0 first:border-t-0 first:pt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <HeadingLink
      as="h3"
      className={cn(
        "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <HeadingLink
      as="h4"
      className={cn("mt-6 scroll-mt-24 text-lg font-semibold", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),
  img: ({ className, alt, ...props }) => (
    <img
      alt={alt}
      className={cn("my-6 rounded-2xl border border-border", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn("leading-7 text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("my-6 leading-7 text-muted-foreground", className)}
      {...props}
    />
  ),
  pre: DocsMdxPre,
  strong: ({ className, ...props }) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border">
      <table
        className={cn("min-w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-t border-border px-4 py-3 align-top text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "bg-accent/30 px-4 py-3 text-left font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("border-border", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc space-y-2", className)} {...props} />
  ),
};
