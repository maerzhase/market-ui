import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/cn";

const textVariants = cva("font-sans", {
  variants: {
    size: {
      "1": "text-1 leading-1",
      "2": "text-2 leading-2",
      "3": "text-3 leading-3",
      "4": "text-4 leading-4",
      "5": "text-5 leading-5",
      "6": "text-6 leading-6",
      "7": "text-7 leading-7",
      "8": "text-8 leading-8",
      "9": "text-9 leading-9",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    color: {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      tertiary: "text-muted-foreground",
      disabled: "text-disabled-foreground",
      current: "text-current",
      success: "text-success",
      error: "text-destructive",
    },
    tabularNums: {
      true: "tabular-nums",
    },
  },
  defaultVariants: {
    size: "2",
    weight: "regular",
    color: "primary",
  },
}) as (props?: {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  weight?: "regular" | "medium" | "semibold";
  align?: "left" | "center" | "right";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "current"
    | "success"
    | "error";
  tabularNums?: true;
  className?: string;
}) => string;

type TextVariants = typeof textVariants;

export interface TextProps
  extends VariantProps<TextVariants>,
    Omit<useRender.ComponentProps<"span">, "color"> {}

export type TextElement = React.ComponentRef<"span">;

export function Text({
  className,
  align,
  size,
  weight,
  color,
  tabularNums,
  render,
  ref,
  ...props
}: TextProps): React.ReactElement {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: cn(
      textVariants({ align, size, weight, color, tabularNums }),
      className,
    ),
  };

  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
    ref: ref,
  });

  return element;
}

export { textVariants };
export type { VariantProps };
