"use client";

import type { ReactNode } from "react";

export function ReceiptExampleCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "border-border bg-card w-full rounded-lg border p-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
