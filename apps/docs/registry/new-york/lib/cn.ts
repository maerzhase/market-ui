import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Primitive color scale (Radix-style 1-12 naming)
const PRIMITIVE_COLORS = [
  "grey-1",
  "grey-2",
  "grey-3",
  "grey-4",
  "grey-5",
  "grey-6",
  "grey-7",
  "grey-8",
  "grey-9",
  "grey-10",
  "grey-11",
  "grey-12",
  "white",
  "black",
  "current",
  "transparent",
];

// Semantic color tokens (shadcn-style naming)
const SEMANTIC_COLORS = [
  "background",
  "foreground",
  "muted",
  "muted-foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-hover",
  "primary-foreground",
  "secondary",
  "secondary-hover",
  "secondary-foreground",
  "accent",
  "accent-hover",
  "accent-active",
  "accent-foreground",
  "border",
  "input",
  "ring",
  "disabled",
  "disabled-foreground",
  "destructive",
  "destructive-hover",
  "destructive-foreground",
  "destructive-muted",
  "destructive-muted-foreground",
  "success",
  "success-hover",
  "success-foreground",
  "success-muted",
  "success-muted-foreground",
  "warning",
  "warning-hover",
  "warning-foreground",
  "warning-muted",
  "warning-muted-foreground",
  "separator",
];

const THEME_COLORS = [...PRIMITIVE_COLORS, ...SEMANTIC_COLORS];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [{ text: THEME_COLORS }],
      "bg-color": [{ bg: THEME_COLORS }],
      "border-color": [{ border: THEME_COLORS }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
