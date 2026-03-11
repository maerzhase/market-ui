import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const FX_COLORS = [
  "grey-50",
  "grey-100",
  "grey-200",
  "grey-300",
  "grey-400",
  "grey-500",
  "grey-600",
  "grey-700",
  "grey-800",
  "grey-900",
  "grey-950",
  "grey-1000",
  "white",
  "black",
  "current",
  "transparent",
  "background-primary",
  "background-secondary",
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-disabled",
  "success",
  "alert",
  "error",
]

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      leading: [
        "leading-0",
        "leading-1",
        "leading-2",
        "leading-3",
        "leading-4",
        "leading-5",
        "leading-6",
        "leading-7",
        "leading-8",
        "leading-9",
      ],
      "font-size": [
        "text-1",
        "text-2",
        "text-3",
        "text-4",
        "text-5",
        "text-6",
        "text-7",
        "text-8",
        "text-9",
      ],
      "text-color": [{ text: FX_COLORS }],
      "bg-color": [{ bg: FX_COLORS }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
