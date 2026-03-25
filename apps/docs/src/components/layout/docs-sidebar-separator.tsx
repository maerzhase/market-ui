"use client";

import { Text } from "@m3000/market";
import type { ReactNode } from "react";

export function DocsSidebarSeparator({
  item,
}: {
  item: { name?: ReactNode };
}) {
  return (
    <Text size="1" className="py-2" >
      {item.name}
    </Text>
  );
}
