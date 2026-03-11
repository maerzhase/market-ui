import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import type * as React from "react"
import { cn } from "@/lib/cn"

export type SkeletonProps = Omit<useRender.ComponentProps<"span">, "color">

export type SkeletonElement = React.ComponentRef<"span">

export function Skeleton({ className, render, ref, ...props }: SkeletonProps): React.ReactElement {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: cn(
      `
        pointer-events-none animate-pulse rounded-xs border-none! bg-grey-300
        bg-none! text-transparent! shadow-none! select-none
        *:invisible
        empty:block
        dark:bg-grey-800
      `,
      className
    ),
    "aria-hidden": true,
    tabIndex: -1,
  }

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
    ref: ref,
  })

  return element
}


