"use client";

import { Text } from "@m3000/market";
import type { SidebarPageTreeComponents } from "fumadocs-ui/components/sidebar/page-tree";

export const DocsSidebarSeparator: SidebarPageTreeComponents["Separator"] = ({
  item,
}) => {
  return (
    <Text size="1" className="py-2" >
      {item.name}
    </Text>
  );
};
